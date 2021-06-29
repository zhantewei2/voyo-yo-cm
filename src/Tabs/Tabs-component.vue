<!--
    auto created by @ztwx vue template!!
    @pageAuthor  :  zhan
    @AuthorEmail :  zhantewei@gmail.com
    @pageCreated :  2021-6-22 14:1:44
-->
<script lang="tsx">
import Vue, { CreateElement, VNode, VNodeDirective } from "vue";
import { Component, Prop, Emit } from "vue-property-decorator";
import { DirectiveBinding } from "vue/types/options";
import { defineVNodeHook, defineVNodeTransition } from "../util";

export interface FactoryTab {
  key: number;
  tab: VNode;
}
export interface CacheItem {
  instance?: Vue;
  elm?: HTMLElement;
}

const tabDirective = (
  directives: Array<VNodeDirective>,
): VNodeDirective | undefined =>
  directives.find((directive: VNodeDirective) => directive.name === "yo-tab");

const filterTab = (children: VNode[]) =>
  children.filter(
    (child) =>
      child.data &&
      child.data.directives &&
      !!tabDirective(child.data.directives),
  );

@Component({
  //@ts-ignore
  render(this: any, h: CreateElement) {
    const children = this.$slots.default;
    if (!children) return null;
    const tabs = filterTab(children);
    if (!tabs.length) return null;
    const tabRefs = this.factoryTabs(tabs);
    this.activeTab = tabRefs[this.activeIndex];

    if (this.preTab && this.preTab !== this.activeIndex) {
      const preIndex = this.preTab.key;

      if (preIndex > this.activeIndex) {
        defineVNodeTransition(this.preTab.tab, {
          leaveToClass: "yo-an-tab-right",
          leaveActiveClass: "yo-an-tab-leave-active",
        });
        defineVNodeTransition(this.activeTab.tab, {
          enterClass: "yo-an-tab-left",
          enterActiveClass: "yo-an-tab-enter-active",
        });
      } else if (preIndex < this.activeIndex) {
        defineVNodeTransition(this.preTab.tab, {
          leaveToClass: "yo-an-tab-left",
          leaveActiveClass: "yo-an-tab-leave-active",
        });

        defineVNodeTransition(this.activeTab.tab, {
          enterClass: "yo-an-tab-right",
          enterActiveClass: "yo-an-tab-enter-active",
        });
      }
    }
    this.preTab = this.activeTab;
    return <div class="yo-tabs-wrapper">{this.activeTab.tab}</div>;
  },
})
export default class extends Vue {
  @Prop({ default: 0 }) value: number;
  @Emit("input") EmitInput(v: number) {}
  preTab: FactoryTab;
  activeTab: FactoryTab;
  show = false;
  get activeIndex() {
    return this.value;
  }
  cacheStore: Record<number, CacheItem> = {};

  factoryTabs(tabs: VNode[]): Array<FactoryTab> {
    return tabs.map((tab: VNode, index: number) => {
      tab.data = tab.data || {};
      tab.key = tab.data.key = tab.data.key ?? index;

      //tab 为 component 时，进行缓存
      tab.data.keepAlive = true;
      const cacheItem = this.cacheStore[index];
      if (cacheItem && cacheItem.instance)
        tab.componentInstance = cacheItem.instance;
      defineVNodeHook(tab, {
        destroy: (v) => {
          if (v.componentInstance)
            this.cacheStore[index] = { instance: v.componentInstance };
        },
      });

      return {
        key: index,
        tab,
      };
    });
  }
}
</script>
<style scoped src="./Tabs-component.scss" lang="scss"></style>
