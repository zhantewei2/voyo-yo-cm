<!--
    auto created by @ztwx vue template!!

    @pageAuthor  :  zhan
    @AuthorEmail :  zhantewei@gmail.com
    @pageCreated :  2021-6-22 22:17:26
-->

<template src="./tooltip-page.html"></template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import h1 from "./code1.html?voyo=hljs&lang=html";
import code1 from "!!raw-loader!./code1.html";

import h2 from "./code2.html?voyo=hljs&lang=html";
import code2 from "!!raw-loader!./code2.html";

import h3 from "./code3.html?voyo=hljs&lang=html";
import code3 from "!!raw-loader!./code3.html";

import logo from "../../assets/logo.svg";

@Component({})
export default class extends Vue {
  h1 = h1;
  h2 = h2;
  h3 = h3;
  code1 = code1;
  code2 = code2;
  code3 = code3;
  logo = logo;
  test = 0;
  show = false;
  click() {
    this.test++;
  }
  close() {
    this.show = false;
  }
}
</script>
<style scoped src="./tooltip-page.scss" lang="scss"></style>
