import { Button } from '@workspace/ui/components/button';
import { Check, X } from 'lucide-react';
import Link from 'next/link';

const plans = [
  {
    id: 1,
    name: 'Self-host',
    description: 'Host your own infrastructure. The perfect solution for that require full control.',
    price: 'Free',
    features: [
      { value: 'You install it on your server.', included: true },
      { value: 'Automatic configuration.', included: false },
      { value: 'Multiple products.', included: false },
      { value: 'Priority support.', included: false },
      { value: 'Early Access.', included: false },
    ],
    button: {
      target: '_blank',
      cta: 'View Github',
      link: 'https://github.com/unllamas/llamout',
    },
  },
  {
    id: 2,
    name: 'Managed',
    description: 'We manage the infrastructure for you, so you can focus on selling.',
    price: 'Custom Price',
    features: [
      { value: 'We manage it.', included: true },
      { value: 'Automatic configuration.', included: true },
      { value: 'Multiple products.', included: true },
      { value: 'Priority support.', included: true },
      { value: 'Early Access.', included: true },
    ],
    button: {
      target: '_blank',
      cta: 'Get in touch',
      link: 'https://heyform.net/f/yKjhjaro',
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
        <div className='relative grid grid-cols-1 md:grid-cols-2 border-t border-dashed border-gray-300'>
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
                <p className='text-3xl font-bold'>{plan.price}</p>
                <Button variant={plan?.id === 1 ? 'default' : 'secondary'} size='lg' className='w-full' asChild>
                  <Link href={plan?.button?.link} target={plan?.button?.link}>
                    {plan?.button?.cta}
                  </Link>
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
      </div>
    </section>
  );
}
