import {YoAnimation} from "../animateUtils";
import {setting} from "../setting";

export class BlockLoading{
  el:HTMLElement;
  animation:YoAnimation;
  parent: HTMLElement;
  img: HTMLImageElement;
  constructor(parent:HTMLElement) {
    this.parent=parent;
    this.el=document.createElement("div");
    this.img=document.createElement("img");
    this.img.src=setting.loader.inlineImg;
    this.el.className="yo-block-loading";
    this.el.appendChild(this.img);
    this.el.addEventListener("click",e=>e.stopPropagation());
    this.animation=new YoAnimation({
      el:this.el,
      enterActiveClass:"yo-block-loading-active",
      leaveActiveClass:"yo-block-loading-active",
      enterClass:"yo-block-loading-enter",
      leaveToClass:"yo-block-loading-leave",
      leaveCompleteCb:()=>this.el.parentElement&&this.el.parentElement.removeChild(this.el),
    })
  }

  load(){
    this.calImgStyle();
    this.parent.appendChild(this.el);
    this.animation.enter();
  }
  calImgStyle(){
    const w=this.parent.offsetWidth;
    const h=this.parent.offsetHeight;
    let len:number=w<h?w:h;
    len=len>200?200:len;
    this.img.style.height=len/3+'px';
    this.img.style.width=len/3+'px';
  }

  end(){
    this.animation.leave();
  }
}