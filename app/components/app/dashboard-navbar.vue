<script setup lang="ts">
const authStore = useAuthStore();
</script>

<template>
  <!-- Navbar -->
  <div class="navbar bg-base-100 shadow-md px-4">
    <div class="flex-none lg:hidden">
      <label for="my-drawer" class="btn btn-square btn-ghost">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </label>
    </div>
    <div class="flex-1">
      <a class="text-xl font-bold"> sample</a>
    </div>
    <div class="flex-none">
      <button class="btn btn-ghost btn-circle">
        <div class="indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 17h5l-1.405-1.405M19 13a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </button>
    </div>
  </div>
</template>
