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

import { formatBigNumbers } from '@/lib/number';

const PRODUCTS: any[] = [
  // {
  //   id: '2daa9a67-07df-4347-bc7b-d2164923f4f2',
  //   image: 'https://cdn.lemonsqueezy.com/media/30342/c1e79c6d-c8cb-47c8-9958-18ac8b9e2880.png?ixlib=php-3.3.1',
  //   name: 'AlignUI・Code Library',
  //   description: `<b>Get lifetime access and unlimited project usage with a one-time payment.</b><br />AlignUI is a complete component library built for React, styled with TailwindCSS. With our extensive code library, you'll build faster, maintain consistency, and have access to well-documented components.`,
  //   price: 199000,
  //   currency: 'SAT',
  // },
];

export function ProductSection() {
  // const { isMobile } = useSidebar();

  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<{
    image: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    variants: [];
  }>({ image: '', name: '', description: '', price: 0, currency: 'SAT', variants: [] });

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-between w-full'>
        <div className='flex flex-col gap-1'>
          <h1 className='text-lg font-semibold'>Products</h1>
          {/* <p className='text-sm text-muted-foreground'>Lorem ipsum dolor sit amet.</p> */}
        </div>
        {/* <Dialog>
          <DialogTrigger asChild>
            <Button>Add Product</Button>
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
                <Button className='w-full' type='button' variant='secondary'>
                  Cancel
                </Button>
              </DialogClose>
              <Button
                className='w-full'
                disabled={loading}
                onClick={async () => {
                  // Create product
                  const idProduct = await addProduct({
                    store_id: 'store-1',
                    image: product?.image,
                    name: product?.name,
                    description: product?.description,
                    price: product?.price,
                  });

                  if (!idProduct) {
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
        </Dialog> */}
      </div>
      <div className='flex flex-col gap-2 w-full'>
        {/* Product */}
        {PRODUCTS?.length === 0 ? (
          <div className='flex flex-col items-center justify-center gap-4 w-full py-8 bg-white border border-dashed rounded-lg'>
            <div className='flex flex-col items-center gap-2 text-center'>
              <div className='flex justify-center items-center w-12 h-12 bg-gradient-to-t from-background to-transparent border rounded-lg shadow-sm text-muted-foreground'>
                <PackageSearch className='size-6' />
              </div>
              <h3 className='text-lg'>There's nothing to see here yet.</h3>
              <p className='text-sm text-muted-foreground'>Get started by creating your first product</p>
            </div>
            <Button>Add Product</Button>
          </div>
        ) : (
          PRODUCTS?.map((product) => (
            <div key={product?.id} className='flex justify-between items-center p-4 bg-card rounded-lg border'>
              <div className='flex items-center gap-4'>
                <div className='hidden overflow-hidden sm:block w-8 h-8 p-0.5 bg-white border rounded-md'>
                  <img src={product?.image} className='w-full h-full rounded-sm object-cover' />
                </div>
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
                      <Link href={`/checkout/${product?.id}`}>
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
