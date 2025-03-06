import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("@/views/home/index.vue"),
    children: [
      {
        path: "/:subName/:subPath*",
        component: () => import("@/pages/index.vue")
      },
      { path: "/404", component: () => import("@/pages/404.vue") },
      { path: "/:pathMatch(.*)*", component: () => import("@/pages/404.vue") }
    ]
  },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue")
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
