const authStore = useAuthStore();

// middleware/auth.global.ts
export default defineNuxtRouteMiddleware(async () => {
  const session = await authStore.session;

  if (!session) {
    return navigateTo('/');
  }
});
