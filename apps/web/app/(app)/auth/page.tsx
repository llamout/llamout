'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LoaderCircle, ScanFace, ShieldAlert } from 'lucide-react';

import { Button } from '@workspace/ui/components/button';

import { db } from '@/lib/database';

import { LoginForm } from '@/components/login-form';
import { Logo } from '@/components/logo';

export default function Page() {
  const router = useRouter();

  const { isLoading, error, user } = db.useAuth();

  // Get Store
  const queryStore = {
    stores: {},
  };

  const { data } = db.useQuery(queryStore);
  const store = data?.stores[0];

  if (user && store?.id) {
    router.push(`/dashboard/${store?.id}`);
    return;
  }

  // if (user && !hasStore) {
  //   router.push(`/onboarding`);
  // }

  if (isLoading) {
    return (
      <div className='flex min-h-svh items-center justify-center bg-background'>
        <div className='flex flex-col items-center gap-4 max-w-sm text-center'>
          <LoaderCircle className='size-8 animate-spin' />
          <h2 className='text-lg font-bold'>Loading</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex min-h-svh items-center justify-center bg-background'>
        <div className='flex flex-col items-center gap-4 max-w-sm text-center'>
          <ShieldAlert className='size-8' />
          <h2 className='text-lg font-bold'>Oops!</h2>
          <p className='text-muted-foreground'>{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className='flex min-h-svh items-center justify-center bg-white'>
        <div className='flex flex-col gap-6 w-full max-w-sm px-4'>
          <div className='flex flex-col items-center gap-2 text-center'>
            <Link href='/'>
              <div className='flex justify-center items-center w-12 h-12 bg-gradient-to-t from-background to-transparent border rounded-lg shadow-sm text-muted-foreground'>
                <Logo />
              </div>
            </Link>
            <h1 className='text-xl font-bold'>Let's log you in</h1>
          </div>
          <LoginForm />
        </div>
      </div>
    </>
  );
}
