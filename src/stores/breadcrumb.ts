import { defineStore } from 'pinia';

interface BreadcrumbItem {
  title: string;
  path?: string;
}

interface BreadcrumbState {
  items: BreadcrumbItem[];
}

export const useBreadcrumbStore = defineStore('breadcrumb', {
  state: (): BreadcrumbState => ({
    items: [],
  }),

  actions: {
    setBreadcrumbs(items: BreadcrumbItem[]) {
      this.items = items;
    },

    addBreadcrumb(item: BreadcrumbItem) {
      this.items.push(item);
    },

    clearBreadcrumbs() {
      this.items = [];
    },
  },
});
