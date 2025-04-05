<script setup lang="ts">
  import Franq from '@/assets/Franq.vue';

  import LoginForm from './components/LoginForm.vue';
</script>
<template>
  <div class="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
    <div class="absolute inset-0 bg-login bg-no-repeat bg-cover opacity-50 pointer-events-none" />
    <div class="flex w-full max-w-sm flex-col items-center gap-6">
      <a
        aria-label="Franq"
        href="https://franq.com.br/"
        target="_blank"
        class="mb-4 flex items-center justify-center"
      >
        <Franq />
      </a>
      <LoginForm />
    </div>
  </div>
</template>
