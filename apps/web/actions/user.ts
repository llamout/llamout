'use server';

import { id } from '@instantdb/core';

import { db } from '@/config/instantdb';

export async function addUser({
  email = null,
  pubkey = null,
}: {
  email?: string | null;
  pubkey?: string | null;
}): Promise<{ error: any; data: any }> {
  // TO-DO
  // Validate
  if (!email && !pubkey) {
    // return {}
  }

  // Find if exist
  const query = {
    user: {
      $: {
        where: {
          email: email ?? '',
          pubkey: pubkey ?? '',
        },
      },
    },
  };

  const { user } = await db.query(query);

  if (user && user.length > 0) {
    // @ts-ignore
    return { error: null, data: user[0]?.id };
  }

  // If not exist, create
  const newId = id();

  await db.transact(
    // @ts-ignore
    db.tx.customer[newId].update({
      // Data
      email: email ?? null,
      pubkey: pubkey ?? null,

      // Status
      created_at: Date.now(),
    }),
  );

  return { error: null, data: newId };
}

export async function getUser(id: string): Promise<{ error: any; data: any }> {
  if (!id) {
    return { error: 'ID required', data: null };
  }

  // Find if exist
  const query = {
    user: {
      $: {
        where: {
          id,
        },
      },
    },
  };

  const { user } = await db.query(query);

  if (!user || user?.length > 0) {
    return { error: 'User no exist', data: null };
  }

  return { error: null, data: user[0]?.id };
}
