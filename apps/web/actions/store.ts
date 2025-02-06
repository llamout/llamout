'use server';

import { id } from '@instantdb/core';

import { db } from '@/config/instantdb';

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
      website: website ?? null,
      lnaddress: lnaddress ?? null,

      success_url: '',
      submit_type: '',

      // Status
      created_at: Date.now(),
      updated_at: Date.now(),
      status: 'active',
    }),
  );

  return newId;
}
