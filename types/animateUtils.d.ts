export declare const getTransitionTime: (el: HTMLElement) => number;
export interface AnimationEnterParams {
    el: HTMLElement;
    enterClass: string;
    enterActiveClass: string;
    leaveActiveClass: string;
    leaveToClass: string;
    leaveClass?: string;
    enterToClass?: string;
    enterDurationTime?: number;
    leaveDurationTime?: number;
    durationCache?: boolean;
    enterCompleteCb?: () => void;
    enterStartCb?: () => void;
    leaveCompleteCb?: () => void;
    leaveStartCb?: () => void;
}
export declare class YoAnimation {
    enterTimeout: any;
    leaveTimeout: any;
    el: HTMLElement;
    enterClass: string;
    enterActiveClass: string;
    enterToClass: string;
    leaveActiveClass: string;
    leaveToClass: string;
    leaveClass: string;
    enterDurationTime: number;
    leaveDurationTime: number;
    enterRunning: boolean;
    leaveRunning: boolean;
    durationCache: boolean;
    enterCompleteCb: () => void;
    enterStartCb: () => void;
    leaveCompleteCb: () => void;
    leaveStartCb: () => void;
    declineLeaveComplete: boolean;
    declineEnterComplete: boolean;
    constructor(params: AnimationEnterParams);
    preventLeaveCompleteCb(): void;
    preventEnterCompleteCb(): void;
    enter(): void;
    enterEnd: () => void;
    leave(): void;
    leaveEnd: () => void;
    check(): void;
}
