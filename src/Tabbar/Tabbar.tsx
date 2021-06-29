import {CreateElement, VNode} from "vue";
import {defineVNodeHook} from "../util";
import {SelectMoveEl} from "@voyo/core/dest/components/movable-area/select-move-el";
import {setting} from "../setting";

const ITEM_NAME="yo-tabbar-item"
export const filterTabbarItem=(children:VNode[])=>{
  return children.filter((i:VNode)=>{
    try {
      //@ts-ignore
      return i.componentOptions?.Ctor.extendOptions.name === ITEM_NAME;
    }catch (e){
      return false;
    }
  })
}

type Offset={
  mid:number;
  left:number;
  width:number;
}

export const Tabbar={
  render(this:any,h:CreateElement){
    let children=this.$slots.default;
    if(!children)return null;
    this.itemChildren=filterTabbarItem(children);
    
    this.itemChildren.forEach((itemVNode:VNode,index:number)=>{
      //@ts-ignore
      const listeners:Record<string, any>=itemVNode.componentOptions.listeners=itemVNode.componentOptions.listeners||{};
      listeners.tabbarTap=()=>{
        this.selectItem(index);
      }
    })

    const thumb=<span class="yo-tabbar-thumb"></span>

    defineVNodeHook(thumb,{
      insert:()=>{
        this.thumbEl=thumb.elm as HTMLElement;
        this.cal();
        this.checkThumb(this.activeIndex);
      }
    });
  
    return (
      <div class={[
        "rel",
        this.bottomBorder?"voyo-border-bottom":""
      ]}>
        <div ref='container' class={[
          "yo-tabbar-container",
          "__type-"+this.type,
          "__color-"+this.color,
      
        ]}>
          <div ref='view' class="d-inline">
            {this.itemChildren}
            {thumb}
          </div>
        </div>
      </div>)
  },
  props:{
    type:{
      default:"md",
      type:String
    },
    value:{
      default: 0,
      type:Number
    },
    color:{
      default: setting.tabbar.defaultColor,
      type:String
    },
    bottomBorder:{
      type:Boolean,
      default:true ,
    }
  },
  beforeCreate(this:any) {
    this.activeIndex=0;
    this.thumbEl=null;
    this.preActiveBarInstance=null;
    this.selectMoveEl=null;
    this.containerOriginWidth=0; //result first of calc container.
  },
  watch:{
    value:{
      immediate:true,
      handler(this:any,v:number){
        this.selectItem(v);
      }
    }
  },
  data() {
    return {
      key: ""
    }
  },
  updated(this:any){
    const viewEl:HTMLElement|null=this.$refs.view;
    if(!viewEl)return ;
    const viewW=viewEl.offsetWidth;
    if(this.viewW&&viewW!==this.viewW){
      this.cal();
      this.checkThumb(this.activeIndex);
    }
  },
  methods: {
    // calc thumb positions
    cal(this:any) {
      const containerEl:HTMLElement=this.$refs.container;
      let el:HTMLElement,elWidth:number;
      let offsets:Offset[]=[],offsetsTotal=0;
      this.itemChildren.forEach((itemVNode:VNode)=>{
        el=itemVNode.elm as HTMLElement;
        elWidth=el.offsetWidth;
        offsets.push({
          left: offsetsTotal,
          mid: offsetsTotal + elWidth/2,
          width: elWidth
        });
        offsetsTotal+=elWidth;
      });
      this.offsets=offsets;
      // moveEl
      const viewEl:HTMLElement=this.$refs.view;
      const containerW=containerEl.offsetWidth;
      const viewW=viewEl.offsetWidth;
     
      if(!this.containerOriginWidth)this.containerOriginWidth=containerW;
      if(containerW>viewW ){
        containerEl.style.width=viewW+"px";
      }else if(containerW<this.containerOriginWidth){
        containerEl.style.width= (viewW>this.containerOriginWidth?this.containerOriginWidth:viewW)+"px";
      }
      
      if(!this.selectMoveEl){
        this.selectMoveEl=new SelectMoveEl({
          viewEl,
          wrapperEl: containerEl,
          topBoundary:0,
          behavior:"x"
        });
      }else{
        this.selectMoveEl.reCalAllHeight();
      }
     
      // save viewW for watch change
      this.viewW=viewW;
    },
    // select tabbar-item
    selectItem(this:any,index:number){
      if(index===this.activeIndex)return;
      this.activeIndex=index;
      
      //thumb
      this.thumbEl&&this.checkThumb(index);
      
    },
    checkThumb(this:any,index:number){
      if(!this.offsets.length)return;
      const {mid,width}=this.offsets[index];
      const thumbWidth=width * 0.5;
      const thumbLeft=mid-thumbWidth/2;
      this.thumbEl.style.width=thumbWidth+"px";
      this.thumbEl.style.left=thumbLeft+"px";
      
      const child:any=this.itemChildren[index];
      child.componentInstance.active();
      this.preActiveBarInstance&&this.preActiveBarInstance.disActive();
      this.preActiveBarInstance=child.componentInstance;
      this.$emit("input",index);
    }
  },
}


export const TabbarItem={
  props:{
    ripple:{
      default:true,
      type:Boolean
    }
  },
  data() {
    return {
      name: "yo-tabbar-item",
      isActive:false
    }
  },
  methods: {
    click(this:any) {
      this.$emit("tabbarTap");
    },
    active(this:any){
      this.isActive=true;
    },
    disActive(this:any){
      this.isActive=false;
    }
  },
  mounted(){
    
  },
  render(this:any,h:CreateElement){
    return h("div",
      {
        on:{
          click:this.click
        },
        class: ['yo-tabbar-item',this.isActive?'__active':''],
      directives:this.ripple?[{name:"yo-ripple"}]:undefined,
    },this.$slots.default)
  }
}