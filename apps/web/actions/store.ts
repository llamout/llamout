'use server';

import { id } from '@instantdb/core';

import { db } from '@/config/instantdb';
import { normalizeUrl } from '@/lib/utils';

export async function addStore(props: {
  user_id: string;
  image: string;
  name: string;
  website: string;
  lnaddress: string;
}): Promise<string> {
  const { user_id, image, name, website, lnaddress } = props;

  // If not exist, create
  const newId = id();

  await db.transact(
    // @ts-ignore
    db.tx.store[newId].update({
      user_id,

      // Data
      image: image ?? null,
      name: name ?? null,
      website: normalizeUrl(website) ?? null,
      lnaddress: lnaddress ?? null,
      has_suscription: false,

      // Status
      created_at: Date.now(),
      updated_at: Date.now(),
      status: 'active',
    }),
  );

  return newId;
}

export async function getStore({ user_id }: { user_id: string }): Promise<{ error: any; data: any }> {
  // TO-DO
  if (!user_id) {
    return { error: 'User required', data: null };
  }

  const queryStore = {
    store: {
      $: {
        limit: 1,
        where: {
          id: user_id,
        },
      },
    },
  };

  try {
    const { store } = await db.query(queryStore);

    return { error: null, data: store };
  } catch (error) {
    return { error, data: null };
  }
}

export async function updateStore({
  store_id,
  user_id,
  image,
  name,
  website,
  lnaddress,
}: {
  store_id: string;
  user_id: string;
  image: string;
  name: string;
  website: string;
  lnaddress: string;
}): Promise<{ error: any; data?: any }> {
  // Validations
  if (!store_id) return { error: 'Store required' };
  if (!user_id) return { error: 'User required' };

  await db.transact(
    // @ts-ignore
    db.tx.store[store_id].update({
      // Data
      image,
      name,
      website: normalizeUrl(website) ?? null,
      lnaddress,

      // Status
      updated_at: Date.now(),
    }),
  );

  return { error: null };
}
