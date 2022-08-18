import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('./views/Home.vue'),
  },
  {
    path: '/companies/:company_code/webjobs/etl',
    component: () => import('./views/companies/webjobs/EtlList.vue'),
  },
  {
    path: '/companies/:company_code/webjobs/sync',
    component: () => import('./views/companies/webjobs/SyncList.vue'),
  },
  {
    path: '/companies/:company_code/webjobs/sync/:webjob_name',
    component: () => import('./views/companies/webjobs/SyncWebJobHistory.vue'),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
