import { z } from 'zod';

import tryParseEnv from './try-parse-env';

const EnvSchema = z.object({
  NODE_ENV: z.string(),
  DATABASE_URL: z.url(),
  NUXT_SESSION_PASSWORD: z.string().max(32),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  BETTER_AUTH_URL: z.string(),
  CLOUDINARY_CLOUD_NAME: z.string(),
  CLOUDINARY_API_KEY: z.string(),
  CLOUDINARY_API_SECRET: z.string(),
  TURSO_DB_URL: z.string(),
  TURSO_DB_TOKEN: z.string(),
});

export type EnvSchema = z.infer<typeof EnvSchema>;

tryParseEnv(EnvSchema);

// eslint-disable-next-line node/no-process-env
export default EnvSchema.parse(process.env);
