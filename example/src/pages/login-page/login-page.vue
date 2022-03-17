<!--
    auto created by @ztwx vue template!!

    @pageAuthor  :  zhan
    @AuthorEmail :  zhantewei@gmail.com
    @pageCreated :  2021-5-24 23:34:28
-->

<template src="./login-page.html">
</template>

<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";
import {registryButton} from "@voyo/core/dest/components";
registryButton();

@Component({})
export default class extends Vue{
  tap(){
    console.log("tap")
  }
}
</script>
<style scoped src="./login-page.scss" lang="scss"></style>