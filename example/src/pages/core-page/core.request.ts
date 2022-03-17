import { Observable, of } from "rxjs";
import { NavListItem } from "@voyo/core/dest/utils";
import { NavData, NavDataSourceName } from "@/pages/core-page/nav.types";

export const queryNavData = (name: NavDataSourceName): Observable<NavData> => {
  if (name == "a") {
    return of([
      { label: "首页", path: "/main/module-one/home" },
      { label: "Card 卡片", path: "/main/module-one/card" },
      { label: "Group 布局", path: "/main/module-one/group" },
      { label: "Form Group表单", path: "/main/module-one/group-form"},
      { label: "Modal 弹窗", path: "/main/module-one/modal" },
      { label: "Table 表单", path: "/main/module-one/table" },
      { label: "tabs 窗口栏", path: "/main/module-one/tabs" },
      { label: "tabbar 标签栏", path: "/main/module-one/tabbar" },
      { label: "tooltip 文本提示", path: "/main/module-one/tooltip" },
    ]);
  } else {
    return of([
      { label: "two-1", path: "/main/module-two/example-ts" },
      { label: "two-2", path: "/main/module-two/example-js" },
    ]);
  }
};
