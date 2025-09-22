import { authClient } from '~~/shared/lib/auth-client';
import { defineStore } from 'pinia';

type User = {
  id: string;
  email: string;
  name?: string;
  image?: string | null;
};
type GetSessionOptions = {
  fetchOptions?: {
    headers?: HeadersInit;
  };
};
export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const loading = ref(true);

  const isLoggedIn = computed(() => !!user.value);

  const initAuth = async (opts?: GetSessionOptions) => {
    loading.value = true;
    try {
      const session = await authClient.getSession(opts);
      user.value = session.data?.user ?? null;
      console.warn('Session result', session.data);
    }
    catch (err) {
      console.error('Error getting session:', err);
      user.value = null;
    }
    finally {
      loading.value = false;
    }
  };
  const signIn = async () => {
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: '/dashboard',
    });
    await initAuth();
  };

  const signOut = async () => {
    try {
      await authClient.signOut();
      user.value = null;
      navigateTo('/auth/login');
    }
    catch (err) {
      console.error('Error signing out:', err);
    }
  };

  return {
    user,
    loading,
    isLoggedIn,
    initAuth,
    signIn,
    signOut,
  };
});
