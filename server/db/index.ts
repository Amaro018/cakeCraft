import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';

import env from '../lib/env'; // Adjust path if needed

const db = drizzle(
  createClient({
    url: env.TURSO_DB_URL,
    authToken: env.TURSO_DB_TOKEN,
  }),
);

export default db;
