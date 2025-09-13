import { createAuthClient } from 'better-auth/vue';
// stores/auth.ts
import { defineStore } from 'pinia';

const authClient = createAuthClient();

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const isLoggedIn = ref(false);
  const loading = ref(true);

  const initAuth = async () => {
    try {
      loading.value = true;
      const session = await authClient.getSession();

      if (session.data) {
        user.value = session.data.user;
        isLoggedIn.value = true;
      } else {
        user.value = null;
        isLoggedIn.value = false;
      }
    } catch (error) {
      console.error("Auth initialization error:", error);
      user.value = null;
      isLoggedIn.value = false;
    } finally {
      loading.value = false;
    }
  };

  const checkAuth = () => {
    return isLoggedIn.value;
  }

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
    user: readonly(user),
    isLoggedIn: readonly(isLoggedIn),
    loading: readonly(loading),
    initAuth,
    checkAuth,
    signIn,
    signOut,
  };
});
