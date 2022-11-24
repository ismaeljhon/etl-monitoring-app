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
    component: () => import("./layouts/Companies.vue"),
    children: [
      {
        name: "CompanyList",
        path: "list",
        component: () => import("./views/Companies.vue"),
      },
      {
        name: "EtlList",
        path: ":company_code/webjobs/etl",
        component: () => import("./views/companies/webjobs/EtlList.vue"),
      },
      {
        name: "SyncList",
        path: ":company_code/webjobs/sync",
        component: () => import("./views/companies/webjobs/SyncList.vue"),
      },
      {
        name: "EtlWebJobHistory",
        path: ":company_code/webjobs/etl/:webjob_name",
        component: () =>
          import("./views/companies/webjobs/EtlWebJobHistory.vue"),
      },
      {
        name: "SyncWebJobHistory",
        path: ":company_code/webjobs/sync/:webjob_name",
        component: () =>
          import("./views/companies/webjobs/SyncWebJobHistory.vue"),
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const isAuthenticated = await new MsalService().isAuthenticated()
    if (to.name !== "Home" && !isAuthenticated) next({ name: "CompanyList" });
    else next();
})