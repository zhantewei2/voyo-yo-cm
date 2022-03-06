import {Module} from "../util";
import InfiniteScrollItem from "./infinite-scroll-item";
import InfiniteScrollContainer from "./infinite-scroll-container";

export * from "./infinite.type";

export {
  InfiniteScrollContainer,
  InfiniteScrollItem
}
export const InfiniteScrollModule=Module("infinite-scroll",(vue)=>{
  vue.component("yo-infinite-scroll",InfiniteScrollContainer);
  vue.component("yo-infinite-scroll-item",InfiniteScrollItem);
})
