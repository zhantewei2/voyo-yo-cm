import Vue from "vue";
import ItdExample from "./itd/example-component/example-component.vue";

import { AllModule, MdModule } from "../../../src/index";

export const registryComponent = (app: typeof Vue) => {
  Vue.use(AllModule);
  Vue.component("itd-example", ItdExample);
  Vue.use(MdModule);
};

document.addEventListener("keydown", (e) => {
  if (e.key === "F9") {
    debugger;
  }
});
