import {Module} from "../util";
import DatePickerScrollItem from "./datepicker-scoll-item.vue";
import DatePickerScroll from "./datepicker-scroll.vue";


export {
  DatePickerScrollItem,
  DatePickerScroll
}

export const DatePickerScrollModule=Module("datepicker-scroll",(vue)=>{
  vue.component("yo-datepicker-scroll",DatePickerScroll);
  vue.component("yo-datepicker-scroll-item",DatePickerScrollItem);
})


