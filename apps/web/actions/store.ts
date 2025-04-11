'use server';

import { id } from '@instantdb/core';

import { db } from '@/config/instantdb';

import { normalizeUrl } from '@/lib/utils';
import { generateHash } from '@/lib/crypto';

export async function addStore(props: {
  user_id: string;
  image: string;
  name: string;
  website: string;
  lnaddress: string;
}): Promise<any> {
  const { user_id, image, name, website, lnaddress } = props;

  // If not exist, create
  const newId = id();
  const hash = generateHash();

  try {
    await db.transact(
      // @ts-ignore
      db.tx.stores[newId]
        .update({
          has_subscription: false,
          api_key: hash,
          // Data
          image: image ?? null,
          name,
          website: normalizeUrl(website) ?? null,
          lnaddress,

          // Status
          created_at: Date.now(),
          updated_at: Date.now(),
          status: 'active',
        })
        .link({ $user: user_id }),
    );

    return newId;
  } catch (error) {
    return error;
  }
}

// export async function getStore({ user_id }: { user_id: string }): Promise<{ error: any; data: any }> {
//   // TO-DO
//   if (!user_id) {
//     return { error: 'User required', data: null };
//   }

//   const queryStore = {
//     store: {
//       $: {
//         limit: 1,
//         where: {
//           id: user_id,
//         },
//       },
//     },
//   };

//   try {
//     const { store } = await db.query(queryStore);

//     return { error: null, data: store };
//   } catch (error) {
//     return { error, data: null };
//   }
// }

// export async function updateStore({
//   store_id,
//   user_id,
//   image,
//   name,
//   website,
//   lnaddress,
// }: {
//   store_id: string;
//   user_id: string;
//   image: string;
//   name: string;
//   website: string;
//   lnaddress: string;
// }): Promise<{ error: any; data?: any }> {
//   // Validations
//   if (!store_id) return { error: 'Store required' };
//   if (!user_id) return { error: 'User required' };

//   await db.transact(
//     // @ts-ignore
//     db.tx.store[store_id].update({
//       // Data
//       image,
//       name,
//       website: normalizeUrl(website) ?? null,
//       lnaddress,

//       // Status
//       updated_at: Date.now(),
//     }),
//   );

//   return { error: null };
// }
