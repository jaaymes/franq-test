<script setup lang="ts">
  // Define props with TypeScript
  const props = defineProps<{
    color?: string;
  }>();

  // Map Tailwind color classes to their hex values
  const colorMap: Record<string, string> = {
    // Greens
    'text-green-400': '#4ADE80',
    'text-green-500': '#22C55E',
    'text-green-600': '#16A34A',

    // Reds
    'text-red-400': '#F87171',
    'text-red-500': '#EF4444',
    'text-red-600': '#DC2626',

    // Blues
    'text-blue-400': '#60A5FA',
    'text-blue-500': '#3B82F6',
    'text-blue-600': '#2563EB',

    // Yellows
    'text-yellow-400': '#FACC15',
    'text-yellow-500': '#EAB308',
    'text-yellow-600': '#CA8A04',

    // Purples
    'text-purple-400': '#C084FC',
    'text-purple-500': '#A855F7',
    'text-purple-600': '#9333EA',

    // Grays
    'text-gray-400': '#9CA3AF',
    'text-gray-500': '#6B7280',
    'text-gray-600': '#4B5563',
  };

  // Function to get the actual color value
  const getColorValue = (colorClass: string): string => {
    // If it's already a hex color, return it
    if (colorClass.startsWith('#')) {
      return colorClass;
    }

    // If it's in our map, return the hex value
    if (colorMap[colorClass]) {
      return colorMap[colorClass];
    }

    // Default fallback color
    return '#FACC15'; // Yellow as default
  };

  // Get the actual color value
  const actualColor = getColorValue(props.color || 'text-yellow-400');

  // Create a unique ID for the gradient
  const gradientId = `chart-gradient-${actualColor.replace('#', '')}`;
</script>

<template>
  <svg width="100%" height="80%" viewBox="0 0 100 40" preserveAspectRatio="none">
    <!-- Gradient for chart fill -->
    <defs>
      <linearGradient :id="gradientId" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" :stop-color="actualColor" stop-opacity="0.4" />
        <stop offset="100%" :stop-color="actualColor" stop-opacity="0" />
      </linearGradient>
    </defs>

    <path
      d="M0,30 C5,28 8,25 12,20 S18,25 22,22 S28,15 35,18 S42,25 48,20 S55,15 62,18 S70,25 78,15 S85,10 90,5 L100,2"
      fill="none"
      :stroke="actualColor"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />

    <path
      d="M0,30 C5,28 8,25 12,20 S18,25 22,22 S28,15 35,18 S42,25 48,20 S55,15 62,18 S70,25 78,15 S85,10 90,5 L100,2 V40 H0 Z"
      :fill="`url(#${gradientId})`"
    />
  </svg>
</template>
