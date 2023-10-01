<template>
    <q-page padding class="text-center redirect-page-style"> </q-page>
</template>

<script setup lang="ts">
import { AuthModule } from 'src/modules/auth.module';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from 'src/stores/AuthStore';
import { onBeforeMount } from 'vue';
import jwt_decode from 'jwt-decode';

// Methods
const checkResult = () => {
    const route = useRoute();
    const router = useRouter();
    const token = AuthModule.checkAuthResult(route.query);
    if (token !== null) {
        const authStore = useAuthStore();
        authStore.setAuth(jwt_decode(token));
        authStore.setToken(token);
        router.push({ name: 'main' });
    } else {
        router.push({ name: 'auth.login' });
    }
};

// Events
onBeforeMount(() => {
    checkResult();
});
</script>
