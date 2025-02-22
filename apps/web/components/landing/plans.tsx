import Link from 'next/link';
import { Check, X } from 'lucide-react';

import { Button } from '@workspace/ui/components/button';
import { Satoshi } from '@workspace/ui/components/icons/satoshi';

import { formatBigNumbers } from '@/lib/number';

const plans = [
  {
    id: 1,
    name: 'Free',
    description: 'Perfect for bootstrappers.',
    price: 0,
    features: [
      { value: 'Unlimited Stores.', included: true },
      { value: 'Unlimited Products.', included: true },
      { value: 'Unlimited Contacts.', included: true },
      { value: `Unlimited Sales`, included: true },
      { value: 'Email notifications.', included: false },
      { value: 'Priority support.', included: false },
    ],
    button: {
      cta: 'Get Started',
      link: 'http://localhost:3000/auth?plan=free',
    },
  },
  {
    id: 2,
    name: 'PRO',
    description: 'For small merchants with the ability to scale.',
    price: 'Custom price',
    features: [
      { value: 'Unlimited Stores.', included: true },
      { value: 'Unlimited Products.', included: true },
      { value: 'Unlimited Contacts.', included: true },
      { value: 'Unlimited Sales.', included: true },
      { value: 'Email notifications.', included: true },
      { value: 'Priority support.', included: true },
    ],
    button: {
      cta: 'Get Started',
      link: 'http://localhost:3000/auth?plan=pro',
    },
  },
];

export function Plans(props: any) {
  return (
    <section {...props} className='relative overflow-hidden z-20 px-4 pt-8 md:pt-12'>
      <div className='absolute -top-[300px] left-0 right-0 w-full max-w-4xl h-[600px] mx-auto rounded-full bg-white blur-2xl'></div>
      <div className='relative flex flex-col max-w-4xl mx-auto border-x border-transparent'>
        <div className='py-16'>
          <h2 className='text-3xl font-bold text-center'>Pricing</h2>
        </div>
        <div className='relative grid grid-cols-1 md:grid-cols-2 border-y border-dashed border-gray-300'>
          {plans.map((plan, index) => (
            <div key={index} className={`md:p-4 transparent md:border-r border-gray-300 border-dashed last:border-r-0`}>
              <div
                className={`flex flex-col gap-6 p-12 ${
                  index === 1 ? 'bg-foreground text-background shadow-sm' : 'bg-transparent'
                } rounded-lg`}
              >
                <div className='flex flex-col gap-2'>
                  <h2 className='font-semibold'>{plan.name}</h2>
                  <p className='text-muted-foreground'>{plan.description}</p>
                </div>

                <div className='flex items-center'>
                  {typeof plan?.price === 'number' && plan?.price > 0 && <Satoshi className='size-8' />}
                  <p className='text-3xl tracking-tighter text-balance'>
                    {typeof plan?.price === 'number' && plan?.price > 0 ? (
                      <>
                        <span className='font-bold'>{formatBigNumbers(Number(plan?.price))}</span>
                        <span className='ml-1 text-muted-foreground'>{'SAT'}</span>
                      </>
                    ) : (
                      <span className='font-bold'>
                        {typeof plan?.price === 'number' && plan?.price === 0 ? 'Free' : plan?.price}
                      </span>
                    )}
                  </p>
                </div>
                <Button variant={plan?.id === 1 ? 'default' : 'secondary'} size='lg' className='w-full' asChild>
                  <Link href={plan?.button?.link}>{plan?.button?.cta}</Link>
                </Button>
                <ul className='flex flex-col gap-4'>
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className='flex items-center gap-2'>
                      {feature.included ? (
                        <Check className='size-4 text-green-500' />
                      ) : (
                        <X className='size-4 text-red-500' />
                      )}
                      <span>{feature.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div className={`flex flex-col md:flex-row justify-between items-center gap-6 p-12 bg-transparent rounded-lg`}>
          <div className='flex flex-col gap-2 w-full'>
            <h2 className='font-semibold'>{'Self-host'}</h2>
            <p className='text-muted-foreground'>
              Host Llamout on your own infrastructure. <br />
              The perfect solution for businesses that require full control.
            </p>
          </div>
          <div className='w-full md:w-auto'>
            <Button variant={'secondary'} size='lg' className='w-full' asChild>
              <Link href={'https://github.com/unllamas/llamout'} target={'_blank'}>
                {'View Github'}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
