<!--
    auto created by @ztwx vue3 template!!

    @pageAuthor  :  zhan
    @AuthorEmail :  zhantewei@gmail.com
    @pageCreated :  2021-5-23 16:54:26
-->

<template src="./core-page.html"></template>

<script lang="ts">
import { Vue, Component, Provide, Watch } from "vue-property-decorator";
import YoHeader from "./yo-core-header-component/yo-core-header-component.vue";
import YoNav from "./yo-core-nav-component/yo-core-nav-component.vue";
import { router } from "../../router";
import { nav } from "./nav";
import YoSidebar from "./yo-core-sidebar-component/yo-core-sidebar-component.vue";
import { watchIsMobile } from "@voyo/yo-cm";
import { queryNavData } from "./core.request";

nav.router = router;
//设置菜单
nav.navDataBeforeChange.subscribe(({ navDataSourceName, cb }) => {
  queryNavData(navDataSourceName).subscribe((result) => cb(result));
});

nav.navHeaderBumps = [
  {
    label: "导航一",
    navName: "a",
    routeWatch: /main\/module-one.*/, //正则匹配到该路径，则激活此导航
    active: false,
  },
];

nav.openDefaultNavData("a");

@Component({
  components: {
    YoHeader,
    YoNav,
    YoSidebar,
  },
  watch: {
    $route: {
      immediate: true,
      handler(v) {
        if (v.matched && v.matched.length) {
          const instance = v.matched[v.matched.length - 1];
        }
      },
    },
  },
})
export default class extends Vue {
  @Provide("core") core = {
    open: false,
    isMobile: false,
    navOpened: false,
    navShow: true,
  };

  @Watch("core.navOpened")
  watchNavOpened(v: boolean) {
    this.changeNavShow(!this.core.isMobile || v);
  }
  documentOverChanged: boolean;
  created() {
    watchIsMobile({ immediate: true }).subscribe((v) => {
      this.core.isMobile = v;
      if (!v) this.core.navOpened = false;
      this.changeNavShow(this.core.navOpened || !v);
    });
    this.changeNavShow(!this.core.isMobile);
  }

  changeNavShow(v: boolean) {
    if (v && this.core.isMobile && !this.documentOverChanged) {
      document.documentElement.classList.add("y-hid");
      this.documentOverChanged = true;
    } else if (this.documentOverChanged) {
      document.documentElement.classList.remove("y-hid");
      this.documentOverChanged = false;
    }

    this.core.navShow = v;
  }

  coreClick() {}
}
</script>
<style src="./core-page.scss" lang="scss"></style>
