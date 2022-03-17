import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import { VNode } from "vue";
import { verticalTouch } from "@voyo/core/dest/utils";
import { Subject, Subscription } from "rxjs";
import { MoveAction, MoveType, PositionRequestFrame } from "./infinite.type";
import { QueueRun } from "@ztwx/utils";
import { map, distinctUntilChanged } from "rxjs/operators";
import InfiniteScrollItem from "./infinite-scroll-item";
import { prepatchInsert } from "../util";

@Component({
  render(this: InfiniteScrollContainer, h) {
    let slotDefault: any = this.$scopedSlots.default;
    return h(
      "div",
      {
        hook: {
          insert: (vNode: VNode) => {
            this.containerEl = vNode.elm as HTMLElement;
            this.mountContainer(vNode.elm);
          },
        },
        style: {
          position: "relative",
        },
      },
      slotDefault
        ? new Array(this.renderCount).fill(1).map((i, index) => {
            const nodes = slotDefault({ index });
            nodes.forEach((node: VNode) => {
              prepatchInsert(node, v => {
                (v.componentInstance as any).parentComponent = this;
              });
            });
            return nodes;
          })
        : null,
    );
  },
})
export default class InfiniteScrollContainer extends Vue {
  @Prop({ default: 1 }) renderCount: number;
  @Prop({ default: 2 }) overflowCount: number;
  @Emit("scroll") scroll(e: { scrollTop: number; scrollHeight: number }) {}
  @Emit("change") indexChange(index: number) {}

  moveSubject: Subject<MoveAction>;
  positionRequestFrame: PositionRequestFrame;
  clientHeight: number;
  containerEl: HTMLElement;
  queueAfterMounted: QueueRun<any, any>;
  itemHeight: number;
  moveOrder: Subscription;
  visualScrollTop: number;
  visualScrollIndex: number;
  items: InfiniteScrollItem[];

  created() {
    this.moveSubject = new Subject<MoveAction>();
    this.queueAfterMounted = new QueueRun<any, any>();
    this.items = [];
  }

  mountContainer(container?: Node) {
    if (!this.positionRequestFrame)
      this.positionRequestFrame = new PositionRequestFrame();

    verticalTouch({
      element: container,
      begin: () => {
        this.positionRequestFrame.stop();
        this.moveSubject.next({
          type: MoveType.stop,
          val: 0,
        });
      },
      move: opts => {
        this.moveSubject.next({
          type: MoveType.move,
          val: opts.perY,
        });
      },
      end: ({ momentSpeed }) => {
        if (!momentSpeed) return;

        this.positionRequestFrame.start({
          position: 0,
          velocity: momentSpeed / 10,
          move: (velocity:number, position:number) => {
            this.moveSubject.next({
              type: MoveType.move,
              val: velocity,
            });
          },
        });
      },
      moment: true,
    });
  }
  registryItem(item: InfiniteScrollItem) {
    this.itemHeight = item.offsetHeight;

    if (!this.items.find(i => i === item)) this.items.push(item);
  }

  mounted() {
    this.clientHeight = this.containerEl.clientHeight;
    this.queueAfterMounted.end(null);
    // console.log(this.$children);
    this.visualScrollTop = 0;
    this.moveOrder = this.moveSubject
      .pipe(
        map(({ val }) => {
          this.visualScrollTop += val;
          this.scroll({
            scrollTop: this.visualScrollTop,
            scrollHeight: this.clientHeight,
          });

          return (this.visualScrollIndex =
            0 - Math.floor(this.visualScrollTop / this.itemHeight));
        }),
        distinctUntilChanged(),
      )
      .subscribe(index => {
        this.indexChange(index);
      });
  }
  refresh() {
    this.visualScrollTop = 0;
    this.visualScrollIndex = 0;
    this.items.forEach(item => item.refresh());
  }
  beforeDestroy() {
    this.moveOrder && this.moveOrder.unsubscribe();
  }
}
