<template>
  <q-page padding class="text-center redirect-page-style">
    <h1 class="text-h1 text-white">
      {{ result }}
    </h1>
  </q-page>
</template>

<script setup lang="ts">
import { AuthModule } from 'src/modules/auth.module';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from 'src/stores/AuthStore';
import { onMounted, ref } from 'vue';

// Constants
const REDIRECT_TIMEOUT = 1000; // 1 Second

// Refernces
const result = ref('Please wait...');

// Methods
const checkResult = () => {
  const route = useRoute();
  const router = useRouter();
  const token = AuthModule.checkAuthResult(route.query);

  if (token !== null) {
    const authStore = useAuthStore();
    authStore.setAuth(JSON.parse(token));
    result.value = 'Authentication successfully';
  } else {
    result.value = 'Authentication failed';
  }

  setTimeout(() => {
    router.push({ name: 'main' });
  }, REDIRECT_TIMEOUT);
};

// Events
onMounted(() => {
  checkResult();
});
</script>
