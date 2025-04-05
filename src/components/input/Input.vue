<script setup lang="ts">
  import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
  import { Input } from '@/components/ui/input';
  import { EyeIcon, EyeOffIcon } from 'lucide-vue-next';
  import { useFormContext } from 'vee-validate';
  import { ref } from 'vue';
  import { Button } from '../ui/button';

  export interface InputProps {
    name: string;
    label: string;
    type?: string;
    placeholder?: string;
    isRequired?: boolean;
  }

  const { name, label, type = 'text', placeholder, isRequired = false } = defineProps<InputProps>();

  const { isFieldDirty, errors } = useFormContext();

  // Controle de visibilidade da senha
  const isPasswordVisible = ref(false);
  const inputType = ref(type);

  const togglePasswordVisibility = () => {
    isPasswordVisible.value = !isPasswordVisible.value;
    inputType.value = isPasswordVisible.value ? 'text' : 'password';
  };
</script>

<template>
  <FormField
    v-slot="{ componentField }"
    :name="name"
    :validate="isFieldDirty(name) ? errors[name] : null"
  >
    <FormItem>
      <FormLabel>
        {{ label }}
        <span v-if="isRequired" class="text-red-500">*</span>
      </FormLabel>
      <FormControl>
        <div class="relative">
          <Input
            :data-error="!!errors[name]"
            :type="type === 'password' ? inputType : type"
            :placeholder="placeholder"
            v-bind="componentField"
            :class="{
              'pr-10': type === 'password',
              'data-[error=true]:border-destructive': !!errors[name],
            }"
          />
          <Button
            v-if="type === 'password'"
            type="button"
            variant="ghost"
            class="absolute inset-y-0 right-0 pr-3 flex items-center"
            @click="togglePasswordVisibility"
          >
            <EyeIcon v-if="isPasswordVisible" class="h-5 w-5" />
            <EyeOffIcon v-else class="h-5 w-5" />
            <span class="sr-only">{{ isPasswordVisible ? 'Ocultar senha' : 'Mostrar senha' }}</span>
          </Button>
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
