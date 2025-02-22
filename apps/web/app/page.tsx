'use client';

import { Hero } from '@/components/landing/hero';
import { Features } from '@/components/landing/features';
import { Plans } from '@/components/landing/plans';
import { FAQ } from '@/components/landing/faq';
import { FinalCTA } from '@/components/landing/final-cta';
import { ScreenPreview } from '@/components/landing/screen-preview';
import { Navbar } from '@/components/landing/navbar';
import { Footer } from '@/components/landing/footer';
import { CheckoutProvider } from '@/components/checkout/checkout-provider';
import { Table } from '@/components/landing/table';

import { PRODUCT, STORE } from '@/mock';

export default function Page() {
  return (
    <>
      <div className='relative z-10 min-w-screen min-h-dvh'>
        <div className='absolute top-0 z-0 flex justify-center gap-16 w-full h-full max-h-96'>
          <div className='w-1 h-full bg-gradient-to-t from-transparent to-white'></div>
          <div className='w-1 h-full bg-gradient-to-t from-transparent to-white'></div>
        </div>
        <div className='relative z-10 flex flex-col gap-8 md:gap-16'>
          <Navbar />
          <Hero />
          <Table />
          <Features id='features' />
          <div className='relative z-10'>
            <ScreenPreview>
              <CheckoutProvider checkout={{}} readOnly={true} store={STORE} product={PRODUCT} />
            </ScreenPreview>
            <div className='absolute z-10 bottom-0 w-full h-full bg-gradient-to-t from-background via-5% via-background/100  to-background/0'></div>
          </div>
          <Plans id='pricing' />
          <FAQ id='faq' />
          <FinalCTA id='contact' />
        </div>
        <Footer />
      </div>
    </>
  );
}
