<script setup lang="ts">
  import { Skeleton } from '@/components/ui/skeleton';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from './components/ui/tooltip';
</script>

<template>
  <!-- <Prefetch /> -->
  <Suspense :timeout="0">
    <template #default>
      <TooltipProvider>
        <Toaster rich-colors close-button position="top-right" />
        <router-view />
      </TooltipProvider>
    </template>

    <template #fallback>
      <TooltipProvider>
        <Toaster rich-colors close-button position="top-right" />
        <div class="min-h-screen w-full flex items-center justify-center">
          <div class="space-y-4 max-w-md w-full px-4">
            <Skeleton class="h-8 w-3/4 mx-auto" />
            <Skeleton class="h-32 w-full" />
            <Skeleton class="h-8 w-full" />
            <Skeleton class="h-8 w-full" />
            <Skeleton class="h-8 w-full" />
          </div>
        </div>
      </TooltipProvider>
    </template>
  </Suspense>
</template>