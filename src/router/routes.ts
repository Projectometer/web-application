import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('src/layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'main', component: () => import('src/pages/MainPage.vue') },
      { path: 'Calendar', component: () => import('src/pages/TimerPage.vue') },
      { path: 'Reports', component: () => import('src/pages/Reports.vue') },
    ],
  },
  {
    path: '/auth',
    component: () => import('src/layouts/LoginLayout.vue'),
    children: [
      { path: 'callback', name: 'login-callback', component: () => import('src/pages/auth/AuthCallbackPage.vue') },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
