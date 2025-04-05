<script setup lang="ts">
  import type { DateRange } from 'reka-ui';

  import { Button } from '@/components/ui/button';
  import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
  import { RangeCalendar } from '@/components/ui/range-calendar';
  import { cn } from '@/lib/utils';
  import { CalendarDate, DateFormatter, getLocalTimeZone, today } from '@internationalized/date';
  import { CalendarIcon } from 'lucide-vue-next';
  import { computed, type Ref, ref, watch } from 'vue';

  const props = defineProps({
    startDate: {
      type: Date,
      default: null,
    },
    endDate: {
      type: Date,
      default: null,
    },
  });

  const emit = defineEmits(['update:range']);

  const df = new DateFormatter('pt-BR', {
    dateStyle: 'medium',
  });

  // Use hoje como data padrão inicial
  const todayDate = today(getLocalTimeZone());
  const defaultDate = {
    start: todayDate,
    end: todayDate,
  };

  // Inicialize com datas padrão e atualize conforme as props
  const value = ref(defaultDate) as Ref<DateRange>;

  // Atualiza o valor quando as props mudam
  watch(
    () => [props.startDate, props.endDate],
    ([newStartDate, newEndDate]) => {
      if (newStartDate && newEndDate) {
        // Se tiver datas, converte para CalendarDate
        value.value = {
          start: new CalendarDate(
            newStartDate.getFullYear(),
            newStartDate.getMonth() + 1,
            newStartDate.getDate()
          ),
          end: new CalendarDate(
            newEndDate.getFullYear(),
            newEndDate.getMonth() + 1,
            newEndDate.getDate()
          ),
        };
      } else {
        // Se não tiver datas, usa as padrão mas não mostra no UI
        value.value = { ...defaultDate };
      }
    },
    { immediate: true }
  );

  // Emite evento quando o valor muda
  watch(
    () => value.value,
    (newValue) => {
      if (newValue.start && newValue.end) {
        emit('update:range', {
          start: newValue.start.toDate(getLocalTimeZone()),
          end: newValue.end.toDate(getLocalTimeZone()),
        });
      }
    },
    { deep: true }
  );

  // Verifica se tem valores selecionados pelo usuário
  const hasSelectedValues = computed(() => props.startDate !== null && props.endDate !== null);

  // Formata a data de início seguramente
  const formattedStartDate = computed(() => {
    if (value.value && value.value.start) {
      return df.format(value.value.start.toDate(getLocalTimeZone()));
    }
    return '';
  });

  // Formata a data de fim seguramente
  const formattedEndDate = computed(() => {
    if (value.value && value.value.end) {
      return df.format(value.value.end.toDate(getLocalTimeZone()));
    }
    return '';
  });
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="
          cn(' justify-start text-left font-normal', !hasSelectedValues && 'text-muted-foreground')
        "
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        <template v-if="hasSelectedValues">
          {{ formattedStartDate }} - {{ formattedEndDate }}
        </template>
        <template v-else>Selecione um período</template>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <RangeCalendar v-model="value" :max-value="todayDate" initial-focus :number-of-months="2" />
    </PopoverContent>
  </Popover>
</template>
