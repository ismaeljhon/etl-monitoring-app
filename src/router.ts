import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

import Home from "./views/Home.vue";
import Etl from "./views/Etl.vue";
import Sync from "./views/Sync.vue"
import Webjob from "./views/Webjob.vue";
import CompanyEtl from "./views/CompanyEtl.vue";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/etl",
    component: Etl,
  },
  {
    path: "/etl/:code",
    component: CompanyEtl,
  },
  {
    path: "/sync",
    component: Sync,
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
