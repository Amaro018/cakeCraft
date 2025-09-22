export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore();

  // If session is still loading, do nothing yet
  if (auth.loading)
    return;

  const publicPages = ['/', '/auth/login', '/auth/register'];

  if (!auth.isLoggedIn && !publicPages.includes(to.path)) {
    return navigateTo('/auth/login');
  }

  if (auth.isLoggedIn && to.path === '/auth/login') {
    return navigateTo('/dashboard');
  }
});
