<!--
    auto created by @ztwx vue template!!

    @pageAuthor  :  zhan
    @AuthorEmail :  zhantewei@gmail.com
    @pageCreated :  2021-6-21 11:41:28
-->

<template src="./card-page.html"></template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import h1 from "./code1.html?voyo=hljs&lang=html";
import code1 from "!!raw-loader!./code1.html";

import h2 from "./code2.html?voyo=hljs&lang=html";
import code2 from "!!raw-loader!./code2.html";

@Component({})
export default class extends Vue {
  h1 = h1;
  code1 = code1;

  toggleShow = false;
  toggle() {
    this.toggleShow = !this.toggleShow;
  }
}
</script>
<style scoped src="./card-page.scss" lang="scss"></style>
