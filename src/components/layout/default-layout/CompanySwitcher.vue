<script setup lang="ts">
  import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
  } from '@/components/ui/sidebar';

  import { cn } from '@/lib/utils';

  const { state } = useSidebar();
</script>
<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <SidebarMenuButton
        size="lg"
        class="flex items-center justify-center data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
      >
        <img
          src="/logo_franq.webp"
          :class="cn(state === 'expanded' ? 'size-10' : 'size-8', 'rounded-md')"
          alt="beFranq"
        />
        <div v-if="state === 'expanded'" class="text-center text-sm leading-tight">
          <span class="font-semibold text-lg"> beFranq </span>
        </div>
      </SidebarMenuButton>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
