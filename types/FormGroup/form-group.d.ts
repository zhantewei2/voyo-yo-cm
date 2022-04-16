import Vue, { CreateElement, VNode } from "vue";
import { Form, Validator } from "@ztwx/form";
import { YoFormController } from "./form.types";
import { QueueRun } from "@ztwx/utils";
export declare const errorMsg: (h: CreateElement, controller: YoFormController) => VNode | null;
export declare class FormGroup extends Vue {
    form: YoFormController[];
    grid: number;
    controllerError: boolean;
    formDisabled: boolean;
    dynamicErrorWatch: boolean;
    originValue: any;
    resetting: boolean;
    watchForm(controllers: YoFormController[]): void;
    watchValueFormChanged(changed: boolean): void;
    watchOriginValue(v: any): void;
    hasChanged(v: boolean): void;
    formChange(v: any): void;
    queueAfterMounted: QueueRun<null, void>;
    valueForm: Form;
    controllers: YoFormController[];
    getValue(): {
        [x: string]: any;
    };
    checkError(): Promise<string[] | void>;
    checkControllerError(controller: YoFormController): Promise<void>;
    reset(): void;
    getUpdateValue(): {
        [x: string]: any;
    };
    setOrigin(v: Record<string, any>): void;
    patchListeners<T extends {
        [k: string]: (...args: any[]) => void;
    }, K extends keyof T>(listeners: {
        [P in keyof T]: T[P];
    }, excludes: K[]): {
        [c in keyof T]?: (...args: any[]) => void;
    };
    watchController(controller: YoFormController): void;
    requireValidator(controller: YoFormController, append?: boolean): Validator[];
    mounted(): void;
}
