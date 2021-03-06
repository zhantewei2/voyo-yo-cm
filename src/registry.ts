import Vue from "vue";
import {Module} from "./util";
import { ripple } from "./ripple.directive";
import { Group, Cell } from "./Group/Group";
import { Card } from "./Card/Card";
import Table from "./Table/Table-component.vue";
import { Loader } from "./Loader/Loader";
import Modal from "./Modal/Modal.vue";
import { Teleport } from "./Teleport/Teleport";
import { VNodeHook } from "./util";
import { TooltipComponent, TooltipDirective } from "./Tooltip/Tooltip";
import Tabs from "./Tabs/Tabs-component.vue";
import { TabDirective } from "./Tabs/Tab.directive";
import { Tabbar, TabbarItem } from "./Tabbar/Tabbar";
import { Md } from "./Md/md";
import {FormGroup, UpdateFormGroup, yoPreHandleForm} from "./FormGroup";
import {Select} from "./Select/Select";


export interface ModuleReturn {
  install: (v: typeof Vue) => void;
}


export const YoModule = Module("yo", (vue) => {
  vue.directive("yo-ripple", ripple);
  vue.component("yo-vnode", VNodeHook);
});

export const GroupModule = Module("group", (vue) => {
  vue.component("yo-group", Group);
  vue.component("yo-cell", Cell);
});

export const CardModule = Module("card", (vue) => {
  vue.component("yo-card", Card);
});
export const TeleportModule = Module("teleport", (vue) => {
  vue.component("yo-teleport", Teleport);
});

export const LoadModule = Module("loader", (vue) => {
  vue.component("yo-loader", Loader);
});

export const TableModule = Module("table", (vue) => {
  vue.use(LoadModule);
  vue.component("yo-table", Table);
});

export const TabsModule = Module("tabs", (vue) => {
  vue.component("yo-tabs", Tabs);
  vue.directive("yo-tab", TabDirective);
});

export const TabbarModule = Module("tabbar", (vue) => {
  vue.component("yo-tabbar", Tabbar as any);
  vue.component("yo-tabbar-item", TabbarItem);
});

export const TooltipModule = Module("tooltip", (vue) => {
  vue.component("yo-tooltip", TooltipComponent);
  vue.directive("yo-tooltip", TooltipDirective);
});

export const MdModule = Module("md", (vue) => {
  vue.component("md", Md);
});

export const ModalModule = Module("modal", (vue) => {
  vue.use(TeleportModule);
  vue.component("yo-modal", Modal);
});

export const FormGroupModule= Module("formGroup",(vue)=>{
  yoPreHandleForm();
  vue.use(GroupModule);
  vue.component("yo-form-group",FormGroup);
  vue.component("yo-update-form-group",UpdateFormGroup);
})

export const SelectModule= Module("select",(vue)=>{
  vue.component("yo-select",Select);
})
export const AllModule = {
  install(vue: typeof Vue) {
    vue.use(YoModule);
    vue.use(TeleportModule);
    vue.use(TabsModule);
    vue.use(TabbarModule);
    vue.use(TooltipModule);
    // Vue.use(MdModule);
    vue.use(GroupModule);
    vue.use(CardModule);
    vue.use(TableModule);
    vue.use(ModalModule);
    vue.use(FormGroupModule);
    vue.use(SelectModule);
  },
};
