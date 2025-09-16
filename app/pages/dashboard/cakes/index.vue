<script setup lang="ts">
import type { Cake } from '~~/server/lib/zod-schema';

const auth = useAuthStore();
const userId = computed(() => auth.user?.id || '');
const { data: cakes, refresh } = await useFetch('/api/cakes');
const userCakes = computed(() => cakes.value || []);
console.warn('Cake data:', userCakes.value);

const cakeData = ref<Cake>({
  user_id: userId.value,
  cake_name: '',
  cake_description: '',
  cake_price: 0,
  cake_category: '',
  cake_flavor: '',
  cake_size: '',
  cake_topping: '',
  cake_type: '',
  good_for: '',
  cake_image: null,
});

definePageMeta({
  layout: 'dashboard-layout',
  middleware: ['auth'],
});

useHead({
  title: 'Cake Craft Cakes',
});

const isOpen = ref(false);
function openModal() {
  isOpen.value = true;
}

async function handleSubmit(cake: Cake) {
  const payload = new FormData();

  // ensure user_id is attached
  payload.append('user_id', userId.value);

  for (const [key, value] of Object.entries(cake)) {
    if (value !== null && key !== 'cake_image') {
      payload.append(key, value as any);
    }
  }

  if (cake.cake_image instanceof File) {
    payload.append('cake_image', cake.cake_image);
  }

  try {
    const res = await $fetch('/api/cakes', {
      method: 'POST',
      body: payload,
    });
    console.warn('Cake created:', res);
    await refresh(); // refresh list after create
    isOpen.value = false; // close modal
  }
  catch (err) {
    console.error('Upload failed:', err);
  }
}
</script>

<template>
  <div class="p-6 w-full flex flex-col">
    <div class="flex flex-row justify-between">
      <p class="text-2xl font-bold">
        All Cakes
      </p>
      <button class="btn btn-primary" @click="openModal">
        <Icon name="lucide:circle-plus" size="24" />
        Add Cake
      </button>
    </div>
    <!-- You can open the modal using ID.showModal() method -->
    <dialog
      id="my_modal_4"
      class="modal"
      :open="isOpen"
    >
      <div class="modal-box w-11/12 max-w-5xl">
        <CakesCakeForm
          v-model:cake="cakeData"
          @show-modal="isOpen = false"
          @submit="handleSubmit"
        />
      </div>
      <!-- Cake grid -->
    </dialog>
    <div>
      <CakesCakeCard :cakes="userCakes" />
    </div>
  </div>
</template>
