<script setup lang="ts">
import type { FetchError } from 'ofetch';

const auth = useAuthStore();
const { isMessage, isError, responseMessage, showMessage } = useNotifications();

type BakerForm = {
  user_id: string | number;
  baker_name: string;
  baker_description: string | null; // allow null
  baker_address: string;
  baker_messenger_link: string;
};

const formData = ref<BakerForm>({
  user_id: auth.user?.id,
  baker_name: '',
  baker_description: '',
  baker_address: '',
  baker_messenger_link: '',
});

const { data: bakerResponse, refresh } = await useFetch('/api/baker');
const baker = computed(() => bakerResponse.value?.data?.[0] || null);

const isEditing = ref(false);

function startEdit() {
  if (baker.value) {
    isEditing.value = true;
    formData.value = { ...baker.value }; // pre-fill with existing baker
  }
}

async function handleSubmit() {
  try {
    const method = baker.value ? 'PUT' : 'POST';

    const res = await $fetch('/api/baker', {
      method,
      body: formData.value,
    });

    showMessage(res.message, false);
    isEditing.value = false;
    await refresh(); // re-fetch latest data
  }
  catch (e) {
    const error = e as FetchError;
    showMessage(error.data.message || 'An unexpected error occurred.', true);
  }
}
</script>

<template>
  <div class="p-6 w-full flex flex-col justify-center">
    <p class="text-2xl font-bold mb-4">
      Bakers Info
    </p>

    <!-- CASE 1: No baker → Show Create Form -->
    <form
      v-if="!baker"
      class="flex flex-col gap-4"
      @submit.prevent="handleSubmit"
    >
      <input
        v-model="formData.baker_name"
        type="text"
        class="input w-full"
        placeholder="Baker`s Name / Bakery Name"
        required
      >
      <textarea
        v-model="formData.baker_description"
        class="textarea w-full"
        placeholder="Bakers Bio"
      />
      <input
        v-model="formData.baker_address"
        type="text"
        class="input w-full"
        placeholder="Address"
        required
      >
      <input
        v-model="formData.baker_messenger_link"
        type="text"
        class="input w-full"
        placeholder="Messenger Link"
        required
      >
      <label class="text-sm text-gray-500">Provide your messenger link so customers can contact you directly.</label>
      <div>
        <button type="submit" class="btn-gradient px-4 py-2 flex gap-2 items-center">
          <Icon name="lucide:save" size="20" /> Create
        </button>
      </div>
    </form>

    <!-- CASE 2: Baker exists but not editing → Show profile -->
    <div v-else-if="baker && !isEditing" class="flex flex-col gap-4">
      <input
        v-model="baker.baker_name"
        type="text"
        class="input w-full"
        placeholder="Baker`s Name / Bakery Name"
        required
        readonly
      >
      <textarea
        v-model="baker.baker_description"
        class="textarea w-full"
        placeholder="Bakers Bio"
        readonly
      />
      <input
        v-model="baker.baker_address"
        type="text"
        class="input w-full"
        placeholder="Address"
        required
        readonly
      >
      <input
        v-model="baker.baker_messenger_link"
        type="text"
        class="input w-full"
        placeholder="Messenger Link"
        required
        readonly
      >
      <label class="text-sm text-gray-500">Provide your messenger link so customers can contact you directly.</label>
      <div>
        <button class="btn-gradient px-4 py-2 flex gap-2 items-center" @click="startEdit">
          <Icon name="lucide:edit" size="20" /> Edit
        </button>
      </div>
    </div>

    <!-- CASE 3: Baker exists and editing → Show Edit Form -->
    <form
      v-else
      class="flex flex-col gap-4"
      @submit.prevent="handleSubmit"
    >
      <input
        v-model="formData.baker_name"
        type="text"
        class="input w-full"
        placeholder="Baker`s Name / Bakery Name"
        required
      >
      <textarea
        v-model="formData.baker_description"
        class="textarea w-full"
        placeholder="Bakers Bio"
      />
      <input
        v-model="formData.baker_address"
        type="text"
        class="input w-full"
        placeholder="Address"
        required
      >
      <input
        v-model="formData.baker_messenger_link"
        type="text"
        class="input w-full"
        placeholder="Messenger Link"
        required
      >
      <label class="text-sm text-gray-500">Provide your messenger link so customers can contact you directly.</label>

      <div class="flex gap-2">
        <button type="submit" class="btn-gradient px-4 py-2 flex gap-2 items-center">
          <Icon name="lucide:save" size="20" /> Save
        </button>
        <button
          type="button"
          class="btn px-4 py-2"
          @click="isEditing = false"
        >
          Cancel
        </button>
      </div>
    </form>
    <ToastNotif
      :is-message="isMessage"
      :is-error="isError"
      :response-message="responseMessage"
    />
  </div>
</template>
