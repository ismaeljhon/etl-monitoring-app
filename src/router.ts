import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

import Home from "./views/Home.vue";
import Etl from "./views/Etl.vue";
import Sync from "./views/Sync.vue"

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/etl/:code",
    component: Etl,
  },
  {
    path: "/sync/:code",
    component: Sync,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
