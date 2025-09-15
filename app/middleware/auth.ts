// middleware/auth.global.ts
export default defineNuxtRouteMiddleware(async () => {
  const authStore = useAuthStore();

  if (authStore.loading) {
    return;
  }

  if (!authStore.checkAuth()) {
    return navigateTo('/auth/login');
  }
});
