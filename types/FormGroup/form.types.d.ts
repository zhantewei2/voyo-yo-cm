import { Form, Validator } from "@ztwx/form";
import { CreateElement, VNode } from "vue";
export declare type ControllerVal = string | number | boolean;
export declare type YoFormControllerBase = {
    id: string;
    value?: ControllerVal;
    validators?: Validator[];
    label: string;
    span?: number;
    star?: boolean;
    tag?: string;
    props?: {
        [key: string]: any;
    };
    attrs?: {
        [key: string]: any;
    };
    required?: boolean;
    error?: string;
    disablePreInstall?: boolean;
    valueChange?: (val: ControllerVal, form: Form) => void;
    disabled?: boolean;
    on?: {
        [key: string]: any;
    };
    shadow?: boolean;
};
export declare type YoFormControllerTag = {
    tag: string;
    render?: never;
} & YoFormControllerBase;
export declare type YoFormControllerRender = {
    tag?: never;
    render: (h: CreateElement, form: Form) => VNode;
} & YoFormControllerBase;
export declare type YoFormController = YoFormControllerTag | YoFormControllerRender;
export declare type YoForm = YoFormController[];
