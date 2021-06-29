const extractNumber = (str?: string): number => {
  if (!str) return 0;
  const matcher = str.match(/\d+(\.\d+)?/);
  return matcher ? Number(matcher[0]) : 0;
};
export const getTransitionTime = (el: HTMLElement): number => {
  const styles = getComputedStyle(el);
  const delay = extractNumber(
    styles["transitionDelay" || "webkitTransitionDelay"],
  );
  const duration = extractNumber(
    styles["transitionDuration" || "webkitTransitionDuration"],
  );
  return (delay + duration) * 1000;
};

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

const animationNext = (cb: () => void) =>
  requestAnimationFrame(() => requestAnimationFrame(() => cb()));
// const animationNext = (cb: any) => setTimeout(() => cb(), 100);

export class YoAnimation {
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
  constructor(params: AnimationEnterParams) {
    params.durationCache = params.durationCache ?? true;
    Object.assign(this, params);
  }
  preventLeaveCompleteCb() {
    this.declineLeaveComplete = true;
  }
  preventEnterCompleteCb() {
    this.declineEnterComplete = true;
  }
  enter() {
    this.check();
    this.declineEnterComplete = false;
    this.enterClass && this.el.classList.add(this.enterClass);
    this.enterRunning = true;
    this.el.addEventListener("transitionend", this.enterEnd);
    animationNext(() => {
      this.el.classList.add(this.enterActiveClass);
      this.enterClass && this.el.classList.remove(this.enterClass);
      this.enterToClass && this.el.classList.add(this.enterToClass);

      if (!this.durationCache || !this.enterDurationTime) {
        this.enterDurationTime = getTransitionTime(this.el);
      }
      if (!this.enterDurationTime) return this.enterEnd();

      this.enterTimeout = setTimeout(() => {
        this.enterTimeout = null;
        this.enterEnd();
      }, this.enterDurationTime + 1);
      this.enterStartCb && this.enterStartCb();
    });
  }
  enterEnd = () => {
    if (this.enterTimeout) {
      clearTimeout(this.enterTimeout);
      this.enterTimeout = null;
    }

    if (!this.enterRunning) return;
    this.el.removeEventListener("transitionend", this.enterEnd);
    this.el.classList.remove(this.enterToClass, this.enterActiveClass);
    this.enterRunning = false;

    !this.declineLeaveComplete &&
      this.enterCompleteCb &&
      this.enterCompleteCb();
  };

  leave() {
    this.check();
    this.declineLeaveComplete = false;
    this.leaveClass && this.el.classList.add(this.leaveClass);
    this.el.classList.add(this.leaveActiveClass);
    this.leaveRunning = true;
    this.el.addEventListener("transitionend", this.leaveEnd);
    animationNext(() => {
      this.leaveClass && this.el.classList.remove(this.leaveClass);
      this.leaveToClass && this.el.classList.add(this.leaveToClass);
      if (!this.durationCache || !this.leaveDurationTime) {
        this.leaveDurationTime = getTransitionTime(this.el);
      }
      if (!this.leaveDurationTime) return this.leaveEnd();
      this.leaveTimeout = setTimeout(() => {
        this.leaveTimeout = null;
        this.leaveEnd();
      }, this.leaveDurationTime + 1);
      this.leaveStartCb && this.leaveStartCb();
    });
  }
  leaveEnd = () => {
    if (this.leaveTimeout) {
      clearTimeout(this.leaveTimeout);
      this.leaveTimeout = null;
    }
    if (!this.leaveRunning) return;

    this.el.removeEventListener("transitionend", this.leaveEnd);
    this.el.classList.remove(this.leaveActiveClass, this.leaveToClass);
    this.leaveRunning = false;
    !this.declineLeaveComplete &&
      this.leaveCompleteCb &&
      this.leaveCompleteCb();
  };

  check() {
    this.enterRunning && this.enterEnd();
    this.leaveRunning && this.leaveEnd();
  }
}
