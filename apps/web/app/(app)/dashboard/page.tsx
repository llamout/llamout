'use client';

import Link from 'next/link';
import { init } from '@instantdb/react';
import { Construction, LoaderCircle, ScanFace, ShieldAlert } from 'lucide-react';

import { Button } from '@workspace/ui/components/button';

import { LoginForm } from '@/components/login-form';

const APP_ID = process.env.INSTANTDB_KEY || '';
const db = init({ appId: APP_ID });

export default function Page() {
  const { isLoading: isLoadingAuth, error: errorAuth, user } = db.useAuth();

  if (isLoadingAuth) {
    return (
      <div className='flex min-h-svh items-center justify-center bg-background'>
        <div className='flex flex-col items-center gap-4 max-w-sm text-center'>
          <LoaderCircle className='size-8 animate-spin' />
          <h2 className='text-lg font-bold'>Loading</h2>
        </div>
      </div>
    );
  }

  if (errorAuth) {
    return (
      <div className='flex min-h-svh items-center justify-center bg-background'>
        <div className='flex flex-col items-center gap-4 max-w-sm text-center'>
          <ShieldAlert className='size-8' />
          <h2 className='text-lg font-bold'>Oops!</h2>
          <p className='text-muted-foreground'>{errorAuth.message}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className='flex min-h-svh items-center justify-center bg-background'>
        <div className='flex flex-col gap-6 w-full max-w-sm px-4'>
          <div className='flex flex-col items-center gap-4 text-center'>
            <ScanFace className='size-8' />
            <h1 className='text-xl font-bold'>Let's log you in</h1>
          </div>
          <LoginForm />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className='flex min-h-svh items-center justify-center bg-background'>
        <div className='flex flex-col gap-6 w-full max-w-sm px-4'>
          <div className='flex flex-col items-center gap-4 text-center'>
            <Construction className='size-8' />
            <h1 className='text-xl font-bold'>Under construction</h1>
            <p className='text-muted-foreground'>This page is under maintenance.</p>
            <Button variant='link' asChild>
              <Link href='/'>Go to home</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
