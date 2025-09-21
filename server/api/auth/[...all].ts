// server/api/auth/[...all].ts
import { auth } from '~~/server/lib/auth';
// your auth setup
export default defineEventHandler((event) => {
  return auth.handler(toWebRequest(event));
});
