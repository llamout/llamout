import type { Metadata } from 'next';
import Image from 'next/image';
// import { Bolt } from 'lucide-react';

// import { Button } from '@workspace/ui/components/button';
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from '@workspace/ui/components/sheet';
// import { Input } from '@workspace/ui/components/input';
// import { Label } from '@workspace/ui/components/label';

import { siteConfig } from '@/config/site';

import { NavStore } from '@/components/dashboard/nav-store';

export const metadata: Metadata = {
  title: {
    default: 'Dashboard',
    template: `%s | ${siteConfig.name}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div>
        <header className='fixed top-0 z-20 flex w-full h-16 shrink-0 items-center justify-between gap-2 px-4 bg-white border-b transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
          <div className='flex items-center justify-between gap-2 w-full max-w-4xl mx-auto px-2'>
            <div className='flex items-center gap-3'>
              <div className='overflow-hidden size-8 bg-background border rounded-md'>
                <Image src='/icon.png' alt='Llamout' width={32} height={32} />
              </div>
              <h1 className='text-md'>llamout</h1>
            </div>

            <div className='flex items-center gap-2'>
              {/* <Sheet>
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
                    <SheetDescription>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, debitis.
                    </SheetDescription>
                  </SheetHeader>

                  <div className='mt-8'>
                    <div className='grid gap-2'>
                      <Label htmlFor='email'>Success URL</Label>
                      <Input
                        id='email'
                        type='email'
                        placeholder='https://example.com/thanks?order_id={ORDER_ID}'
                        // value={email}
                        // onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <p className='text-sm'>
                        Include <strong>{`{ORDER_ID}`}</strong> to receive the Order ID on success.
                      </p>
                    </div>
                  </div>
                </SheetContent>
              </Sheet> */}

              <NavStore />
            </div>
          </div>
        </header>
        <div className='flex flex-1 flex-col gap-8 w-full max-w-2xl mx-auto mt-16 p-4 md:py-8'>{children}</div>
      </div>
    </>
  );
}
