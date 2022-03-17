import { VNodeData } from "vue";
import { YoForm, YoFormController, ControllerVal } from "./form.types";
export declare type preInstallDataFn = <T extends VNodeData>(tagName: string, data: T) => T;
export declare type resultHandleFn = <T extends {
    [key: string]: any;
}>(yoForm: YoForm, value: T) => {
    [key in keyof T]: any;
};
export declare type inputValHandleFn = (controller: YoFormController, v: ControllerVal) => ControllerVal;
export declare const createForm: <T extends YoForm>(form: T) => T;
export declare class PreInstallControllerData {
    list: Array<preInstallDataFn>;
    listResult: Array<resultHandleFn>;
    listInputVal: Array<inputValHandleFn>;
    handle: <T extends VNodeData>(tagName: string, data: T, disabled?: boolean | undefined) => VNodeData;
    handleResult: resultHandleFn;
    handleInputVal: inputValHandleFn;
    registry(fn: preInstallDataFn): void;
    registryResult(fn: resultHandleFn): void;
    registryInputVal(fn: inputValHandleFn): void;
}
export declare const preInstallControllerData: PreInstallControllerData;
export declare const yoPreHandleForm: () => void;
