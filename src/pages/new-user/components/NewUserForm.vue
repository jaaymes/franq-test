<script setup lang="ts">
  import { Loader2 } from 'lucide-vue-next';
  import { useForm } from 'vee-validate';
  import { ref } from 'vue';

  import { Input } from '@/components/input';
  import { ToggleTheme } from '@/components/toggle-theme';
  import { Button } from '@/components/ui/button';
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

  import type { IFormNewUser } from '@/interfaces/form-user';

  import { useAuthStore } from '@/stores/auth';
  import { formSchemaNewUser } from './validation';

  const currentYear = ref(new Date().getFullYear());
  const { handleSubmit } = useForm<IFormNewUser>({
    validationSchema: formSchemaNewUser,
  });

  const isLoading = ref(false);
  const { signUp } = useAuthStore();

  const onSubmit = handleSubmit((values) => {
    isLoading.value = true;
    signUp(values)
      .then(() => {
        isLoading.value = false;
      })
      .catch(() => {
        isLoading.value = false;
      });
  });
</script>
<template>
  <div class="flex flex-col gap-6">
    <Card class="relative flex min-h-[32rem] max-h-[35rem] flex-col p-4">
      <ToggleTheme class="absolute right-4 top-4" />
      <CardHeader class="text-center">
        <CardTitle class="text-3xl"> Seja bem-vindo! </CardTitle>
        <CardDescription class="text-lg">
          Preencha os campos abaixo para criar sua conta
        </CardDescription>
      </CardHeader>
      <CardContent class="flex flex-1 items-center justify-center">
        <form class="w-full" @submit="onSubmit">
          <div class="flex h-full flex-col justify-between gap-8">
            <div class="grid gap-8">
              <div class="grid gap-2">
                <Input name="name" label="Nome" type="text" />
              </div>
              <div class="grid gap-2">
                <Input name="email" label="Email" type="email" />
              </div>
              <div class="grid gap-2">
                <Input name="password" label="Senha" type="password" />
              </div>
              <Button :disabled="isLoading" type="submit" class="w-full flex gap">
                <Loader2 v-if="isLoading" class="h-5 w-5 animate-spin" />
                {{ isLoading ? 'Criando...' : 'Criar conta' }}
              </Button>
            </div>
            <div class="text-center text-sm">
              Já tem uma conta?
              <RouterLink to="/login" class="underline underline-offset-4"> Faça login </RouterLink>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
    <div
      class="flex flex-col items-center justify-center space-y-1 text-center text-xs text-muted-foreground"
    >
      <p class="font-medium">Copyright © {{ currentYear }}. Franq CNPJ 32.709.829/0001-54</p>
      <p class="tracking-tight">
        "Franq" e a marca Franq são trademarks da empresa. Todos os direitos reservados.
      </p>
      <p class="text-[0.7rem] opacity-70">
        Av. Madre Benvenuta, 1313, Sta. Mônica – Florianópolis, Santa Catarina – Brasil
      </p>
    </div>
  </div>
</template>
