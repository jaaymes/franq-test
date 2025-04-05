import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import { useBreadcrumbStore } from '@/stores/breadcrumb';

import type { User } from '@/interfaces/user';
import { handleSignIn, handleSignUp } from '@/services/auth';
import { decodeJwt } from '@/utils/jwt';
import { toast } from 'vue-sonner';

export const useAuthStore = defineStore('auth', () => {
  const { push } = useRouter();
  const { clearBreadcrumbs } = useBreadcrumbStore();
  const user = ref<User | null>(null);
  const isAuthenticated = computed(() => !!user.value);

  async function login(values: { email: string; password: string }) {
    const response = await handleSignIn(values);
    localStorage.setItem('access_token', response.access_token);
    await checkAuth();
    push('/home');
  }

  async function signUp(values: { email: string; password: string; name: string }) {
    await handleSignUp(values)
      .then((res) => {
        console.log('🚀 ~ .then ~ res:', res);
        push('/login');
        toast.success('Usuário criado com sucesso');
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }

  async function logout() {
    clearBreadcrumbs();
    user.value = null;
    localStorage.removeItem('user');
    push('/login');
  }

  async function checkAuth() {
    user.value = await decodeJwt(localStorage.getItem('access_token') || null);
    if (!user.value) {
      push('/login');
      return;
    }
  }

  return {
    user,
    login,
    logout,
    isAuthenticated,
    checkAuth,
    signUp,
  };
});
