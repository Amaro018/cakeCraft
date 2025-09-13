<script setup lang="ts">
const authStore = useAuthStore();
</script>

<template>
  <div class="navbar bg-base-100 shadow-sm flex justify-between items-center ">
    <NuxtLink to="/" class="btn btn-ghost ">
      <div class="flex items-center">
        <Icon name="game-icons:chef-toque" size="3em" />
        <div class="flex flex-col justify-center items-center">
          <p class="text-xl">
            Cake Craft
          </p>
          <p class="text-xs">
            find the best cake
          </p>
        </div>
      </div>
    </NuxtLink>
    <div class="">
      <ul class="menu menu-horizontal px-1">
        <NuxtLink class="btn btn-ghost" to="/auth/login">
          Start Selling
        </NuxtLink>

        <!-- Show logout if logged in -->

        <button
          v-if="authStore.user"
          class="btn btn-ghost"
          @click="authStore.signOut"
        >
          Sign out
        </button>

        <li>
          <AppThemeToggle />
        </li>
      </ul>
    </div>
  </div>
</template>
