import { Badge } from '@workspace/ui/components/badge';

const features = [
  {
    icon: '🎁',
    title: 'Product',
    description: 'Start selling your digital product.',
    active: true,
  },
  {
    icon: '📆',
    title: 'Subscription',
    description: 'Lorem ipsum dolor sit amet consectetur.',
    active: false,
  },
  {
    icon: '👀',
    title: 'More?',
    description: 'Lorem ipsum dolor sit amet consectetur.',
    active: false,
  },
];

export function Features(props: any) {
  return (
    <section {...props} className='flex justify-center w-full'>
      <div className='flex flex-col max-w-4xl w-full px-4 mx-auto border-x border-transparent'>
        <div className='py-16'>
          <h2 className='text-3xl font-bold text-center'>Features</h2>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full border-t border-gray-300 border-dashed p-4'>
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex-1 flex flex-col items-center gap-1 px-6 py-4 ${
                feature.active ? 'bg-white border shadow-sm' : ''
              } rounded-lg text-center duration-300`}
            >
              <div className={`p-2 rounded-lg text-2xl ${feature.active ? 'text-blue-500' : 'text-muted-foreground'}`}>
                {feature.icon}
              </div>
              {/* <div className='mb-2'>{feature.active}</div> */}
              <h3 className='text-lg font-semibold'>{feature.title}</h3>
              <div className='relative'>
                {!feature.active && (
                  <div className='absolute z-10 flex justify-center items-center w-full h-full'>
                    <Badge variant='outline'>Soon</Badge>
                  </div>
                )}
                <div className={`${!feature.active && 'select-none blur-[4px]'}`}>
                  <p className={`text-sm text-muted-foreground`}>{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
