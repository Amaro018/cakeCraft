export default defineNuxtPlugin(async () => {
  const auth = useAuthStore();

  // Wait until session check finishes before route guard triggers
  if (auth.loading) {
    await auth.initAuth();
  }
});
