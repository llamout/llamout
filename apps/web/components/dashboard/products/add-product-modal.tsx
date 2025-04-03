import { useState } from 'react';
import { LoaderCircle } from 'lucide-react';

import { ProductStep } from '@/components/onboarding/product';
import { Button } from '@workspace/ui/components/button';
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

import { addProduct } from '@/actions/product';

export function AddProductModal({ store, product, onChange, ...props }: any) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          {...props}
          id='cta-dashboard-products-add'
          className='w-full sm:w-auto'
          size='lg'
          onClick={() => setOpen(true)}
        >
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New product</DialogTitle>
          <DialogDescription>Add a new product to your store.</DialogDescription>
        </DialogHeader>
        <DialogBody>
          <ProductStep data={product} updateData={onChange} />
        </DialogBody>
        <DialogFooter>
          <DialogClose tabIndex={1} asChild>
            <Button className='w-full' size='lg' type='button' variant='secondary'>
              Cancel
            </Button>
          </DialogClose>
          <Button
            className='w-full'
            size='lg'
            disabled={loading || !product?.name || product?.prices.price === 0}
            onClick={async () => {
              setLoading(true);

              // Create product
              const { error, data } = await addProduct({
                store_id: store,
                image: product?.image,
                name: product?.name,
                description: product?.description,
                prices: product?.prices,
                success_url: product?.success_url,
              });

              if (error) {
                console.log('error', error);
                setLoading(false);
                return;
              }

              setOpen(false);

              return;
            }}
          >
            {loading ? <LoaderCircle className='size-8 animate-spin' /> : 'Add Product'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
