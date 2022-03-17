<!--
    auto created by @ztwx vue template!!
    @pageAuthor  :  zhan
    @AuthorEmail :  zhantewei@gmail.com
    @pageCreated :  2021-5-24 23:38:34
-->

<template>
  <div class="yo-core-nav-item-wrapper">
    <div
      :class="[
        'yo-core-nav-item',
        'flex-between',
        i.open ? '__open' : '',
        i.active ? '__active' : '',
        hasChildren ? '__hasChildren' : '',
        '__deep' + deep,
      ]"
      @click="click"
      v-yo-ripple
    >
      <span class="iflex-between">
        <i :class="['yo-core-nav-item-icon', 'za' + i.icon]" v-if="i.icon"></i>
        {{ i.label }}
      </span>
      <span v-if="hasChildren" class="yo-core-nav-item-open-icon">
        <i class="za za-up"></i>
      </span>
    </div>
    <transition
      name="yo-core-nav-item-fade"
      @before-leave="beforeLeave"
      @enter="enter"
      @enter-cancelled="cancel"
      @after-enter="afterEnter"
      @leave-cancelled="cancel"
    >
      <div v-if="i.open && hasChildren" class="yo-core-nav-item-children">
        <yo-nav-item
          v-for="child in i.children"
          :key="child.path"
          :i="child"
          :deep="deep + 1"
        />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Inject } from "vue-property-decorator";
import { NavListItem } from "@voyo/core/dest/utils";
import { nav } from "../nav";
@Component({
  name: "yo-nav-item",
  computed: {
    hasChildren(this: any) {
      return this.i.children && this.i.children.length;
    },
  },
})
export default class extends Vue {
  @Prop({}) i: NavListItem;
  @Prop({ default: 1 }) deep: number;
  @Inject("core") coreDict: any;
  click() {
    nav.navItemClick(this.i, (item) => {
      item.path && (this.coreDict.navOpened = false);
    });
  }
  afterEnter(el: HTMLElement) {
    el.style.height = "";
  }
  enter(el: HTMLElement) {
    const targetH = el.offsetHeight;
    el.style.height = "0";
    setTimeout(() => {
      el.style.height = targetH + "px";
    });
  }
  beforeLeave(el: HTMLElement) {
    el.style.height = el.offsetHeight + "px";
    setTimeout(() => {
      el.style.height = "0";
    });
  }
  cancel(el: HTMLElement) {
    el.style.height = "";
  }
}
</script>
<style scoped src="./yo-core-nav-item-component.scss" lang="scss"></style>
