'use server';

import { id } from '@instantdb/core';

import { db } from '@/config/instantdb';
import { generateHash } from '@/lib/crypto';

import { addPrice } from './price';
import { IntervalTypes, TypeTypes } from '@/types';

export async function addProduct(props: {
  store_id: string;
  image: string;
  name: string;
  description: string;
  prices: { price: number; currency: string; interval: IntervalTypes | null; type: TypeTypes }[];
}): Promise<{ error: any; data: any }> {
  const { store_id, image, name, description, prices } = props;

  // If not exist, create
  const newId = id();
  const hash = generateHash();

  try {
    await db.transact(
      // @ts-ignore
      db.tx.product[newId].update({
        store_id,

        // Data
        image: image ?? null,
        name: name ?? null,
        description: description ?? null,
        hash,
        is_subscription: false,

        // Status
        created_at: Date.now(),
        updated_at: Date.now(),
        status: 'active',
      }),
    );

    for (let index = 0; index < prices.length; index++) {
      await addPrice({
        store_id,
        product_id: newId,
        price: Number(prices[index]?.price),
        interval: prices[index]?.interval ?? null,
        type: prices[index]?.type,
      });
    }

    return { error: null, data: newId };
  } catch (error) {
    return { error, data: null };
  }
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

    if (!!product && product?.length === 0) {
      return { error: 'There is no product', data: null };
    }

    const _product = product[0];

    // TO-DO
    if (!_product?.id) {
      return { error: 'Product ID is undefined', data: null };
    }

    const query = {
      price: {
        $: {
          where: {
            product_id: _product?.id,
          },
        },
      },
      store: {
        $: {
          limit: 1,
          where: {
            id: _product?.store_id,
          },
        },
      },
    };

    const { store, price } = await db.query(query);
    const _store = store[0];

    return { error: null, data: { product: { ..._product, price }, store: _store } };
  } catch (error) {
    return { error, data: null };
  }
}
