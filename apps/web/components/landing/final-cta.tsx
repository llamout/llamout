import Link from 'next/link';

import { Button } from '@workspace/ui/components/button';

export function FinalCTA(props: any) {
  return (
    <section {...props} className='flex items-center py-64 px-4 bg-foreground text-background text-center'>
      <div className='flex flex-col gap-8 max-w-2xl mx-auto'>
        <h2 className='text-4xl font-bold mb-6'>Receive global payments without friction and without limits.</h2>

        <div>
          <Button variant={'secondary'} size='lg' asChild>
            <Link href={'https://heyform.net/f/yKjhjaro'}>{'Get in touch'}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
