'use server';

import { id } from '@instantdb/core';

import { db } from '@/config/instantdb';
import { generateHash } from '@/lib/crypto';

export async function addProduct(props: {
  store_id: string;
  image: string;
  name: string;
  description: string;
  price: number;
  currency?: string;
}): Promise<string> {
  const { store_id, image, name, description, price, currency } = props;

  // If not exist, create
  const newId = id();
  const hash = generateHash();

  await db.transact(
    // @ts-ignore
    db.tx.product[newId].update({
      store_id,

      // Data
      image: image ?? null,
      name: name ?? null,
      description: description ?? null,
      price: price ?? null,
      currency: currency ?? 'SAT',
      hash,

      // Status
      created_at: Date.now(),
      updated_at: Date.now(),
      status: 'active',
    }),
  );

  return newId;
}

export async function getProduct(hash: string): Promise<{ error: any; data: any }> {
  const queryProduct = {
    product: {
      $: {
        limit: 1,
        where: {
          hash,
        },
      },
    },
  };

  try {
    const { product } = await db.query(queryProduct);

    if (product?.length === 0) {
      return { error: 'There is no product', data: null };
    }

    const queryStore = {
      store: {
        $: {
          limit: 1,
          where: {
            id: product[0]?.store_id,
          },
        },
      },
    };

    const { store } = await db.query(queryStore);

    return { error: null, data: { product: product[0], store: store[0] } };
  } catch (error) {
    return { error, data: null };
  }
}
