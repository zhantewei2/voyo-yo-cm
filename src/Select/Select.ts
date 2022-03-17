import {CreateElement, RenderContext} from "vue";

export type SelectParams={
  options: Array<{label:string,value:string}>
}

export const Select={
  functional: true,
  inheritAttrs: true,
  render(h:CreateElement,params:RenderContext<SelectParams>){
    return h("el-select", {
      on: params.listeners,
      props: params.props,
      attrs:{
        style:"display:block;width:100%"
      }
    },[
      params.props.options?params.props.options.map(i=>h("el-option",{
        props:{
          key: i.value,
          label: i.label,
          value: i.value
        },
      })):null
    ])
  }
}
