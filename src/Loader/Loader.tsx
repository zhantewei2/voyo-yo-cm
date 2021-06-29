import {CreateElement, RenderContext} from "vue";
import {setting} from "../setting";

interface LoaderProps{
  block:boolean;
  loading:boolean
}

export const blockRender=(h:CreateElement,props:LoaderProps)=>{
  return (
    <transition name="fade-in-linear">
      {props.loading?
        <div class="yo-loader-block-container">
          <img src={setting.loader.blockImg} alt=""/></div>
        :null
      }
    </transition>
  )
}

export const inlineRender=(h:CreateElement,props:LoaderProps)=>{
  return (
    <transition name="voyo-fade">
      <img src={setting.loader.inlineImg} class="voyo-img-loading" />
    </transition>
  )
}

export const Loader={
  functional: true,
  render(h:CreateElement,params:RenderContext<LoaderProps>){
    const {parent,props} =params;
    return props.block?blockRender(h,props):inlineRender(h,props);
  }
}