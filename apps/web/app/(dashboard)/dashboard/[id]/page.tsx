'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { BadgeDollarSign, Contact, LoaderCircle, ReceiptText } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Satoshi } from '@workspace/ui/components/icons/satoshi';
import { Progress } from '@workspace/ui/components/progress';
import { Button } from '@workspace/ui/components/button';
import { Badge } from '@workspace/ui/components/badge';

import { formatBigNumbers } from '@/lib/number';
import { db } from '@/lib/database';
import { CHECKOUT_PRODUCT_HASH, LIMIT_SALES_FREE } from '@/config/system';

import { ProductSection } from '@/components/dashboard/product-section';
import { CustomerSection } from '@/components/dashboard/customer-section';
import { SaleSection } from '@/components/dashboard/sale-section';
import { NavSettings } from '@/components/dashboard/nav-settings';
import { NavStore } from '@/components/dashboard/nav-store';

export default function Page() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const { user, isLoading } = db.useAuth();

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

  // Get data for dashboard
  const queryDashboard = {
    product: {
      $: {
        where: {
          store_id: store?.id || '',
        },
      },
    },
    customer: {
      $: {
        where: {
          store_id: store?.id || '',
        },
      },
    },
    order: {
      $: {
        where: {
          store_id: store?.id || '',
        },
      },
    },
  };

  const { data: dataDashboard } = db.useQuery(queryDashboard);

  if (!isLoading && !user) {
    router.push(`/auth`);
  }

  // if (!store) {
  //   router.refresh();
  //   router.replace('/auth');

  //   // router.push(`/onboarding`);
  //   return;
  // }

  if (!dataDashboard) {
    return (
      <div className='flex min-h-svh items-center justify-center bg-background'>
        <div className='flex flex-col items-center gap-4 max-w-sm text-center'>
          <LoaderCircle className='size-8 animate-spin' />
          <h2 className='text-lg font-bold'>Loading Dashboard</h2>
        </div>
      </div>
    );
  }

  // if (error || !data) {
  //   return <>Oops, {error}</>;
  // }

  const { order, customer, product } = dataDashboard;

  function calculateTotalRevenue(orders: any[]) {
    let total = 0;

    for (let i = 0; i < orders.length; i++) {
      total += orders[i]?.amount;
    }

    return total;
  }

  const orderPaids = order?.filter((order) => order.paid === true) || 0;
  const totalRevenue = calculateTotalRevenue(orderPaids);
  const countCustomers = customer?.length;
  const countOrders = order?.length;
  const countSales = orderPaids?.length > 0 ? (orderPaids?.length * 100) / order?.length : 0;
  // const totalRevenue = orderPaids?.length > 0 && orderPaids.map(order => order?.amount)

  return (
    <>
      <header className='fixed top-0 z-20 flex w-full h-16 shrink-0 items-center justify-between gap-2 px-4 bg-white border-b transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
        <div className='flex items-center justify-between gap-2 w-full max-w-4xl mx-auto px-2'>
          <div className='flex items-center gap-3'>
            <div className='overflow-hidden size-8 bg-background border rounded-md'>
              <Image src='/icon.png' alt='Llamout' width={32} height={32} />
            </div>
            <h1 className='text-md'>llamout</h1>
          </div>

          <div className='flex items-center gap-2'>
            <NavSettings product_id={String(product[0]?.id)} />
            <NavStore />
          </div>
        </div>
      </header>
      <div className='flex flex-1 flex-col gap-8 w-full max-w-2xl mx-auto mt-16 p-4 md:py-8'>
        {!store?.has_suscription && totalRevenue >= 1000000 && (
          <div className='relative overflow-hidden flex flex-col gap-4 w-full p-8 bg-foreground text-background rounded-lg'>
            <div className='flex flex-col md:flex-row justify-between gap-4 md:gap-8'>
              <div className='relative z-10 flex flex-col gap-2'>
                <h2 className='text-lg font-semibold'>Total Revenue</h2>
                {/* <div className='flex flex-col md:flex-row md:items-center gap-2'>
                <p className='text-sm text-muted-foreground'>The free plan allows you to recover up to</p>
                <div className='flex items-center gap-1'>
                  <Satoshi className='w-4 h-4' />
                  <p className='text-sm'>{formatBigNumbers(LIMIT_SALES_FREE)}</p>
                </div>
                <p className='hidden md:flex text-sm text-muted-foreground'>sales.</p>
              </div> */}
              </div>
              {/* {orderPaids?.length < LIMIT_SALES_FREE && (
          )} */}
              <Button variant='secondary' size='sm' asChild>
                <Link href={`/checkout/${CHECKOUT_PRODUCT_HASH}`}>Update to Pro</Link>
              </Button>
            </div>
            <div className='relative w-full h-full'>
              {totalRevenue === LIMIT_SALES_FREE && (
                <div className='absolute z-10 top-0 left-0 flex justify-center items-center w-full h-full'>
                  <Button className='w-full' variant='ghost' size='lg' disabled={true}>
                    Upgrade <Badge variant='secondary'>Soon</Badge>
                  </Button>
                </div>
              )}
              <div
                className={`relative flex flex-col gap-2 ${totalRevenue === LIMIT_SALES_FREE && 'select-none blur-[32px]'}`}
              >
                <Progress value={(totalRevenue * 100) / LIMIT_SALES_FREE} />
                <div className='flex justify-between w-full'>
                  <div>
                    <h3 className='text-sm'>Revenue</h3>
                    <div className='flex items-center gap-1'>
                      <Satoshi className='w-4 h-4 md:w-6 md:h-6' />
                      <p className='md:text-2xl font-bold'>{formatBigNumbers(totalRevenue)}</p>
                    </div>
                  </div>
                  <div className='text-end'>
                    <h3 className='text-sm'>Limit</h3>
                    <div className='flex items-center gap-1'>
                      <Satoshi className='w-4 h-4 md:w-6 md:h-6' />
                      <p className='md:text-2xl font-bold'>{formatBigNumbers(LIMIT_SALES_FREE)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className='grid gap-4 md:grid-cols-2'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between pb-2'>
              <CardTitle className='text-sm font-medium'>Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex items-center gap-1'>
                <Satoshi className='w-6 h-6' />
                <div className='text-2xl font-bold'>{formatBigNumbers(totalRevenue)}</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Orders</CardTitle>
              <ReceiptText className='w-6 h-6 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{countOrders}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Customers</CardTitle>
              <Contact className='w-6 h-6 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{countCustomers}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Sales</CardTitle>
              <BadgeDollarSign className='w-6 h-6 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{countSales.toFixed(2)} %</div>
            </CardContent>
          </Card>
        </div>
        <ProductSection store_id={store?.id || ''} />
        <CustomerSection data={customer} />
        <SaleSection data={order?.filter((order) => order.paid === true)} />
        {/* <div className='min-h-[100vh] flex-1 rounded-xl bg-white/50 md:min-h-min' /> */}
      </div>
    </>
  );
}
