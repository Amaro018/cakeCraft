<script setup lang="ts">
const authStore = useAuthStore();
</script>

<template>
  <!-- Sidebar Drawer -->
  <div class="drawer-side">
    <label for="my-drawer" class="drawer-overlay" />
    <aside class="menu p-4 w-64 bg-base-200 min-h-full">
      <div class="flex flex-row items-center my-6 gap-2">
        <Icon name="game-icons:chef-toque" size="2em" />
        <h2 class="text-xl font-bold">
          CakeCraft
        </h2>
      </div>
      <ul class="menu">
        <li>Hello, {{ authStore.user?.name }}</li>
        <li>
          <NuxtLink to="/dashboard" class="active">
            Dashboard
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/dashboard/cakes">
            Cakes
          </NuxtLink>
        </li>
        <li>
          <button @click="authStore.signOut">
            Logout
          </button>
        </li>
      </ul>
    </aside>
  </div>
</template>
