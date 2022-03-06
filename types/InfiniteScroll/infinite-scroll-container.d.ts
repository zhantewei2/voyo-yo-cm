import { Vue } from "vue-property-decorator";
import { Subject, Subscription } from "rxjs";
import { MoveAction, PositionRequestFrame } from "./infinite.type";
import { QueueRun } from "@ztwx/utils";
import InfiniteScrollItem from "./infinite-scroll-item";
export default class InfiniteScrollContainer extends Vue {
    renderCount: number;
    overflowCount: number;
    scroll(e: {
        scrollTop: number;
        scrollHeight: number;
    }): void;
    indexChange(index: number): void;
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
    created(): void;
    mountContainer(container?: Node): void;
    registryItem(item: InfiniteScrollItem): void;
    mounted(): void;
    refresh(): void;
    beforeDestroy(): void;
}
