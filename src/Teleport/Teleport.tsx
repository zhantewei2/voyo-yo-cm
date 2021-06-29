import {defineVNodeHook} from "../util";

const mutationComment=({
  wrapper,
  replaceNode,
  comment
}:{
  wrapper:HTMLElement,
  comment:Comment
  replaceNode:(newNode:HTMLElement)=>void
})=>{
  let replacedNode:any;
  const main=new MutationObserver((list,observer)=>{
    if(list.length===2){
      const addedNode=list[0].addedNodes[0];
      const removedNode=list[1].removedNodes[0];
      if(addedNode&&removedNode === comment){
        replaceNode(addedNode as HTMLElement);
        replacedNode=addedNode;
      }
    }else if(list.length===1){
      const addedNode=list[0].addedNodes[0];
      if(addedNode&&addedNode instanceof Comment && list[0].previousSibling===replacedNode){
        comment=addedNode;
      }
    }
  });
  
  main.observe(wrapper,{
    childList:true,
  });
  
  return ()=>{
    main.disconnect();
  }
}

export const Teleport={
  props:{
    to:{
      type:String,
    }
  },
  render(this:any){
    const child=this.$slots.default&&this.$slots.default[0];
    if(child){
      defineVNodeHook(child,{
        insert: ()=>{
          if(this.to){
            this.outsideWrapper=document.querySelector(this.to);
            this.outsideWrapper&&this.outsideWrapper.appendChild(this.outsideEl=child.elm);
          }
        }
      })
      return child;
    }else{
      this.outsideEl=null;
      return null;
    }
  },
  methods: {
    removeOutside(this:any) {
      this.outsideEl&&this.outsideEl.parentElement&&this.outsideEl.parentElement.removeChild(this.outsideEl);
      this.mutationUnsubscribe&&this.mutationUnsubscribe();
    }
  },
  activated(this:any){
    if(this.outsideEl&&this.outsideWrapper)this.outsideWrapper.appendChild(this.outsideEl);
  },
  deactivated(this:any){
    this.removeOutside();
  },
  beforeDestroy(this:any) {
    this.removeOutside();
  }
}