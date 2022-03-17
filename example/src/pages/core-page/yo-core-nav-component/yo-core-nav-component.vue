<!--
    auto created by @ztwx vue3 template!!
    @pageAuthor  :  zhan
    @AuthorEmail :  zhantewei@gmail.com
    @pageCreated :  2021-5-24 0:36:15
-->

<template>
  <nav class="nav">
    <yo-core-nav-item v-for="(i, index) in navData" :key="index" :i="i" />
  </nav>
</template>

<script lang="tsx">
import { Component, Vue } from "vue-property-decorator";
import NavItem from "../yo-core-nav-item-component/yo-core-nav-item-component.vue";
import { nav } from "../nav";
import { NavListItem } from "@voyo/core/dest/utils";
import { Subscription } from "rxjs";

@Component({
  components: {
    "yo-core-nav-item": NavItem,
  },
  watch: {
    "$route.path": {
      immediate: true,
      handler(this: any, v: string) {
        if (this.prePath === v) return;
        nav.navPathChange(v);
      },
    },
  },
})
export default class extends Vue {
  prePath: string;

  navData: NavListItem[] = [];
  navDataOrder: Subscription;

  created() {
    this.$voyoRouter;
    this.$router;
    this.navDataOrder = nav.watchNavDataImmediate().subscribe((navData) => {
      this.navData = navData;
      nav.navPathChange(this.$route.path);
    });
  }
  beforeDestroy() {
    this.navDataOrder.unsubscribe();
  }
}
</script>
<style scoped src="./yo-core-nav-component.scss" lang="scss"></style>
