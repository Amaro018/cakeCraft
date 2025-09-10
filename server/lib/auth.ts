// server/lib/auth.ts (or wherever your config resides)

import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

import db from '../db';
import { account, session, user, verification } from '../db/schema/auth-schema'; // Import your Drizzle schema
import env from '../lib/env';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'mysql',
    schema: {
      user,
      session,
      account,
      verification,
    },
  }),
  emailAndPassword: { enabled: true },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID!,
      clientSecret: env.GOOGLE_CLIENT_SECRET!,
    },
  },
});
