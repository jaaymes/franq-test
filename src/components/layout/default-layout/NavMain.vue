<script setup lang="ts">
  import { ChevronRight, type LucideIcon } from 'lucide-vue-next';
  import { ref, watch } from 'vue';
  import { RouterLink, useRoute } from 'vue-router';

  import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
  import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
  } from '@/components/ui/sidebar';

  const route = useRoute();
  const path = ref(route.path);
  defineProps<{
    items: {
      title: string;
      url: string;
      icon?: LucideIcon;
      isActive?: boolean;
      items?: {
        title: string;
        url: string;
      }[];
    }[];
  }>();

  watch(
    () => route.path,
    (newPath: string) => {
      path.value = newPath;
    }
  );
</script>
<template>
  <SidebarGroup>
    <SidebarGroupLabel>Menu</SidebarGroupLabel>
    <SidebarMenu>
      <template v-for="item in items" :key="item.title">
        <Collapsible
          v-if="item.items"
          as-child
          :default-open="item.isActive"
          class="group/collapsible"
        >
          <SidebarMenuItem>
            <CollapsibleTrigger as-child>
              <SidebarMenuButton :tooltip="item.title">
                <component :is="item.icon" v-if="item.icon" />
                <span>{{ item.title }}</span>
                <ChevronRight
                  class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem v-for="subItem in item.items" :key="subItem.title">
                  <RouterLink :to="subItem.url" class="w-full">
                    <SidebarMenuSubButton as-child :data-active="path === subItem.url">
                      <span>{{ subItem.title }}</span>
                    </SidebarMenuSubButton>
                  </RouterLink>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
        <SidebarMenuItem v-else>
          <RouterLink :to="item.url">
            <SidebarMenuButton
              :tooltip="item.title"
              :data-active="path === item.url"
              class="cursor-pointer"
            >
              <component :is="item.icon" v-if="item.icon" />
              <span>{{ item.title }}</span>
            </SidebarMenuButton>
          </RouterLink>
        </SidebarMenuItem>
      </template>
    </SidebarMenu>
  </SidebarGroup>
</template>
