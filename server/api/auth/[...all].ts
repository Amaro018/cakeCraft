// server/api/auth/[...all].ts
import { auth } from '~~/server/lib/auth';
// your auth setup
export default defineEventHandler((event) => {
  console.warn('[Auth API] Called:', event.node.req.url);

  return auth.handler(toWebRequest(event));
});
