<script setup lang="ts">
  import { Loader2 } from 'lucide-vue-next';
  import { useForm } from 'vee-validate';
  import { ref } from 'vue';

  import { Input } from '@/components/input';
  import { ToggleTheme } from '@/components/toggle-theme';
  import { Button } from '@/components/ui/button';
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

  import { useAuthStore } from '@/stores/auth';

  import type { IFormLogin } from '@/interfaces/form-user';

  import { formSchemaLogin } from './validation';

  const currentYear = ref(new Date().getFullYear());
  const { login } = useAuthStore();

  const { handleSubmit } = useForm<IFormLogin>({
    validationSchema: formSchemaLogin,
    initialValues: {
      email: 'jaaymes@gmail.com',
      password: '@Mudar123',
    },
  });

  const isLoading = ref(false);

  const onSubmit = handleSubmit((values) => {
    isLoading.value = true;
    login(values)
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
    <Card class="relative flex h-[32rem] flex-col p-4">
      <ToggleTheme class="absolute right-4 top-4" />
      <CardHeader class="text-center">
        <CardTitle class="text-3xl"> Seja bem-vindo! </CardTitle>
        <CardDescription class="text-lg"> Faça login para acessar </CardDescription>
      </CardHeader>
      <CardContent class="flex flex-1 items-center justify-center">
        <form class="w-full" @submit="onSubmit">
          <div class="flex h-full flex-col justify-between gap-8">
            <div class="grid gap-8">
              <div class="grid gap-2">
                <Input name="email" label="Email" type="email" />
              </div>
              <div class="grid gap-2">
                <Input name="password" label="Senha" type="password" />
              </div>
              <Button :disabled="isLoading" type="submit" class="w-full flex gap">
                <Loader2 v-if="isLoading" class="h-5 w-5 animate-spin" />
                {{ isLoading ? 'Entrando...' : 'Entrar' }}
              </Button>
            </div>
            <div class="text-center text-sm">
              Não tem uma conta?
              <RouterLink to="/new-user" class="underline underline-offset-4">
                Cadastre-se
              </RouterLink>
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
