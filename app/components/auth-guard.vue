<!-- components/AuthGuard.vue -->
<script setup>
const authStore = useAuthStore();

// Redirect if not authenticated and not loading
watch(() => [authStore.loading, authStore.isLoggedIn], ([loading, isLoggedIn]) => {
  if (!loading && !isLoggedIn) {
    navigateTo('/auth/login');
  }
});
</script>

<template>
  <div v-if="!authStore.loading && authStore.isLoggedIn">
    <slot />
  </div>
  <div v-else-if="authStore.loading" class="loading-spinner">
    <!-- Your loading spinner here -->
    Loading...
  </div>
</template>
