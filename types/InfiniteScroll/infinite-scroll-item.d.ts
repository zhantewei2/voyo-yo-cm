import { Vue } from "vue-property-decorator";
import InfiniteScrollContainer from "./infinite-scroll-container";
import { Subscription } from "rxjs";
export default class InfiniteScrollItem extends Vue {
    scrollIndex: number;
    $refs: {
        item: HTMLElement;
    };
    refDict: {
        page: number;
    };
    parentComponent: InfiniteScrollContainer | undefined;
    top: number;
    subOrder: Subscription;
    position: number;
    topDebounce: number;
    bottomDebounce: number;
    offsetHeight: number;
    registry(): void;
    refresh(): void;
    mounted(): Promise<void>;
    moveEl(velocity: number): void;
    pos(num: number): void;
    beforeDestroy(): void;
}
