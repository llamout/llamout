'use client';

import { useRouter } from 'next/navigation';
import { init } from '@instantdb/react';
import { LoaderCircle, ScanFace, ShieldAlert } from 'lucide-react';

import { LoginForm } from '@/components/login-form';
import { Button } from '@workspace/ui/components/button';
import Link from 'next/link';

const APP_ID = process.env.INSTANTDB_KEY || process.env.INSTANTDB_APP_ID;
const db = init({ appId: String(APP_ID) });

export default function Page() {
  const router = useRouter();

  const { isLoading, error, user } = db.useAuth();

  // Get Store
  const queryStore = {
    store: {
      $: {
        where: {
          user_id: user?.id || '',
        },
      },
    },
  };

  const { data: dataStore, isLoading: isLoadingStore } = db.useQuery(queryStore);
  const hasStore = dataStore?.store[0];

  // TO-DO
  if (isLoadingStore) {
    return <>Buscando datos...</>;
  }

  if (hasStore?.id) {
    router.push(`/dashboard/${hasStore?.id}`);
    return;
  }

  if (user) {
    router.push('/onboarding');
    return;
  }

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
      <div className='flex min-h-svh items-center justify-center bg-background'>
        <div className='flex flex-col gap-6 w-full max-w-sm px-4'>
          <div className='flex flex-col items-center gap-2 text-center'>
            <ScanFace className='size-8' />
            <h1 className='text-xl font-bold'>Let's log you in</h1>
            {/* <p className='text-muted-foreground'>
                We are about to create your admin account, please use your personal email.
              </p> */}
          </div>
          <LoginForm />
          <Button variant='link' asChild>
            <Link href='/'>Go to Home</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
