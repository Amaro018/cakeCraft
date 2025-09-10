// middleware/auth.ts
import { authClient } from '../../server/lib/auth-client';

export default defineNuxtRouteMiddleware(async (to) => {
  // Call Better Auth client to fetch the session
  const session = authClient.useSession();

  if (!session && to.path.startsWith('/dashboard')) {
    return navigateTo('/');
  }
});
