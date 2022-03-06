import Vue,{CreateElement} from "vue";
import App from "./App.vue";
import "./styles.scss";

import {DatePickerScrollModule} from "../../src/DatePickerScroll";
Vue.use(DatePickerScrollModule);
const app=new Vue({
  render:h=>h(App)
}).$mount("#root")

