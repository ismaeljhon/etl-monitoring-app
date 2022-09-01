import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  {
    name: "Home",
    path: "/",
    component: () => import("./views/Home.vue"),
  },
  {
    name: "EtlList",
    path: "/companies/:company_code/webjobs/etl",
    component: () => import("./views/companies/webjobs/EtlList.vue"),
  },
  {
    name: "SyncList",
    path: "/companies/:company_code/webjobs/sync",
    component: () => import("./views/companies/webjobs/SyncList.vue"),
  },
  {
    name: "SyncWebJobHistory",
    path: "/companies/:company_code/webjobs/sync/:webjob_name",
    component: () => import("./views/companies/webjobs/SyncWebJobHistory.vue"),
  },
  {
    name: "EtlWebJobHistory",
    path: "/companies/:company_code/webjobs/etl/:webjob_name",
    component: () => import("./views/companies/webjobs/EtlWebJobHistory.vue"),
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
