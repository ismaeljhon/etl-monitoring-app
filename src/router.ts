import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

import Home from "./views/Home.vue";
import Webjob from "./views/Webjob.vue";
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
    path: "/webjob/:name",
    component: Webjob,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
