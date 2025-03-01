'use client';

import { Suspense, useEffect, useState } from 'react';
import { Check, Heart, LoaderCircle } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useSearchParams } from 'next/navigation';
import Lottie from 'lottie-react';

import { Button } from '@workspace/ui/components/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@workspace/ui/components/accordion';
import { Label } from '@workspace/ui/components/label';
import { Input } from '@workspace/ui/components/input';
import { Skeleton } from '@workspace/ui/components/skeleton';
import { Card, CardContent } from '@workspace/ui/components/card';

import { addOrder, modifyOrder } from '@/actions/order';
import { generatePayment, listenPayment } from '@/actions/payment';
import { addCustomer } from '@/actions/customer';

import animationCheck from './animation-check.json';

type InformationProps = {
  store: any;
  disabled: boolean;
  onComplete: (id: any) => void;
};

export function Information({ onComplete, disabled, store }: InformationProps) {
  // Libs and hooks
  const searchParams = useSearchParams();
  const emailParams = searchParams.get('email');

  // Component
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState(emailParams ?? '');

  const [variant, setVariant] = useState<'email' | 'pubkey'>('email');
  const [pubkey, setPubkey] = useState('');

  async function onSubmit(e: any) {
    e.preventDefault();
    setLoading(true);

    if (variant === 'email' && (!name || !email)) return;
    if (variant === 'pubkey' && !pubkey) return;

    const id = await addCustomer({ name, email, pubkey, store_id: String(store?.id) });

    onComplete(id);
  }

  return (
    <form className='flex flex-col gap-4 w-full px-4' onSubmit={onSubmit}>
      {/* <Card className='w-full'>
        <CardContent className='pt-6'> */}
      <div className='flex flex-col gap-4'>
        {variant === 'email' ? (
          <>
            <div className='grid gap-2'>
              <Label htmlFor='name'>
                Name <span className='text-destructive'>*</span>
              </Label>
              <Input
                id='name'
                type='text'
                placeholder='Satoshi'
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='email'>
                Email <span className='text-destructive'>*</span>
              </Label>
              <Input
                id='email'
                type='email'
                placeholder='satoshi@bitcoin.org'
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!!emailParams}
                required
              />
            </div>
          </>
        ) : (
          <div className='grid gap-2'>
            <Label htmlFor='pubkey'>
              Pubkey <span className='text-destructive'>*</span>
            </Label>
            <Input
              id='pubkey'
              type='text'
              placeholder='NIP-05, npub or hex format'
              defaultValue={pubkey}
              onChange={(e) => setPubkey(e.target.value)}
              required
            />
          </div>
        )}
        <Button
          id={variant === 'email' ? 'cta-checkout-pay-email' : 'cta-checkout-pay-pubkey'}
          className='w-full'
          disabled={(variant === 'email' ? !name || !email : !pubkey) || loading || disabled}
          type='submit'
        >
          {loading ? <LoaderCircle className='size-8 animate-spin' /> : 'Pay'}
        </Button>
      </div>
      {/* </CardContent>
      </Card> */}
      {!emailParams && (
        <>
          <div className='flex items-center gap-2 px-4'>
            <div className='w-full h-[1px] bg-gray-300'></div>
            <span className='text-sm text-muted-foreground'>or</span>
            <div className='w-full h-[1px] bg-gray-300'></div>
          </div>
          {variant === 'email' ? (
            <Button
              className='w-full'
              variant='outline'
              disabled={!!emailParams}
              onClick={() => {
                setName('');
                setEmail('');
                setVariant('pubkey');
              }}
            >
              Continue with Nostr
            </Button>
          ) : (
            <Button
              className='w-full'
              variant='outline'
              onClick={() => {
                setPubkey('');
                setVariant('email');
              }}
            >
              Continue with Email
            </Button>
          )}
        </>
      )}
    </form>
  );
}

export function Copyable({ value, label }: { value: string; label: string }) {
  const [disabled, setDisabled] = useState(false);
  const [copyLabel, setCopyLabel] = useState(label);

  return (
    <CopyToClipboard text={value}>
      <Button
        className='w-full'
        variant='outline'
        onClick={() => {
          setCopyLabel('Copied!');
          setDisabled(true);
          setTimeout(() => {
            setCopyLabel(label);
            setDisabled(false);
          }, 2500);
        }}
        disabled={disabled}
      >
        {copyLabel}
      </Button>
    </CopyToClipboard>
  );
}

type PaymentProps = {
  invoice: string;
  store: any;
  isPaid: boolean;
};

export function Payment({ invoice, store, isPaid }: PaymentProps) {
  return (
    <div className='flex flex-col gap-4'>
      <Card>
        <CardContent className='pt-6'>
          <div className='flex flex-col items-center gap-4'>
            <div className='p-2 md:p-4 bg-white rounded-lg'>
              {isPaid && (
                <div className='absolute z-10 flex justify-center items-center w-[260px] h-[260px] rounded-lg'>
                  <Lottie animationData={animationCheck} loop={false} />
                </div>
              )}
              <div className={isPaid ? 'opacity-20 blur-md' : 'opacity-100 blur-0'}>
                {invoice ? (
                  <QRCodeSVG
                    size={260}
                    value={invoice}
                    imageSettings={{ src: store?.image || '/icon.png', height: 32, width: 32, excavate: true }}
                  />
                ) : (
                  <Skeleton className='w-[260px] h-[260px] bg-black' />
                )}
              </div>
            </div>
            <p className='text-center text-muted-foreground'>
              Remember to pay with a Bitcoin wallet using Lightning Network.
            </p>
          </div>
        </CardContent>
      </Card>
      <Copyable value={invoice} label='Copy Invoice' />
    </div>
  );
}

export function Summary() {
  return (
    <div className='flex flex-col gap-4'>
      <Card>
        <CardContent className='pt-6'>
          <div className='flex flex-col items-center gap-4'>
            <div className='flex justify-center items-center w-12 h-12 rounded-full bg-background'>
              <Heart className='size-4 text-green-500' />
            </div>
            <div className='flex flex-col items-center gap-2 text-center'>
              <h3 className='font-semibold text-xl tracking-tighter text-balance'>Payment successful</h3>
              <p>
                Thank you for your contribution. <br />
                We have saved your information and will be receiving updates soon.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* {CHECKOUT?.success_url && (
        <Button className='w-full' onClick={onComplete} asChild>
          <Link href={CHECKOUT?.success_url}>Go to Home</Link>
        </Button>
      )} */}
    </div>
  );
}

type Step = 'information' | 'payment' | 'summary';

interface CustomAccordion {
  store: any;
  product: any;
  checkout: any;
  quantity: number;
  readOnly: boolean;
}

export function CustomAccordion(props: CustomAccordion) {
  const { store, product, quantity, readOnly = false, checkout } = props;

  const [activeStep, setActiveStep] = useState<Step>('information');
  const [completedSteps, setCompletedSteps] = useState<Step[]>([]);

  const [orderId, setOrderId] = useState<string>('');
  const [invoice, setInvoice] = useState<string>('');
  const [verify, setVerify] = useState<string>('');
  const [isPaid, setIsPaid] = useState<boolean>(false);

  const price = product?.price[0]?.price * quantity;

  useEffect(() => {
    if (orderId && verify) {
      listenPayment({
        verifyUrl: verify,
        intervalMs: 5000,
        maxRetries: 48,
        onPaymentConfirmed: async (isPaid) => {
          if (isPaid) {
            modifyOrder(orderId);
            setIsPaid(true);
            // if (!checkout?.success_url) {
            setTimeout(() => {
              handleComplete('payment');
            }, 1400);
            // }
          }
        },
        onPaymentFailed: () => {
          console.log('Payment verification failed after maximum retries.');
        },
      });
    }
  }, [orderId, verify]);

  const handleComplete = (step: Step) => {
    setCompletedSteps([...completedSteps, step]);
    const nextStep = getNextStep(step);
    if (nextStep) {
      setActiveStep(nextStep);
    }
  };

  const getNextStep = (currentStep: Step): Step | null => {
    const steps: Step[] = ['information', 'payment', 'summary'];
    const currentIndex = steps.indexOf(currentStep);
    return steps[currentIndex + 1] || null;
  };

  const isCompleted = (step: Step) => completedSteps.includes(step);

  const renderIcon = (step: Step) => {
    if (isCompleted(step)) return <Check className='size-4 text-green-500' />;
    switch (step) {
      case 'information':
        return <span className='text-sm text-muted-foreground'>1</span>;
      case 'payment':
        return <span className='text-sm text-muted-foreground'>2</span>;
      case 'summary':
        return <span className='text-sm text-muted-foreground'>3</span>;
    }
  };

  return (
    <Accordion type='single' value={activeStep} className='w-full max-w-sm' {...props}>
      <AccordionItem value='information'>
        <AccordionTrigger className='flex justify-between p-4'>
          <div className='flex items-center gap-2'>
            <div className='flex justify-center items-center w-8 h-8 rounded-full bg-white border'>
              {renderIcon('information')}
            </div>
            <span>Information</span>
          </div>
          {/* {isCompleted('information') && <span className='text-sm text-green-500'>Completed</span>} */}
        </AccordionTrigger>
        <AccordionContent>
          <Suspense>
            <Information
              store={store}
              disabled={readOnly}
              onComplete={async (id) => {
                const _id = await addOrder({
                  // Relations
                  store_id: String(store?.id),
                  product_id: String(product?.id),
                  price_id: String(product?.price[0]?.id),
                  customer_id: id,
                  // Data
                  amount: Number(product?.price[0]?.price),
                  quantity,
                });

                setOrderId(_id);
                handleComplete('information');

                // General Payment
                // TO-DO: Validate LUD16
                const data = await generatePayment({
                  lightningAddress: store?.lnaddress,
                  amount: price,
                });

                setInvoice(data?.invoice?.pr);
                setVerify(data?.invoice?.verify);
              }}
            />
          </Suspense>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value='payment'>
        <AccordionTrigger className='flex justify-between p-4' disabled={!isCompleted('information')}>
          <div className='flex items-center gap-2'>
            <div className='flex justify-center items-center w-8 h-8 rounded-full bg-white border'>
              {renderIcon('payment')}
            </div>
            <span>Payment</span>
          </div>
          {/* {isCompleted('payment') && <span className='text-sm text-green-500'>Completed</span>} */}
        </AccordionTrigger>
        <AccordionContent>
          <Payment store={store} invoice={invoice} isPaid={isPaid} />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value='summary'>
        <AccordionTrigger className='flex justify-between p-4' disabled={!isCompleted('payment')}>
          <div className='flex items-center gap-2'>
            <div className='flex justify-center items-center w-8 h-8 rounded-full bg-white border'>
              {renderIcon('summary')}
            </div>
            <span>Summary</span>
          </div>
          {/* {isCompleted('summary') && <span className='text-sm text-green-500'>Completed</span>} */}
        </AccordionTrigger>
        <AccordionContent>
          <Summary />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
