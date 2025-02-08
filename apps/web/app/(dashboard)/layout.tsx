import type { Metadata } from 'next';
import Image from 'next/image';

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
        <header className='fixed top-0 flex w-full h-16 shrink-0 items-center justify-between gap-2 px-4 bg-white border-b transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
          <div className='flex items-center justify-between gap-2 w-full max-w-4xl mx-auto px-2'>
            <div className='flex items-center gap-3'>
              <div className='overflow-hidden size-8 bg-background border rounded-md'>
                <Image src='/icon.png' alt='Llamout' width={32} height={32} />
              </div>
              <h1 className='text-md'>llamout</h1>
            </div>

            <NavStore
              store={{
                name: 'AlignUI Design System',
                image: 'https://pbs.twimg.com/profile_images/1859209210761818112/4LKQZTCY_400x400.jpg',
              }}
            />
          </div>
        </header>
        <div className='flex flex-1 flex-col gap-8 w-full max-w-2xl mx-auto mt-16 p-4 md:py-8'>{children}</div>
      </div>
    </>
  );
}
