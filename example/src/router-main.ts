import { RouteRaw, setting } from "@voyom/vue-router";
import { registryKeepAlive } from "@/common/keepAlive";

registryKeepAlive();

export const routerMain: RouteRaw[] = [
  {
    path: "module-one",
    component: setting.ChildComponent,
    children: [
      {
        path: "home",
        component: () => import("./pages/home-page/home-page.vue"),
      },
      {
        path: "card",
        component: () => import("./pages/card-page/card-page.vue"),
      },
      {
        path: "group",
        component: () => import("./pages/group-page/group-page.vue"),
      },
      {
        path: "group-form",
        component: ()=>import("./pages/form-group-page/form-group-page.vue"),
      },
      {
        path: "modal",
        component: () => import("./pages/modal-page/modal-page.vue"),
      },
      {
        path: "table",
        component: () => import("./pages/table-page/table-page.vue"),
      },
      {
        path: "tooltip",
        component: () => import("./pages/tooltip-page/tooltip-page.vue"),
      },
      {
        path: "tabs",
        component: () => import("./pages/tabs-page/tabs-page.vue"),
      },
      {
        path: "tabbar",
        component: () => import("./pages/tabbar-page/tabbar-page.vue"),
      },
    ],
  },
];
