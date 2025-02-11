'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, LoaderCircle, MoreHorizontal, PackageSearch } from 'lucide-react';
import { init } from '@instantdb/react';

import { Button } from '@workspace/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu';
import { Satoshi } from '@workspace/ui/components/icons/satoshi';
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@workspace/ui/components/dialog';
import { Skeleton } from '@workspace/ui/components/skeleton';

import { formatBigNumbers } from '@/lib/number';

import { addProduct } from '@/actions/product';

import { ProductStep } from '../onboarding/product';
import { db } from '@/lib/database';

export function ProductSection({ store_id }: { store_id: string }) {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<{
    image: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    variants: [];
  }>({ image: '', name: '', description: '', price: 0, currency: 'SAT', variants: [] });

  const query = { product: { $: { where: { store_id } } } };

  const { isLoading, data } = db.useQuery(query);

  const products = data?.product;

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-between w-full'>
        <div className='flex flex-col gap-1'>
          <h1 className='text-lg font-semibold'>Products</h1>
          {/* <p className='text-sm text-muted-foreground'>Lorem ipsum dolor sit amet.</p> */}
        </div>
      </div>
      <div className='flex flex-col gap-2 w-full'>
        {/* Loading */}
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

        {/* Product */}
        {products?.length === 0 ? (
          <div className='flex flex-col items-center justify-center gap-4 w-full p-8 bg-white border border-dashed rounded-lg'>
            <div className='flex flex-col items-center gap-2 text-center'>
              <div className='flex justify-center items-center w-12 h-12 bg-gradient-to-t from-background to-transparent border rounded-lg shadow-sm text-muted-foreground'>
                <PackageSearch className='size-6' />
              </div>
              <h3 className='text-lg'>There's nothing to see here yet.</h3>
              <p className='text-sm text-muted-foreground'>Get started by creating your first product</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className='w-full sm:w-auto' size='lg'>
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>New product</DialogTitle>
                  <DialogDescription>Add a new product to your store.</DialogDescription>
                </DialogHeader>
                <DialogBody>
                  <ProductStep data={product} updateData={setProduct} />
                </DialogBody>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button className='w-full' size='lg' type='button' variant='secondary'>
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    className='w-full'
                    size='lg'
                    disabled={loading || !product?.name || !product?.price || product?.price === 0}
                    onClick={async () => {
                      setLoading(true);

                      // Create product
                      const { error, data } = await addProduct({
                        store_id,
                        image: product?.image,
                        name: product?.name,
                        description: product?.description,
                        price: product?.price,
                      });

                      if (error) {
                        console.log('error', error);
                        setLoading(false);
                        return;
                      }

                      return;
                    }}
                  >
                    {loading ? <LoaderCircle className='size-8 animate-spin' /> : 'Add Product'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        ) : (
          products?.map((product) => (
            <div key={product?.id} className='flex justify-between items-center p-4 bg-card rounded-lg border'>
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
                  <Satoshi className='size-4' />
                  <div className='text-md font-semibold'>{formatBigNumbers(product?.price)}</div>
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
          ))
        )}
      </div>
    </div>
  );
}
