import { Subject } from "rxjs";
import { BlockLoading } from "./BlockLoading";
export { BlockLoading } from "./BlockLoading";
declare const blockLoadingKey = "yo-patch-block-loading";
export declare type TargetElement = HTMLElement & {
    [blockLoadingKey]: BlockLoading;
};
export declare class PatchLoading {
    clickSubject: Subject<HTMLElement>;
    targetElement: TargetElement | null;
    patchMethods: string[];
    patch(): void;
    constructor();
    showLoading(): void;
    hideLoading(): void;
    shellTargetElement(targetElement: HTMLElement): void;
}
export declare const patchLoading: PatchLoading;
