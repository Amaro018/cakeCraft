import { defineConfig } from 'drizzle-kit';

import env from './server/lib/env';

export default defineConfig({
  schema: './server/db/schema',
  out: './server/db/migrations',
  dialect: 'turso',
  dbCredentials: {
    url: env.TURSO_DB_URL,
    authToken: env.TURSO_DB_TOKEN,
  },
});
