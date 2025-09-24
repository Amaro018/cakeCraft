<script setup lang="ts">
import type { Cake } from '~~/server/lib/zod-schema';
import type { FetchError } from 'ofetch';

definePageMeta({
  layout: 'dashboard-layout',
});

useHead({
  title: 'Cake Craft Cakes',
});

// const auth = useAuthStore();

const { isMessage, isError, responseMessage, showMessage } = useNotifications();

const { data: cakes, refresh, pending } = await useFetch('/api/cakes');
const userCakes = computed(() => cakes.value || []);
const cakeFormRef = ref();
const editingCake = ref();
const isSubmitting = ref(false);

const cakeData = ref<Cake>({
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

const isOpen = ref(false);

function openCreateModal() {
  editingCake.value = null; // ✅ reset
  isOpen.value = true;
}

function openEditModal(cake: any) {
  editingCake.value = { ...cake }; // clone cake so form won’t mutate directly
  isOpen.value = true;
}
async function handleSubmit(cake: Cake) {
  isSubmitting.value = true;
  const payload = new FormData();
  for (const [key, value] of Object.entries(cake)) {
    if (value !== null && key !== 'cake_image')
      payload.append(key, value as any);
  }
  if (cake.cake_image instanceof File) {
    payload.append('cake_image', cake.cake_image);
  }
  else if (editingCake.value?.cake_image) {
    payload.append('existing_image', editingCake.value.cake_image);
  }

  try {
    if (editingCake.value?.id) {
      const res = await $fetch(`/api/cakes/${editingCake.value.id}`, { method: 'PUT', body: payload });
      showMessage(res.message, false);
    }
    else {
      const res = await $fetch('/api/cakes', { method: 'POST', body: payload });
      showMessage(res.message, false);
    }
    await refresh();
  }
  catch (e) {
    const error = e as FetchError;
    showMessage(error.data.message || 'An unexpected error occurred.', true);
  }
  finally {
    isSubmitting.value = false; // ✅ end loading
  }

  // ✅ Only reset AFTER submitting is finished
  cakeFormRef.value?.resetForm();
  cakeData.value = {
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
  };
  isOpen.value = false;
  editingCake.value = null;
}
</script>

<template>
  <div v-if="pending" class="flex justify-center">
    <span class="loading loading-dots loading-xl" />
  </div>
  <div v-else class="p-6 w-full flex flex-col">
    <div class="flex flex-row justify-between">
      <p class="text-2xl font-bold">
        All Cakes
      </p>
      <button class="btn-gradient px-4 py-2 flex flex-row items-center gap-2 cursor-pointer" @click="openCreateModal">
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
          ref="cakeFormRef"
          v-model:is-submitting="isSubmitting"
          :cake="editingCake || {
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
          }"
          @show-modal="() => {
            isOpen = false;
          }"
          @submit="handleSubmit"
        />
      </div>
      <!-- Cake grid -->
    </dialog>
    <div>
      <CakesCakeCard
        :cakes="userCakes"
        @edit="openEditModal"
      />
    </div>
    <ToastNotif
      :is-message="isMessage"
      :is-error="isError"
      :response-message="responseMessage"
    />
  </div>
</template>
