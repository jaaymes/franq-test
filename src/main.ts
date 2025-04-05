import '@/styles/globals.css';
import { VueQueryPlugin } from '@tanstack/vue-query';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from './App.vue';
import router from './routes';

const app = createApp(App);
const pinia = createPinia();

// Configuração otimizada do Vue Query
const vueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: (failureCount: number) => failureCount < 2,
        retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 3000),
        staleTime: 5 * 60 * 1000, // 5 minutos de cache para dados estáticos
        cacheTime: 5 * 60 * 1000, // 5 minutos de cache total
      },
    },
  },
};

app.use(pinia);
app.use(router);
app.use(VueQueryPlugin, vueQueryPluginOptions);

app.mount('#app');