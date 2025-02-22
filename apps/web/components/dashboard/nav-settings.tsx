'use client';

import { useState } from 'react';
import { Bolt, LoaderCircle } from 'lucide-react';

import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@workspace/ui/components/sheet';
import { useToast } from '@workspace/ui/hooks/use-toast';

import { addCheckout } from '@/actions/checkout';

import { db } from '@/lib/database';

export function NavSettings({ product_id }: { product_id: string }) {
  const { toast } = useToast();

  const query = {
    checkout: {
      $: {
        where: {
          product_id,
        },
      },
    },
  };

  const { isLoading, data } = db.useQuery(query);
  const checkout = data?.checkout[0];

  const [successUrl, setSuccessUrl] = useState(checkout?.success_url ?? '');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);
    const { error } = await addCheckout({ product_id, success_url: successUrl });

    if (error) {
      setLoading(false);
      toast({
        variant: 'destructive',
        title: 'Oops!',
        description: error,
      });
      return;
    }

    setOpen(false);
    toast({
      variant: 'default',
      title: 'Perfect!',
      description: 'Checkout updated.',
    });
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant='secondary' size='icon'>
          <Bolt />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <div className='flex justify-center items-center w-12 h-12 mx-auto sm:mx-0 bg-gradient-to-t from-background to-transparent border rounded-lg shadow-sm text-muted-foreground'>
            <Bolt className='size-6' />
          </div>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, debitis.</SheetDescription>
        </SheetHeader>

        <form className='flex flex-col gap-4 justify-between mt-8' onSubmit={handleSubmit}>
          <div className='grid gap-2'>
            <Label htmlFor='success'>Success URL</Label>
            <div className='relative'>
              <div className='absolute flex justify-center items-center px-4 h-full w-auto'>
                <p className='text-sm text-muted-foreground'>https://</p>
              </div>
              <Input
                id='success'
                name='success'
                placeholder='example.com/thanks?order_id={ORDER_ID}'
                value={successUrl}
                onChange={(e) => setSuccessUrl(e.target.value)}
                className='pl-16'
              />
            </div>
            <p className='text-sm text-muted-foreground'>
              Include <strong className='text-foreground'>{`{ORDER_ID}`}</strong> to receive the Order ID on success.
            </p>
          </div>
          <Button type='submit' className='w-full' size='lg' disabled={!successUrl || loading}>
            {loading ? <LoaderCircle className='size-8 animate-spin' /> : 'Save'}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
