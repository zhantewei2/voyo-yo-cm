/**
* created date 2022/3/4
* user lanjuan
**/
<template>
 <div class="voyo-page">
    <yo-datepicker-scroll @selectDay="select" style="height:400px" @selectRange="selectRange" type="alone"/>
 </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component({})
export default class extends Vue {
  selectRange(e){
    console.log(e);
  }
  select(e){
    console.log(e);
  }
}
</script>

<style lang="scss">
body{
  margin:0;
}
</style>