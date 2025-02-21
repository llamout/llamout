'use client';

import { PartyPopper } from 'lucide-react';

import { Feedback } from '@/components/thank/feedback';
// import { Button } from '@workspace/ui/components/button';

export default function Page() {
  return (
    <div className='flex justify-center items-center w-full h-dvh pt-12'>
      <div className='flex flex-col items-center gap-4 w-full max-w-sm text-center px-4'>
        <div className='flex justify-center items-center w-12 h-12 bg-gradient-to-t from-background to-white border rounded-lg shadow-sm text-muted-foreground'>
          <PartyPopper className='size-6' />
        </div>
        <div className='flex flex-col gap-8 w-full'>
          <div className='flex flex-col gap-2'>
            <h1 className='text-2xl font-semibold'>Congratulation!</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque, ut?</p>
          </div>
          <Feedback />
        </div>
        {/* <Button className='w-full' variant='link'>
          Go to Dashboard
        </Button> */}
      </div>
    </div>
  );
}
