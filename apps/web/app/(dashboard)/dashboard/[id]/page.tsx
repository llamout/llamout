'use client';

import { useParams, useRouter } from 'next/navigation';
import { BadgeDollarSign, Contact, LoaderCircle, ReceiptText } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Satoshi } from '@workspace/ui/components/icons/satoshi';

import { formatBigNumbers } from '@/lib/number';
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

  const { data: dataStore } = db.useQuery(queryStore);
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

  return (
    <>
      {/* {!store?.has_suscription && totalRevenue >= 1000000 && (
        <div className='relative overflow-hidden flex flex-col gap-4 w-full p-8 bg-foreground text-background rounded-lg'>
          <div className='flex flex-col md:flex-row justify-between gap-4 md:gap-8'>
            <div className='relative z-10 flex flex-col gap-2'>
              <h2 className='text-lg font-semibold'>Total Revenue</h2>
            </div>
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
      )} */}

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
    </>
  );
}
