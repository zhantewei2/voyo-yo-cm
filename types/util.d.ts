import { Observable } from "rxjs";
import { CreateElement, RenderContext, VNode } from "vue";
export declare const resolveClass: (data: any, addition?: string[]) => any[];
export declare const resolveStyle: (data: any, addition?: Record<string, string>[]) => any[];
export declare const watchIsMobile: ({ immediate, }: {
    immediate?: boolean | undefined;
}) => Observable<boolean>;
export declare const listenHistoryExit: (exist: () => void) => import("rxjs").Subscription;
declare type ModalIndex = number;
declare type ModalName = string;
declare class ModalIndexManager {
    minIndex: ModalIndex;
    modals: Record<ModalName, ModalIndex>;
    currentModal: string;
    registryModal(name: ModalName): ModalIndex;
    unRegistryModal(name: ModalName): void;
    activeModal(name: ModalName): ModalIndex;
}
export declare const modalIndexManager: ModalIndexManager;
export declare const VNodeHook: {
    functional: boolean;
    render(h: CreateElement, params: RenderContext<{
        hook?: Hooks;
        transition?: Record<string, any>;
    }>): any;
};
export declare const yoCreateElement: (tag: any, a: any, b: any) => any;
export interface Hooks {
    create?: (v: VNode) => void;
    insert?: (v: VNode) => void;
    init?: (v: VNode) => void;
    prePatch?: (oldV: VNode, nowV: VNode) => void;
    destroy?: (v: VNode) => void;
    update?: (v: VNode) => void;
}
export declare const defineVNodeHook: <T extends VNode>(vNode: T, hooks: Hooks) => T;
export declare const defineVNodeTransition: <T extends VNode>(vNode: T, transitionHook: Record<string, any>) => T;
export declare const createEvent: (name: string) => Event;
export declare class ExecuteDistinctAfter<T> {
    params: T;
    afterCbDict: Record<string, () => void>;
    mounted: boolean;
    execute(id: string, cb: (params: T) => void): void;
    mount(params: T): void;
}
export declare class YoVueComponent {
    constructor();
}
export {};
