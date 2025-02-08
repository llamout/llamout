import Link from 'next/link';
import { Store } from 'lucide-react';

import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { Button } from '@workspace/ui/components/button';

export function StoreStep({ data, updateData }: any) {
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
              placeholder='Satoshi'
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
          <Input
            id='lnaddress'
            placeholder='your@lightning.address'
            value={data?.lnaddress}
            onChange={(e) => updateData({ ...data, lnaddress: e.target.value })}
          />
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
