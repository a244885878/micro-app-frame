import { reactive } from "vue"

const menuData = [
  {
    name: "oa",
    url: "http://localhost:6002/",
    path: "/oa",
    meta: {
      icon: "House",
      title: "oa办公",
      access: false
    },
    children: [
      {
        path: "/oa/approve",
        meta: {
          title: "审批",
          access: true
        }
      },
      {
        path: "/oa/flow",
        meta: {
          title: "流程",
          access: true
        }
      },
      {
        path: "/oa/checkingIn",
        meta: { title: "考勤", access: false },
        children: [
          {
            path: "/oa/checkingIn/clockIn",
            meta: { title: "打卡", access: true }
          }
        ]
      }
    ]
  },
  {
    name: "sales",
    url: "http://localhost:6003/",
    path: "/sales",
    meta: {
      icon: "Position",
      title: "销售",
      access: false
    },
    children: [
      {
        path: "/sales/order",
        meta: {
          title: "订单",
          access: true
        }
      },
      {
        path: "/sales/client",
        meta: {
          title: "客户",
          access: true
        }
      }
    ]
  }
]

type State = {
  menuData: any[]
  tiledMenu: any[]
  userInfo: { name: string }
}
const state = reactive<State>({
  menuData: [],
  tiledMenu: [],
  userInfo: {
    name: "admin"
  }
})

export default function () {
  // 将子级路由平铺
  const tiledMenu = (list: any[]) => {
    for (let i = 0; i < list.length; i++) {
      const v = list[i]
      if (v.meta.access) {
        state.tiledMenu.push(v)
      }
      if (v?.children?.length) {
        tiledMenu(v.children)
      }
    }
  }

  const setMenuData = async () => {
    return new Promise(resolve => {
      const timer = setTimeout(() => {
        clearTimeout(timer)
        state.menuData = menuData
        resolve(true)
      }, 500)
    })
  }

  return {
    state,
    setMenuData,
    tiledMenu
  }
}
