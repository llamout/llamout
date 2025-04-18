'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { init } from '@instantdb/react';
import { LoaderCircle, ScanFace, ShieldAlert } from 'lucide-react';

import { Button } from '@workspace/ui/components/button';

import { addStore } from '@/actions/store';

import { LoginForm } from '@/components/login-form';
import { StoreStep } from '@/components/onboarding/store';
import { db } from '@/lib/database';

export default function Page() {
  const router = useRouter();

  // States
  const [store, setStore] = useState<{ image: string; name: string; website: string; lnaddress: string }>({
    image: '',
    name: '',
    website: '',
    lnaddress: '',
  });
  const [loading, setLoading] = useState(false);

  // Validate user
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

  if (!isLoadingStore && !isLoading && user && hasStore?.id) {
    router.push(`/dashboard/${hasStore?.id}`);
    return null;
  }

  // TO-DO
  // if (isLoadingStore) {
  //   return <>Buscando datos...</>;
  // }

  if (hasStore?.id) {
    return (
      <div className='flex min-h-svh items-center justify-center bg-background'>
        <div className='flex flex-col items-center gap-4 max-w-sm text-center'>
          {/* <LoaderCircle className='size-8 animate-spin' /> */}
          {/* <h2 className='text-lg font-bold'>Loading</h2> */}
          <Button variant='link' asChild>
            <Link href={`/dashboard/${hasStore?.id}`}>Go to Dashboard</Link>
          </Button>
        </div>
      </div>
    );
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

  if (!user) {
    return (
      <>
        <div className='flex min-h-svh items-center justify-center bg-white'>
          <div className='flex flex-col gap-6 w-full max-w-sm px-4'>
            <div className='flex flex-col items-center gap-2 text-center'>
              <div className='flex justify-center items-center w-12 h-12 bg-gradient-to-t from-background to-transparent border rounded-lg shadow-sm text-muted-foreground'>
                <ScanFace className='size-6' />
              </div>
              <h1 className='text-xl font-bold'>Welcome!</h1>
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

  return (
    <>
      <div className='flex flex-col items-center justify-between gap-12 w-screen h-dvh bg-background pt-12'>
        <div className='flex flex-col gap-8 w-full max-w-sm px-4'>
          <StoreStep data={store} updateData={setStore} />
          <div className='flex justify-between gap-2 w-full'>
            <Button
              className='w-full'
              disabled={loading || !store?.name || !store?.lnaddress}
              onClick={async () => {
                setLoading(true);

                // Validate
                if (!user?.id) {
                  setLoading(false);
                  alert('No existe USER');
                  return;
                }

                // Create store
                const idStore = await addStore({
                  user_id: user?.id,
                  image: store?.image,
                  name: store?.name,
                  website: store?.website,
                  lnaddress: store?.lnaddress,
                });

                // alert(idStore);

                if (!idStore) {
                  setLoading(false);
                  return;
                }

                router.push(`/dashboard/${idStore}`);
              }}
            >
              {loading ? <LoaderCircle className='size-8 animate-spin' /> : 'Create Store'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
