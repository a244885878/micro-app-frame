import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

export const menus = [
  {
    path: "/approve",
    component: () => import("@/views/approve/index.vue"),
    meta: { title: "审批", icon: "Star" },
  },
  {
    path: "/flow",
    component: () => import("@/views/flow/index.vue"),
    meta: { title: "流程", icon: "Star" },
  },
  {
    path: "/demo",
    component: () => import("@/views/demo/index.vue"),
    meta: { title: "demo", icon: "Star" },
  },
  {
    path: "/checkingIn",
    component: () => import("@/views/checkingIn/index.vue"),
    meta: { title: "考勤", icon: "Star" },
    children: [
      {
        path: "/checkingIn/clockIn",
        component: () => import("@/views/checkingIn/clockIn.vue"),
        meta: { title: "打卡" },
      },
    ],
  },
];

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("@/views/common/index.vue"),
  },
  {
    path: "/login",
    component: () => import("@/views/common/login.vue"),
  },
];

if (window.__MICRO_APP_ENVIRONMENT__) {
  routes.push(...menus);
} else {
  routes[0].children = menus;
}

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
