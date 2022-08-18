import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

import Home from "./views/Home.vue";
import SyncWebjob from "./views/SyncWebjob.vue";
import CompanyEtl from "./views/CompanyEtl.vue";
import CompanySync from "./views/CompanySync.vue";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/companies/:company_code/webjobs/etl",
    component: CompanyEtl,
  },
  {
    path: "/companies/:company_code/webjobs/sync",
    component: CompanySync,
  },
  {
    path: "/companies/:company_code/webjobs/sync/:name",
    component: SyncWebjob,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
