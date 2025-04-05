Copy
<script lang="ts"></script>
<script setup lang="ts">
  import { RouterView } from 'vue-router';

  import AppSidebar from '@/components/layout/default-layout/AppSidebar.vue';
  import { ToggleTheme } from '@/components/toggle-theme';
  import { Separator } from '@/components/ui/separator';
  import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

  import { useBreadcrumbStore } from '@/stores/breadcrumb';

  import Breadcrumb from './Breadcrumb.vue';

  const { items } = useBreadcrumbStore();
</script>
<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <header
        class="flex justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
      >
        <div class="flex items-center gap-2 px-4">
          <SidebarTrigger class="-ml-1" />
          <Separator orientation="vertical" class="mr-2 h-4" />

          <Breadcrumb v-if="items.length > 0" :items="items" />
        </div>
        <ToggleTheme class="mr-6" />
      </header>
      <RouterView />
    </SidebarInset>
  </SidebarProvider>
</template>
