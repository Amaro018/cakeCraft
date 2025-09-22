export default defineNuxtPlugin(async (nuxtApp) => {
  const auth = useAuthStore();

  await auth.initAuth({
    fetchOptions: {
      headers: nuxtApp.ssrContext?.event.node.req.headers as any, // cast to satisfy type
    },
  });
});
