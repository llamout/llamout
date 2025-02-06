import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Moon, ScanLine, Sun } from 'lucide-react';

import { Button } from '@workspace/ui/components/button';

const links = [
  {
    icon: <ScanLine className='size-6' />,
    title: 'Features',
    link: '/#features',
    active: false,
  },
  {
    icon: <ScanLine className='size-6' />,
    title: 'Pricing',
    link: '/#pricing',
    active: false,
  },
  {
    icon: <ScanLine className='size-6' />,
    title: 'FAQs',
    link: '/#faq',
    active: false,
  },
  // {
  //   icon: <ScanLine className='size-6' />,
  //   title: 'Contact us',
  //   link: '/#contact',
  //   active: false,
  // },
];

export function Navbar() {
  // const [isDarkMode, setIsDarkMode] = useState(false);

  // const toggleDarkMode = () => {
  //   setIsDarkMode(!isDarkMode);
  //   document.documentElement.classList.toggle('dark');
  // };

  return (
    <section className='relative z-50 flex justify-center w-full'>
      <div className='fixed w-full max-w-4xl px-2 pt-2'>
        <div className='flex items-center justify-between px-4 h-16 bg-white/80 border border-white/40 rounded-2xl shadow-sm backdrop-blur-lg'>
          <div className='flex items-center gap-3'>
            <div className='overflow-hidden size-8 bg-background border rounded-md'>
              <Image src='/icon.png' alt='Llamout' width={32} height={32} />
            </div>
            <h1 className='text-md'>llamout</h1>
          </div>
          <div className='hidden md:flex gap-2'>
            {links.map((link, index) => (
              <Button key={index} variant={link.active ? 'secondary' : 'ghost'} asChild>
                <Link href={link?.link ?? ''}>{link?.title}</Link>
              </Button>
            ))}
          </div>
          <div className=''>
            <Button asChild>
              <Link href='/auth'>Get Started</Link>
            </Button>
          </div>

          {/* <Button variant='ghost' size='icon' onClick={toggleDarkMode}>
            {isDarkMode ? <Sun className='h-[1.2rem] w-[1.2rem]' /> : <Moon className='h-[1.2rem] w-[1.2rem]' />}
          </Button> */}
        </div>
      </div>
    </section>
  );
}
