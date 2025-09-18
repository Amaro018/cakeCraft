<script setup lang="ts">
import type { FetchError } from 'ofetch';

import { authClient } from '~~/shared/lib/auth-client';
import { ref } from 'vue';

const { isMessage, isError, responseMessage, showMessage } = useNotifications();

useHead({ title: 'Register - Cake Craft' });

const email = ref('');
const password = ref('');
const name = ref('');
const errorMessage = ref('');
const isLoading = ref(false);

async function register() {
  try {
    isLoading.value = true;
    errorMessage.value = '';

    const res = await authClient.signUp.email({
      email: email.value,
      password: password.value,
      name: name.value, // optional, if your schema supports it
    });

    if (res.error) {
      errorMessage.value = res.error.message || 'Something went wrong';
      return;
    }
    showMessage('Successfully signed up', false);
    // redirect after successful signup
    await navigateTo('/dashboard');
  }
  catch (err: any) {
    const error = err as FetchError;
    showMessage(error.data.message || 'An unexpected error occurred.', true);
  }
  finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-base-200">
    <div class="card w-full max-w-md bg-base-100 shadow-xl p-6">
      <h2 class="text-2xl font-bold text-center mb-6">
        Create an account
      </h2>

      <form class="space-y-4" @submit.prevent="register">
        <input
          v-model="name"
          type="text"
          placeholder="Full Name"
          class="input input-bordered w-full"
          required
        >

        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="input input-bordered w-full"
          required
        >

        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="input input-bordered w-full"
          required
        >

        <button
          type="submit"
          class="btn-gradient px-4 py-2 cursor-pointer w-full"
          :disabled="isLoading"
        >
          <span v-if="isLoading" class="loading loading-spinner" />
          <span v-else>Register</span>
        </button>

        <p v-if="errorMessage" class="text-error text-sm mt-2 text-center">
          {{ errorMessage }}
        </p>
      </form>

      <div class="text-center mt-4">
        <NuxtLink to="/auth/login" class="link link-hover">
          Already have an account? Sign in
        </NuxtLink>
      </div>
    </div>
    <ToastNotif
      :is-message="isMessage"
      :is-error="isError"
      :response-message="responseMessage"
    />
  </div>
</template>
