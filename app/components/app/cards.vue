<script setup lang="ts">
defineProps<{ cakes: any; bakers: any; userCount: any }>();
</script>

<template>
  <div class="flex flex-col justify-center items-center gap-4 md:flex-row">
    <div
      class="card card-dash w-96 backdrop-blur-sm rounded-2xl p-6 text-center border border-amber-100"
    >
      <div class="card-body flex justify-center flex-col items-center">
        <Icon name="simple-icons:cakephp" size="4em" />
        <p class="text-2xl font-bold">
          {{ cakes.data.length }}
        </p>
        <p class="">
          Delicious Cakes
        </p>
      </div>
    </div>
    <div
      class="card card-dash w-96 backdrop-blur-sm rounded-2xl p-6 text-center border border-amber-100"
    >
      <div class="card-body flex justify-center flex-col items-center">
        <Icon name="simple-icons:codechef" size="4em" />
        <p class="text-2xl font-bold">
          {{ bakers.data.length }}
        </p>
        <p class="">
          Talented Bakers
        </p>
      </div>
    </div>
    <div
      class="card card-dash w-96 backdrop-blur-sm rounded-2xl p-6 text-center border border-amber-100"
    >
      <div class="card-body flex justify-center flex-col items-center">
        <Icon name="lucide:users-round" size="4em" />
        <p class="text-2xl font-bold">
          {{ userCount.data }}
        </p>
        <p class="">
          Registered Users
        </p>
      </div>
    </div>
  </div>
</template>
