<script setup lang="ts">
const props = defineProps<{ cakes: any }>();
const selectedCategory = ref<string>('all');

const Categories = computed(() => [...new Set(props.cakes?.data.map((c: any) => c.cakes.cake_category))]);

const filteredCakes = computed(() => {
  let filtered = [...(props.cakes?.data ?? [])];

  // Category filter
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(
      cake => cake.cakes.cake_category === selectedCategory.value,
    );
  }

  // // Sorting by price
  // if (sortOrder.value === 'asc') {
  //   filtered.sort(
  //     (a, b) => Number.parseFloat(a.cakes.cake_price) - Number.parseFloat(b.cakes.cake_price),
  //   );
  // }
  // else if (sortOrder.value === 'desc') {
  //   filtered.sort(
  //     (a, b) => Number.parseFloat(b.cakes.cake_price) - Number.parseFloat(a.cakes.cake_price),
  //   );
  // }

  return filtered;
});

// 🔹 Pagination state
const currentPage = ref(1);
const itemsPerPage = 12;
// 🔹 Paginated data
const paginatedCakes = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredCakes.value.slice(start, start + itemsPerPage);
});

const totalPages = computed(() =>
  Math.ceil(filteredCakes.value.length / itemsPerPage),
);

function goToPage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}
</script>

<template>
  <main>
    <div class="flex flex-row justify-end">
      <!-- Category Filter -->
      <select
        v-model="selectedCategory"
        class="select select-bordered"
      >
        <option value="all">
          All Categories
        </option>
        <option
          v-for="(cat, index) in Categories"
          :key="index"
          :value="cat"
        >
          {{ cat }}
        </option>
      </select>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      <div v-for="cake in paginatedCakes" :key="cake.id">
        <div class="card card-compact shadow-sm">
          <figure class="relative">
            <img
              :src="`/uploads/${cake.cakes.cake_image}`"
              alt="Cake image"
              class="w-full h-48 object-cover"
            >
            <div>
              <span class="btn-gradient font-bold absolute top-2 right-2 text-xs px-2">
                {{ cake.cakes.cake_category }}
              </span>
            </div>
          </figure>
          <div class="card-body">
            <h2 class="card-title ">
              {{ cake.baker?.baker_name || 'No Baker' }}
            </h2>
            <p class="text-lg capitalize">
              {{ cake.cakes.cake_name }}
            </p>
            <p class="text-sm">
              {{ cake.cakes.cake_description }}
            </p>
            <div class="flex flex-row justify-between">
              <p>
                Flavor : {{ cake.cakes.cake_flavor }}
              </p>
              <p>
                Size : {{ cake.cakes.cake_size }}
              </p>
              <p>
                Topping : {{ cake.cakes.cake_topping }}
              </p>
            </div>
            <div class="flex flex-row items-center gap-2">
              <Icon name="lucide:users" size="1em" />
              <p>
                Serves : {{ cake.cakes.good_for }}
              </p>
            </div>
            <div class="flex flex-row items-center gap-2">
              <Icon name="lucide:map-pin" size="1em" />
              <p>
                Address : {{ cake.baker?.baker_address || 'No Address' }}
              </p>
            </div>
            <div class="flex flex-row justify-between">
              <div class="flex flex-row items-center gap-2">
                <p class="text-2xl font-bold">
                  {{ cake.cakes.cake_price }} Pesos
                </p>
              </div>
              <div>
                <a
                  v-if="cake.baker?.baker_messenger_link"
                  :href="cake.baker.baker_messenger_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-gradient text-white px-4 py-2 flex flex-row items-center gap-2 cursor-pointer"
                >
                  <Icon name="lucide:message-circle" size="1em" />
                  Message Baker
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Pagination -->
    <div
      v-if="totalPages > 1"
      class="flex justify-center items-center gap-2 mt-6"
    >
      <button
        class="btn btn-sm"
        :disabled="currentPage === 1"
        @click="goToPage(currentPage - 1)"
      >
        Prev
      </button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button
        class="btn btn-sm"
        :disabled="currentPage === totalPages"
        @click="goToPage(currentPage + 1)"
      >
        Next
      </button>
    </div>
  </main>
</template>
