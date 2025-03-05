import { Wallet, createSigner } from '@lawallet/sdk';

const COMMISION_ADDRESS = 'a@lawallet.ar';

// Función para obtener LNURLP (ya existente)
export async function getLnurlp(lightningAddress: string) {
  try {
    const [username, domain] = lightningAddress.split('@');

    if (!username || !domain) {
      throw new Error('Invalid Lightning Address format');
    }

    const url = `https://${domain}/.well-known/lnurlp/${username}`;
    const data = await fetch(url).then((res) => res.json());

    return data;
  } catch (error) {
    console.error('Error fetching LNURLP:', error);
    throw error;
  }
}

// Función para generar una factura (ya existente)
export async function generateInvoice(callback: string, amountInSats: number, comment?: string) {
  try {
    const amountInMilliSats = amountInSats * 1000; // Convert sats to millisats
    const params = new URLSearchParams({ amount: amountInMilliSats.toString() });
    if (comment) params.append('comment', comment);

    const url = `${callback}?${params.toString()}`;
    const data = await fetch(url).then((res) => res.json());

    if (data && data?.pr) {
      return { pr: data?.pr, verify: data?.verify };
    }

    throw new Error('Invalid invoice response');
  } catch (error) {
    console.error('Error generating invoice:', error);
    throw error;
  }
}

export async function randomWallet(secret: string): Promise<Wallet | any> {
  try {
    const randomSigner = await createSigner(secret);
    const wallet = new Wallet({ signer: randomSigner });

    return wallet;
  } catch (error) {
    console.log('error', error);
    return null;
  }
}

// Interfaz para generar un pago con comisión
interface GeneratePayment {
  lnaddress: string; // Dirección del usuario final
  amount: number; // Monto en satoshis
  secret: string;
}

export async function generatePayment(props: GeneratePayment) {
  const { lnaddress, amount, secret } = props;

  try {
    const account = await randomWallet(secret);
    const invoice = await account.generateInvoice({
      milisatoshis: amount * 1000,
    });

    console.log('Factura generada:', invoice.pr);

    listenPayment({
      verifyUrl: invoice.verify,
      intervalMs: 5000,
      maxRetries: 12,
      onPaymentConfirmed: async (isPaid) => {
        if (isPaid) {
          console.log('Pago confirmado. Distribuyendo fondos...');

          // Enviar el 99.5% al usuario
          await account.sendTransaction({
            tokenId: 'BTC',
            receiver: lnaddress,
            amount: (amount * 1000) / 2,
            comment: 'Pago después de comisión',
            onSuccess: () => {
              console.log(`Enviados ${(amount * 1000) / 2} sats al usuario (${lnaddress}).`);
            },
            onError: () => {
              console.error('Error al enviar al usuario.');
            },
          });

          // Enviar el 0.5% al usuario
          await distributeFunds(amount, secret);
        }
      },
      onPaymentFailed: () => {
        console.log('El pago falló o se agotó el tiempo de espera.');
      },
    });

    return { invoice: invoice.pr, verify: invoice.verify };
  } catch (error) {
    console.error('Error durante el proceso de pago con comisión:', error);
    throw error;
  }
}

// Función para distribuir los fondos después del pago
async function distributeFunds(totalAmountInSats: number, secret: string) {
  const account = await randomWallet(secret);

  await account.sendTransaction({
    tokenId: 'BTC',
    receiver: COMMISION_ADDRESS,
    amount: (totalAmountInSats * 1000) / 2,
    comment: 'Comisión del 0.5%',
    onSuccess: () => {
      console.log(`Enviados ${(totalAmountInSats * 1000) / 2} sats como comisión (${COMMISION_ADDRESS}).`);
    },
    onError: () => {
      console.error('Error al enviar la comisión.');
    },
  });
}

// Función para escuchar el estado del pago (ya existente)
type PaymentStatusResponse = {
  settled: boolean;
};

interface CronConfig {
  verifyUrl: string; // URL to check payment status
  intervalMs?: number; // Interval in milliseconds between checks
  maxRetries?: number; // Maximum number of try
  onPaymentConfirmed: (isPaid: boolean) => void; // Callback when payment is detected
  onPaymentFailed?: () => void; // Callback if attempts are exhausted
}

export function listenPayment({
  verifyUrl,
  intervalMs = 5000,
  maxRetries = 12,
  onPaymentConfirmed,
  onPaymentFailed,
}: CronConfig) {
  let retries = 0;

  const cron = setInterval(async () => {
    try {
      // Verify state of payment
      const response = await fetch(verifyUrl);
      const data: PaymentStatusResponse = await response.json();

      // Is paid
      if (response.ok && data.settled) {
        clearInterval(cron);
        onPaymentConfirmed(true);

        return;
      }

      retries++;

      // If the maximum number of attempts was reached, we return an error
      if (retries >= maxRetries) {
        console.warn('Max retries reached. Payment not confirmed.');

        clearInterval(cron);
        onPaymentFailed?.();
      }
    } catch (error) {
      console.error('Error during payment status check:', error);
      retries++;

      if (retries >= maxRetries) {
        console.warn('Max retries reached due to errors. Payment not confirmed.');

        clearInterval(cron);
        onPaymentFailed?.();
      }
    }
  }, intervalMs);
}
