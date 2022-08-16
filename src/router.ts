import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

import Home from "./views/Home.vue";
import Etl from "./views/Etl.vue";
import Sync from "./views/Sync.vue"
import CompanySync from "./views/CompanySync.vue";

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
    path: "/sync",
    component: Sync,
  },
  {
    path: "/sync/:name",
    component: CompanySync,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
