// import { createAuthClient } from 'better-auth/vue';
// // stores/auth.ts
// import { defineStore } from 'pinia';

// const authClient = createAuthClient();
// interface User {
//   id: string
//   email: string
//   name?: string
//   image?: string | null
//   // add other fields Better Auth returns if needed
// }

// export const useAuthStore = defineStore('auth', () => {
//   const user = ref();
//   const isLoggedIn = ref(false);
//   const loading = ref(true);

//   const initAuth = async () => {
//     try {
//       loading.value = true;
//       const session = await authClient.getSession();

//       if (session.data) {
//         user.value = session.data.user;
//         isLoggedIn.value = true;
//       }
//       else {
//         user.value = null;
//         isLoggedIn.value = false;
//       }
//     }
//     catch (error) {
//       console.error('Auth initialization error:', error);
//       user.value = null;
//       isLoggedIn.value = false;
//     }
//     finally {
//       loading.value = false;
//     }
//   };

//   const checkAuth = () => {
//     return isLoggedIn.value;
//   };

//   // safely expose user and loading

//   async function signIn() {
//     await authClient.signIn.social({
//       provider: 'google',
//       callbackURL: '/dashboard',
//     });
//   }

//   async function signOut() {
//     try {
//       await authClient.signOut();
//       user.value = null;
//       return navigateTo('/auth/login');
//     }
//     catch (error) {
//       console.error('Sign-out failed:', error);
//     }
//   }

//   return {
//     user: readonly(user),
//     isLoggedIn: readonly(isLoggedIn),
//     loading,
//     initAuth,
//     checkAuth,
//     signIn,
//     signOut,
//   };
// });

import { authClient } from '~~/shared/lib/auth-client';
import { defineStore } from 'pinia';

type User = {
  id: string;
  email: string;
  name?: string;
  image?: string | null;
  // add other fields Better Auth returns if needed
};

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    loading: true,
  }),
  getters: {
    isLoggedIn: state => !!state.user,
  },
  actions: {
    async initAuth() {
      this.loading = true;
      try {
        const session = await authClient.getSession();
        this.user = session.data?.user ?? null;
      }
      catch (err) {
        console.error('Error getting session:', err);
        this.user = null;
      }
      finally {
        this.loading = false;
      }
    },

    async signIn() {
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: '/dashboard',
      });
    },

    async signOut() {
      await authClient.signOut();
      this.user = null;
      navigateTo('/');
    },
  },
});
