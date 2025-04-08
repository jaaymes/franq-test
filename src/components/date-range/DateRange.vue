<script setup lang="ts">
  import type { DateRange } from 'reka-ui';

  import { Button } from '@/components/ui/button';
  import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
  import { RangeCalendar } from '@/components/ui/range-calendar';
  import { cn } from '@/lib/utils';
  import { CalendarDate, DateFormatter, getLocalTimeZone, today } from '@internationalized/date';
  import { CalendarIcon, CheckIcon } from 'lucide-vue-next';
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
  const tempValue = ref({ ...defaultDate }) as Ref<DateRange>;
  const isOpen = ref(false);

  // Atualiza o valor quando as props mudam
  watch(
    () => [props.startDate, props.endDate],
    ([newStartDate, newEndDate]) => {
      if (newStartDate && newEndDate) {
        // Se tiver datas, converte para CalendarDate
        const newValue = {
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
        value.value = newValue;
        tempValue.value = { ...newValue };
      } else {
        // Se não tiver datas, usa as padrão mas não mostra no UI
        value.value = { ...defaultDate };
        tempValue.value = { ...defaultDate };
      }
    },
    { immediate: true }
  );

  // Função para aplicar o filtro e emitir o evento
  const applyDateFilter = () => {
    // Salva o valor temporário no valor real
    value.value = { ...tempValue.value };

    // Emite o evento somente quando o usuário confirma
    if (value.value.start && value.value.end) {
      emit('update:range', {
        start: value.value.start.toDate(getLocalTimeZone()),
        end: value.value.end.toDate(getLocalTimeZone()),
      });
    }

    // Fecha o popover
    isOpen.value = false;
  };

  // Manipula mudanças no calendário sem aplicar imediatamente
  const handleCalendarChange = (newValue: DateRange) => {
    tempValue.value = newValue;
  };

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
  <Popover v-model:open="isOpen">
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
      <div class="p-0">
        <RangeCalendar
          v-model="tempValue"
          :max-value="todayDate"
          initial-focus
          :number-of-months="2"
        />
        <div class="flex items-center justify-end gap-2 p-3 border-t">
          <Button variant="outline" size="sm" @click="isOpen = false"> Cancelar </Button>
          <Button variant="default" size="sm" @click="applyDateFilter" class="flex items-center">
            <CheckIcon class="h-4 w-4 mr-1" />
            Aplicar
          </Button>
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>
