<!--
    auto created by @ztwx vue template!!

    @pageAuthor  :  zhan
    @AuthorEmail :  zhantewei@gmail.com
    @pageCreated :  2021-6-22 22:17:7
-->

<template src="./tabbar-page.html"></template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import h1 from "./code1.html?voyo=hljs&lang=html";
import code1 from "!!raw-loader!./code1.html";

import h2 from "./code2.html?voyo=hljs&lang=html";
import code2 from "!!raw-loader!./code2.html";

@Component({})
export default class extends Vue {
  index = 0;
  index2 = 0;
  code1 = code1;
  h1 = h1;
  code2 = code2;
  h2 = h2;
  arr = [{ a: "aa" }, { a: "bb" }, { a: "ccc" }];
  add() {
    this.arr.push({ a: "add item" });
  }
  reduce() {
    this.arr.pop();
  }
  change(i: any) {
    this.arr[i].a += "bb";
  }
}
</script>
<style scoped src="./tabbar-page.scss" lang="scss"></style>
