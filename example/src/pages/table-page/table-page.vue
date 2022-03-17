<!--
    auto created by @ztwx vue template!!

    @pageAuthor  :  zhan
    @AuthorEmail :  zhantewei@gmail.com
    @pageCreated :  2021-6-21 11:42:11
-->

<template src="./table-page.html"></template>

<script lang="tsx">
import Vue, { CreateElement } from "vue";
import { Component } from "vue-property-decorator";

import h1 from "./code1.html?voyo=hljs&lang=html";
import code1 from "!!raw-loader!./code1.html";

import h2 from "./code2.html?voyo=hljs&lang=html";
import code2 from "!!raw-loader!./code2.html";

import h3 from "./code3.html?voyo=hljs&lang=html";
import code3 from "!!raw-loader!./code3.html";

import h4 from "./code4.html?voyo=hljs&lang=html";
import code4 from "!!raw-loader!./code4.html";

@Component({})
export default class extends Vue {
  h1 = h1;
  h2 = h2;
  code1 = code1;
  code2 = code2;

  h3 = h3;
  code3 = code3;

  h4 = h4;
  code4 = code4;

  tableLoading = true;
  columns2: any = [];
  columns = [
    { label: "姓名", prop: "name" },
    { label: "年龄", prop: "age" },
  ];
  data = [
    { name: "张三", age: 28 },
    { name: "李四", age: 18 },
  ];

  data2 = [
    { name: "张三", age: 28, city: "上海" },
    { name: "李四", age: 18, city: "成都" },
  ];

  created() {
    this.columns2 = [
      { label: "姓名", prop: "name" },
      { label: "年龄", prop: "age" },
      {
        label: "操作",
        template: (h: CreateElement, { row }: any) => {
          return (
            <div>
              <voyoc-btn size="mini" type="pure">
                编辑
              </voyoc-btn>
              <voyoc-btn size="mini" type="pure" color="error">
                删除{row.name}
              </voyoc-btn>
            </div>
          );
        },
      },
    ];
  }
}
</script>
<style scoped src="./table-page.scss" lang="scss"></style>
