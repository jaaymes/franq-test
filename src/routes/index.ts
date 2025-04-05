import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

import { BlankLayout } from '@/components/layout/blank-layout';
import { DefaultLayout } from '@/components/layout/default-layout';

import { useAuthStore } from '@/stores/auth';

import { Bovespa } from '@/pages/bovespa';
import { Home } from '@/pages/home';
import { Login } from '@/pages/login';
import { NewUser } from '@/pages/new-user';
import { Wallet } from '@/pages/wallet';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/',
    component: BlankLayout,
    meta: {
      requiresAuth: false,
    },
    children: [
      {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
          title: 'Login',
          description: 'Faça login para continuar',
        },
      },
      {
        path: '/new-user',
        name: 'new-user',
        component: NewUser,
        meta: {
          title: 'Novo Usuário',
          description: 'Crie um novo usuário',
        },
      },
    ],
  },
  {
    path: '/',
    component: DefaultLayout,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '/home',
        name: 'home',
        component: Home,
        meta: {
          title: 'Início',
          description: 'Página inicial',
        },
      },
      {
        path: '/bovespa',
        name: 'bovespa',
        component: Bovespa,
        meta: {
          title: 'Bovespa',
          description: 'Página de Bovespa Daily Detalhado',
        },
      },
      {
        path: '/wallet',
        name: 'wallet',
        component: Wallet,
        meta: {
          title: 'Carteira',
          description: 'Página de carteira',
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, _, next) => {
  const { isAuthenticated, checkAuth } = useAuthStore();
  document.title = to.meta.title ? `beFranq - ${to.meta.title}` : 'beFranq';

  if (to.meta.requiresAuth && !isAuthenticated) {
    await checkAuth();
    next();
  } else {
    next();
  }
});

export default router;
