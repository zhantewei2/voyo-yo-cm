/** * created date 2022/3/3 * user lanjuan **/
<template>
  <infinite-scroll-container
    style="overflow-y: hidden"
    :render-count="12"
    ref="scrollContainer"
  >
    <template #default="row">
      <infinite-scroll-item :scroll-index="row.index">
        <template #default="info">
          <date-picker-scroll-item
              @selectDay="selectDay"
            :index="row.index + info.page * 12"
            :current-date="currentDate">
            <template #default="{item:i}">
              <div
                :class="[
                  i.shadowDay?'__shadow':'',
                  type==='alone'? 
                    selectedAloneDay&&i.y===selectedAloneDay.y&&i.m===selectedAloneDay.m&&i.d===selectedAloneDay.d?'__selected':''
                    :'',
                    startClass(i),
                    endClass(i),
                    isRangeDay(i)?'__selected-range':''
                ]"
                class="_picker-cell"
                :key="i.y+'-'+i.m+'-'+i.d"
                @click="selectDay(i)"
              >
                {{i.d}}
              </div>
            </template>
          </date-picker-scroll-item>
        </template>
      </infinite-scroll-item>
    </template>
  </infinite-scroll-container>
</template>

<script lang="ts">
import Vue from "vue";
import {Component, Emit, Prop} from "vue-property-decorator";
import InfiniteScrollItem from "../InfiniteScroll/infinite-scroll-item";
import InfiniteScrollContainer from "../InfiniteScroll/infinite-scroll-container";
import DatePickerScrollItem from "./datepicker-scoll-item.vue";
import {
  getDateDay,
  DateDay,PickerDay,
    isGreater,timeStampDay
} from "@/utils/date";

export interface PickerDate {
  y: number;
  m: number;
  d: number;
}

@Component({
  components: {
    InfiniteScrollItem,
    InfiniteScrollContainer,
    DatePickerScrollItem,
  },
})
export default class DatePickerScroll extends Vue {
  @Prop({
    default: () => getDateDay(new Date()),
  })
  currentDate: DateDay;
  @Prop({default:"alone"})type:"alone"|"range";
  @Prop({})disableDay:(day:PickerDay)=>void;
  @Emit("selectDay")emitSelectDay(day:PickerDay){}
  @Emit("selectRange")emitSelectRange(range:{start:PickerDay|null,end:PickerDay|null}){};
  
  selectedAloneDay:PickerDay|null=null;
  selectedStartDay:PickerDay|null=null;
  selectedEndDay:PickerDay|null=null;
  
  
  startClass(d:PickerDay):string{
    const isStart=this.type==="range"&&this.selectedStartDay&&d.timestamp===this.selectedStartDay?.timestamp;
    return isStart?`__selected-start ${!this.selectedEndDay?'__selected-range-alone':''}`:"";
  }
  isRangeDay(d:PickerDay):boolean|null{
    return this.type==="range"&&
        this.selectedStartDay&&
        this.selectedEndDay&&
        d.timestamp<this.selectedEndDay.timestamp&&
        d.timestamp>this.selectedStartDay.timestamp;
  }
  endClass(d:PickerDay):string{
    const isEnd= this.type==="range"&&this.selectedEndDay&&d.timestamp===this.selectedEndDay?.timestamp;
    return isEnd?`__selected-end ${!this.selectedStartDay?'__selected-range-alone':''}`:``;
  }
  lastedSelectType:"start"|"end"|undefined=undefined;
  toEmitSelectRange(){
    this.emitSelectRange({
      start: this.selectedStartDay,
      end: this.selectedEndDay
    })
  }
  selectDay(day:PickerDay){
    if(day.shadowDay)return;
    if(this.type==="alone") {
      if(day===this.selectedAloneDay)return;
      this.emitSelectDay(this.selectedAloneDay =day);
    }else if(this.type==="range"){
      
      if(this.selectedEndDay&&day.timestamp===this.selectedEndDay.timestamp){
        this.lastedSelectType=undefined;
        this.selectedEndDay=null;
        
      }else if(this.selectedStartDay && day.timestamp===this.selectedStartDay.timestamp){
        this.lastedSelectType=undefined;
        this.selectedStartDay=null;
      }else{
        const pointList= [day,this.selectedStartDay,this.selectedEndDay];
        const existsPointList=pointList.filter(i=>!!i).sort((pre:any,next:any)=>pre.timestamp-next.timestamp);
        if(existsPointList.length===1){
          this.selectedStartDay=existsPointList[0];
        }else if(existsPointList.length===2){
          ([this.selectedStartDay,this.selectedEndDay]=existsPointList);
        }else if(existsPointList.length===3){
          const [a,b,c]=existsPointList;
          if(day===a || day === c){
            this.selectedStartDay=a;
            this.selectedEndDay=c;
          }else if(day===b){
            if(this.lastedSelectType === "start"){
              this.selectedStartDay=a;
              this.selectedEndDay=b;
            }else if(this.lastedSelectType === "end"){
              this.selectedStartDay = b;
              this.selectedEndDay =c;
            }

          }
        }
        this.lastedSelectType= day===this.selectedStartDay?"start": "end";
      }
      this.toEmitSelectRange();
     }
  }
  clean(){
    this.selectedAloneDay= this.selectedStartDay= this.selectedEndDay=null;
  }
  
}
</script>

<style scoped lang="scss"></style>
