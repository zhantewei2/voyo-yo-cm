<!--
    auto created by @ztwx vue template!!

    @pageAuthor  :  zhan
    @AuthorEmail :  zhantewei@gmail.com
    @pageCreated :  2021-6-21 11:44:43
-->

<template src="./home-page.html"></template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import homeMd from "./home.md";

@Component({})
export default class extends Vue {
  homeMd = homeMd;
}
</script>
<style scoped src="./home-page.scss" lang="scss"></style>
