import router from "@/router";

export const selfSubName = "oa";

// 公共地址栏参数获取
export const getQuery = () => {
  if (window.__MICRO_APP_ENVIRONMENT__) {
    const data = window?.microApp.getData();
    return data;
  } else {
    return router.currentRoute.value.query;
  }
};

// 公共路由跳转
export const routerChange = (path: string) => {
  if (window.__MICRO_APP_ENVIRONMENT__) {
    window?.microApp?.forceDispatch({ path });
  } else {
    router.push(path);
  }
};
