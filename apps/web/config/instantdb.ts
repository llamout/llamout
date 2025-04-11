import { init } from '@instantdb/admin';

import schema from '../instant.schema';

const APP_ID = process.env.INSTANTDB_APP_ID || '';
const ADMIN_ID = process.env.INSTANTDB_ADMIN_ID || '';

// Initialize the database
export const db = init({
  appId: APP_ID,
  adminToken: ADMIN_ID,
  schema,
});
