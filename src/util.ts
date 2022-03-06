import { fromEvent, merge, Observable, of } from "rxjs";
import { map, distinctUntilChanged } from "rxjs/operators";
import { setting } from "./setting";
import { ioc, ROUTER_CHANGE_IOC_NAME, RouterChangeService } from "@voyo/core";
import Vue, { CreateElement, RenderContext, VNode } from "vue";
import { isObject } from "@ztwx/utils";
import {ModuleReturn} from "./registry";

export const Module = (
  key: string,
  installCb: (v: typeof Vue) => void,
): ModuleReturn => {
  return {
    install(v: typeof Vue) {
      const store = (v.prototype[setting.installStoreKey] =
        v.prototype[setting.installStoreKey] || {});
      !store[key] && installCb(v);
      store[key] = true;
    },
  };
};


//functional class继承
export const resolveClass = (data: any, addition: string[] = []) => {
  const arr = [data.staticClass];
  data.class instanceof Array ? arr.push(...data.class) : arr.push(data.class);
  return arr.concat(addition);
};
//functional style继承
export const resolveStyle = (
  data: any,
  addition: Record<string, string>[] = [],
) => {
  const arr = [data.staticStyle];
  data.style instanceof Array ? arr.push(...data.style) : arr.push(data.style);
  return arr.concat(addition);
};

//监听是否mobile模式
export const watchIsMobile = ({
  immediate = true,
}: {
  immediate?: boolean;
}): Observable<boolean> => {
  const media = window.matchMedia(setting.media.mobile);
  const order = fromEvent(media, "change").pipe(map((e: any) => e.matches));
  return (immediate ? merge(of(media.matches), order) : order).pipe(
    distinctUntilChanged(),
  );
};

const routerService: RouterChangeService = ioc.getService(
  ROUTER_CHANGE_IOC_NAME,
);
// 监听退出浏览层级
export const listenHistoryExit = (exist: () => void) => {
  let pushCount = 0;
  return routerService.immediateWatch.subscribe(
    ({ type, targetPath, pageCount }) => {
      if (!type) return;
      if (type === "back") {
        pushCount -= pageCount;
      } else if (type === "advance") {
        pushCount++;
      }
      if (pushCount < 0) exist();
    },
  );
};

type ModalIndex = number;
type ModalName = string;
class ModalIndexManager {
  minIndex: ModalIndex = setting.modal.baseIndex;
  modals: Record<ModalName, ModalIndex> = {};
  currentModal: string;
  registryModal(name: ModalName): ModalIndex {
    return this.activeModal(name);
  }
  unRegistryModal(name: ModalName) {
    delete this.modals[name];
  }
  activeModal(name: ModalName): ModalIndex {
    if (name === this.currentModal) return this.modals[name];
    this.currentModal = name;
    return (this.modals[name] = ++this.minIndex);
  }
}

export const modalIndexManager = new ModalIndexManager();

export const VNodeHook = {
  functional: true,
  render(
    h: CreateElement,
    params: RenderContext<{
      hook?: Hooks;
      transition?: Record<string, any>;
    }>,
  ) {
    const children = params.slots().default;

    const vNode = children && children[0];
    if (!vNode) return null;
    const props = params.props;
    props.hook && defineVNodeHook(vNode, props.hook);
    props.transition && defineVNodeTransition(vNode, props.transition);
    return vNode;
  },
};

// createElement for vue2
export const yoCreateElement = function (tag: any, a: any, b: any) {
  const element: any = document.createElement(tag);
  const props = isObject(a) ? a : null;
  const children = a instanceof Array ? a : b;
  if (props) {
    if (props.ref) props.ref(element);
    if (props.on) {
      Object.entries(props.on).forEach(([key, fn]) => {
        element.addEventListener(key, fn);
      });
    }
    if (props.class) {
      element.className = props.class;
    }
    if (props.attrs) {
      Object.entries(props.attrs).forEach(([key, val]) => {
        element.setAttribute(key, val);
      });
    }
    if (props.style) {
      element.style.cssText = props.style;
    }
  }
  if (children) {
    children.forEach((child: any) => {
      if (typeof child === "string") {
        const textNode = document.createTextNode(child);
        element.append(textNode);
      } else if (child instanceof Element) {
        element.appendChild(child);
      }
    });
  }
  return element;
};

export interface Hooks {
  create?: (v: VNode) => void;
  insert?: (v: VNode) => void;
  init?: (v: VNode) => void;
  prePatch?: (oldV: VNode, nowV: VNode) => void;
  destroy?: (v: VNode) => void;
  update?: (v: VNode) => void;
}

export const defineVNodeHook = <T extends VNode>(vNode: T, hooks: Hooks): T => {
  vNode.data = vNode.data || {};
  Object.assign((vNode.data.hook = vNode.data.hook || {}), hooks);
  return vNode;
};

export const defineVNodeTransition = <T extends VNode>(
  vNode: T,
  transitionHook: Record<string, any>,
): T => {
  vNode.data = vNode.data || {};
  vNode.data.transition = transitionHook;
  return vNode;
};

export const createEvent = (name: string): Event => {
  if (typeof Event === "function") {
    return new Event(name);
  } else {
    const event = document.createEvent("Event");
    event.initEvent(name, true, true);
    return event;
  }
};

export class ExecuteDistinctAfter<T> {
  params: T;

  afterCbDict: Record<string, () => void> = {};
  mounted = false;
  execute(id: string, cb: (params: T) => void) {
    if (this.mounted) {
      cb(this.params);
    } else {
      this.afterCbDict[id] = () => cb(this.params);
    }
  }
  mount(params: T) {
    this.params = params;
    for (const i in this.afterCbDict) {
      this.afterCbDict[i]();
    }
    this.mounted = true;
  }
}

export class YoVueComponent {
  constructor() {}
}

export const proxyObj=<T,K extends keyof T,V extends T[K]>(obj:T,key:K,{set,initV}:{
  set?: (v:V)=>void,
  initV?: V
}):void=>{
  const descriptor=Object.getOwnPropertyDescriptor(obj,key);
  let tmpVal:V|undefined =initV;
  
  Object.defineProperty(obj,key,{
    set(v:V){
      if(v===tmpVal)return;
      descriptor&&descriptor.set&&descriptor.set.call(obj,v);
      set&&set(v);
      tmpVal=v;
    },
    get(){
      descriptor&&descriptor.get&&descriptor.get.call(obj);
      return tmpVal;
    }
  });
}


export const prepatchInsert = <T extends VNode>(
  node: T,
  insert: (node: T) => void,
) => {
  node.data = node.data || {};
  node.data.hook = node.data.hook || {};
  const oldInsert = node.data.hook.insert;

  node.data.hook.insert = () => {
    insert(node);
    oldInsert && oldInsert(node);
  };
};
