<!--
    auto created by @ztwx vue template!!
    @pageAuthor  :  zhan
    @AuthorEmail :  zhantewei@gmail.com
    @pageCreated :  2021-6-24 0:13:16
-->

<template>
  <div class="mb-4">
    <header class="itd-header" v-if="title">{{ title }}</header>
    <div v-if="$slots.des" class="itd-des">
      <slot name="des"></slot>
    </div>
    <main class="itd-card">
      <yo-tabbar v-model="index" color="secondary">
        <yo-tabbar-item><span class="px-5">样例</span></yo-tabbar-item>
        <yo-tabbar-item><span class="px-5">CODE</span></yo-tabbar-item>
      </yo-tabbar>
      <yo-tabs v-model="index">
        <div v-yo-tab class="itd-example">
          <slot name="example"></slot>
        </div>
        <div v-yo-tab class="rel itd-example">
          <yo-tooltip @tooltiphide="tooltipHide">
            <voyoc-btn-icon
              slot="bind"
              class="abs-tr"
              type="candy"
              color="gentle"
              size="small"
              @voyotap="copyCode"
            >
              <img :src="copyImg" style="height: 1.4em" />
            </voyoc-btn-icon>
            <div class="voyo-text-size-mini">{{ text }}</div>
          </yo-tooltip>
          <div v-html="h"></div>
          <slot name="code"></slot>
        </div>
      </yo-tabs>
    </main>
    <footer v-if="$slots.footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { registryButtonIcon } from "@voyo/core/dest/components";
import copyImg from "!!url-loader!./copy.svg";
import { copy } from "@ztwx/utils/lib/web/exec";

registryButtonIcon();
@Component({})
export default class extends Vue {
  @Prop({}) code: string;
  @Prop({}) h: string;
  @Prop({}) title: string;
  text = "点击复制";
  index = 0;
  copyImg = copyImg;
  copyCode() {
    copy(this.code);
    this.text = "复制成功！";
  }
  tooltipHide() {
    this.text = "点击复制";
  }
}
</script>
<style scoped lang="scss"></style>
