'use server';

import { id } from '@instantdb/core';

import { db } from '@/config/instantdb';

export async function addCustomer(props: {
  name: string;
  email: string;
  pubkey: string;
  store_id: string;
}): Promise<string> {
  const { name = '', email = '', pubkey = '', store_id } = props;

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
    customers: {
      $: {
        where: {
          email: email || '',
          pubkey: pubkey || '',
        },
      },
    },
  };

  const { customers } = await db.query(query);

  if (customers && customers.length > 0) {
    // @ts-ignore
    return customer[0]?.id;
  }

  // If not exist, create
  const newId = id();

  await db.transact(
    // @ts-ignore
    db.tx.customers[newId]
      .update({
        // Data
        name,
        email,
        pubkey,

        // Status
        created_at: Date.now(),
      })
      .link({ store: store_id }),
  );

  return newId;
}
