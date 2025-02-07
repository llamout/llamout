'use client';

import { init } from '@instantdb/react';
import { BadgeDollarSign, Contact, ReceiptText } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Satoshi } from '@workspace/ui/components/icons/satoshi';

import { formatBigNumbers } from '@/lib/number';

import { ProductSection } from '@/components/dashboard/product-section';
import { CustomerSection } from '@/components/dashboard/customer-section';
import { SaleSection } from '@/components/dashboard/sale-section';

const APP_ID = process.env.INSTANTDB_KEY || '';
const db = init({ appId: APP_ID });

export default function Page() {
  const query = { order: {}, customer: {} };

  const { isLoading, error, data } = db.useQuery(query);

  console.log('data', data);

  if (error || !data) {
    return <>Oops, {error}</>;
  }

  const { order, customer } = data;

  function calculateTotalRevenue(orders: any[]) {
    let total = 0;

    for (let i = 0; i < orders.length; i++) {
      total += orders[i]?.amount;
    }

    return total;
  }

  const orderPaids = order?.filter((order) => order.paid === true);
  const totalRevenue = calculateTotalRevenue(orderPaids);
  const countCustomers = customer?.length;
  const countOrders = order?.length;
  const countSales = (orderPaids?.length * 100) / order?.length;

  return (
    <>
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
      <ProductSection />
      <CustomerSection />
      <SaleSection />
      <div className='min-h-[100vh] flex-1 rounded-xl bg-white/50 md:min-h-min' />
    </>
  );
}
