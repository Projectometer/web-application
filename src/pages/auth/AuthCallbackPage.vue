<template>
  <q-page padding class="text-center">
    <h3>Redirecting to main page</h3>
  </q-page>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from 'src/stores/AuthStore'

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

const { success, token } = route.query;
if (Boolean(success) === true && token) {
  let clearToken = token.toString().replace(/\\\"/g, '"');
  clearToken = clearToken.substring(1, clearToken.length - 1);
  authStore.setAuth(JSON.parse(clearToken));

  // Redirect to main page
  router.push({
    name: 'main'
  })
}
</script>
