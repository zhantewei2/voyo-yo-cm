<!--
    auto created by @ztwx vue template!!

    @pageAuthor  :  zhan
    @AuthorEmail :  zhantewei@gmail.com
    @pageCreated :  2022-3-17 13:40:23
-->

<template src="./form-group-page.html">
</template>

<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";
import h1 from "./code1.html?voyo=hljs&lang=html";
import code1 from "!!raw-loader!./code1.html";
import h2 from "./code2.html?voyo=hljs&lang=html";
import code2 from "!!raw-loader!./code2.html";
import h3 from "./code3.html?voyo=hljs&lang=html";
import code3 from "!!raw-loader!./code3.html";
import {FormGroup, YoFormController} from "../../../../types";
import cc3 from "./code3.vue";
import cc4 from "./code4.vue";
import cc5 from "./code5.vue";
import h4 from "./code4.html?voyo=hljs&lang=html";
import code4 from "!!raw-loader!./code4.html";

import h5 from "./code5.html?voyo=hljs&lang=html";
import code5 from "!!raw-loader!./code5.html";
import hEnd from "./code-end.html?voyo=hljs&lang=js";

@Component({
  components:{
    "self-cc3":cc3,
    "self-cc4":cc4,
    "self-cc5":cc5
  }
})
export default class extends Vue{
  h1=h1;
  code1=code1;
  h2=h2;
  h3=h3;
  code2=code2;
  code3=code3;
  h4=h4;
  code4=code4;

  code5=code5;
  h5=h5;

  hEnd=hEnd;
  $refs:{
    yoFormGroup:FormGroup;
  }
  form:YoFormController[]=[
    {
      label :"姓名",
      id: "name",
      tag: "el-input",
    },
    {
      label: "年龄",
      id: "age",
      tag: "el-input",
      props:{
        type:"number",
      },
    },
  ];

  form2:YoFormController[]=[
    {
      label :"姓名",
      id: "name",
      tag: "el-input",
      required: true,
      props:{
        placeholder:"xx"
      },

    },
    {
      label: "年龄",
      id: "age",
      tag: "el-input",
      props:{
        type:"number"
      },

    },
    {
      label: "职业",
      tag: "yo-select",
      id: "occupation",
      span:2,
      props:{
        options: [
          {label: "xxljob",value:"a"},
          {label: "nacos",value:"b"}
        ]
      }
    }
  ];

  mounted(){
    console.log("mounted")
  }
  async confirm(){
    const errors=await this.$refs.yoFormGroup.checkError();
    if(errors&&errors.length)return;  //表单校验未通过

    console.log(
        this.$refs.yoFormGroup.getValue() //获得表单结果
    );
  }

  async reset(){
    this.$refs.yoFormGroup.reset();
  }
}
</script>
<style scoped src="./form-group-page.scss" lang="scss"></style>
