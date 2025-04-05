import { LucideArrowDown, LucideArrowUp, LucideTarget } from 'lucide-vue-next';

export const getVariationColor = (variation: number) => {
  return variation > 0 ? 'text-green-500' : variation < 0 ? 'text-red-500' : 'text-gray-500';
};

export const getVariationIcon = (variation: number) => {
  return variation > 0 ? LucideArrowUp : variation < 0 ? LucideArrowDown : LucideTarget;
};
