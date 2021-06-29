import loaderBlock from "!!url-loader!./assets/loader-block.svg";
import loaderInline from "!!url-loader!./assets/loader-inline.svg";
import backImg from "!!url-loader!./assets/back.svg";
import closeImg from "!!url-loader!./assets/close.svg";
import { YoColors } from "./interface";

export interface Setting {
  installStoreKey: string;
  modal: {
    baseIndex: number;
  };
  loader: {
    //loader图片 base64格式
    blockImg: string;
    inlineImg: string;
  };
  icons: {
    backImg: string;
    closeImg: string;
  };
  media: {
    mobile: string; //设置手机模式的media
  };
  tabbar: {
    defaultColor: YoColors; //tabbar默认颜色配置
  };
  card: {
    footerAlign: "center" | "left" | "right";
  };
  group: {
    grid: number; // 默认group grid 大小
    span: number; // 默认cell占据格子数
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

export const setting: Setting = {
  installStoreKey: "$yo-pc-vue2-component-store",
  loader: {
    blockImg: loaderBlock,
    inlineImg: loaderInline,
  },
  modal: {
    baseIndex: 5000,
  },
  icons: {
    backImg,
    closeImg,
  },
  media: {
    mobile: "(max-width: 799px)",
  },
  tabbar: {
    defaultColor: "primary",
  },
  card: {
    footerAlign: "center",
  },
  group: {
    grid: 5,
    span: 1,
    dynamicGrid: (w) => {
      if (w >= 1000) {
        return 5;
      } else if (w < 1000 && w >= 800) {
        return 4;
      } else if (w < 800 && w >= 600) {
        return 3;
      } else if (w < 600 && w >= 400) {
        return 2;
      } else {
        return 1;
      }
    },
  },
  tooltip: {
    containerClass: "yo-tooltip-container",
    position: "top",
  },
};
