<script setup lang="ts">
definePageMeta({
  layout: 'dashboard-layout',

});

useHead({
  title: 'Cake Craft Cakes',
});

const isOpen = ref(false);
function openModal() {
  isOpen.value = true;
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
        <CakesCakeForm @show-modal="isOpen = false" />
      </div>
    </dialog>
  </div>
</template>
