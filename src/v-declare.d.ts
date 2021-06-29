
/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

namespace JSX {
  import { VNode } from "vue";
  // tslint:disable no-empty-interface
  interface Element extends VNode {}
  // tslint:disable no-empty-interface
  interface ElementClass extends Vue {}
  interface IntrinsicElements {
    [elem: string]: any;
  }
}

declare module "*.svg"{
  const t:any;
  export default t;
}

declare module "*.html"{
  const t:any;
  export default t;
}
