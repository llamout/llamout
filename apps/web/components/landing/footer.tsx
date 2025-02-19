import Link from 'next/link';

import { Instagram } from '@workspace/ui/components/icons/instagram';
import { Twitter } from '@workspace/ui/components/icons/twitter';
import { Discord } from '@workspace/ui/components/icons/discord';
import { Github } from '@workspace/ui/components/icons/github';

export function Footer() {
  return (
    <footer className='w-full py-4 bg-foreground text-background'>
      <div className='flex flex-col md:flex-row justify-between items-center md:items-end gap-4 w-full max-w-2xl h-full mx-auto px-4'>
        <div className='flex flex-col items-center md:items-start gap-4'>
          <p>The Open-Source Payment Platform</p>
          <div className='flex items-center justify-center gap-4'>
            <Link href='https://instagram.com/llamout' title='Instagram'>
              <Instagram />
            </Link>
            <Link href='https://x.com/llamout' title='X/Twitter'>
              <Twitter />
            </Link>
            <Link href='https://discord.gg/pMVKzvYpmW' title='Discord'>
              <Discord />
            </Link>
            <Link href='https://github.com/llamout' title='Github'>
              <Github />
            </Link>
          </div>
          <p className='text-sm text-muted-foreground'>© 2025 Llamout</p>
        </div>
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
