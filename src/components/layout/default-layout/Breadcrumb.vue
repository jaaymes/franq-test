<template>
  <Breadcrumb>
    <BreadcrumbList>
      <template v-for="(item, index) in items" :key="index">
        <BreadcrumbItem class="hidden md:block">
          <BreadcrumbLink v-if="item.path" :href="item.path">
            {{ item.title }}
          </BreadcrumbLink>
          <BreadcrumbPage v-else>
            {{ item.title }}
          </BreadcrumbPage>
        </BreadcrumbItem>
        <BreadcrumbSeparator v-if="index < items.length - 1" class="hidden md:block" />
      </template>
    </BreadcrumbList>
  </Breadcrumb>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';

  import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from '@/components/ui/breadcrumb';

  import { useBreadcrumbStore } from '@/stores/breadcrumb';

  const breadcrumbStore = useBreadcrumbStore();
  const { items } = storeToRefs(breadcrumbStore);
</script>
