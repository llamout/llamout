'use server';

import { id } from '@instantdb/core';

import { db } from '@/config/instantdb';
import { getOrder } from './order';

interface AddNps {
  order_id: string;
  description: string;
  value: number;
}

export async function addNps(props: AddNps): Promise<{ error: any; data: any; ok?: boolean }> {
  const { order_id = null, description, value } = props;

  // TO-DO
  if (!order_id || order_id === '') {
    return { error: 'Product ID required', data: null };
  }

  // if(value < 0 || value === 0 || value > 5){
  //   return
  // }

  const newId = id();

  try {
    const { data } = await getOrder(order_id);

    if (!data?.product_id) {
      return { error: 'Order no paid', data: null };
    }

    await db.transact(
      // @ts-ignore
      db.tx.nps[newId].update({
        product_id: data?.product_id,

        // Data
        description: description || null,
        value,

        // Status
        created_at: Date.now(),
      }),
    );

    return { error: null, data: newId };
  } catch (error: any) {
    return { error: error?.body?.message, data: null, ok: error?.status !== 400 };
  }
}
