import { init } from '@instantdb/react';

const APP_ID = process.env.INSTANTDB_KEY || process.env.INSTANTDB_APP_ID;

export const db = init({ appId: String(APP_ID) });
