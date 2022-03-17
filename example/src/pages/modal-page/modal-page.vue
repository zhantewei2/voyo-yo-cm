<!--
    auto created by @ztwx vue template!!

    @pageAuthor  :  zhan
    @AuthorEmail :  zhantewei@gmail.com
    @pageCreated :  2021-6-21 11:41:59
-->

<template src="./modal-page.html"></template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import h1 from "./code1.html?voyo=hljs&lang=html";
import code1 from "!!raw-loader!./code1.html";

import h2 from "./code2.html?voyo=hljs&lang=html";
import code2 from "!!raw-loader!./code2.html";

import h3 from "./code3.html?voyo=hljs&lang=html";
import code3 from "!!raw-loader!./code3.html";

@Component({})
export default class extends Vue {
  h1 = h1;
  h2 = h2;
  h3 = h3;
  code1 = code1;
  code2 = code2;
  code3 = code3;
  modalShow = false;
  modalShow1 = false;
  modalShow2 = false;
  modalShow3 = false;
  list = new Array(7).fill(1);
  selectVal = "";
  options = [
    {
      value: "选项1",
      label: "黄金糕",
    },
    {
      value: "选项2",
      label: "双皮奶",
    },
  ];

  modalToggle() {
    this.modalShow = !this.modalShow;
  }
  modalToggle1() {
    this.modalShow1 = !this.modalShow1;
  }
  modalToggle2() {
    this.modalShow2 = !this.modalShow2;
  }
  modalToggle3() {
    this.modalShow3 = !this.modalShow3;
  }

  confirm() {
    this.modalShow3 = false;
  }
  cancel() {
    this.modalShow3 = false;
  }
}
</script>
