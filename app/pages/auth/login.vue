<script setup lang="ts">
import { authClient } from '~~/shared/lib/auth-client';

const email = ref('');
const password = ref('');

async function login() {
  try {
    const res = await authClient.signIn.email({
      email: email.value,
      password: password.value,
    });

    if (res.error) {
      console.error('Sign-in failed:', res.error.message);
      return;
    }

    // Success: redirect user
    await navigateTo('/dashboard');
  }
  catch (err: any) {
    console.error('Sign-in failed:', err.message || err);
  }
}
</script>

<template>
  <div class="hero flex  justify-center items-center my-30">
    <div class="hero-content flex justify-center items-center w-full ">
      <div class="card bg-base-100 w-full shadow-2xl flex flex-col md:flex-row justify-center p-10">
        <div class="flex flex-col text-center md:w-1/2 md:justify-center">
          <h1 class="text-5xl font-bold">
            Login now!
          </h1>
          <p>
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
            quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>
        </div>
        <div class="card-body">
          <AppAuthButton />
          <!-- login fields -->
          <fieldset class="fieldset">
            <label class="label">Email</label>
            <input
              v-model="email"
              type="email"
              class="input w-full"
              placeholder="Email"
            >
            <label class="label">Password</label>
            <input
              v-model="password"
              type="password"
              class="input w-full"
              placeholder="Password"
            >
            <div>
              <a class="link link-hover">Forgot password?</a>
            </div>
            <div class="flex flex-row w-full gap-2">
              <button class="flex-1 btn btn-neutral mt-4" @click="login">
                Login
              </button>
              <NuxtLink to="/auth/register" class="flex-1 btn btn-info mt-4">
                Register
              </NuxtLink>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  </div>
</template>
