<script setup lang="ts">
  import { ChartColumnBig, Home } from 'lucide-vue-next';

  import type { SidebarProps } from '@/components/ui/sidebar';
  import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
  } from '@/components/ui/sidebar';

  import { useAuthStore } from '@/stores/auth';

  import CompanySwitcher from './CompanySwitcher.vue';
  import NavMain from './NavMain.vue';
  import NavUser from './NavUser.vue';

  const props = withDefaults(defineProps<SidebarProps>(), {
    collapsible: 'icon',
  });
  // This is sample data.
  const data = [
    {
      title: 'Dashboard',
      url: '/home',
      icon: Home,
      tooltip: 'Dashboard',
    },
    {
      title: 'Bovespa Daily',
      url: '/bovespa',
      icon: ChartColumnBig,
      tooltip: 'Bovespa Daily',
    },
  ];

  const { user } = useAuthStore();
</script>
<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <CompanySwitcher />
    </SidebarHeader>
    <SidebarContent>
      <NavMain :items="data" />
    </SidebarContent>
    <SidebarFooter>
      <NavUser :user="user" />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
