'use server';

import { id } from '@instantdb/core';

import { db } from '@/config/instantdb';

export async function addCustomer(props: {
  name: string;
  email: string;
  pubkey: string;
  store_id: string;
}): Promise<string> {
  const { name = null, email = null, pubkey = null, store_id } = props;

  // TO-DO
  if (!store_id) {
    // return {}
  }

  if (!email && !pubkey) {
    // return {}
  }

  // TO-DO
  // Format pubkey

  // Find if customer exist
  const query = {
    customer: {
      $: {
        where: {
          email: email || '',
          pubkey: pubkey || '',
        },
      },
    },
  };

  const { customer } = await db.query(query);

  if (customer && customer.length > 0) {
    // @ts-ignore
    return customer[0]?.id;
  }

  // If not exist, create
  const newId = id();

  await db.transact(
    // @ts-ignore
    db.tx.customer[newId].update({
      store_id,

      // Data
      name,
      email,
      pubkey,

      // Status
      created_at: Date.now(),
    }),
  );

  return newId;
}
