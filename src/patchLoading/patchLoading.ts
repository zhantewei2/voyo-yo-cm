import {Subject} from "rxjs";
import {BlockLoading} from "./BlockLoading";
export {BlockLoading} from "./BlockLoading";

const blockLoadingKey="yo-patch-block-loading";

export type TargetElement =HTMLElement & {
  [blockLoadingKey]:BlockLoading
}

export class PatchLoading{
  public clickSubject:Subject<HTMLElement>=new Subject<HTMLElement>();
  public targetElement:TargetElement|null=null;
  patchMethods=['click'];
  patch() {
    const htmlElement = HTMLElement.prototype;
    const oldAddEventListener = htmlElement.addEventListener;
    const patchLoading=this;
    htmlElement.addEventListener = function (method: string, fn: (e: Event) => void, options?: any) {
      const oldFn = fn;
      const self = this;
      if(patchLoading.patchMethods.includes(method)){
        oldAddEventListener.call(this, method, function (e:Event) {
          patchLoading.clickSubject.next(e.currentTarget as HTMLElement);
          oldFn.call(self, e);
        }, options);
      }else{
        oldAddEventListener.call(this,method,fn,options);
      }
    }
  }
  constructor() {
    this.clickSubject.subscribe(triggerElement=>{
      this.targetElement=triggerElement as TargetElement;
    })
  }
  showLoading(){
    if(this.targetElement){
      if(!this.targetElement[blockLoadingKey])
        this.targetElement[blockLoadingKey]=new BlockLoading(this.targetElement);
      this.shellTargetElement(this.targetElement);
      this.targetElement[blockLoadingKey].load();
    }
  }
  hideLoading(){
    if(this.targetElement){
      if(this.targetElement[blockLoadingKey])
        this.targetElement[blockLoadingKey].end();
    }
  }
  //保证被插入loading的目标元素position不为static.
  shellTargetElement(targetElement:HTMLElement){
    if(!["relative","fixed","absolute"].includes(window.getComputedStyle(targetElement).position))
      targetElement.style.position="relative";
  }
}




export const patchLoading=new PatchLoading();
