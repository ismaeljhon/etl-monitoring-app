import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

import Home from "./views/Home.vue";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Home,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
