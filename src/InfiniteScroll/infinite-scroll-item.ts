import { Component, Prop, Vue } from "vue-property-decorator";
import { CreateElement, VNode } from "vue";
import InfiniteScrollContainer from "./infinite-scroll-container";
import { Subscription } from "rxjs";

@Component({
  render(this: InfiniteScrollItem, h: CreateElement) {
    return h(
      "div",
      {
        style: {
          position: "absolute",
          width: "100%",
          top: 0,
        },
        ref: "item",
        hook: {
          create: () => {},
          insert: (vNode: VNode) => {
            this.registry();
          },
        },
      },
      this.$scopedSlots.default && this.$scopedSlots.default(this.refDict),
    );
  },
})
export default class InfiniteScrollItem extends Vue {
  @Prop({}) scrollIndex: number;
  $refs: {
    item: HTMLElement;
  };

  refDict = {
    page: 0,
  };
  parentComponent: InfiniteScrollContainer | undefined;
  top: number = 0;
  subOrder: Subscription;
  position: number;
  topDebounce: number;
  bottomDebounce: number;
  offsetHeight: number;
  registry() {
    this.offsetHeight = this.$refs.item.offsetHeight;
    this.pos((this.position = this.offsetHeight * this.scrollIndex));
    if (this.parentComponent) this.parentComponent.registryItem(this);
  }
  refresh() {
    this.registry();
  }

  async mounted() {
    if (!this.parentComponent) return;

    await this.parentComponent.queueAfterMounted.awaitPromise();
    const distance = this.parentComponent.overflowCount * this.offsetHeight;
    this.topDebounce = 0 - distance;
    this.bottomDebounce = this.parentComponent.clientHeight + distance;
    const realBottomDebounce =
      this.parentComponent.renderCount * this.offsetHeight - distance;
    this.bottomDebounce =
      realBottomDebounce > this.bottomDebounce
        ? realBottomDebounce
        : this.bottomDebounce;

    this.subOrder = this.parentComponent.moveSubject.subscribe(v => {
      this.moveEl(v.val);
    });
  }

  moveEl(velocity: number) {
    this.position += velocity;
    if (this.position < this.topDebounce) {
      this.position = this.bottomDebounce - this.topDebounce + this.position;
      this.refDict.page++;
    }
    if (this.position > this.bottomDebounce) {
      this.position = this.topDebounce + this.position - this.bottomDebounce;
      this.refDict.page--;
    }

    this.pos(this.position);
  }
  pos(num: number) {
    (this
      .$el as HTMLElement).style.transform = `translate3d(0,${this.position}px,0)`;
  }
  beforeDestroy() {
    this.subOrder && this.subOrder.unsubscribe();
  }
}
