import Vue, { VNode } from "vue";
export interface FactoryTab {
    key: number;
    tab: VNode;
}
export interface CacheItem {
    instance?: Vue;
    elm?: HTMLElement;
}
export default class extends Vue {
    value: number;
    EmitInput(v: number): void;
    preTab: FactoryTab;
    activeTab: FactoryTab;
    show: boolean;
    get activeIndex(): number;
    cacheStore: Record<number, CacheItem>;
    factoryTabs(tabs: VNode[]): Array<FactoryTab>;
}
