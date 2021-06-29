import { CreateElement, VNode } from "vue";
import { DirectiveBinding } from "vue/types/options";
export declare type TooltipPosition = "top" | "left" | "right" | "bottom";
export declare type TooltipTrigger = "hover" | "tap";
export declare const TOOLTIP_TAP_EVENT_NAME = "yo-tooltip-tap-event";
export declare const TOOLTIP_TAP_LISTEN_NAME = "yo-tooltip-tap-listen";
export declare const insertBody: (tooltipEl: HTMLElement, bindEl: HTMLElement, position: TooltipPosition) => void;
export declare const createTooltipContainer: ({ h, children, position, bindEl, insertedCb, className, destroyCb }: {
    h: CreateElement;
    position: TooltipPosition;
    children?: VNode[] | string | undefined;
    bindEl: HTMLElement;
    insertedCb?: ((el: HTMLElement) => void) | undefined;
    destroyCb?: (() => void) | undefined;
    className: string;
}) => VNode;
export declare type SwitchRef = {
    clearOrder?: () => void;
    isEnter: boolean;
};
export declare const bindTooltipComponent: {
    props: {
        containerClass: {};
    };
    data(): {
        show: boolean;
        position: string;
    };
    beforeCreate(this: any): void;
    deactivated(this: any): void;
    beforeDestroy(this: any): void;
    activated(this: any): void;
    render(this: any, h: CreateElement): VNode;
};
export declare const TooltipComponent: any;
export declare const TooltipDirective: {
    bind(el: HTMLElement, { modifiers, value }: DirectiveBinding): void;
};
