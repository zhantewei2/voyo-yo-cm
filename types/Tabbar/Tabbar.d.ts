import { CreateElement, VNode } from "vue";
export declare const filterTabbarItem: (children: VNode[]) => VNode[];
export declare const Tabbar: {
    render(this: any, h: CreateElement): JSX.Element | null;
    props: {
        type: {
            default: string;
            type: StringConstructor;
        };
        value: {
            default: number;
            type: NumberConstructor;
        };
        color: {
            default: import("..").YoColors;
            type: StringConstructor;
        };
        bottomBorder: {
            type: BooleanConstructor;
            default: boolean;
        };
    };
    beforeCreate(this: any): void;
    watch: {
        value: {
            immediate: boolean;
            handler(this: any, v: number): void;
        };
    };
    data(): {
        key: string;
    };
    updated(this: any): void;
    methods: {
        cal(this: any): void;
        selectItem(this: any, index: number): void;
        checkThumb(this: any, index: number): void;
    };
};
export declare const TabbarItem: {
    props: {
        ripple: {
            default: boolean;
            type: BooleanConstructor;
        };
    };
    data(): {
        name: string;
        isActive: boolean;
    };
    methods: {
        click(this: any): void;
        active(this: any): void;
        disActive(this: any): void;
    };
    mounted(): void;
    render(this: any, h: CreateElement): VNode;
};
