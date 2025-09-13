<script setup lang="ts">
import { authClient } from '~~/shared/lib/auth-client';

const emit = defineEmits<{
  (e: 'showModal'): void;
}>();
const imageUrl = ref<string | null>(null);
const imageFile = ref<File | null>(null);

const session = await authClient.useSession();

// Define the type for your form data
type CakeFormData = {
  user_id: string;
  cake_name: string;
  cake_description: string;
  cake_price: string;
  cake_category: string;
  cake_flavor: string;
  cake_size: string;
  cake_topping: string;
  cake_type: string;
  good_for: string;
  cake_image: File | null; // ✅ File or null
};

const formData = ref<CakeFormData>({
  user_id: session.value.data?.user.id ?? '',
  cake_name: '',
  cake_description: '',
  cake_price: '',
  cake_category: '',
  cake_flavor: '',
  cake_size: '',
  cake_topping: '',
  cake_type: '',
  good_for: '',
  cake_image: null,
});

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file) {
    imageFile.value = file;
    imageUrl.value = URL.createObjectURL(file); // generate a local preview URL
    formData.value.cake_image = file;
  }
  else {
    imageUrl.value = null;
  }
}

async function handleSubmit() {
  const payload = new FormData();

  payload.append('cake_name', formData.value.cake_name);
  payload.append('user_id', formData.value.user_id);
  payload.append('cake_description', formData.value.cake_description);
  payload.append('cake_price', formData.value.cake_price);
  payload.append('cake_category', formData.value.cake_category);
  payload.append('cake_flavor', formData.value.cake_flavor);
  payload.append('cake_size', formData.value.cake_size);
  payload.append('cake_topping', formData.value.cake_topping);
  payload.append('cake_type', formData.value.cake_type);
  payload.append('good_for', formData.value.good_for);

  if (formData.value.cake_image) {
    payload.append('cake_image', formData.value.cake_image); // this is a File
  }
  // console.warn(payload, 'the payload');
  try {
    const res = await $fetch('/api/cakes', {
      method: 'POST',
      body: payload,
    });
    console.warn('Cake created:', res);
  }
  catch (err) {
    console.error('Upload failed:', err);
  }
}
</script>

<template>
  <div class="w-full flex flex-col justify-center gap-2">
    <h3 class="text-lg font-bold">
      Adding New Cake!
    </h3>
    <div class="w-full">
      <form @submit.prevent="handleSubmit">
        <div class="flex flex-col gap-4 w-full justify-center">
          <input
            v-model="formData.cake_name"
            type="text"
            placeholder="Cake Name"
            class="input w-full"
          >

          <fieldset class="fieldset">
            <legend class="fieldset-legend capitalize">
              cake description
            </legend>
            <textarea
              v-model="formData.cake_description"
              class="textarea h-24 w-full"
              placeholder="Bio"
            />
            <div class="label">
              Optional
            </div>
          </fieldset>

          <div class="flex flex-row gap-4">
            <input
              v-model="formData.cake_price"
              type="number"
              placeholder="Price"
              class="input"
            >
            <input
              v-model="formData.cake_category"
              type="text"
              placeholder="Category"
              class="input"
            >
            <input
              v-model="formData.cake_flavor"
              type="text"
              placeholder="Flavor"
              class="input"
            >
          </div>
          <div class="flex flex-row gap-4">
            <input
              v-model="formData.cake_size"
              type="text"
              placeholder="Size"
              class="input"
            >
            <input
              v-model="formData.cake_topping"
              type="text"
              placeholder="Topping"
              class="input"
            >
            <input
              v-model="formData.cake_type"
              type="text"
              placeholder="Type"
              class="input"
            >
          </div>
          <div class="flex flex-row gap-4">
            <input
              v-model="formData.good_for"
              type="text"
              placeholder="Good For"
              class="input"
            >

            <input
              type="file"
              accept="image/*"
              class="file-input file-input-primary w-full"
              @change="handleFileChange"
            >
          </div>

          <div v-if="imageUrl" class="mt-4">
            <p>Preview:</p>
            <img
              :src="imageUrl"
              alt="Cake preview"
              class="w-48 h-48 object-cover rounded"
            >
          </div>
        </div>
        <!-- if there is a button, it will close the modal -->
        <div class="flex flex-row justify-end gap-4 my-4">
          <button class="btn" @click="emit('showModal')">
            Close
          </button>
          <button class="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
