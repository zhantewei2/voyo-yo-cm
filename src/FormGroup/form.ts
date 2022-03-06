import { VNodeData } from "vue";
import {
  YoForm,
  YoFormController,
  ControllerVal
} from "./form.types";

export type preInstallDataFn = <T extends VNodeData>(
  tagName: string,
  data: T,
) => T;

export type resultHandleFn = <T extends { [key: string]: any }>(
  yoForm: YoForm,
  value: T,
) => {
  [key in keyof T]: any;
};

export type inputValHandleFn = (
  controller: YoFormController,
  v: ControllerVal,
) => ControllerVal;


export const createForm=<T extends YoForm>(form:T):T=>{
  form.forEach(controller=>{
    controller.error=controller.error??"";
    controller.star=controller.star??controller.required;
    controller.validators=controller.validators || [];
  })
  return form;
}

export class PreInstallControllerData {
  list: Array<preInstallDataFn> = [];
  listResult: Array<resultHandleFn> = [];
  listInputVal: Array<inputValHandleFn> = [];

  handle = <T extends VNodeData>(
    tagName: string,
    data: T,
    disabled?: boolean,
  ): VNodeData => {
    if (disabled) return data;
    this.list.forEach(i => i && i(tagName, data));
    return data;
  };
  handleResult: resultHandleFn = (yoForm: YoForm, value) => {
    this.listResult.forEach(fn => fn && fn(yoForm, value));
    return value;
  };

  handleInputVal: inputValHandleFn = (controller, value) => {
    this.listInputVal.forEach(fn => fn && (value = fn(controller, value)));
    return value;
  };

  registry(fn: preInstallDataFn) {
    this.list.push(fn);
  }
  registryResult(fn: resultHandleFn) {
    this.listResult.push(fn);
  }
  registryInputVal(fn: inputValHandleFn) {
    this.listInputVal.push(fn);
  }
}

export const preInstallControllerData = new PreInstallControllerData();

preInstallControllerData.registryResult((yoForm, value) => {
  yoForm.forEach(i => {
    if (i.tag === "el-input") {
      if (i.props && i.props.type === "number") {
        const v: any = value[i.id];
        (value as any)[i.id] = v !== undefined && v !== null?
          v===""?undefined: Number(v) :
          v;
      }
    }
  });
  return value;
});
preInstallControllerData.registry((tagName, data) => {
  if (tagName === "el-input") {
    data.props = data.props || {};
    data.props.clearable = true;
  }
  return data;
});

preInstallControllerData.registryInputVal((controller, val) => {
  if (controller.props && controller.props.type === "number") {
    return val !== undefined && val !== null ? 
      val===""? (undefined as any) : Number(val) :
      val;
  }
  return val;
});
