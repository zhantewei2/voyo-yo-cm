import Vue from "vue";
export interface ModuleReturn {
    install: (v: typeof Vue) => void;
}
export declare const YoModule: ModuleReturn;
export declare const GroupModule: ModuleReturn;
export declare const CardModule: ModuleReturn;
export declare const TeleportModule: ModuleReturn;
export declare const LoadModule: ModuleReturn;
export declare const TableModule: ModuleReturn;
export declare const TabsModule: ModuleReturn;
export declare const TabbarModule: ModuleReturn;
export declare const TooltipModule: ModuleReturn;
export declare const MdModule: ModuleReturn;
export declare const ModalModule: ModuleReturn;
export declare const FormGroupModule: ModuleReturn;
export declare const AllModule: {
    install(vue: typeof Vue): void;
};
