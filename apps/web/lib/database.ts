import { init } from '@instantdb/react';
import 'dotenv/config';

const APP_ID = process.env.INSTANTDB_KEY;

export const db = init({ appId: String(APP_ID) });
