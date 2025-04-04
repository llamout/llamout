'use client';

import { useParams, useRouter } from 'next/navigation';
import { BadgeDollarSign, Contact, LoaderCircle, ReceiptText } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { db } from '@/lib/database';

import { ProductSection } from '@/components/dashboard/product-section';
import { CustomerSection } from '@/components/dashboard/customer-section';
import { SaleSection } from '@/components/dashboard/sale-section';

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

  const { data: dataStore, isLoading: isLoadingStore } = db.useQuery(queryStore);
  const store = dataStore?.store[0];

  // Get data for dashboard
  const queryDashboard = {
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
    return null;
  }

  if (!isLoadingStore && !store) {
    router.push(`/onboarding`);
    return null;
  }

  if (!store) {
    return (
      <div className='flex min-h-svh items-center justify-center bg-background'>
        <div className='flex flex-col items-center gap-4 max-w-sm text-center'>
          <LoaderCircle className='size-8 animate-spin' />
          <h2 className='text-lg font-bold'>Loading Store</h2>
        </div>
      </div>
    );
  }

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

  const { order, customer } = dataDashboard;

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

  // const hastLimit = !store?.has_suscription && totalRevenue >= 1000000;

  return (
    <>
      {/* <div
        className={`relative overflow-hidden flex gap-4 w-full p-8 bg-foreground text-background rounded-lg ${hastLimit ? 'flex-col items-center' : 'flex-col md:flex-row'}`}
      >
        <div
          className={`flex flex-col md:flex-row justify-between gap-4 md:gap-8 w-full ${hastLimit ? 'items-center' : 'items-start md:items-center'}`}
        >
          <div className='relative z-10 flex flex-col gap-2'>
            <h2 className='text-lg font-semibold'>Total Revenue</h2>
          </div>
          {hastLimit && (
            <Button className='w-full md:w-auto' variant='secondary' size='sm' asChild>
              <Link href={`/checkout/${CHECKOUT_PRODUCT_HASH}`}>Update to Pro</Link>
            </Button>
          )}
        </div>
        <div className={`relative w-full h-full ${hastLimit ? 'bg-transparent' : 'flex md:justify-end'}`}>
          <div className='relative flex flex-col gap-2'>
            {hastLimit && <Progress value={(totalRevenue * 100) / LIMIT_SALES_FREE} />}
            <div className='flex justify-between w-full'>
              <div>
                {hastLimit && <h3 className='text-sm'>Revenue</h3>}
                <div className='flex items-center gap-1'>
                  <Satoshi className='w-4 h-4 md:w-6 md:h-6' />
                  <p className={`font-bold ${hastLimit ? 'md:text-2xl' : 'text-2xl'}`}>
                    {formatBigNumbers(totalRevenue)}
                  </p>
                </div>
              </div>
              {hastLimit && (
                <div className='text-end'>
                  <h3 className='text-sm'>Limit</h3>
                  <div className='flex items-center gap-1'>
                    <Satoshi className='w-4 h-4 md:w-6 md:h-6' />
                    <p className='md:text-2xl font-bold'>{formatBigNumbers(LIMIT_SALES_FREE)}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div> */}

      <div className='grid gap-4 md:grid-cols-3'>
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
    </>
  );
}
