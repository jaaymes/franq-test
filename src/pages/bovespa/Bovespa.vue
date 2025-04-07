<script setup lang="ts">
  import { DateRange } from '@/components/date-range';
  import { Select } from '@/components/select';
  import { Button } from '@/components/ui/button';
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
  import { LineChart } from '@/components/ui/chart-line';
  import { Skeleton } from '@/components/ui/skeleton';
  import type { StockMarketData } from '@/interfaces/bovespa';
  import { getBovespaDaily } from '@/services/bovespa';
  import { useQuery } from '@tanstack/vue-query';
  import { format, parseISO } from 'date-fns';
  import { ptBR } from 'date-fns/locale';
  import { computed, ref, watch } from 'vue';

  // Função para converter string no formato "20250404100100" para Date
  const parseDataString = (dataString: string): Date => {
    const ano = dataString.substring(0, 4);
    const mes = dataString.substring(4, 6);
    const dia = dataString.substring(6, 8);
    const hora = dataString.substring(8, 10);
    const minuto = dataString.substring(10, 12);

    return new Date(`${ano}-${mes}-${dia}T${hora}:${minuto}:00`);
  };

  const daysAgo = ref<number | null>(1);
  const selectedPeriod = ref();
  const selectedDay = ref<string | null>(null);
  const startDate = ref<Date | null>(null);
  const endDate = ref<Date | null>(null);

  // Determina qual filtro está ativo
  const activeFilter = ref<'period' | 'daterange' | null>(null);

  // Observa mudanças no selectedPeriod e atualiza daysAgo
  watch(
    () => selectedPeriod.value,
    (newValue) => {
      if (newValue && newValue.value) {
        // Limpa filtro de data
        startDate.value = null;
        endDate.value = null;

        daysAgo.value = parseInt(newValue.value);
        selectedDay.value = null; // Limpa o dia selecionado
        activeFilter.value = 'period';
      }
    }
  );

  // Observa mudanças no dateRange (startDate e endDate)
  watch([startDate, endDate], ([newStartDate, newEndDate]) => {
    if (newStartDate && newEndDate) {
      // Limpa filtro de período
      selectedPeriod.value = null;
      daysAgo.value = null;
      selectedDay.value = null;
      activeFilter.value = 'daterange';
    }
  });

  // Função para lidar com a mudança no DateRange
  const handleDateRangeChange = (range: { start: Date; end: Date }) => {
    startDate.value = range.start;
    endDate.value = range.end;
  };

  const { data, isLoading } = useQuery<StockMarketData[]>({
    queryKey: ['bovespa', daysAgo, startDate, endDate, activeFilter],
    queryFn: async () => {
      if (activeFilter.value === 'period' && daysAgo.value !== null) {
        return getBovespaDaily({ days_ago: daysAgo.value });
      }
      if (activeFilter.value === 'daterange' && startDate.value && endDate.value) {
        return getBovespaDaily({
          start_date: format(startDate.value, 'yyyy-MM-dd'),
          end_date: format(endDate.value, 'yyyy-MM-dd'),
        });
      }
      return getBovespaDaily({ days_ago: daysAgo.value });
    },
    enabled: computed(
      () =>
        (activeFilter.value === 'period' && daysAgo.value !== null) ||
        (activeFilter.value === 'daterange' &&
          startDate.value !== null &&
          endDate.value !== null) ||
        daysAgo.value !== null
    ),
  });

  // Formata números para o formato brasileiro
  const formatBRL = (value: number): string => {
    return new Intl.NumberFormat('pt-BR').format(value);
  };

  // Formata a variação percentual para o formato brasileiro
  const formatPercent = (value: number): string => {
    const formattedValue = value.toFixed(2).replace('.', ',');
    return `${value > 0 ? '+' : ''}${formattedValue}%`;
  };

  // Obtém a classe CSS de acordo com a variação
  const getVariationClass = (value: number): string => {
    if (value > 0) return 'text-emerald-500';
    if (value < 0) return 'text-red-500';
    return 'text-gray-500';
  };

  // Dados para o gráfico diário (resumo por dia)
  const dailyChartData = computed(() => {
    if (!data.value || data.value.length === 0) return [];

    return data.value.map((item: StockMarketData) => ({
      date: format(parseISO(item.date), 'dd/MM/yyyy'),
      Fechamento: item.close,
      variacao: {
        name: 'Variação',
        value: item.change_percent,
      },
    }));
  });

  // Lista de dias disponíveis para seleção
  const availableDays = computed(() => {
    if (!data.value || data.value.length === 0) return [];

    return data.value.map((item: StockMarketData) => ({
      value: item.date,
      label: format(parseISO(item.date), 'dd/MM/yyyy (EEEE)', { locale: ptBR }),
    }));
  });

  // Informações do dia selecionado
  const selectedDayData = computed(() => {
    if (!data.value || data.value.length === 0 || !selectedDay.value) return null;

    return data.value.find((item: StockMarketData) => item.date === selectedDay.value);
  });

  // Dados para o gráfico intraday (pontos ao longo do dia)
  const intradayChartData = computed(() => {
    if (!selectedDayData.value) return [];

    return selectedDayData.value.data.map((item) => ({
      horario: format(parseDataString(item.date), 'HH:mm'),
      Pontos: item.points,
      variacao: {
        name: 'Variação',
        value: item.change,
      },
    }));
  });

  // Função para selecionar um dia específico
  const selectDay = (date: string) => {
    selectedDay.value = date;
  };
</script>

<template>
  <main class="flex flex-1 flex-col gap-6 p-4 pt-0">
    <Card class="flex flex-col p-4">
      <CardHeader>
        <CardTitle>Bovespa - Índice B3</CardTitle>
        <CardDescription>Visualize a variação do índice Bovespa ao longo do tempo</CardDescription>
      </CardHeader>

      <CardContent>
        <div class="flex gap-4 py-4 flex-col md:flex-row justify-between">
          <Select
            v-model="selectedPeriod"
            :options="[
              { value: '7', label: 'Últimos 7 dias' },
              { value: '15', label: 'Últimos 15 dias' },
              { value: '30', label: 'Últimos 30 dias' },
            ]"
            placeholder="Selecione o período"
          />
          <DateRange
            :startDate="startDate || undefined"
            :endDate="endDate || undefined"
            @update:range="handleDateRangeChange"
          />
        </div>
      </CardContent>
    </Card>

    <Card class="flex flex-col p-4">
      <CardHeader>
        <CardTitle>Visão Geral Diária</CardTitle>
      </CardHeader>

      <CardContent>
        <LineChart
          :loading="isLoading"
          :data="dailyChartData"
          index="date"
          :categories="['Fechamento']"
          :y-formatter="(tick) => (typeof tick === 'number' ? formatBRL(tick) : '')"
        />

        <div v-if="isLoading" class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          <div v-for="i in 4" :key="i" class="rounded-lg border p-3">
            <div class="flex items-center justify-between">
              <div class="space-y-2 w-3/4">
                <Skeleton class="h-4 w-full" />
                <Skeleton class="h-6 w-3/4" />
                <Skeleton class="h-4 w-1/2" />
              </div>
              <Skeleton class="h-10 w-20" />
            </div>
          </div>
        </div>

        <div v-else class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <Card v-for="(day, index) in availableDays" :key="index" class="p-4">
            <CardContent>
              <p class="text-sm font-medium">{{ day.label }}</p>
              <p class="text-2xl font-bold">
                {{ data?.[index] ? formatBRL(data[index].close) : '-' }}
              </p>
              <p
                class="text-sm"
                :class="data?.[index] ? getVariationClass(data[index].change_percent) : ''"
              >
                {{ data?.[index] ? formatPercent(data[index].change_percent) : '-' }}
              </p>
            </CardContent>
            <Button variant="outline" @click="selectDay(day.value)">Detalhes</Button>
          </Card>
        </div>
      </CardContent>
    </Card>

    <Card v-if="selectedDayData" class="flex flex-col p-4">
      <CardHeader class="flex flex-row items-center justify-between">
        <div>
          <CardTitle>
            Detalhes do dia
            {{ format(parseISO(selectedDayData.date), 'dd/MM/yyyy (EEEE)', { locale: ptBR }) }}
          </CardTitle>
          <CardDescription>Variação intradiária</CardDescription>
        </div>
        <div class="text-lg font-bold" :class="getVariationClass(selectedDayData.change_percent)">
          {{ formatPercent(selectedDayData.change_percent) }}
        </div>
      </CardHeader>

      <CardContent>
        <div class="grid grid-cols-1 gap-2 sm:grid-cols-4 mb-4">
          <div class="rounded-lg bg-muted p-2">
            <p class="text-sm text-muted-foreground">Abertura</p>
            <p class="text-lg font-medium">{{ formatBRL(selectedDayData.data[0]?.points || 0) }}</p>
          </div>
          <div class="rounded-lg bg-muted p-2">
            <p class="text-sm text-muted-foreground">Fechamento</p>
            <p class="text-lg font-medium">{{ formatBRL(selectedDayData.close) }}</p>
          </div>
          <div class="rounded-lg bg-muted p-2">
            <p class="text-sm text-muted-foreground">Máxima</p>
            <p class="text-lg font-medium">{{ formatBRL(selectedDayData.high) }}</p>
          </div>
          <div class="rounded-lg bg-muted p-2">
            <p class="text-sm text-muted-foreground">Mínima</p>
            <p class="text-lg font-medium">{{ formatBRL(selectedDayData.low) }}</p>
          </div>
        </div>

        <LineChart
          :data="intradayChartData"
          index="horario"
          :categories="['Pontos']"
          :y-formatter="(tick) => (typeof tick === 'number' ? formatBRL(tick) : '')"
        />
      </CardContent>
    </Card>
  </main>
</template>
