export const infiniteSetting = {
  deceleration: 0.998,
  frames: 60,
};

export const getCurrentVelocity = (velocity: number): number =>
  velocity *
  Math.pow(infiniteSetting.deceleration, 1000 / infiniteSetting.frames);

export enum MoveType {
  stop = 0,
  move = 1,
}

export interface MoveAction {
  type: MoveType;
  val: number;
}

export type PositionRequestParams = {
  move: (v: number, pos: number) => void;
  position: number;
  velocity: number;
};

export class PositionRequestFrame {
  breakOut: boolean = false;

  stop() {
    this.breakOut = true;
  }
  start(params: PositionRequestParams) {
    this.breakOut = false;
    this.run(params);
  }

  run({ move, position, velocity }: PositionRequestParams) {
    if (this.breakOut) return;
    const endVelocity = getCurrentVelocity(velocity);
    const curVelocity = (velocity + endVelocity) / 2;
    const curPosition = position + curVelocity;
    if (Math.abs(endVelocity) < 1) return;
    move(curVelocity, curPosition);
    requestAnimationFrame(() =>
      this.run({
        move,
        position: curPosition,
        velocity: endVelocity,
      }),
    );
  }
}
