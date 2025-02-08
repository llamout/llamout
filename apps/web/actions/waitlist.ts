'use server';

import { id } from '@instantdb/core';

import { db } from '@/config/instantdb';

import { sendEmail } from './email';

export async function addWaitlist(props: {
  email: string;
  pubkey: string;
}): Promise<{ error: any | null; data: any | null }> {
  const { email, pubkey } = props;

  if (!email && !pubkey) {
    return { error: 'Oops...', data: null };
  }

  try {
    // Find if customer exist
    const query = {
      waitlist: {
        $: {
          where: {
            email: email ?? null,
            pubkey: pubkey ?? null,
          },
        },
      },
    };

    // @ts-ignore
    const { waitlist } = await db.query(query);

    if (waitlist && waitlist.length > 0) {
      return { error: null, data: waitlist[0]?.id };
    }

    // If not exist, create
    const newId = id();

    await db.transact(
      // @ts-ignore
      db?.tx?.waitlist[newId].update({
        email: email ?? null,
        pubkey: pubkey ?? null,
        created_at: Date.now(),
      }),
    );

    if (email) {
      await sendEmail({ email });
    }

    return { error: null, data: newId };
  } catch (error) {
    return { error: error, data: null };
  }
}

export async function validateWaitlist({ email }: { email: string }): Promise<{ error: any | null; data: any | null }> {
  // Find if customer exist
  const query = {
    waitlist: {
      $: {
        where: {
          email,
        },
      },
    },
  };

  try {
    const { waitlist } = await db.query(query);

    if (waitlist && waitlist.length > 0) {
      return { error: null, data: waitlist[0]?.id };
    }

    return { error: 'Oops', data: null };
  } catch (error) {
    return { error: error, data: null };
  }
}
