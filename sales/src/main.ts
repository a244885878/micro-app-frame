import { createApp } from "vue";
import App from "./App.vue";
import { routes } from "./router";
import routers from "./router";
import ElementPlus from "element-plus";
import "./main.scss";
import "element-plus/dist/index.css";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "./permission";
import { createRouter, createWebHistory } from "vue-router";

// 👇 将渲染操作放入 mount 函数，子应用初始化时会自动执行
let history: any = null;
let router = null;
let app: any = null;

window.mount = () => {
  history = createWebHistory();
  router = createRouter({
    history,
    routes,
  });

  app = createApp(App);
  app.use(routers);
  app.use(ElementPlus, { locale: zhCn });
  app.mount("#app");
  // 注册所有element-plus/icon
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }
};

// 👇 将卸载操作放入 unmount 函数，就是上面步骤2中的卸载函数
window.unmount = () => {
  app.unmount();
  history.destroy();
  app = null;
  router = null;
  history = null;
};

// 如果不在微前端环境，则直接执行mount渲染
if (!window.__MICRO_APP_ENVIRONMENT__) {
  window.mount();
}
