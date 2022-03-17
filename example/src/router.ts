import VueRouter from "vue-router";
import { VoyoRouterMain } from "@voyom/vue-router";
import { routerMain } from "./router-main";
import { store } from "./store/index";
import CONFIG from "@env";

const voyoRouterMain = new VoyoRouterMain({
  routes: [
    {
      path: "/login",
      component: () => import("./pages/login-page/login-page.vue"),
    },
    {
      name: "errPage",
      path: "/error",
      component: () => import("./pages/not-login-page/not-login-page.vue"),
    },
    {
      path: "/main",
      component: () => import("./pages/core-page/core-page.vue"),
      children: routerMain,
    },
    {
      path : "*",
      redirect: "/main/module-one/home"
    }
  ],
});

const router = new VueRouter({
  mode: CONFIG.routerMode,
  base: CONFIG.baseUrl,
  routes: [],
});

router.beforeEach(async (to, from, next) => {
  if (to.fullPath.startsWith("/main")) {
    const authPass = await store.dispatch("user/userAuth");
    authPass ? next() : next("/error");
  } else {
    next();
  }
});

voyoRouterMain.mount(router);

export { router, VueRouter };
