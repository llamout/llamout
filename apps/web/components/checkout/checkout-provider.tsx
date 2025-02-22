'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BadgeAlert } from 'lucide-react';

import { Satoshi } from '@workspace/ui/components/icons/satoshi';
import { Skeleton } from '@workspace/ui/components/skeleton';

import { formatBigNumbers } from '@/lib/number';

import { CustomAccordion } from './custom-accordion';

export function CheckoutProvider({
  store,
  product,
  checkout,
  readOnly = false,
  isSoldOut = false,
}: {
  store: any;
  product: any;
  checkout: any;
  readOnly?: boolean;
  isSoldOut?: boolean;
}) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className='relative overflow-x-hidden flex flex-col w-full min-h-full bg-background'>
      <div className={`flex-1 flex flex-col md:flex-row ${readOnly && 'select-none'}`}>
        {/* Data */}
        <div className='flex flex-col w-full bg-foreground text-background'>
          <div className='flex flex-row gap-4 w-full h-14 px-4'>
            <div className='flex items-center gap-4 w-full max-w-xl mx-auto'>
              {store?.website ? (
                <Link className='flex items-center gap-2' href={store?.website}>
                  {readOnly && !store?.image && <Skeleton className='w-8 h-8 bg-gray-200 rounded-full' />}
                  {store?.image && (
                    <div className='relative overflow-hidden w-8 h-8 bg-background rounded-full'>
                      <img src={store?.image} alt={store?.name} />
                    </div>
                  )}
                  <div className='flex-1 flex'>
                    <span className='font-semibold tracking-tighter text-balance'>{store?.name}</span>
                  </div>
                </Link>
              ) : (
                <div className='flex items-center gap-2'>
                  {readOnly && !store?.image && <Skeleton className='w-8 h-8 bg-gray-200 rounded-full' />}
                  {store?.image && (
                    <div className='relative overflow-hidden w-8 h-8 bg-background rounded-full'>
                      <img src={store?.image} alt={store?.name} />
                    </div>
                  )}
                  <div className='flex-1 flex'>
                    <span className='font-semibold tracking-tighter text-balance'>{store?.name}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className='flex-1 flex flex-col gap-6 w-full max-w-md mx-auto px-4 py-8 md:py-12'>
            <div className='flex flex-col gap-6'>
              <div className='flex flex-col gap-4'>
                <div className='flex justify-between items-center'>
                  <h1 className='font-semibold tracking-tighter text-balance'>{product?.name}</h1>
                  {product?.price.length > 0 &&
                    product?.price?.map((variant: any, index: any) => (
                      <div className='flex items-center' key={index}>
                        <Satoshi className='size-4' />
                        <p className='text-lg tracking-tighter text-balance'>
                          <span className='font-semibold'>{formatBigNumbers(Number(variant?.price) * quantity)}</span>
                          <span className='ml-1 text-muted-foreground'>{variant?.currency}</span>
                        </p>
                      </div>
                    ))}
                </div>
                {readOnly && !product?.image && <Skeleton className='w-full h-[280px] bg-gray-200 rounded-xl' />}
                {product?.image && (
                  <div className='relative overflow-hidden flex justify-center items-center max-h-[280px] rounded-xl'>
                    <img src={product?.image} alt={product?.name} />
                  </div>
                )}

                {readOnly && !product?.description && (
                  <Skeleton className='w-[220px] h-[14px] bg-gray-200 rounded-xl' />
                )}
                {product?.description && (
                  <div className='flex flex-col gap-4'>
                    <p className='text-sm' dangerouslySetInnerHTML={{ __html: product?.description }} />
                  </div>
                )}
              </div>

              {/* Divider */}
              {/* <div className='w-full h-[1px] bg-muted opacity-10'></div> */}

              {/* {product?.variants?.length > 0 && (
              <ProductVariants
                onChange={setSelected}
                selected={product?.variants[0]?.id}
                variants={product?.variants}
                disabled={disabled}
              />
            )} */}
            </div>
          </div>
        </div>

        {/* Content */}
        {isSoldOut ? (
          <div className='flex-1 md:flex-initial flex flex-col justify-center items-center gap-4 w-full py-12 text-center'>
            <div className='flex justify-center items-center w-12 h-12 bg-gradient-to-t from-background to-white border rounded-lg shadow-sm text-muted-foreground'>
              <BadgeAlert className='size-6' />
            </div>
            <div className='flex flex-col gap-2'>
              <h3 className='text-lg font-semibold'>Sold out</h3>
              <p className='text-sm text-muted-foreground'>
                The product has reached its limit. <br />
                Please contact the store for further support.
              </p>
            </div>
          </div>
        ) : (
          <div className='flex flex-col justify-center items-center w-full'>
            <div className='flex-1 flex w-full max-w-md h-full px-4 py-8 md:py-24'>
              <CustomAccordion
                readOnly={readOnly}
                quantity={quantity}
                store={store}
                product={product}
                checkout={checkout}
              />
            </div>
          </div>
        )}
        {/* <Footer /> */}
      </div>
    </div>
  );
}
