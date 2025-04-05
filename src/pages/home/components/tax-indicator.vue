<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      label: string;
      value: number;
      unit?: string;
      multiplier?: number;
      decimal?: number;
    }>(),
    {
      unit: '%',
      multiplier: 4,
      decimal: 2,
    }
  );

  const progressValue = Math.min(props.value * props.multiplier, 100);
  const formattedValue = props.value.toFixed(props.decimal) + props.unit;
</script>

<template>
  <div>
    <div class="mb-1 mt-4 flex items-center justify-between">
      <span id="tax-label" class="text-sm font-medium">{{ label }}</span>
      <span class="text-sm font-medium">{{ formattedValue }}</span>
    </div>
    <div
      class="w-full h-2 bg-muted rounded-full overflow-hidden"
      role="progressbar"
      :aria-valuenow="progressValue"
      :aria-valuemin="0"
      :aria-valuemax="100"
      :aria-labelledby="'tax-label'"
    >
      <div class="h-full bg-primary" :style="{ width: `${progressValue}%` }"></div>
    </div>
  </div>
</template>
