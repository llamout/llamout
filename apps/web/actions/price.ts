'use server';

import { id } from '@instantdb/core';

import { db } from '@/config/instantdb';

type IntervalTypes = 'day' | 'week' | 'month' | 'year';
type TypeTypes = 'one_time' | 'subscription';

export async function addPrice(props: {
  store_id: string;
  product_id: string;
  name?: string | null;
  description?: string | null;
  price: number;
  currency?: string;
  interval: IntervalTypes | null;
  type: TypeTypes | any;
}): Promise<{ error: any; data: any }> {
  const {
    store_id,
    product_id,
    name = null,
    description = null,
    price,
    currency = 'SAT',
    interval = null,
    type,
  } = props;

  // TO-DO
  if (!store_id || !product_id) {
    return { error: 'Required', data: null };
  }

  // If not exist, create
  const newId = id();

  try {
    await db.transact(
      // @ts-ignore
      db.tx.prices[newId]
        .update({
          // Data
          name,
          description,
          price,
          currency,
          interval,
          type,

          // Status
          created_at: Date.now(),
          updated_at: Date.now(),
          status: 'active',
        })
        .link({ product: product_id }),
    );

    return { error: null, data: newId };
  } catch (error) {
    return { error, data: null };
  }
}
