import Vue, { VNode } from "vue";
import { FormGroup } from "./form-group";
import { ExcuteAfterConnected } from "@ztwx/utils/lib/web";
export declare class UpdateFormGroup extends Vue {
    originValue: any;
    updateFn: (value: any) => Promise<void>;
    defaultError: string;
    confirmText: string;
    cancelText: string;
    autoMsg: boolean;
    resetEmit(): void;
    formChange(v: any): void;
    watchOriginValue(v: Record<string, any>): void;
    executeAfterFormGroup: ExcuteAfterConnected;
    formChanged: boolean;
    $refs: {
        form: FormGroup;
    };
    updateLoading: boolean;
    groupInstance: FormGroup;
    beforeCreate(): void;
    formGroupInserted(e: VNode): void;
    hasChanged(v: boolean): void;
    resetForm(): void;
    toUpdate(): Promise<void>;
}
