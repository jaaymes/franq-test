<script setup lang="ts">
  import { Button } from '@/components/ui/button';
  import {
    Combobox,
    ComboboxAnchor,
    ComboboxEmpty,
    ComboboxGroup,
    ComboboxInput,
    ComboboxItem,
    ComboboxItemIndicator,
    ComboboxList,
    ComboboxTrigger,
  } from '@/components/ui/combobox';
  import { cn } from '@/lib/utils';
  import { Check, ChevronsUpDown, Search } from 'lucide-vue-next';
  import { defineEmits, defineProps, ref, watch } from 'vue';

  interface Option {
    value: string;
    label: string;
  }

  const props = defineProps<{
    options: Option[];
    placeholder?: string;
    label?: string;
    modelValue?: Option | null;
  }>();

  const emit = defineEmits(['update:modelValue', 'change']);

  // Inicializa com o valor do modelo ou null
  const selectedValue = ref<Option | null>(props.modelValue || null);

  // Atualiza o valor selecionado quando a prop modelValue muda
  watch(
    () => props.modelValue,
    (newValue) => {
      selectedValue.value = newValue || null;
    }
  );

  // Aceita qualquer tipo para evitar erros de tipagem com o componente Combobox
  const handleValueChange = (val: any) => {
    selectedValue.value = val;
    emit('update:modelValue', val);
    emit('change', val);
  };
</script>

<template>
  <Combobox v-model="selectedValue" by="label" @update:modelValue="handleValueChange">
    <ComboboxAnchor as-child>
      <ComboboxTrigger as-child>
        <Button variant="outline" class="justify-between">
          {{ selectedValue?.label ?? (props.label || props.placeholder || 'Selecione uma opção') }}

          <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxList>
      <div class="relative w-full max-w-sm items-center">
        <ComboboxInput
          class="pl-9 focus-visible:ring-0 border-0 border-b rounded-none h-10"
          :placeholder="props.placeholder || 'Buscar opção...'"
        />
        <span class="absolute start-0 inset-y-0 flex items-center justify-center px-3">
          <Search class="size-4 text-muted-foreground" />
        </span>
      </div>

      <ComboboxEmpty> Nenhuma opção encontrada. </ComboboxEmpty>

      <ComboboxGroup>
        <ComboboxItem v-for="option in props.options" :key="option.value" :value="option">
          {{ option.label }}

          <ComboboxItemIndicator>
            <Check :class="cn('ml-auto h-4 w-4')" />
          </ComboboxItemIndicator>
        </ComboboxItem>
      </ComboboxGroup>
    </ComboboxList>
  </Combobox>
</template>
