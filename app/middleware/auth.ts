// middleware/auth.global.ts
export default defineNuxtRouteMiddleware(async () => {
  const auth = useAuthStore();
  if (!auth.isLoggedIn && !auth.loading && !auth.user) {
    return navigateTo('/auth/login');
  }
});
