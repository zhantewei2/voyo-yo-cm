<!--
    auto created by @ztwx vue template!!
    @pageAuthor  :  zhan
    @AuthorEmail :  zhantewei@gmail.com
    @pageCreated :  2021-5-25 1:30:38
-->

<template>
  <div
    class="yo-core-header-bump"
    :class="{ __active: active }"
    v-yo-ripple="{ deep: true }"
    @click="select"
  >
    <div class="_label">{{ i.label }}</div>
    <div class="_bar"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { NavHeaderBump } from "../nav.types";
import { nav } from "../nav";

@Component({})
export default class extends Vue {
  preActive: boolean;
  @Prop({}) i: NavHeaderBump;
  @Watch("$route.path", { immediate: true })
  watchRoutePath(v: string) {
    this.active =
      typeof this.i.routeWatch === "string"
        ? this.i.routeWatch === v
        : this.i.routeWatch.test(v);
    if (this.active && !this.preActive) {
      nav.openDefaultNavData(this.i.navName, false);
    }
    this.i.active = this.preActive = this.active;
  }
  active = false;
  created() {}
  select() {
    nav.openDefaultNavData(this.i.navName, true);
  }
}
</script>
<style></style>
