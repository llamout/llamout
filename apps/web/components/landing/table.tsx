export function Table() {
  return (
    <div className='w-full py-12'>
      <div className='max-w-4xl w-full px-4 mx-auto'>
        {/* Table */}
        <div className='flex w-full'>
          {/* Problem Column */}
          <div className='flex-1 flex flex-col gap-8 px-2 md:px-8'>
            <div className='h-8'>
              <h2 className='mx-4 text-2xl font-bold opacity-0'>Problem</h2>
            </div>
            <div className='flex flex-col py-4 md:py-12 text-muted-foreground'>
              <div className='flex items-center h-24 px-2 md:px-4'>
                <p className='text-sm'>Sales commission</p>
              </div>
              <div className='flex items-center h-24 px-2 md:px-4 border-t border-dotted border-gray-300'>
                <p className='text-sm'>Subscription model</p>
              </div>
              <div className='flex items-center h-24 px-2 md:px-4 border-t border-dotted border-gray-300'>
                <p className='text-sm'>Accreditation</p>
              </div>
              <div className='flex items-center h-24 px-2 md:px-4 border-t border-dotted border-gray-300'>
                <p className='text-sm'>Retentions</p>
              </div>
              <div className='flex items-center h-24 px-2 md:px-4 border-t border-dotted border-gray-300'>
                <p className='text-sm'>Bitcoin support</p>
              </div>
            </div>
          </div>

          {/* Competitors Column - Hidden on mobile/tablet */}
          <div className='hidden md:flex flex-col gap-8 -mr-4'>
            <div className='h-8'>
              <h3 className='flex flex-col mx-4 text-muted-foreground'>
                <span className='text-sm'>Without</span>
                <span className='text-lg'>Llamout</span>
              </h3>
            </div>
            <div className='flex flex-col py-4 md:py-12 bg-gradient-to-l from-gray-100 to-white rounded-l-lg'>
              <div className='flex flex-col justify-center h-24 px-12'>
                <p className='text-md'>2.9% - 7%</p>
                <p className='text-sm text-muted-foreground'>+ $0.30 per transaction.</p>
              </div>
              <div className='flex flex-col justify-center h-24 px-12'>
                <p className='text-md'>Auto-charge</p>
                <p className='text-sm text-muted-foreground'>No user control.</p>
              </div>
              <div className='flex items-center h-24 px-12 border-t border-dotted border-transparent'>
                <p className='text-md'>3 - 10 days</p>
              </div>
              <div className='flex items-center h-24 px-12 border-t border-dotted border-transparent'>
                <p className='text-md'>Risk of blocking</p>
              </div>
              <div className='flex items-center h-24 px-4 md:px-12 border-t border-dotted border-transparent'>
                <p className='text-md'>Limited</p>
              </div>
            </div>
          </div>

          {/* Our Solution Column */}
          <div className='flex-1 flex flex-col gap-8'>
            <div className='h-8'>
              <h3 className='flex flex-col mx-4 font-bold'>
                <span className='text-sm'>With</span>
                <span className='text-lg'>Llamout</span>
              </h3>
            </div>
            <div className='flex flex-col py-4 md:py-12 bg-foreground text-background rounded-lg shadow-sm'>
              <div className='flex items-center h-24 px-4 md:px-12'>
                <p className='text-md'>0%</p>
              </div>
              <div className='flex flex-col justify-center h-24 px-4 md:px-12'>
                <p className='text-md'>Flexible payment</p>
                <p className='text-sm text-muted-foreground'>Pay-as-you-go.</p>
              </div>
              <div className='flex items-center h-24 px-4 md:px-12 border-t border-dotted border-transparent'>
                <p className='text-md'>Instant</p>
              </div>
              <div className='flex items-center h-24 px-4 md:px-12 border-t border-dotted border-transparent'>
                <p className='text-md'>Direct to your wallet</p>
              </div>
              <div className='flex items-center h-24 px-4 md:px-12 border-t border-dotted border-transparent'>
                <p className='text-md'>Native</p>
              </div>
            </div>
          </div>
        </div>
        {/* End */}
      </div>
    </div>
  );
}
