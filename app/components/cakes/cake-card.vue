<script setup lang="ts">
defineProps<{ cakes: any }>();
defineEmits(['edit', 'delete']);
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
    <div v-for="cake in cakes.data" :key="cake.id">
      <div class="card card-compact shadow-sm">
        <figure class="relative">
          <img
            :src="cake.cake_image"
            alt="Cake image"
            class="w-full h-48 object-cover"
          >
          <div>
            <span class="btn-gradient px-4 text-xs absolute top-2 right-2">
              {{ cake.cake_category }}
            </span>
          </div>
        </figure>
        <div class="card-body">
          <h2 class="card-title">
            {{ cake.cake_name }}
          </h2>
          <p class="text-sm line-clamp-2">
            {{ cake.cake_description }}
          </p>
          <div class="flex flex-row justify-between">
            <p>
              Flavor : {{ cake.cake_flavor }}
            </p>
            <p>
              Size : {{ cake.cake_size }}
            </p>
            <p>
              Topping : {{ cake.cake_topping }}
            </p>
          </div>
          <div class="flex flex-row items-center gap-2">
            <Icon name="lucide:users" size="1em" />
            <p>
              Serves : {{ cake.good_for }}
            </p>
          </div>
          <div class="flex flex-row justify-between">
            <div class="flex flex-row items-center gap-2">
              <p class="text-2xl font-bold">
                {{ cake.cake_price }} Pesos
              </p>
            </div>
            <div>
              <button class="btn-gradient px-4 py-2 flex flex-row items-center gap-2 cursor-pointer" @click="$emit('edit', cake)">
                Edit
              </button>
              <!-- <button
                class="btn px-4 py-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-lg"
                @click="$emit('delete', cake)"
              >
                Delete
              </button> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
