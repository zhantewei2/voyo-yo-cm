import { NavListItem } from "@voyo/core/dest/utils";

export type NavDataSourceName = string;
export type NavData = NavListItem[];
export interface NavHeaderBump {
  navName: NavDataSourceName;
  label: string;
  active: boolean; // 是否激活
  routeWatch: string | RegExp; //根据匹配的路由地址动态激活
}
