import Vue, { CreateElement } from "vue";
import {
  registryVoyoCore,
  registryVoyoRouter,
  ioc,
  ROUTER_CHANGE_IOC_NAME,
  RouterChangeService,
} from "@voyo/core";
import { registryButton, registryInput } from "@voyo/core/dest/components";
import { registryHttpPlugin } from "./http/http-registry";
import { store } from "./store";
import { router, VueRouter } from "./router";
import { registryComponent } from "./components";
import {registryElement} from "./element";
import config from "@env";
import App from "./App.vue";

// console.log("aa",aa);
registryElement();
registryVoyoCore();
registryVoyoRouter();
registryButton();
registryInput();
registryHttpPlugin();
registryComponent(Vue);
Vue.mixin({
  created(this: any) {},
});

Vue.use(VueRouter);

const voyoRouter: RouterChangeService = ioc.getService(ROUTER_CHANGE_IOC_NAME);
voyoRouter.setRouterMode(config.routerMode);
Vue.prototype.$voyoRouter = voyoRouter;

const app = new Vue({
  store,
  router,
  render: (h: CreateElement) => h(App),
}).$mount("#root");
