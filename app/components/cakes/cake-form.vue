<script setup lang="ts">
import type { Cake } from '~~/server/lib/zod-schema';

const props = defineProps<{
  cake: Cake;
}>();
const emit = defineEmits<{
  (e: 'showModal'): void;
  (e: 'submit', formData: Cake): void;
}>();

defineExpose({ resetForm });

const imageUrl = ref<string | null>(null);
const imageFile = ref<File | null>(null);
const fileInputRef = ref<HTMLInputElement | null>(null);

const localCake = ref(props.cake);

watch(() => props.cake, (newVal) => {
  localCake.value = newVal;
});

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file) {
    imageFile.value = file;
    imageUrl.value = URL.createObjectURL(file); // generate a local preview URL
    localCake.value.cake_image = file;
  }
  else {
    imageUrl.value = null;
  }
}

function resetForm() {
  imageUrl.value = null;
  imageFile.value = null;
  localCake.value = {
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
  } as Cake;

  // 👇 reset actual input field text
  if (fileInputRef.value) {
    fileInputRef.value.value = '';
  }
}

function handleSubmit() {
  // Ensure user_id is set before emitting
  emit('submit', { ...localCake.value });
}

watch(() => props.cake, (newVal) => {
  localCake.value = { ...newVal };

  // if editing existing cake with image
  if (newVal.cake_image && typeof newVal.cake_image === 'string') {
    imageUrl.value = `/uploads/${newVal.cake_image}`;
  }
  else {
    imageUrl.value = null;
  }
});
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
            v-model="localCake.cake_name"
            type="text"
            placeholder="Cake Name"
            class="input w-full"
            required
          >

          <fieldset class="fieldset">
            <legend class="fieldset-legend capitalize">
              cake description
            </legend>
            <textarea
              v-model="localCake.cake_description"
              class="textarea h-24 w-full"
              placeholder="Cake Description (Optional) max 250 characters"
              maxlength="250"
            />
            <div class="label">
              Optional
            </div>
          </fieldset>

          <div class="flex flex-row gap-4">
            <input
              v-model="localCake.cake_price"
              type="number"
              placeholder="Price"
              class="input"
              required
            >
            <input
              v-model="localCake.cake_category"
              type="text"
              placeholder="Category"
              class="input"
              required
            >
            <input
              v-model="localCake.cake_flavor"
              type="text"
              placeholder="Flavor"
              class="input"
            >
          </div>
          <div class="flex flex-row gap-4">
            <input
              v-model="localCake.cake_size"
              type="text"
              placeholder="Size"
              class="input"
            >
            <input
              v-model="localCake.cake_topping"
              type="text"
              placeholder="Topping"
              class="input"
            >
            <input
              v-model="localCake.cake_type"
              type="text"
              placeholder="Type"
              class="input"
            >
          </div>
          <div class="flex flex-row gap-4">
            <input
              v-model="localCake.good_for"
              type="text"
              placeholder="Good For"
              class="input"
            >

            <input
              ref="fileInputRef"
              type="file"
              accept="image/*"
              class="file-input file-input-primary w-full"
              required
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
          <button
            class="btn"
            type="button"
            @click="emit('showModal')"
          >
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
