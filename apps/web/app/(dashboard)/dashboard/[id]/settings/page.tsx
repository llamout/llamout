'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { AlertCircle, Check, LoaderCircle, SquareArrowOutUpRight } from 'lucide-react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@workspace/ui/components/alert-dialog';
import { Alert, AlertDescription, AlertTitle } from '@workspace/ui/components/alert';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Label } from '@workspace/ui/components/label';
import { Input } from '@workspace/ui/components/input';
import { toast, useToast } from '@workspace/ui/hooks/use-toast';
import { Skeleton } from '@workspace/ui/components/skeleton';
import { ApiKeyCard } from '@/components/dashboard/settings/api-key-card';

import { getLnurlp } from '@/actions/payment';

import { db } from '@/lib/database';

export default function Page() {
  // Libs
  const router = useRouter();
  const params = useParams<{ id: string }>();

  // Hooks
  const { toast } = useToast();

  // User
  const { user } = db.useAuth();

  // Get Store
  const queryStore = {
    store: {
      $: {
        where: {
          id: params?.id || '',
          user_id: user?.id || '',
        },
      },
    },
  };

  const { data: dataStore } = db.useQuery(queryStore);
  const store = dataStore?.store[0];

  // Component
  const [settings, setSettings] = useState<{ image: string; name: string; website: string; lnaddress: string }>({
    image: store?.image || '',
    name: store?.name || '',
    website: store?.website || '',
    lnaddress: store?.lnaddress || '',
  });

  // States
  const [isLoading, setIsLoading] = useState(false);
  const [lnaddress, setLnaddress] = useState(store?.lnaddress || '');
  const [validLn, setValidLn] = useState(store?.lnaddress ? true : false);
  const [uploadingImage, setUploadingImage] = useState(false);

  if (!isLoading && !user) {
    router.push(`/auth`);
    return null;
  }

  if (!store) return null;

  const handleSubmit = async () => {};

  return (
    <>
      <div className=''>
        <h1 className='text-3xl font-bold tracking-tight'>Settings</h1>
        {/* <p className='text-muted-foreground mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p> */}
      </div>

      <div className='grid gap-8'>
        {/* Information */}
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Information</CardTitle>
              <CardDescription>Update your store's main data.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='flex flex-col md:flex-row gap-8 items-start'>
                <div className='flex flex-col gap-4 w-full'>
                  {/* Profile */}
                  <div className='flex flex-col md:flex-row gap-2'>
                    <div className='w-60'>
                      <Label>Image</Label>
                    </div>
                    <div className='flex items-center gap-4 w-full'>
                      {settings?.image ? (
                        <Avatar className='w-12 h-12 border'>
                          <AvatarImage src={settings?.image} alt={settings?.name || ''} />
                          <AvatarFallback>{settings?.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                      ) : (
                        <Skeleton className='w-12 h-12 bg-gray-200 rounded-full' />
                      )}

                      <div className='flex flex-col'>
                        <div className='flex gap-2'>
                          <Button variant={'secondary'} disabled={true} size='sm'>
                            <label htmlFor='picture' className='cursor-pointer'>
                              {uploadingImage ? <LoaderCircle className='size-8 animate-spin' /> : 'Coming Soon'}
                              <input id='picture' type='file' accept='image/*' className='hidden' disabled={true} />
                            </label>
                          </Button>
                        </div>
                        <p className='text-xs text-muted-foreground mt-1'>JPG or PNG. Max 2MB.</p>
                      </div>
                    </div>
                  </div>
                  {/* Name */}
                  <div className='flex flex-col md:flex-row gap-2'>
                    <div className='w-60'>
                      <Label htmlFor='name'>Name</Label>
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                      <Input
                        id='name'
                        name='name'
                        placeholder='Satoshi Store'
                        defaultValue={settings?.name || ''}
                        onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                        required
                      />
                      <p className='text-sm text-muted-foreground'>This is the name your customers will see.</p>
                    </div>
                  </div>
                  {/* URL */}
                  <div className='flex flex-col md:flex-row gap-2'>
                    <div className='w-60'>
                      <Label htmlFor='website'>Website</Label>
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                      <Input
                        id='website'
                        name='website'
                        placeholder='https://your-store.com'
                        defaultValue={settings?.website || ''}
                        onChange={(e) => setSettings({ ...settings, website: e.target.value })}
                      />
                      <p className='text-sm text-muted-foreground'>
                        The web address where customers can find your store.
                      </p>
                    </div>
                  </div>
                  {/* LNAddress */}
                  <div className='flex flex-col md:flex-row gap-2'>
                    <div className='w-60'>
                      <Label htmlFor='lnaddress'>Lightning Address</Label>
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                      <div className='relative'>
                        <Input
                          id='lnaddress'
                          placeholder='your@lightning.address'
                          defaultValue={lnaddress}
                          disabled={isLoading}
                          onChange={(e) => {
                            setValidLn(false);
                            setLnaddress(e.target.value);
                            setSettings({ ...settings, lnaddress: '' });
                          }}
                        />
                        <div className='absolute right-2 top-0 flex items-center h-full'>
                          <Button
                            size='sm'
                            variant='secondary'
                            disabled={!lnaddress || isLoading || validLn}
                            onClick={async () => {
                              setIsLoading(true);
                              try {
                                const res = await getLnurlp(lnaddress);

                                if (res?.status !== 'OK') {
                                  setIsLoading(false);
                                  toast({
                                    variant: 'destructive',
                                    title: 'Oops!',
                                    description: String(res?.data),
                                  });

                                  return;
                                }

                                setSettings({ ...settings, lnaddress: lnaddress });
                                setValidLn(true);
                                setIsLoading(false);
                              } catch (error) {
                                setIsLoading(false);
                                toast({
                                  variant: 'destructive',
                                  title: 'Oops!',
                                  description: String(error),
                                });
                              }
                            }}
                          >
                            {validLn ? <Check className='text-green-500' /> : 'Validate'}
                          </Button>
                        </div>
                      </div>
                      {/* <p className='text-sm text-muted-foreground'>Lorem ipsum dolor sit amet.</p> */}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className='flex-col sm:flex-row justify-between gap-2 border-t'>
              <div className='flex items-center'>
                <p className='text-sm text-muted-foreground'>Learn more about the</p>
                <Button variant='link' size='sm' asChild>
                  <Link href='https://lightningaddress.com/' target='_blank'>
                    Lightning Address
                    <SquareArrowOutUpRight />
                  </Link>
                </Button>
              </div>
              <Button className='w-full sm:w-auto' type='submit' disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save'}
              </Button>
            </CardFooter>
          </Card>
        </form>

        <ApiKeyCard secret={store?.api_key} />

        {/* Delete store */}
        {/* <Card className='border-destructive/50'>
          <CardHeader>
            <CardTitle className='text-destructive'>Delete Store</CardTitle>
            <CardDescription>
              Deleting your store is a permanent action and cannot be undone. All associated data, products, and orders
              will be deleted.
            </CardDescription>
          </CardHeader>
          <CardFooter className='justify-end border-t border-destructive/50 bg-destructive/20'>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className='w-full sm:w-auto' variant='destructive'>
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>You're sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. All data from your store, including products, customers, and orders,
                    will be permanently deleted.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <Alert variant='destructive'>
                  <AlertCircle className='h-4 w-4' />
                  <AlertTitle>Warning</AlertTitle>
                  <AlertDescription>This action is not reversible. Please be certain.</AlertDescription>
                </Alert>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => null}
                    disabled={isLoading}
                    className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
                  >
                    {isLoading ? 'Deleting...' : 'Delete Store'}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card> */}
      </div>
    </>
  );
}
