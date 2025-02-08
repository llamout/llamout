import { ShoppingBag } from 'lucide-react';

import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { Textarea } from '@workspace/ui/components/textarea';
import { Select, SelectTrigger, SelectValue } from '@workspace/ui/components/select';

export function ProductStep({ data, updateData }: { data: any; updateData: (value: any) => void }) {
  return (
    <div className='flex flex-col gap-8'>
      {/* <div className='flex flex-col items-center text-center gap-2'>
        <ShoppingBag className='size-8' />
        <h1 className='text-xl font-bold'>Product</h1>
        <p className='text-muted-foreground'>Add a new product to your store.</p>
      </div> */}
      <div className='flex flex-col gap-4'>
        <form className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='mediaUrl'>Image URL</Label>
            <Input
              id='mediaUrl'
              placeholder='https://example.com/media.jpg'
              value={data?.image}
              onChange={(e) => updateData({ ...data, image: e.target.value })}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='productName'>
              Name <span className='text-destructive'>*</span>
            </Label>
            <Input
              id='productName'
              placeholder='Enter product name'
              value={data?.name}
              onChange={(e) => updateData({ ...data, name: e.target.value })}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='description'>Description</Label>
            <Textarea
              id='description'
              placeholder='Enter product description'
              value={data?.description}
              onChange={(e) => updateData({ ...data, description: e.target.value })}
            />
          </div>
        </form>

        <div className='flex gap-4'>
          <div className='flex flex-col gap-2 w-full'>
            <Label htmlFor='price'>
              Price <span className='text-destructive'>*</span>
            </Label>
            <Input
              id='price'
              type='number'
              placeholder='Enter number'
              value={data?.price}
              onChange={(e) => updateData({ ...data, price: e.target.value })}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='currency'>Currency</Label>
            <Select disabled>
              <SelectTrigger className='w-[80px]'>
                <SelectValue placeholder='SAT' />
              </SelectTrigger>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
