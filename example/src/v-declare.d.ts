/* eslint-disable */
import Vue from 'vue';
import {RouterChangeService} from "@voyo/core";
declare module "vue/types/vue" {
  interface Vue{
    $voyoRouter:RouterChangeService;
  }
}

// vue3
// declare module "@vue/runtime-core" {
//   import {Store} from "vuex";
//   import {Router } from "vue-router";
//   interface ComponentCustomProperties {
//     $store: Store<any>;
//     $router: Router;
//   }
// }


