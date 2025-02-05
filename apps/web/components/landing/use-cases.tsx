import { ScanLine } from 'lucide-react';
import { Badge } from '@workspace/ui/components/badge';

const useCases = [
  {
    icon: <ScanLine className='size-6' />,
    title: 'Global Payments',
    description: 'Acepta pagos en cualquier parte del mundo, sin restricciones.',
    status: <Badge>Active</Badge>,
  },
  {
    icon: <ScanLine className='size-6' />,
    title: 'SaaS',
    description: 'Monetiza membresías, servicios o suscripciones sin intermediarios.',
    status: <Badge variant='secondary'>Soon</Badge>,
  },
  {
    icon: <ScanLine className='size-6' />,
    title: 'E-commerce',
    description: 'Vende productos físicos o digitales con un checkout sin fricción.',
    status: <Badge variant='secondary'>Soon</Badge>,
  },
];

export function UseCases() {
  return (
    <section className='relative overflow-y-hidden py-64 px-4 bg-foreground text-background'>
      <div className='max-w-4xl mx-auto'>
        <h2 className='text-3xl font-bold text-center mb-12'>¿Para quién es?</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 border-x border-transparent gap-1'>
          {useCases.map((useCase, index) => (
            <div key={index} className='flex flex-col items-center p-6 text-center'>
              <div className='mb-4 p-4 rounded-lg text-blue-500'>{useCase.icon}</div>
              {/* <div className='mb-2'>{useCase.status}</div> */}
              <h3 className='text-xl font-semibold mb-2'>{useCase.title}</h3>
              <p className='text-gray-600'>{useCase.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
