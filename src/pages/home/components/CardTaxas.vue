<script setup lang="ts">
  import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
  import type { BitcoinExchange, Stock, Tax } from '@/interfaces/finance';
  import TaxIndicator from '@/pages/home/components/tax-indicator.vue';
  import { getVariationColor, getVariationIcon } from '@/utils/common';

  defineProps<{
    taxes: Tax[];
    bitcoinExchanges: (BitcoinExchange & { code: string })[];
    stocks: Stock[];
  }>();

  const formatCurrency = (value: number | null) => {
    if (value === null) return 'N/A';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };
</script>

<template>
  <section aria-label="Taxas e Índices" class="flex flex-col gap-4">
    <h2 class="text-2xl font-bold">Taxas e Índices</h2>
    <div class="grid auto-rows-min gap-4 grid-cols-1 md:grid-cols-2">
      <!-- Taxas -->
      <Card class="shadow-sm p-4">
        <CardHeader>
          <CardTitle>Taxas Brasileiras</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="flex flex-col gap-4">
            <div v-for="(tax, index) in taxes" :key="index">
              <TaxIndicator label="Fator Diário" :value="tax.daily_factor" :decimal="6" />
              <TaxIndicator label="Taxa SELIC" :value="tax.selic" />
              <TaxIndicator label="CDI" :value="tax.cdi" />
              <TaxIndicator label="SELIC Diário" :value="tax.selic_daily" />
              <TaxIndicator label="CDI Diário" :value="tax.cdi_daily" />
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Bitcoin -->
      <Card class="shadow-sm p-4">
        <CardHeader>
          <CardTitle>Cotações Bitcoin</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="flex flex-col divide-y">
            <div
              v-for="exchange in bitcoinExchanges"
              :key="exchange.code"
              class="py-3 first:pt-0 last:pb-0"
            >
              <div class="flex items-center justify-between">
                <span class="font-medium">{{ exchange.name }}</span>
                <div
                  class="flex items-center gap-1"
                  :class="getVariationColor(exchange.variation || 0)"
                >
                  <component
                    :is="getVariationIcon(exchange.variation || 0)"
                    class="h-4 w-4"
                    aria-hidden="true"
                  />
                  <span
                    :aria-label="`Variação de ${(exchange.variation || 0) > 0 ? 'alta' : 'baixa'} ${Math.abs(exchange.variation || 0).toFixed(2)}%`"
                  >
                    {{ (exchange.variation || 0).toFixed(2) }}%
                  </span>
                </div>
              </div>
              <div class="mt-2 flex justify-between">
                <span class="text-sm text-muted-foreground">Último</span>
                <span class="font-medium">{{ formatCurrency(exchange.last) }}</span>
              </div>
              <div v-if="'buy' in exchange" class="mt-1 flex justify-between">
                <span class="text-sm text-muted-foreground">Compra</span>
                <span class="font-medium">{{ formatCurrency(exchange.buy || null) }}</span>
              </div>
              <div v-if="'sell' in exchange" class="mt-1 flex justify-between">
                <span class="text-sm text-muted-foreground">Venda</span>
                <span class="font-medium">{{ formatCurrency(exchange.sell || null) }}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </section>
</template>
