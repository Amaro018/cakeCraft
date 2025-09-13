<script setup lang="ts">
const authStore = useAuthStore();
</script>

<template class="">
  <button
    class="btn btn-ghost  shadow outline"
    @click="authStore.signIn"
  >
    <Icon name="ion:logo-googleplus" size="2em" /> Sign in with Google
  </button>
</template>
<!--
<template>
  <button c>
    Sign In with Google
    <Icon name="simple-icons:google" size="1em" />
  </button>
</template> -->

<!--
<script setup lang="ts">
import { authClient } from "../../../server/lib/auth-client";
const session = authClient.useSession(useFetch);
</script>

<template>
  <button v-if="!session?.data" @click="authClient.signIn.social({ provider: 'github' })">
    Sign in with GitHub
  </button>
  <div v-else>
    <pre>{{ session.data }}</pre>
    <button @click="authClient.signOut()">Sign out</button>
  </div>
</template> -->
