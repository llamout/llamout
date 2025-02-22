'use server';

import { id } from '@instantdb/core';

import { db } from '@/config/instantdb';
import { getOrder } from './order';

interface AddNps {
  order_hash: string;
  description: string;
  value: number;
}

export async function addNps(props: AddNps): Promise<{ error: any; data: any; ok?: boolean }> {
  const { order_hash = null, description, value } = props;

  // TO-DO
  if (!order_hash || order_hash === '') {
    return { error: 'Order required', data: null };
  }

  // if(value < 0 || value === 0 || value > 5){
  //   return
  // }

  const query = {
    nps: {
      $: {
        where: {
          order_hash,
        },
      },
    },
  };

  const newId = id();

  try {
    // Validate if exist nps with order_hash
    const { nps } = await db.query(query);

    if (nps && nps?.length > 0) {
      return { error: 'We have already recorded your feedback.', data: null };
    }

    // Get order by hash
    const { data } = await getOrder(order_hash);

    if (!data?.product_id) {
      return { error: 'Order no paid', data: null };
    }

    await db.transact(
      // @ts-ignore
      db.tx.nps[newId].update({
        product_id: data?.product_id,
        order_hash,

        // Data
        description: description || null,
        value,

        // Status
        created_at: Date.now(),
      }),
    );

    return { error: null, data: newId };
  } catch (error: any) {
    return { error: error?.body?.message, data: null };
  }
}
