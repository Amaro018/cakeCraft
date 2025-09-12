import { createAuthClient } from 'better-auth/vue';
// stores/auth.ts
import { defineStore } from 'pinia';

const authClient = createAuthClient();

export const useAuthStore = defineStore('auth', () => {
  // session is a reactive object from better-auth
  const session = authClient.getSession();

  // safely expose user and loading

  async function signIn() {
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: '/dashboard',
    });
  }

  async function signOut() {
    await authClient.signOut();
    return navigateTo('/auth/login');
  }

  return {
    session,
    signIn,
    signOut,
  };
});
