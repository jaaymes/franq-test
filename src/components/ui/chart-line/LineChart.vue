<script setup lang="ts" generic="T extends Record<string, any>">
  import { ChartCrosshair, ChartLegend, defaultColors } from '@/components/ui/chart';
  import { Skeleton } from '@/components/ui/skeleton';
  import { cn } from '@/lib/utils';
  import { Axis, type BulletLegendItemInterface, CurveType, Line } from '@unovis/ts';
  import { VisAxis, VisLine, VisXYContainer } from '@unovis/vue';
  import { useMounted } from '@vueuse/core';
  import { type Component, computed, ref } from 'vue';
  import type { BaseChartProps } from '.';

  const props = withDefaults(
    defineProps<
      BaseChartProps<T> & {
        /**
         * Render custom tooltip component.
         */
        customTooltip?: Component;
        /**
         * Type of curve
         */
        curveType?: CurveType;
        loading?: boolean;
      }
    >(),
    {
      curveType: CurveType.MonotoneX,
      filterOpacity: 0.2,
      margin: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
      showXAxis: true,
      showYAxis: true,
      showTooltip: true,
      showLegend: true,
      showGridLine: true,
      loading: false,
    }
  );

  const emits = defineEmits<{
    legendItemClick: [d: BulletLegendItemInterface, i: number];
  }>();

  type KeyOfT = Extract<keyof T, string>;
  type Data = (typeof props.data)[number];

  const index = computed(() => props.index as KeyOfT);
  const colors = computed(() =>
    props.colors?.length ? props.colors : defaultColors(props.categories.length)
  );

  const legendItems = ref<BulletLegendItemInterface[]>(
    props.categories.map((category, i) => ({
      name: category,
      color: colors.value[i],
      inactive: false,
    }))
  );

  const isMounted = useMounted();

  function handleLegendItemClick(d: BulletLegendItemInterface, i: number) {
    emits('legendItemClick', d, i);
  }
</script>

<template>
  <div :class="cn('w-full h-[400px] flex flex-col items-end', $attrs.class ?? '')">
    <ChartLegend
      v-if="showLegend"
      v-model:items="legendItems"
      @legend-item-click="handleLegendItemClick"
    />

    <div v-if="loading" class="w-full h-full flex items-center justify-center">
      <Skeleton class="w-full h-[360px]" />
    </div>

    <div
      v-else-if="!data || data.length === 0"
      class="w-full h-full flex items-center justify-center"
    >
      <p class="text-muted-foreground">Sem dados disponíveis</p>
    </div>

    <VisXYContainer
      v-else
      :margin="{ left: 20, right: 20 }"
      :data="data"
      :style="{ height: isMounted ? '100%' : 'auto' }"
    >
      <ChartCrosshair
        v-if="showTooltip"
        :colors="colors"
        :items="legendItems"
        :index="index"
        :custom-tooltip="customTooltip"
      />

      <template v-for="(category, i) in categories" :key="category">
        <VisLine
          :x="(_: Data, i: number) => i"
          :y="(d: Data) => d[category]"
          :curve-type="curveType"
          :color="colors[i]"
          :attributes="{
            [Line.selectors.line]: {
              opacity: legendItems.find((item) => item.name === category)?.inactive
                ? filterOpacity
                : 1,
            },
          }"
        />
      </template>

      <VisAxis
        v-if="showXAxis"
        type="x"
        :tick-format="xFormatter ?? ((v: number) => data[v]?.[index])"
        :grid-line="false"
        :tick-line="false"
        tick-text-color="var(--vis-text-color)"
      />
      <VisAxis
        v-if="showYAxis"
        type="y"
        :tick-line="false"
        :tick-format="yFormatter"
        :domain-line="false"
        :grid-line="showGridLine"
        :attributes="{
          [Axis.selectors.grid]: {
            class: 'text-muted',
          },
        }"
        tick-text-color="var(--vis-text-color)"
      />

      <slot />
    </VisXYContainer>
  </div>
</template>
