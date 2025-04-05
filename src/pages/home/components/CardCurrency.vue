<script setup lang="ts">
  import LineChartSVG from '@/components/icons/LineChartSVG.vue';
  import { Card, CardContent, CardTitle } from '@/components/ui/card';
  import { Label } from '@/components/ui/label';
  import { Skeleton } from '@/components/ui/skeleton';
  import type { Currency } from '@/interfaces/finance';
  import {
    ChartNoAxesCombined,
    LucideBitcoin,
    LucideDollarSign,
    LucideEuro,
    LucidePoundSterling,
  } from 'lucide-vue-next';

  const currenciesMap = {
    Dollar: { icon: LucideDollarSign, color: 'text-green-500', label: 'Dólar' },
    Euro: { icon: LucideEuro, color: 'text-blue-500', label: 'Euro' },
    'Pound Sterling': {
      icon: LucidePoundSterling,
      color: 'text-purple-500',
      label: 'Libra Esterlina',
    },
    Bitcoin: { icon: LucideBitcoin, color: 'text-amber-500', label: 'Bitcoin' },
  };

  defineProps<{
    currency: Currency;
    title?: string;
    showSkeleton?: boolean;
  }>();
</script>

<template>
  <Card class="aspect-video p-4">
    <CardContent v-if="showSkeleton" class="flex flex-col gap-2">
      <CardTitle class="text-sm font-medium">
        {{ currency.code }}
      </CardTitle>
      <div class="flex items-center gap-2">
        <component
          :is="currenciesMap[currency.name as keyof typeof currenciesMap]?.icon"
          :class="currenciesMap[currency.name as keyof typeof currenciesMap]?.color"
          class="h-8 w-8"
          aria-hidden="true"
        />
        <p class="text-2xl font-bold">
          {{ currenciesMap[currency.name as keyof typeof currenciesMap]?.label || currency.name }}
        </p>
      </div>
      <div class="flex items-end gap-2 justify-between">
        <div class="flex items-end gap-2">
          <ChartNoAxesCombined
            class="h-6 w-6"
            :class="currency.variation > 0 ? 'text-green-600' : 'text-red-600'"
            aria-hidden="true"
          />
          <Label
            :class="[
              'text-sm font-medium ',
              currency.variation > 0 ? 'text-green-600' : 'text-red-600',
            ]"
            :aria-label="`Variação de ${currency.variation > 0 ? 'alta' : 'baixa'} ${Math.abs(currency.variation).toFixed(2)}%`"
          >
            {{ currency.variation > 0 ? '+' : '' }}{{ currency.variation.toFixed(2) }}%
          </Label>
        </div>
        <div class="flex items-center gap-2">
          <LineChartSVG
            :color="currency.variation > 0 ? 'text-green-600' : 'text-red-600'"
            aria-hidden="true"
          />
        </div>
      </div>
      <div class="flex flex-col gap-1 mt-2">
        <div class="flex justify-between items-center">
          <Label class="text-sm text-gray-500">Compra</Label>
          <Label class="text-sm font-medium">{{
            currency.buy?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) || 'N/A'
          }}</Label>
        </div>
        <div class="flex justify-between items-center">
          <Label class="text-sm text-gray-500">Venda</Label>
          <Label class="text-sm font-medium">{{
            currency.sell?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) || 'N/A'
          }}</Label>
        </div>
      </div>
    </CardContent>
    <CardContent v-else aria-busy="true" aria-live="polite">
      <div class="space-y-2">
        <Skeleton class="h-8 w-full" />
        <Skeleton class="h-8 w-full" />
      </div>
    </CardContent>
  </Card>
</template>
