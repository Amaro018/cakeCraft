<script setup lang="ts">
defineProps<{ cakes: any[] }>();
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
    <div v-for="cake in cakes" :key="cake.id">
      <div class="card card-compact shadow-sm">
        <figure class="relative">
          <img
            :src="`/uploads/${cake.cake_image}`"
            alt="Cake image"
            class="w-full h-48 object-cover"
          >
          <div>
            <span class="badge bg-primary font-bold absolute top-2 right-2">
              {{ cake.cake_category }}
            </span>
          </div>
        </figure>
        <div class="card-body">
          <h2 class="card-title">
            {{ cake.cake_name }}
          </h2>
          <p class="text-sm">
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
              <button class="btn btn-primary">
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
