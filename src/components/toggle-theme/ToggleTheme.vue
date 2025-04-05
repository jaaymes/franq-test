<script setup lang="ts">
  import { Button } from '@/components/ui/button';
  import { Icon } from '@iconify/vue';
  import { useColorMode } from '@vueuse/core';

  const mode = useColorMode();

  const props = defineProps({
    class: {
      type: String,
      default: '',
    },
  });
</script>

<template>
  <Button
    variant="outline"
    size="icon"
    :class="props.class"
    @click="mode = mode === 'light' ? 'dark' : 'light'"
  >
    <Icon
      v-if="mode === 'light'"
      icon="radix-icons:moon"
      class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
    />
    <Icon
      v-else
      icon="radix-icons:sun"
      class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
    />
    <span class="sr-only">Toggle theme</span>
  </Button>
</template>
