/** * created date 2022/3/3 * user lanjuan **/
<template>
  <div class="datepicker-scroll-item">
    <div class="_picker-header">{{ dateDay.y }}{{yearText}}{{ dateDay.m }}{{monthText}}</div>
    <div class="_picker-main-title">
      <div v-for="i in weeks" :key="i" class="_picker-cell">{{i}}</div>
    </div>
    <div class="_picker-main" :class="['__row-' + rows]">
      <template
        v-for="(i, index) in days"
      >
        <slot :item="i"></slot>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch,Emit } from "vue-property-decorator";
import {getDays, Day, DateDay, PickerDay,timeStampDay} from "@/utils/date";
import {i18n} from "../i18n/i18n";

@Component({
  computed: {
    rows(this: DatePickerScrollItem) {
      return Math.ceil(this.days.length / 7);
    },
  },
})
export default class DatePickerScrollItem extends Vue {
  @Prop({}) currentDate: DateDay;
  @Prop({}) index: number;
  @Watch("currentDate", { immediate: true }) watchCurrentDate(v:DateDay) {
    this.watch();
  }
  @Watch("index", { immediate: true }) watchIndex(v:number) {
    this.watch();
  }
  
  weeks:string[]=["mon","tue","des","thurs","fri","sat","sun"].map(name=>i18n.datePickerScroll[name]);
  yearText= i18n.datePickerScroll.year;
  monthText=i18n.datePickerScroll.month;
  dateDay: DateDay = {
    y: 0,
    m: 0,
    d: 0,
  };
  days: PickerDay[] = [];

  preDict: any;
  i: number = 0;
  beforeCreate() {
    this.preDict = {};
  }
  click() {
    this.i++;
  }
  watch() {
    if (this.index == undefined || !this.currentDate) return;
    const { index: preIndex, currentDate: preCurrentDate } = this.preDict;
    if (preIndex === this.index && preCurrentDate === this.currentDate) return;
    this.preDict = { index: this.index, currentDate: this.currentDate };

    const dateDay = this.restoreDateDayByIndex(this.currentDate, this.index);
    const days :any= getDays(dateDay);
    this.dateDay = dateDay;
    (days as PickerDay[]).forEach(i=>{
      i.timestamp= timeStampDay(i)
    });
    this.days = days;
  }

  restoreDateDayByIndex(dateDay: DateDay, index: number): DateDay {
    const m = dateDay.m + index;
    let m0 = m % 12;
    
    const a= {
      y: dateDay.y+Math.ceil(m/12)-1,
      m: m0 === 0 ? 12 : m0 < 0 ? 12 + m0 : m0,
      d: dateDay.d,
    };
    return a;
  }
}
</script>

<style scoped lang="scss" ></style>
