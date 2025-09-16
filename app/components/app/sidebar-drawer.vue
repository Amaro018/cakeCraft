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
        <li>
          <div class="flex flex-row items-center gap-2">
            <Icon name="lucide:layout-dashboard" size="1em" />
            <NuxtLink to="/dashboard" class="active">
              Dashboard
            </NuxtLink>
          </div>
        </li>
        <li>
          <div class="flex flex-row items-center gap-2">
            <Icon name="lucide:cake" size="1em" />
            <NuxtLink to="/dashboard/cakes">
              Cakes
            </NuxtLink>
          </div>
        </li>
        <li>
          <div class="flex flex-row items-center gap-2">
            <Icon name="lucide:chef-hat" size="1em" />
            <NuxtLink to="/dashboard/baker">
              Bakers Info
            </NuxtLink>
          </div>
        </li>
        <li>
          <button @click="authStore.signOut">
            <div class="flex flex-row items-center gap-2">
              <Icon
                name="lucide:log-out"
                size="1em"
                class="transform rotate-180"
              />
              <p>
                Logout
              </p>
            </div>
          </button>
        </li>
      </ul>
    </aside>
  </div>
</template>
