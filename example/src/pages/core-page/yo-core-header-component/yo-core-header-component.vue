<!--
    auto created by @ztwx vue3 template!!
    @pageAuthor  :  zhan
    @AuthorEmail :  zhantewei@gmail.com
    @pageCreated :  2021-5-24 0:35:59
-->

<template>
  <header class="header">
    <div class="_headerFix">
      <div class="right">
        <span
          class="core-header-toggle-btn"
          v-yo-ripple
          @click="toggleNav"
          v-if="coreDict.isMobile"
        >
          <i
            v-if="!coreDict.navOpened"
            class="za za-menu voyo-an-fadeIn"
            key="1"
          ></i>
          <i v-else class="za za-close voyo-an-fadeIn" key="2"></i>
        </span>
        <samp v-else style="width: 4rem; display: inline-block"></samp>
        <!--        <span style="width: 4rem" v-else></span>-->

        <span class="brand core-header-block">{{ brandName }}</span>
        <img :src="brandLogo" class="logo core-header-block" />
      </div>
      <div class="mid flex">
        <!--        <yo-header-bump-->
        <!--          :key="index"-->
        <!--          :i="i"-->
        <!--          v-for="(i, index) in headerBumps"-->
        <!--        ></yo-header-bump>-->
      </div>
      <div class="left"></div>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Inject, Vue } from "vue-property-decorator";
import { nav } from "../nav";
import { NavHeaderBump } from "@/pages/core-page/nav.types";
import YoHeaderBump from "../yo-core-header-bump-component/yo-core-header-bump-component.vue";


import ENV from "@env";
@Component({
  components: {
    YoHeaderBump,
  },
})
export default class extends Vue {
  @Inject("core") coreDict: any;
  brandName = ENV.brandName;
  brandLogo = ENV.brandLogo;
  headerBumps: NavHeaderBump[] = nav.navHeaderBumps;
  toggleNav() {
    this.coreDict.navOpened = !this.coreDict.navOpened;
  }
}
</script>
<style scoped src="./yo-core-header-component.scss" lang="scss"></style>
