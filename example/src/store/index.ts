import Vue from "vue";
import Vuex from "vuex";
import { userStore } from "./user.store";

Vue.use(Vuex);
const store = new Vuex.Store({});

store.registerModule("user", userStore);

export { store };
