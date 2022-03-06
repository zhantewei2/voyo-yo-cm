import { YoAnimation } from "../animateUtils";
export declare class BlockLoading {
    el: HTMLElement;
    animation: YoAnimation;
    parent: HTMLElement;
    img: HTMLImageElement;
    constructor(parent: HTMLElement);
    load(): void;
    calImgStyle(): void;
    end(): void;
}
