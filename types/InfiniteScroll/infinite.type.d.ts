export declare const infiniteSetting: {
    deceleration: number;
    frames: number;
};
export declare const getCurrentVelocity: (velocity: number) => number;
export declare enum MoveType {
    stop = 0,
    move = 1
}
export interface MoveAction {
    type: MoveType;
    val: number;
}
export declare type PositionRequestParams = {
    move: (v: number, pos: number) => void;
    position: number;
    velocity: number;
};
export declare class PositionRequestFrame {
    breakOut: boolean;
    stop(): void;
    start(params: PositionRequestParams): void;
    run({ move, position, velocity }: PositionRequestParams): void;
}
