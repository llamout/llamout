'use server';

import { id } from '@instantdb/core';

import { db } from '@/config/instantdb';

interface AddOrder {
  customer_id: any;
  product_id: string;
  amount: number;
  currency: string;
  quantity: number;
}

export async function addOrder(props: AddOrder): Promise<string> {
  const { customer_id, product_id, amount, currency, quantity } = props;

  if (!product_id) {
    // return {}
  }

  const newId = id();

  await db.transact(
    // @ts-ignore
    db.tx.order[newId].update({
      customer_id,
      product_id,

      // Data
      amount: amount ?? null,
      quantity: quantity ?? null,
      currency: currency ?? null,
      paid: false,

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
