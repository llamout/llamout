'use server';

import { id } from '@instantdb/core';

import { db } from '@/config/instantdb';

interface AddCheckout {
  product_id: string;
  success_url: string;
}

export async function addCheckout(props: AddCheckout): Promise<{ error: any; data: any; ok?: boolean }> {
  const { product_id = '', success_url } = props;

  // TO-DO
  if (!product_id || product_id === '') {
    return { error: 'Product required', data: null };
  }

  // if(value < 0 || value === 0 || value > 5){
  //   return
  // }

  const query = {
    checkout: {
      $: {
        where: {
          product_id,
        },
      },
    },
  };

  const newId = id();

  try {
    // Validate if exist nps with order_hash
    const { checkout } = await db.query(query);

    if (checkout && checkout?.length > 0) {
      return { error: '', data: checkout[0]?.id };
    }

    await db.transact(
      // @ts-ignore
      db.tx.checkout[newId].update({
        product_id,

        // Data
        success_url: `https://${success_url}`,

        // Status
        created_at: Date.now(),
        updated_at: Date.now(),
      }),
    );

    return { error: null, data: newId };
  } catch (error: any) {
    return { error: error?.body?.message, data: null };
  }
}
