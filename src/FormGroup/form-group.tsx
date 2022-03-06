import Vue, { CreateElement, VNode } from "vue";
import { Component, Emit, Inject, Prop, Watch } from "vue-property-decorator";
import {ControllerItem, Form, requiredValidator, Validator} from "@ztwx/form";
import {
  YoForm,
  YoFormController,
  ControllerVal
} from "./form.types";
import { preInstallControllerData, PreInstallControllerData } from "./form";
import {filterIncludeObj} from "@ztwx/utils";
import {proxyObj} from "@/util";
import {concatMapTo} from "rxjs/operators";


export const errorMsg = (
  h: CreateElement,
  controller: YoFormController,
): VNode | null =>
  controller.error
    ? h(
        "span",
        {
          class: "yo-cell-error",
          transition: {},
        },
        [controller.error],
      )
    : null;

@Component({
  render(this: FormGroup, h: CreateElement) {
    return h(
      "yo-group",
      {
        props: {
          grid: this.grid,
        },
      },
      this.controllers.map(controller =>
        controller.shadow?null:
        h(
          "yo-cell",
          {
            class: [controller.error ? "__error" : ""],
            props: {
              label: controller.label,
              important: controller.star|| controller.required,
              span: controller.span,
            },
          },
          [
            controller.tag
              ? h(
                  controller.tag,
                  preInstallControllerData.handle(
                    controller.tag,
                    {
                      props: {
                        disabled: controller.disabled??this.formDisabled,
                        ...(controller.props || {}),
                        value: this.valueForm.value[controller.id],
                      },
                      attrs: {
                        disabled: controller.disabled??this.formDisabled,
                        ...(controller.attrs || {})
                      },
                      on: {
                        input: (v: ControllerVal) => {
                          const val=preInstallControllerData.handleInputVal(
                            controller,
                            v,
                          );
                          this.valueForm.value[
                            controller.id
                          ] = val;
                          if(controller.on&&controller.on.input)controller.on.input.call(val,this.valueForm);
                        },
                        
                        ...(controller.on?this.patchListeners(controller.on,["input"]):{})
                        
                      },
                    },
                    controller.disablePreInstall,
                  ),
                )
              : controller.render
              ? controller.render(h, this.valueForm)
              : null,
            errorMsg(h, controller),
          ],
        ),
      ),
    );
  },
})
export class FormGroup extends Vue {
  @Prop({}) form: YoFormController[];
  @Prop({}) grid: number;
  @Prop({ default: true }) controllerError: boolean; // 表单错误时，显示controller错误信息
  @Prop({default:false})formDisabled:boolean;
  @Watch("form", { immediate: true })
  watchForm(controllers: YoFormController[]) {
    if (!controllers || controllers==this.controllers) return;
    
    this.valueForm = new Form(
      controllers.map(controller => {
        const validators=controller.validators ||[];
        this.requireValidator(controller,controller.required);
        return {
          id: controller.id,
          value: controller.value,
          validator: validators
        }}),
    );
    this.controllers=controllers;
    this.controllers.forEach(controller=>this.watchController(controller));
    this.valueForm.valueChange.subscribe(v=>this.formChange(v));
  }
  @Watch("valueForm._isChanged") watchValueFormChanged(changed: boolean) {
    this.hasChanged(changed);
  }
  
  @Emit("hasChanged") hasChanged(v: boolean) {}
  @Emit("formChange")formChange(v:any){}
  preControllers:any;
  valueForm: Form = new Form([]);
  controllers: YoFormController[] = [];
  // 获得form值
  getValue() {
    return preInstallControllerData.handleResult(this.controllers, {
      ...this.valueForm.value,
    });
  }

  /* 检查form校验结果
    @return null 时
   */
  async checkError(): Promise<string[] | void> {
    const errors = await this.valueForm.catchValidatorsErr();

    this.valueForm.controllers.forEach(item => {
      const controller: YoFormController = this.controllers.find(
        i => i.id === item.id,
      ) as YoFormController;

      controller.error =
        item.errors && item.errors.length ? item.errors[0] : "";
    });
    return errors;
  }
  reset() {
    this.valueForm.reset();
    this.controllers.forEach(i => (i.error = ""));
  }
  getUpdateValue() {
    return this.valueForm.getUpdatedValue();
  }
  setOrigin(v: Record<string, any>) {
    this.valueForm.setOriginValue(v);
  }
  
  patchListeners<T extends {[k:string]:(...args:any[])=>void},K extends keyof T>(
    listeners:{[P in keyof T]:T[P]},
    excludes:  K[]
  ):{[c in keyof T]?:(...args:any[])=>void}{
    const nextListeners:{[c in keyof T]?:(...args:any[])=>void}={};
    for(let i in listeners){
     if(listeners.hasOwnProperty(i)&&!excludes.includes(i as any)){
       nextListeners[i]=(...args:any[])=>{
         listeners[i](...args,this.valueForm);
       }
     }
    }
    return nextListeners;
  }
  watchController(controller:YoFormController){
    // Object.defineProperty()
    
    const self=this;

    if(controller.valueChangeOrder)controller.valueChangeOrder.unsubscribe();
    const change:any=controller.valueChange;
    controller.valueChangeOrder=self.valueForm.controllerDict[controller.id].valueChange.subscribe((controllerItem:ControllerItem)=>{
      controller.value=controllerItem.value;
      if(change){
        if(change instanceof Function)change(controller.value,self.valueForm);
        if(change.handle)change.handle(controller.value,self.valueForm);
      }
    })
    if(change&&change.immediate&&change.handle) change.handle(controller.value);
    
    controller._setFn=controller._setFn||{};
    if(!controller._setFn._value){
      proxyObj(controller,"value",{
        set(v){
          //@ts-ignore
          controller._setFn._value&&controller._setFn._value(v);
        },
        initV: controller.value
      })
    }
    if(!controller._setFn._required){
      proxyObj(controller,"required",{
        set(v){
          //@ts-ignore
          controller._setFn._required&&controller._setFn._required(v);
        },
        initV: controller.required
      })
    }
    controller._setFn._value=(v)=>{
      self.valueForm.value[controller.id]=v;
    }
    controller._setFn._required=(v)=>{
      self.requireValidator(controller,v);
    }
  }
  
  requireValidator(controller:YoFormController,append?:boolean){
    
    controller.validators= controller.validators ||[];
    const existsIndex=controller.validators.findIndex(validate=>validate instanceof requiredValidator);
    if(existsIndex<0&&append) controller.validators.push(new requiredValidator(`${controller.label}不能为空`));
    if(existsIndex>=0&&!append) controller.validators.splice(existsIndex,1);

  }
}
