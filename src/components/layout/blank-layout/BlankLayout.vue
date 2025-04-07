<script setup lang="ts">
  import { useRouter } from 'vue-router';

  import { useAuthStore } from '@/stores/auth';

  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  if (isAuthenticated) {
    router.push('/home');
  }
</script>

<template>
  <router-view />
</template>
