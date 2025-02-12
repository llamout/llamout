'use client';

import { useParams } from 'next/navigation';
import { BadgeDollarSign, Contact, LoaderCircle, ReceiptText } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Satoshi } from '@workspace/ui/components/icons/satoshi';
import { Progress } from '@workspace/ui/components/progress';
import { Button } from '@workspace/ui/components/button';
import { Badge } from '@workspace/ui/components/badge';

import { formatBigNumbers } from '@/lib/number';
import { db } from '@/lib/database';
import { LIMIT_SALES_FREE } from '@/config/system';

import { ProductSection } from '@/components/dashboard/product-section';
import { CustomerSection } from '@/components/dashboard/customer-section';
import { SaleSection } from '@/components/dashboard/sale-section';

export default function Page() {
  const params = useParams<{ id: string }>();

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

  if (!user) {
    return (
      <div className='flex min-h-svh items-center justify-center bg-background'>
        <div className='flex flex-col items-center gap-4 max-w-sm text-center'>
          <LoaderCircle className='size-8 animate-spin' />
          <h2 className='text-lg font-bold'>Loading User</h2>
        </div>
      </div>
    );
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
      <div className='relative overflow-hidden flex flex-col gap-4 w-full p-8 bg-foreground text-background rounded-lg'>
        <div className='flex flex-col md:flex-row justify-between gap-4 md:gap-8'>
          <div className='relative z-10 flex flex-col gap-2'>
            <h2 className='text-lg font-semibold'>Total Sales</h2>
            <p className='text-sm text-muted-foreground'>
              You are using the free plan, which allows you to make up to {LIMIT_SALES_FREE} sales.
            </p>
          </div>
          {/* {orderPaids?.length < LIMIT_SALES_FREE && (
            <Button variant='secondary' size='sm' asChild>
              <Link
                href={`http://localhost:3000/checkout/1662cb1a7cbe920d9124b5afa3356163af6d1def89a2bec6b86fdd2cb805fa9d?email=${user?.email}`}
              >
                Upgrade
              </Link>
            </Button>
          )} */}
        </div>
        <div className='relative w-full h-full'>
          {orderPaids?.length === LIMIT_SALES_FREE && (
            <div className='absolute z-10 top-0 left-0 flex justify-center items-center w-full h-full'>
              <Button className='w-full' variant='secondary' size='lg' disabled={true}>
                Upgrade <Badge>Soon</Badge>
              </Button>
            </div>
          )}
          <div
            className={`relative flex flex-col gap-2 ${orderPaids?.length === LIMIT_SALES_FREE && 'select-none blur-[32px]'}`}
          >
            <Progress value={(orderPaids?.length * 100) / LIMIT_SALES_FREE} />
            <div className='flex justify-between w-full'>
              <div>
                <h3 className='text-sm'>Sold out</h3>
                <p className='text-2xl font-bold'>{orderPaids?.length}</p>
              </div>
              <div className='text-end'>
                <h3 className='text-sm'>Limit</h3>
                <p className='text-2xl font-bold'>{LIMIT_SALES_FREE}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

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
