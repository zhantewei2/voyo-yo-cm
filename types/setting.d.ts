import { YoColors } from "./interface";
export interface Setting {
    installStoreKey: string;
    modal: {
        baseIndex: number;
    };
    loader: {
        blockImg: string;
        inlineImg: string;
    };
    icons: {
        backImg: string;
        closeImg: string;
    };
    media: {
        mobile: string;
    };
    tabbar: {
        defaultColor: YoColors;
    };
    card: {
        footerAlign: "center" | "left" | "right";
    };
    group: {
        grid: number;
        span: number;
        /**
         * 控制动态grid逻辑。
         * @width 为当前group的宽度
         * @return 返回grid数
         *
         * example:
         *
         * (width)=>{
         *   if(width>=1000){
         *    return 5;
         *  }else{
         *    return 4;
         *  }
         */
        dynamicGrid: (width: number) => number;
    };
    tooltip: {
        containerClass: string;
        position: "top" | "left" | "right" | "bottom";
    };
}
export declare const setting: Setting;
