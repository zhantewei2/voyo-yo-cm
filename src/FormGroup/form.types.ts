import {Form, SubjectOrder, Validator} from "@ztwx/form";
import {CreateElement, VNode, VNodeData} from "vue";
import {Subscription} from "rxjs";

export type ControllerVal = string | number | boolean;
export type ControllerValueChangeFn=  (val:ControllerVal,form:Form)=>void;


export type YoFormControllerBase = {
  id: string;
  value?: ControllerVal; //初始值
  validators?: Validator[];
  label: string; //label
  span?: number; // cell占据column数，默认1
  star?: boolean; //star 红色*
  tag?: string; // value标签
  props?: { [key: string]: any };
  attrs?: {[key:string]:any}
  required?: boolean;
  error?: string;
  disablePreInstall?: boolean; //禁用全局处理 tag
  valueChange? : ControllerValueChangeFn | {
    immediate?: boolean;
    handle: ControllerValueChangeFn
  }  // controller value改变
  disabled?:boolean ;//disabled;
  on?:{ [key: string]: any };
  shadow?: boolean; /// 不显示于ui;
  valueChangeOrder?: SubjectOrder<any>;
  _setFn?:{
    _value?: (v:ControllerVal)=>void;
    _required?:(v:boolean)=>void;
  }
};

export type YoFormControllerTag = {
  tag: string;
  render?: never;
} & YoFormControllerBase;

export type YoFormControllerRender = {
  tag?: never;
  render: (h: CreateElement, form: Form) => VNode; //value  render渲染
} & YoFormControllerBase;

export type YoFormController = YoFormControllerTag | YoFormControllerRender;

export type YoForm = YoFormController[];
