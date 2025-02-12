'use server';

import { id } from '@instantdb/core';

import { db } from '@/config/instantdb';
import { generateHash } from '@/lib/crypto';

interface AddOrder {
  store_id: any;
  customer_id: any;
  product_id: string;
  price_id: string;
  amount: number;
  currency?: string;
  quantity: number;
}

export async function addOrder(props: AddOrder): Promise<string> {
  const { store_id, customer_id, product_id, price_id, amount, currency = 'SAT', quantity } = props;

  // TO-DO
  if (!product_id || !store_id || !price_id) {
    // return {}
  }

  const newId = id();
  const hash = generateHash();

  await db.transact(
    // @ts-ignore
    db.tx.order[newId].update({
      store_id,
      product_id,
      price_id,
      customer_id,

      // Data
      amount: amount ?? null,
      quantity: quantity ?? null,
      currency,
      paid: false,
      hash,

      // Status
      created_at: Date.now(),
      updated_at: Date.now(),
    }),
  );

  return newId;
}

export async function modifyOrder(id: any): Promise<{ error: string | null }> {
  if (!id) return { error: 'ID required' };

  await db.transact(
    // @ts-ignore
    db.tx.order[id].update({
      // Data
      paid: true,

      // Status
      updated_at: Date.now(),
    }),
  );

  return { error: null };
}

export async function getPaidOrders(store_id: string) {
  if (!store_id) return { error: 'Store required' };

  const query = {
    order: {
      $: {
        where: {
          store_id,
          paid: true,
        },
      },
    },
  };

  try {
    const { order } = await db.query(query);

    return { error: null, data: order };
  } catch (error) {
    return { error, data: null };
  }
}
