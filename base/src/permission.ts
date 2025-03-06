import NProgress from "nprogress"
import "nprogress/nprogress.css"
import router from "./router"
import {
  type RouteLocationNormalized,
  type RouteLocationNormalizedLoaded,
  type NavigationGuardNext
} from "vue-router"
import useStore from "@/store"
import { getToken } from "./utils/auth"

// 未登录白名单
const notLoginWhiteList = ["/login"]
// 已登录白名单
const haveLoginWhiteList = ["/", "/404"]

router.beforeEach(
  async (
    to: RouteLocationNormalized,
    _: RouteLocationNormalizedLoaded,
    next: NavigationGuardNext
  ) => {
    NProgress.start()

    const token = getToken()
    const { setMenuData, state, tiledMenu } = useStore()

    if (token) {
      if (to.path === "/login") {
        next({ path: "/" })
      } else {
        // 获取动态路由、用户信息等
        if (!Object.keys(state.menuData).length) {
          await setMenuData()
          tiledMenu(state.menuData)
        }
        if (haveLoginWhiteList.includes(to.path)) {
          return next()
        }
        if (!state.tiledMenu.find((v: any) => v.path === to.path)) {
          return next("/404")
        }
        next()
      }
    } else {
      if (notLoginWhiteList.includes(to.path)) {
        next()
      } else {
        next({ path: "/login" })
      }
    }
  }
)

router.afterEach(() => {
  NProgress.done()
})
