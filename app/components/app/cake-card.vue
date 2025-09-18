<script setup lang="ts">
defineProps<{ cakes: any }>();
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
    <div v-for="cake in cakes.data" :key="cake.id">
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
</template>
