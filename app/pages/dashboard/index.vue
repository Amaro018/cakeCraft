<script setup lang="ts">
const auth = useAuthStore();

useHead({
  title: 'Cake Craft Dashboard',
});

definePageMeta({
  layout: 'dashboard-layout',
});

const { data: cakes } = await useFetch('/api/cakes');
const { data: bakers } = await useFetch('/api/baker');
const baker = computed(() => bakers.value?.data?.[0]);
const cakesData = computed(() => (cakes.value as any)?.data ?? []);
</script>

<template>
  <!-- Page Content -->
  <div class="w-full">
    <client-only>
      <main class="p-4 sm:p-6 lg:p-8 w-full">
        <div v-if="auth.loading" class="flex justify-center">
          <span class="loading loading-dots loading-xl" />
        </div>

        <div v-else class="flex flex-col gap-6">
          <!-- Stat Cards -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="bg-base-100 shadow-md rounded-xl p-6 flex items-center justify-center flex-col">
              <div class="text-sm text-gray-500">
                Total Cakes
              </div>
              <div class="flex items-center gap-2 text-2xl font-bold mt-2">
                {{ cakesData.length }}
                <Icon name="lucide:cake-slice" size="24" />
              </div>
            </div>

            <div class="bg-base-100 shadow-md rounded-xl p-6">
              <div class="text-lg font-bold flex items-center gap-2 mb-4">
                <Icon name="lucide:chef-hat" size="20" />
                Baker’s Information
              </div>
              <div class="flex flex-col gap-2 text-sm">
                <p><span class="font-semibold">Name:</span> {{ baker?.baker_name }}</p>
                <p><span class="font-semibold">Address:</span> {{ baker?.baker_address }}</p>
                <p><span class="font-semibold">Description:</span> {{ baker?.baker_description }}</p>
                <p>
                  <span class="font-semibold">Messenger:</span>
                  <a
                    :href="baker?.baker_messenger_link"
                    target="_blank"
                    class="link link-primary"
                  >
                    {{ baker?.baker_messenger_link }}
                  </a>
                </p>
              </div>
            </div>
          </div>

          <!-- Recent Cakes Table -->
          <div class="bg-base-100 shadow-md rounded-xl p-6">
            <h2 class="text-lg font-bold mb-4 flex items-center gap-2">
              <Icon name="lucide:clock" size="20" />
              Recent Added Cakes
            </h2>
            <div class="overflow-x-auto">
              <table class="table w-full text-sm">
                <thead>
                  <tr class="text-left">
                    <th class="p-2">
                      Cake ID
                    </th>
                    <th class="p-2">
                      Name
                    </th>
                    <th class="p-2">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(cake, index) in cakesData"
                    :key="index"
                    class="hover:bg-base-200"
                  >
                    <td class="p-2">
                      {{ cake.id }}
                    </td>
                    <td class="p-2">
                      {{ cake.cake_name }}
                    </td>
                    <td class="p-2 font-medium">
                      ₱{{ cake.cake_price }}
                    </td>
                  </tr>
                  <tr v-if="cakesData.length === 0">
                    <td colspan="3" class="p-4 text-center text-gray-500">
                      No cakes added yet.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </client-only>
  </div>
</template>
