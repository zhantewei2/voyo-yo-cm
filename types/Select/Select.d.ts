import { CreateElement, RenderContext } from "vue";
export declare type SelectParams = {
    options: Array<{
        label: string;
        value: string;
    }>;
};
export declare const Select: {
    functional: boolean;
    inheritAttrs: boolean;
    render(h: CreateElement, params: RenderContext<SelectParams>): import("vue").VNode;
};
