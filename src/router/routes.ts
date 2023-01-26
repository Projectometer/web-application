import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [


  {
    path: '/',
    component: () => import('src/layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/LoginPage.vue') },
      { path: 'Calendar', component: () => import('src/pages/TimerPage.vue') },
      { path: 'Reports', component: () => import('src/pages/Reports.vue') },


    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
