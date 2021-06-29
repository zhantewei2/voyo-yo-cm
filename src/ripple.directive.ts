import { handleRipple, RippleOpts } from "@voyo/core/dest/utils/ripple";
//@ts-ignore
import { DirectiveBinding } from "vue";

export const ripple = {
  inserted(el: HTMLElement, binding: DirectiveBinding<RippleOpts>) {
    const opts: RippleOpts = binding.value || {};
    if (opts.autoSize === undefined) opts.autoSize = true;
    handleRipple(el, opts);
  },
};
