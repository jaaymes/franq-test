<script setup lang="ts">
  import { useBreadcrumbStore } from '@/stores/breadcrumb';

  import { Card, CardContent } from '@/components/ui/card';
  import { Skeleton } from '@/components/ui/skeleton';
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table';
  import type { Currency } from '@/interfaces/finance';
  import { getFinance } from '@/services/finance';
  import { getVariationColor, getVariationIcon } from '@/utils/common';
  import { useQuery } from '@tanstack/vue-query';
  import { LucideBarChart4, LucideCurrency } from 'lucide-vue-next';
  import { computed, defineAsyncComponent, onMounted } from 'vue';

  // Importar componentes usando lazy loading com opções otimizadas
  const CardCurrency = defineAsyncComponent({
    loader: () => import('./components/CardCurrency.vue'),
    delay: 0, // Não atrasa o carregamento
    timeout: 10000,
    suspensible: true,
  });

  const CardTaxas = defineAsyncComponent({
    loader: () => import('./components/CardTaxas.vue'),
    delay: 0, // Não atrasa o carregamento
    timeout: 10000,
    suspensible: true,
  });

  const breadcrumbStore = useBreadcrumbStore();
  breadcrumbStore.addBreadcrumb({ title: 'Dashboard', path: '/home' });

  // Pré-carregar a API antes de mostrar o componente
  onMounted(() => {
    // Pré-chamada para iniciar o fetch antes da renderização
    getFinance().catch(() => {});
  });

  const { data, isLoading } = useQuery({
    queryKey: ['finance'],
    queryFn: getFinance,
    staleTime: 1000 * 60 * 5, // 5 minutos
    refetchInterval: 1000 * 60 * 1, // 1 minutos
    retry: 3,
    retryDelay: (attempt) => Math.min(attempt * 1000, 3000), // Backoff entre tentativas
  });

  const mainCurrencies = computed(() => {
    const currenciesObj = data.value?.results?.currencies || {};
    const currencies = Object.entries(currenciesObj)
      .filter(([_, value]) => typeof value === 'object' && value !== null)
      .map(([key, value]) => ({
        code: key,
        ...(value as Currency),
      }));

    return currencies.filter((currency) =>
      ['Dollar', 'Bitcoin', 'Euro', 'Pound Sterling'].includes(currency.name)
    );
  });

  const mainStocks = computed(() => {
    return Object.entries(data.value?.results?.stocks || {}).map(([key, stock]) => ({
      code: key,
      ...stock,
    }));
  });

  const bitcoinExchanges = computed(() => {
    return Object.entries(data.value?.results?.bitcoin || {}).map(([key, exchange]) => ({
      code: key,
      ...exchange,
    }));
  });

  const taxRates = computed(() => {
    return data.value?.results?.taxes || [];
  });

  const otherCurrencies = computed(() => {
    const currenciesObj = data.value?.results?.currencies || {};
    const currencies = Object.entries(currenciesObj)
      .filter(([_, value]) => typeof value === 'object' && value !== null)
      .map(([key, value]) => ({
        code: key,
        ...(value as Currency),
      }));

    return currencies.filter(
      (currency) => !['Dollar', 'Bitcoin', 'Euro', 'Pound Sterling'].includes(currency.name)
    );
  });
</script>

<template>
  <main class="flex flex-1 flex-col gap-6 p-4 pt-0">
    <!-- Indicadores Principais -->
    <section aria-label="Principais Indicadores" class="flex flex-col gap-4">
      <h2 class="text-2xl font-bold">Principais Indicadores</h2>

      <!-- Container com altura mínima fixa para evitar layout shift -->
      <div
        class="grid auto-rows-min gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 min-h-[180px]"
      >
        <template v-if="!isLoading && mainCurrencies.length">
          <CardCurrency
            v-for="currency in mainCurrencies"
            :key="currency.name"
            :currency="currency"
            :show-skeleton="true"
            :title="currency.name"
          />
        </template>
        <template v-else>
          <!-- Skeletons com dimensões fixas para evitar CLS -->
          <Card v-for="i in 4" :key="i" class="aspect-video p-4">
            <CardContent aria-busy="true" aria-live="polite">
              <div class="space-y-2">
                <Skeleton class="h-8 w-4/5" />
                <Skeleton class="h-8 w-1/2" />
                <Skeleton class="h-6 w-3/4" />
                <Skeleton class="h-6 w-full" />
              </div>
            </CardContent>
          </Card>
        </template>
      </div>
    </section>

    <!-- Container com altura mínima fixa para evitar layout shift -->
    <div class="min-h-[250px]">
      <template v-if="!isLoading && taxRates.length">
        <CardTaxas :taxes="taxRates" :bitcoin-exchanges="bitcoinExchanges" :stocks="mainStocks" />
      </template>
      <template v-else>
        <!-- Skeletons para CardTaxas -->
        <section aria-label="Taxas e Índices (Carregando)" class="flex flex-col gap-4">
          <h2 class="text-2xl font-bold">Taxas e Índices</h2>
          <div class="grid auto-rows-min gap-4 grid-cols-1 md:grid-cols-2">
            <Card v-for="i in 2" :key="i" class="shadow-sm p-4">
              <CardContent>
                <Skeleton class="h-8 w-3/4 mb-4" />
                <div class="space-y-3">
                  <Skeleton v-for="j in 5" :key="j" class="h-6 w-full" />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </template>
    </div>

    <!-- Bolsas e Índices -->
    <section aria-label="Bolsas e Índices Mundiais" class="flex flex-col gap-4">
      <h2 class="text-2xl font-bold">Bolsas e Índices Mundiais</h2>

      <!-- Container com altura mínima fixa para evitar layout shift -->
      <div class="overflow-hidden rounded-xl border shadow-sm min-h-[200px]">
        <div class="overflow-x-auto">
          <Table class="w-full" aria-label="Tabela de bolsas e índices mundiais">
            <TableHeader>
              <TableRow>
                <TableHead>Índice</TableHead>
                <TableHead>Local</TableHead>
                <TableHead>Pontos</TableHead>
                <TableHead class="text-right">Variação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <template v-if="!isLoading && mainStocks.length">
                <TableRow v-for="stock in mainStocks" :key="stock.code" class="bg-card">
                  <TableCell class="">
                    <div class="flex items-center gap-2">
                      <LucideBarChart4 aria-hidden="true" class="h-4 w-4 text-primary" />
                      <span class="font-medium">{{ stock.name }}</span>
                    </div>
                  </TableCell>
                  <TableCell class="text-muted-foreground">{{ stock.location }}</TableCell>
                  <TableCell class="text-left font-medium">
                    {{ stock.points.toLocaleString('pt-BR') }}
                  </TableCell>
                  <TableCell class="text-right">
                    <div
                      class="flex items-center justify-end gap-1"
                      :class="getVariationColor(stock.variation)"
                    >
                      <component
                        :is="getVariationIcon(stock.variation)"
                        class="h-4 w-4"
                        aria-hidden="true"
                      />
                      <span class="font-medium">{{ stock.variation.toFixed(2) }}%</span>
                    </div>
                  </TableCell>
                </TableRow>
              </template>
              <template v-else>
                <!-- Rows de skeleton para evitar CLS -->
                <TableRow v-for="i in 5" :key="i" class="bg-card">
                  <TableCell class=""><Skeleton class="h-6 w-32" /></TableCell>
                  <TableCell class=""><Skeleton class="h-6 w-24" /></TableCell>
                  <TableCell class="text-right"><Skeleton class="h-6 w-20 ml-auto" /></TableCell>
                  <TableCell class="text-right"><Skeleton class="h-6 w-16 ml-auto" /></TableCell>
                </TableRow>
              </template>
            </TableBody>
          </Table>
        </div>
      </div>
    </section>

    <!-- Outras Moedas -->
    <section aria-label="Outras Moedas" class="flex flex-col gap-4">
      <h2 class="text-2xl font-bold">Outras Moedas</h2>

      <!-- Container com altura mínima fixa para evitar layout shift -->
      <div class="overflow-hidden rounded-xl border shadow-sm min-h-[200px]">
        <div class="overflow-x-auto">
          <Table class="w-full" aria-label="Tabela de outras moedas">
            <TableHeader>
              <TableRow>
                <TableHead class="text-left font-medium">Moeda</TableHead>
                <TableHead class="text-left font-medium">Código</TableHead>
                <TableHead class="text-right font-medium">Valor</TableHead>
                <TableHead class="text-right font-medium">Variação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <template v-if="!isLoading && otherCurrencies.length">
                <TableRow v-for="currency in otherCurrencies" :key="currency.name" class="bg-card">
                  <TableCell class="">
                    <div class="flex items-center gap-2">
                      <LucideCurrency aria-hidden="true" class="h-4 w-4 text-primary" />
                      <span class="font-medium">{{ currency.name }}</span>
                    </div>
                  </TableCell>
                  <TableCell class="text-muted-foreground">{{ currency.code }}</TableCell>
                  <TableCell class="text-right font-medium">
                    {{
                      currency.buy?.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }) || 'N/A'
                    }}
                  </TableCell>
                  <TableCell class="text-right">
                    <div
                      class="flex items-center justify-end gap-1"
                      :class="getVariationColor(currency.variation)"
                    >
                      <component
                        :is="getVariationIcon(currency.variation)"
                        class="h-4 w-4"
                        aria-hidden="true"
                      />
                      <span class="font-medium">{{ currency.variation.toFixed(2) }}%</span>
                    </div>
                  </TableCell>
                </TableRow>
              </template>
              <template v-else>
                <!-- Rows de skeleton para evitar CLS -->
                <TableRow v-for="i in 5" :key="i" class="bg-card">
                  <TableCell class=""><Skeleton class="h-6 w-32" /></TableCell>
                  <TableCell class=""><Skeleton class="h-6 w-24" /></TableCell>
                  <TableCell class="text-right"><Skeleton class="h-6 w-20 ml-auto" /></TableCell>
                  <TableCell class="text-right"><Skeleton class="h-6 w-16 ml-auto" /></TableCell>
                </TableRow>
              </template>
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  </main>
</template>
