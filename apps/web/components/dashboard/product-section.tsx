'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, MoreHorizontal, PackageSearch } from 'lucide-react';

import { Button } from '@workspace/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu';
import { Satoshi } from '@workspace/ui/components/icons/satoshi';
import { Skeleton } from '@workspace/ui/components/skeleton';

import { AddProductModal } from './products/add-product-modal';

import { formatBigNumbers } from '@/lib/number';
import { db } from '@/lib/database';

export function ProductSection({ store_id }: { store_id: string }) {
  const [product, setProduct] = useState<{
    image: string;
    name: string;
    description: string;
    prices: { price: number | null; currency: string };
    success_url: string;
  }>({ image: '', name: '', description: '', prices: { price: null, currency: 'SAT' }, success_url: '' });

  const query = {
    product: {
      $: {
        where: {
          store_id,
        },
      },
    },
    price: {
      $: {
        where: {
          store_id,
        },
      },
    },
  };

  const { isLoading, data } = db.useQuery(query);

  const products = data?.product;
  const prices = data?.price;

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-between w-full'>
        <div className='flex justify-between items-center gap-1 w-full'>
          <h1 className='text-lg font-semibold'>Products</h1>
          {/* {products && products?.length > 0 && (
            <AddProductModal store={store_id} product={product} onChange={setProduct} />
          )} */}
        </div>
      </div>

      {/* Loading Products */}
      {isLoading && (
        <div className='flex justify-between items-center p-4 bg-card rounded-lg border'>
          <div className='flex items-center gap-4 w-full'>
            <div className='hidden overflow-hidden sm:block w-8 h-8 p-0.5 bg-white border rounded-md'>
              <Skeleton className='w-full h-full bg-gray-200 border rounded-sm' />
            </div>
            <Skeleton className='w-24 h-4 bg-gray-200 border rounded-full' />
          </div>
          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-1'>
              <Satoshi className='size-4' />

              <Skeleton className='w-8 h-4 bg-gray-200 border rounded-full' />
            </div>
            <Button variant='outline' size='icon' disabled>
              <MoreHorizontal />
            </Button>
          </div>
        </div>
      )}

      {/* Not products */}
      {products && products?.length === 0 && (
        <div className='flex flex-col items-center justify-center gap-4 w-full p-8 bg-white border border-dashed rounded-lg'>
          <div className='flex flex-col items-center gap-2 text-center'>
            <div className='flex justify-center items-center w-12 h-12 bg-gradient-to-t from-background to-transparent border rounded-lg shadow-sm text-muted-foreground'>
              <PackageSearch className='size-6' />
            </div>
            <h3 className='text-lg'>There's nothing to see here yet.</h3>
            <p className='text-sm text-muted-foreground'>Get started by creating your first product</p>
          </div>
          <AddProductModal store={store_id} product={product} onChange={setProduct} />
        </div>
      )}

      {products && products?.length > 0 && (
        <div className='overflow-hidden flex flex-col gap-[1px] w-full rounded-lg border'>
          {/* Product */}
          {products?.map((product) => {
            const price = prices?.find((price) => price?.product_id === product?.id);
            return (
              <div key={product?.id} className='flex justify-between items-center p-4 bg-card'>
                <div className='flex items-center gap-4'>
                  {product?.image && (
                    <div className='hidden overflow-hidden sm:block w-8 h-8 p-0.5 bg-white border rounded-md'>
                      <img src={product?.image} className='w-full h-full rounded-sm object-cover' />
                    </div>
                  )}
                  <h3>{product?.name}</h3>
                </div>
                <div className='flex items-center gap-4'>
                  <div className='flex items-center gap-1'>
                    {price?.currency === 'SAT' ? <Satoshi className='size-4' /> : <span className='text-sm'>$</span>}
                    <div className='text-md font-semibold'>
                      {formatBigNumbers(price?.price) || (
                        <Skeleton className='w-8 h-4 bg-gray-200 border rounded-full' />
                      )}
                    </div>
                    <span className='text-sm text-muted-foreground'>
                      {price?.currency === 'SAT' ? 'SAT' : price?.currency}
                    </span>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='outline' size='icon'>
                        <MoreHorizontal />
                        <span className='sr-only'>More</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='w-48 rounded-lg' side={'bottom'} align={'end'}>
                      <DropdownMenuItem asChild>
                        <Link href={`/checkout/${product?.hash}`}>
                          <Eye className='text-muted-foreground' />
                          <span>View Checkout</span>
                        </Link>
                      </DropdownMenuItem>
                      {/* <DropdownMenuItem>
                    <Forward className='text-muted-foreground' />
                    <span>Share Project</span>
                  </DropdownMenuItem> */}
                      {/* <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Trash2 className='text-muted-foreground' />
                    <span>Delete Project</span>
                  </DropdownMenuItem> */}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
