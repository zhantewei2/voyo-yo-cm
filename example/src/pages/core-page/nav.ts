import {
  NavListItem,
  NavDataHandler,
  dataFactory,
} from "@voyo/core/dest/utils";
import { Subject, merge, of } from "rxjs";
import VueRouter from "vue-router";
import { NavHeaderBump, NavData, NavDataSourceName } from "./nav.types";
import { router } from "@/router";

export class Nav {
  currentNavName?: NavDataSourceName;
  router: VueRouter;
  navMenuStatus = false;

  navDataCache = true;
  navData: NavListItem[] = []; // 左侧显示数据

  navDataRecords: Record<NavDataSourceName, NavData> = {}; //总数据缓存区

  navHeaderBumps: NavHeaderBump[]; //header bumps导航

  navDataFactory: NavDataHandler = new NavDataHandler();
  navDataChange: Subject<NavListItem[]> = new Subject<NavListItem[]>();
  navMenuChange: Subject<boolean> = new Subject<boolean>();
  navDataBeforeChange: Subject<{
    navDataSourceName: NavDataSourceName;
    cb: (data: NavData) => void;
  }> = new Subject();

  constructor() {}

  watchNavMenuChangeImmediate() {
    return merge(of(this.navMenuStatus), this.navMenuChange);
  }
  watchNavDataImmediate() {
    return merge(of(this.navData), this.navDataChange);
  }
  navMenuTrigger() {
    this.navMenuChange.next((this.navMenuStatus = !this.navMenuStatus));
  }
  navMenuClose() {
    this.navMenuChange.next((this.navMenuStatus = false));
  }

  navSetNavData(navData: NavData) {
    this.navData = dataFactory(navData);
    this.navDataFactory.setData(this.navData);
    this.navDataChange.next(this.navData);
  }
  navPathChange(path: string) {
    try {
      this.navDataFactory.collapseNavCardFromPath(path);
    } catch (e) {
      console.warn("navPathChange", e);
    }
  }
  navItemClick(item: NavListItem, nextClick?: (i: NavListItem) => void) {
    this.navDataFactory.clickItem(item, () => {
      if (item.path === router.currentRoute.path) return;
      item.path && this.router.push(item.path);
      nextClick && nextClick(item);
      this.navMenuClose();
    });
  }

  /**
   *
   * @param name
   * @return open new
   */
  setNavDataByName(name: NavDataSourceName): Promise<boolean> {
    if (name === this.currentNavName) return Promise.resolve(false);
    this.currentNavName = name;
    if (this.navDataCache && this.navDataRecords[name]) {
      this.navSetNavData(this.navDataRecords[name]);
      return Promise.resolve(true);
    } else {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.navDataBeforeChange.next({
            cb: (data) => {
              this.navSetNavData((this.navDataRecords[name] = data));
              resolve(true);
            },
            navDataSourceName: name,
          });
        });
      });
    }
  }

  openDefaultNavData(name: NavDataSourceName, openFirst?: boolean) {
    this.setNavDataByName(name).then((openNew) => {
      if (!openNew || !openFirst) return; // 没有更换navData||没有自动展开第一项
      this.openFirstNavItem(this.navData);
    });
  }

  /** 打开,第一个拥有path的NavListItem
   *
   * @param list
   * @return found.
   */
  openFirstNavItem(list: NavListItem[]): any {
    if (!list || !list.length) return false;
    for (const i of list) {
      if (i.children && this.openFirstNavItem(i.children)) return true;
      if (i.path) {
        this.safePush(i.path);
        return true;
      }
    }
    return false;
  }
  safePush(path: string) {
    if (path !== this.router.currentRoute.fullPath) this.router.push(path);
  }
}

export const nav = new Nav();
