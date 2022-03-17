import Vue, {CreateElement, RenderContext, VNode} from "vue";
import {DirectiveBinding} from "vue/types/options";
import {RelativeFixed} from "@voyo/core/dest/utils/RelativeFixed";
import {createEvent, defineVNodeHook,ExecuteDistinctAfter} from "../util";
import {YoAnimation} from "../animateUtils";
import {from, fromEvent, merge, Subscription} from "rxjs";
import {setting} from "../setting";

export type TooltipPosition="top"|"left"|"right"|"bottom";
export type TooltipTrigger="hover"|"tap";

export const TOOLTIP_TAP_EVENT_NAME="yo-tooltip-tap-event";
export const TOOLTIP_TAP_LISTEN_NAME="yo-tooltip-tap-listen";
const relativeFixed=new RelativeFixed(3,5);

export const insertBody=(tooltipEl:HTMLElement,bindEl:HTMLElement,position:TooltipPosition)=>{
  document.documentElement.appendChild(tooltipEl);
  const pos=relativeFixed.relativePosition(tooltipEl,bindEl,position);
  tooltipEl.style.top=pos.top+document.documentElement.scrollTop+"px";
  console.log("--",document.documentElement.scrollTop)
  tooltipEl.style.left=pos.left+"px";
}

const stopTooltipTapPropagation=(el:HTMLElement)=>{
   if((el as any)[TOOLTIP_TAP_LISTEN_NAME])return;
   merge(
     fromEvent(el,"mousedown",{passive:true}),
     fromEvent(el,"touchstart",{passive:true})
   ).subscribe((e:any)=>{
     e[TOOLTIP_TAP_EVENT_NAME]=true;
   });
   (el as any)[TOOLTIP_TAP_LISTEN_NAME]=true;
}

export const createTooltipContainer=({h,children,position="top",bindEl,insertedCb,className,destroyCb}:{
  h:CreateElement,
  position:TooltipPosition,
  children?:VNode[]|string|undefined,
  bindEl:HTMLElement,
  insertedCb?: (el:HTMLElement)=>void,
  destroyCb?:()=>void,
  className:string
}):VNode=>{

  const containerVNode=(
    <div class={[className,"__"+position]}>
      {children}
    </div>
  );

  // 插入时,更改至body,并计算位置
  defineVNodeHook(containerVNode,{
    insert: (v)=>{
      const tooltipEl:any=v.elm;
      insertBody(tooltipEl,bindEl,position);
      stopTooltipTapPropagation(tooltipEl);
      insertedCb&&insertedCb(tooltipEl);
    },
    destroy:()=>{
      destroyCb&&destroyCb();
    }
  })
  // 设置过渡动画
  //@ts-ignore
  containerVNode.data.transition={
    leaveActiveClass: 'yo-an-tooltip-active',
    leaveToClass: 'yo-an-tooltip-leave-to',
    enterActiveClass: 'yo-an-tooltip-active',
    enterClass: 'yo-an-tooltip-enter'
  }
  return containerVNode;
}

export type SwitchRef={
  clearOrder?:()=>void;
  isEnter:boolean;
}

export const bindTooltipComponent={
  props:{
    containerClass:{}
  },
  data() {
    return {
      show:false,
      position: ""
    }
  },
  beforeCreate(this:any) {
    this.bindEl=null;
    this.containerEl=null;
    this.containerParent=null;
    this.activateReUse=false;
  },
  deactivated(this:any) {
    if(this.show&&this.containerEl&& (this.containerParent=this.containerEl.parentNode)){
      this.containerParent.removeChild(this.containerEl);
      this.activateReUse=true;
    }
  },
  beforeDestroy(this:any) {
    if(this.show&&this.containerEl&&this.containerEl.parentNode){
      this.containerEl.parentNode.removeChild(this.containerEl);
    }
  },
  activated(this:any){
    if(this.show&&this.activateReUse)this.containerParent.appendChild(this.containerEl);
    this.activateReUse=false;
  },
  render(this:any,h:CreateElement){
    return this.show?
      createTooltipContainer({
          h,
          children:this.$slots.default,
          position:this.position,
          bindEl:this.bindEl,
          className:this.containerClass,
          insertedCb:(el)=>{
            this.containerEl=el;
          }
        })
      :defineVNodeHook(h("a"),{
        insert:v=>{
          v.elm&&v.elm.parentNode&&v.elm.parentNode.removeChild(v.elm);
        }
      })
  },
}



export const TooltipComponent= {
  props:{
    value:{
      default:false,
      type:Boolean
    },
    containerClass:{
      default: setting.tooltip.containerClass,
      type: String
    },
    trigger:{
      default :"hover",
      type:String
    },
    position:{
      type: setting.tooltip.position
    }
  },
  render(this:any,h:CreateElement){
    const bind= this.$slots.bind;
    if(!bind||!bind[0]){
      console.warn("Must specify a bind slot. <div slot='bind'>");
      return null;
    }
    const bindVNode=bind[0];
    defineVNodeHook(bindVNode,{
      insert:(v:VNode)=>{
        this.registryBindEl(v.elm as HTMLElement);
      }
    });
    bindVNode.children=bindVNode.children||[];

    const tagExistIndex=bindVNode.children.findIndex((child:VNode|any)=>child.yoTag);
    if(tagExistIndex<0) {
      this.containerVNode = h(bindTooltipComponent,
        {
          hook: {
            insert: (v: VNode) => {
              this.initEnd();
            },
          },
          props:{
            containerClass:this.containerClass
          }
        },
        [this.$slots.default]
      );
      this.containerVNode.yoTag=true;
      bindVNode.children.push(this.containerVNode);
    }
    return bindVNode;
  },
  watch:{
    "value":{
      immediate: true,
      handler(this:any,v:boolean){
        v?this.open():this.close();
      }
    }
  },

  beforeCreate(this:any) {
    this.bindEl=null;
    this.visible=false;
    this.initEndCount=0;
    this.executeAfterConnected=new ExecuteDistinctAfter();
    this.outSideOrder=null;
  },
  beforeDestroy() {
    this.$emit("input",false);
  },
  methods: {
    getTooltipInstance(this:any){
      const tooltipInstance=this.containerVNode.componentInstance;
      tooltipInstance.position=this.position;
      tooltipInstance.bindEl=this.bindEl;
      return tooltipInstance;
    },
    clearOutSideOrder(this:any){
      this.outSideOrder&&this.outSideOrder.unsubscribe();
      this.outSideOrder=null;
    },
    open(this:any){
      if(this.visible)return;
      this.executeAfterConnected.execute("open",()=>{
        this.clearOutSideOrder();
        const tooltipInstance=this.getTooltipInstance();
        tooltipInstance.show=this.visible=true;
        if(this.trigger=== "tap"){
          this.outSideOrder=merge(
            fromEvent(document.documentElement,"touchstart"),
            fromEvent(document.documentElement,"mousedown")
          ).subscribe((e: any)=>{
            if(e[TOOLTIP_TAP_EVENT_NAME]||!this.visible)return;
            this.clearOutSideOrder();
            this.close();
          })
        }
        this.$emit("input",true);
      })
    },
    close(this:any){
      if(!this.visible)return;
      this.executeAfterConnected.execute("close",()=>{
        this.clearOutSideOrder();
        const tooltipInstance=this.getTooltipInstance();
        tooltipInstance.show=this.visible=false;
        this.$emit("input",false);
      })
    },
    registryBindEl(this:any,el:HTMLElement){
      this.bindEl=el;
      this.initEnd();
      if(this.trigger==="tap"){
        fromEvent(el,"click").subscribe(()=>{
          !this.visible?this.open():this.close();
        });
        stopTooltipTapPropagation(el);
      }else{
        fromEvent(el,"mouseenter").subscribe(()=>this.open());
        fromEvent(el,"mouseleave").subscribe(()=>this.close());
      }
    },
    initEnd(this:any){
      if(++this.initEndCount>1){
        this.executeAfterConnected.mount();
      }
    }
  },
} as any;


export const TooltipDirective={
  bind(el:HTMLElement,{modifiers,value}:DirectiveBinding){
    const tooltipEl=document.createElement("div");
    const {top,right,left,bottom}:any=modifiers;
    const position=top?"top":right?"right":left?"left":bottom?"bottom":"top";
    tooltipEl.className="yo-tooltip-container __"+position;
    tooltipEl.innerText=value;
    const animation=new YoAnimation({
      el:tooltipEl,
      enterClass:"yo-an-tooltip-enter",
      enterActiveClass:"yo-an-tooltip-active",
      leaveToClass: "yo-an-tooltip-leave-to",
      leaveActiveClass: "yo-an-tooltip-active",
      durationCache:true,
      leaveCompleteCb:()=>{
        const p=tooltipEl.parentNode;
        p&&p.removeChild(tooltipEl);
      }
    });

    el.addEventListener("mouseenter",()=>{
      if(!animation.enterRunning&&!animation.leaveRunning){
        el.appendChild(tooltipEl);
      }else{
        animation.preventLeaveCompleteCb(); //阻止remove触发。
      }
      insertBody(tooltipEl,el,position);
      animation.enter();
    });
    el.addEventListener("mouseleave",()=>{
      animation.leave();
    })
  }
}
