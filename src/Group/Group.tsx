import {CreateElement, RenderContext, VNode} from "vue";
import {ClassManage} from "@voyo/core/dest/utils";
import {resolveStyle,resolveClass} from "../util";
import {setting} from "../setting";

const GROUP_GRID_DEFAULT=5;
const CELL_SPAN_DEFAULT=1;

const watchGroup=(el:HTMLElement)=>{
  const classManage=new ClassManage(el);
  let preClass="";
  const setGrid=(v:string)=>{
    if(v!==preClass){
      classManage.replaceClass("w","yo-group-grid-"+(preClass=v));
    }
  }
  if(!ResizeObserver){
    // IE 承受苦难
    return el.classList.add("yo-group-grid-"+GROUP_GRID_DEFAULT);
  }
  const ob=new ResizeObserver((entries:ResizeObserverEntry[])=>{
    entries.forEach(({contentRect:{width}}:any)=>{
      setGrid(setting.group.dynamicGrid(width)+"");
    });
  });
  
  ob.observe(el);
}

/**
 * Group
 * 如果 grid 不存在则响应式设置 grid.
 * @props {grid}
 */
export const Group = {
  functional: true,
  render(h:CreateElement,params:RenderContext<{
    grid?:number,
  }>){
    const {slots,data,props}=params;
    const groupVNode:VNode= (
      <div class={resolveClass(data,[
        "yo-group",
        props.grid?"yo-group-grid-"+ (props.grid||GROUP_GRID_DEFAULT): "",
      ])} style={resolveStyle(data)}
      >
        {slots().default}
      </div>
    );
    groupVNode.data=groupVNode.data||{};
    const hook=groupVNode.data.hook=groupVNode.data.hook||{};
    hook.insert=(vNode:VNode)=>{
      !props.grid&&watchGroup(vNode.elm as HTMLElement)
    };
    return groupVNode;
  }
};

/**
 * Cell
 * @props 
 *  important :boolean 红星标记
 *  label :string label值
 *  span :number 占据位置 默认1
 *  color : Colors 字体颜色 默认为undefined
 * @slots
 *  {prefix}前置插槽 
 *  {suffix}后置 
 *  {default}默认
 */
export const Cell= {
  functional: true,
  render(h:CreateElement,params:RenderContext<{
    label?:string,
    span?:number,
    important?:boolean,
    color?:string
  }>){
    const {slots,data,props}=params;
    const scope=slots();
    const labelExist=props.label||scope.prefix;
    return (
      <div class={resolveClass(data,[
        "yo-cell",
        "yo-cell-span-"+(props.span||CELL_SPAN_DEFAULT),
        labelExist?'':'__noLabel',
        props.color?'voyo-color-'+props.color:''
      ])} style={resolveStyle(data)}>
        {labelExist?
          <span class={"_cell-label"}>
            {props.important?<span class='_important'>*</span>:null}
            {props.label||''}{scope.prefix}
          </span>
        :null}
        <span class={"_cell-value"}>{scope.default}</span>
        {scope.suffix}
      </div>
    )
  }
}

