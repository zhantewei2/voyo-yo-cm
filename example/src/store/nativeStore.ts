import { Module, Store } from "vuex";
export type StoreVal =
  | Record<string, any>
  | boolean
  | string
  | number
  | null
  | undefined;

export class NativeStoreCenter {
  nativeStoreKeyList: string[] = [];
  registry(key: string) {
    if (this.nativeStoreKeyList.indexOf(key) >= 0)
      return console.error(`Duplicate registry.key: ${key}`);
    this.nativeStoreKeyList.push(key);
  }
  clear(key: string) {
    const existsIndex = this.nativeStoreKeyList.indexOf(key);
    if (existsIndex >= 0) {
      delete localStorage[key];
    } else {
      return Promise.resolve(false);
    }
  }
  clearAll() {
    for (const key of this.nativeStoreKeyList) {
      delete localStorage[key];
    }
    this.nativeStoreKeyList = [];
  }
  decodeData(data: any) {
    return JSON.parse(data);
  }
  encodeData(value: StoreVal) {
    return JSON.stringify(value);
  }
  setValue(key: string, data: any) {
    localStorage.setItem(key, this.encodeData(data));
  }
  getValue(key: any) {
    return this.decodeData(localStorage.getItem(key));
  }
}
const nativeStoreCenter = new NativeStoreCenter();

export interface NativeStoreParams<T, S> {
  namespace: string;
  autoRestore: boolean;
  module: Module<T, S>;
  restoreAfter?: (key: string, value: any) => void;
}

const VOYO_DEFAULT = "voyoDefault";
export const nativeStore = <T extends Record<string, any>, S>({
  namespace,
  autoRestore,
  module,
  restoreAfter,
}: NativeStoreParams<T, S>): Module<T, S> => {
  const key = `${namespace}-${VOYO_DEFAULT}`;

  if (autoRestore) {
    const resultState = nativeStoreCenter.getValue(key);
    Object.assign(module.state, resultState);
    restoreAfter && restoreAfter(key, resultState);
  }

  const mutations = module.mutations || (module.mutations = {});
  const actions = module.actions || (module.actions = {});

  mutations.saveStore = (
    state,
    {
      data,
    }: {
      data: Record<string, any>;
    },
  ) => {
    nativeStoreCenter.setValue(key, Object.assign(state, data));
  };

  actions.saveStore = ({ state }, { data }: { data: any }) => {
    nativeStoreCenter.setValue(key, Object.assign(state, data));
  };

  return module;
};
