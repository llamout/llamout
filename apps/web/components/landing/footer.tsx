import Link from 'next/link';

export function Footer() {
  return (
    <footer className='w-full py-4 bg-foreground text-background'>
      <div className='flex justify-between items-end w-full max-w-2xl h-full mx-auto px-4'>
        <p className='text-sm text-muted-foreground'>© 2025 Llamout</p>
        <Link
          className='pb-0.5 border-b border-gray-300/40 hover:border-gray-300 border-dashed duration-300'
          href='mailto:hey@llamout.com'
          target='_blank'
        >
          hey@llamout.com
        </Link>
      </div>
    </footer>
  );
}
