import Vue, { CreateElement, VNode } from "vue";
import { Form } from "@ztwx/form";
import { YoFormController } from "./form.types";
export declare const errorMsg: (h: CreateElement, controller: YoFormController) => VNode | null;
export declare class FormGroup extends Vue {
    form: YoFormController[];
    grid: number;
    controllerError: boolean;
    formDisabled: boolean;
    watchForm(controllers: YoFormController[]): void;
    watchValueFormChanged(changed: boolean): void;
    hasChanged(v: boolean): void;
    formChange(v: any): void;
    preControllers: any;
    valueForm: Form;
    controllers: YoFormController[];
    getValue(): {
        [x: string]: any;
    };
    checkError(): Promise<string[] | void>;
    reset(): void;
    getUpdateValue(): Record<string, any> | undefined;
    setOrigin(v: Record<string, any>): void;
    patchListeners<T extends {
        [k: string]: (...args: any[]) => void;
    }, K extends keyof T>(listeners: {
        [P in keyof T]: T[P];
    }, excludes: K[]): {
        [c in keyof T]?: (...args: any[]) => void;
    };
    watchController(controller: YoFormController): void;
    requireValidator(controller: YoFormController, append?: boolean): void;
}