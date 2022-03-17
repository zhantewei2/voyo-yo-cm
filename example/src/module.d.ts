/* eslint-disable */
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

declare module "*.svg" {
  const t: any;
  export default t;
}
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "*.html?voyo=hljs&lang=html"{
  const t:any;
  export default t;
}

declare module "!!raw-loader!*.html"{
  const t:any;
  export default t;
}

declare module "*.md"{
  const t:any;
  export default t;
}