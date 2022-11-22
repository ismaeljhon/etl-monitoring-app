import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import MsalService from "./services/base/MsalService";

const auth = async (to, from, next) => {
  if (await new MsalService().getActiveAccount()) {
    next();
  } else {
    next({
      name: "Home",
    });
  }
};

export const routes: RouteRecordRaw[] = [
  {
    name: "Home",
    path: "/",
    component: () => import("./views/Home.vue"),
  },
  {
    name: "Companies",
    path: "/companies",
    component: () => import("./views/Companies.vue"),
    beforeEnter: [auth],
  },
  {
    name: "EtlList",
    path: "/companies/:company_code/webjobs/etl",
    component: () => import("./views/companies/webjobs/EtlList.vue"),
    beforeEnter: [auth],
  },
  {
    name: "SyncList",
    path: "/companies/:company_code/webjobs/sync",
    component: () => import("./views/companies/webjobs/SyncList.vue"),
    beforeEnter: [auth],
  },
  {
    name: "SyncWebJobHistory",
    path: "/companies/:company_code/webjobs/sync/:webjob_name",
    component: () => import("./views/companies/webjobs/SyncWebJobHistory.vue"),
    beforeEnter: [auth],
  },
  {
    name: "EtlWebJobHistory",
    path: "/companies/:company_code/webjobs/etl/:webjob_name",
    component: () => import("./views/companies/webjobs/EtlWebJobHistory.vue"),
    beforeEnter: [auth],
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
