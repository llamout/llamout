import Link from 'next/link';
import { Check, Store } from 'lucide-react';

import { useToast } from '@workspace/ui/hooks/use-toast';

import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { Button } from '@workspace/ui/components/button';

import { getLnurlp } from '@/actions/payment';
import { useState } from 'react';

export function StoreStep({ data, updateData, onSuccess }: any) {
  // Hooks
  const { toast } = useToast();

  // States
  const [loading, setLoading] = useState(false);
  const [lnaddress, setLnaddress] = useState('');
  const [validLn, setValidLn] = useState(false);

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex flex-col items-center text-center gap-2'>
        <Store className='size-8' />
        <h1 className='text-xl font-bold'>Store</h1>
        <p className='text-muted-foreground'>Create your store details.</p>
      </div>

      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='avatar'>Logo URL</Label>
            <Input
              id='avatar'
              placeholder='https://example.com/media.jpg'
              value={data?.image}
              onChange={(e) => updateData({ ...data, image: e.target.value })}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='name'>
              Name <span className='text-destructive'>*</span>
            </Label>
            <Input
              id='name'
              placeholder='Bitcoin Project'
              value={data?.name}
              onChange={(e) => updateData({ ...data, name: e.target.value })}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='website'>Website URL</Label>
            <Input
              id='website'
              placeholder='bitcoin.org'
              value={data?.website}
              onChange={(e) => updateData({ ...data, website: e.target.value })}
            />
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <Label htmlFor='lnaddress'>
            Lightning Address <span className='text-destructive'>*</span>
          </Label>
          <div className='relative'>
            <Input
              id='lnaddress'
              placeholder='your@lightning.address'
              value={lnaddress}
              disabled={loading}
              onChange={(e) => {
                setValidLn(false);
                setLnaddress(e.target.value);
                updateData({ ...data, lnaddress: '' });
              }}
            />
            <div className='absolute right-2 top-0 flex items-center h-full'>
              <Button
                size='sm'
                variant='secondary'
                disabled={!lnaddress || loading || validLn}
                onClick={async () => {
                  setLoading(true);
                  try {
                    const res = await getLnurlp(lnaddress);

                    if (res?.status !== 'OK') {
                      setLoading(false);
                      toast({
                        variant: 'destructive',
                        title: 'Oops!',
                        description: String(res?.data),
                      });

                      return;
                    }

                    updateData({ ...data, lnaddress: lnaddress });
                    setValidLn(true);
                    setLoading(false);
                  } catch (error) {
                    setLoading(false);
                    toast({
                      variant: 'destructive',
                      title: 'Oops!',
                      description: String(error),
                    });
                  }
                }}
              >
                {validLn ? <Check className='text-green-500' /> : 'Validate'}
              </Button>
            </div>
          </div>
          <Button variant='link' asChild>
            <Link href='https://lightningaddress.com/' target='_blank'>
              Get a Lightning Address
              {/* <SquareArrowOutUpRight className='text-muted-foreground' /> */}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
