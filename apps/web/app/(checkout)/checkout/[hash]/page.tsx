import type { Metadata } from 'next';
import Link from 'next/link';
import { FileSearch } from 'lucide-react';

import { Button } from '@workspace/ui/components/button';

import { getProduct } from '@/actions/product';
import { getPaidOrders } from '@/actions/order';
import { LIMIT_SALES_FREE } from '@/config/system';

import { CheckoutProvider } from '@/components/checkout/checkout-provider';

type Props = {
  params: Promise<{ hash: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const hash = (await params).hash;

  const { data } = await getProduct(hash);

  if (!data) return {};

  const { product } = data;

  return {
    title: `${product.name}`,
  };
}

export default async function Page({ params }: Props) {
  const hash = (await params).hash;

  const { error, data } = await getProduct(hash);

  if (error) {
    return (
      <div className='flex min-h-svh items-center justify-center bg-background'>
        <div className='flex flex-col items-center gap-4 max-w-sm text-center'>
          <FileSearch className='size-8' />
          <h2 className='text-lg font-bold'>Payment link not found</h2>
          <p className='text-muted-foreground'>
            Your payment link was not found or is not available. Please read the documentation.
          </p>
          <Button variant='link' asChild>
            <Link target='_blank' href='https://github.com/unllamas/llamout'>
              Go to Github
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const { store, product } = data;
  const { data: dataOrders } = await getPaidOrders(store?.id);

  return (
    <div className='w-screen h-dvh'>
      <CheckoutProvider
        store={store}
        product={product}
        isSoldOut={!store?.has_suscription && dataOrders?.length === LIMIT_SALES_FREE}
      />
    </div>
  );
}
