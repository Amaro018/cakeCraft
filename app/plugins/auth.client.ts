export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore()
  
  // Initialize auth state when app starts
  await authStore.initAuth()
})

