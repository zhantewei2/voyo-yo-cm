import Vue, {VNode} from "vue";
//@ts-ignore
import marked from "marked";
// const marked=require("marked");
// const marked=(ars:any)=>{return ""}
const convertVNodeToStr=(vNode:VNode):string=>{
  if(vNode.isComment)return "";
  if(vNode.text){
    const text= vNode.text.split("\n").map(i=>i.replace(/^\s+/g,"")).join("\n");
    return marked(text)||"";
  }return "";
}
const convertVNodes=(vNodes:VNode[]):string=>{
  if(!vNodes)return "";
  return vNodes.map(v=>convertVNodeToStr(v)).join("");
}

export const Md:any={
  render(){
    return <div class="yo-markdown"></div>
  },
  mounted(){
    const children=this.$slots.default;
    if(!children)return null;
    // console.log(convertVNodes(this.$slots.default));
    this.$el.innerHTML=convertVNodes(this.$slots.default);
  }
}