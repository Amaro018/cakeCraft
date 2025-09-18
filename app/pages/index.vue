<script setup lang="ts">
const { data: cakes } = await useFetch('/api/cakes');
const { data: bakers } = await useFetch('/api/baker');
console.warn('Cake data:', cakes.value);
</script>

<template>
  <div class="hero max-w-screen p-10  flex flex-col ">
    <div class="hero-content text-center max-w-md">
      <div class="max-w-md mx-auto">
        <div class="flex flex-col">
          <h1 class="text-5xl font-bold">
            Discover Amazing
          </h1>
          <h1 class="text-5xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent block">
            Delicious Cakes
          </h1>
        </div>
        <p class="py-6">
          Connect with talented local bakers and find the perfect cake for any occasion. From birthdays to weddings, we have something special for everyone.
        </p>
        <div class="flex flex-col gap-4 justify-center md:flex-row">
          <button class="btn bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-3 text-lg">
            <Icon name="lucide:search" size="1em" />Browse Cakes
          </button>
          <button class="btn border-amber-300  hover:bg-amber-100 px-8 py-3 text-lg w-full sm:w-auto">
            <Icon name="lucide:chef-hat" size="1em" />Start Selling
          </button>
        </div>
      </div>
    </div>
    <section class="p-10 min-w-full">
      <AppCards :cakes="cakes" :bakers="bakers" />
    </section>
    <div>
      <AppCakeCard :cakes="cakes" />
    </div>
  </div>
</template>
