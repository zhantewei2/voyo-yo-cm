import Vue from "vue";
import {Module} from "../util";
import DatePickerScrollItem from "./datepicker-scoll-item.vue";
import DatePickerScroll from "./datepicker-scroll.vue";

export const DatePickerScrollModule=Module("datepicker-scroll",(vue)=>{
  vue.component("yo-datepicker-scroll",DatePickerScroll);
  vue.component("yo-datepicker-scroll-item",DatePickerScrollItem);
})


