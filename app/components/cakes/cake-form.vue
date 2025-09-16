<script setup lang="ts">
import type { Cake } from '~~/server/lib/zod-schema';

const props = defineProps<{
  cake: Cake;
}>();
const emit = defineEmits<{
  (e: 'showModal'): void;
  (e: 'submit', formData: Cake): void;
}>();
const imageUrl = ref<string | null>(null);
const imageFile = ref<File | null>(null);

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

function handleSubmit() {
  // Ensure user_id is set before emitting
  emit('submit', { ...localCake.value });
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
            v-model="localCake.cake_name"
            type="text"
            placeholder="Cake Name"
            class="input w-full"
          >

          <fieldset class="fieldset">
            <legend class="fieldset-legend capitalize">
              cake description
            </legend>
            <textarea
              v-model="localCake.cake_description"
              class="textarea h-24 w-full"
              placeholder="Bio"
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
            >
            <input
              v-model="localCake.cake_category"
              type="text"
              placeholder="Category"
              class="input"
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
