<template>
  <div>
    <yo-teleport to="body">
      <yo-vnode :transition="transitionBg">
        <div
          @click="bgClick"
          v-if="visible && loneliness"
          class="yo-dialog-bg"
        ></div>
      </yo-vnode>
    </yo-teleport>
    <yo-teleport to="body">
      <yo-vnode :transition="transition">
        <div
          ref="card"
          v-if="visible"
          :class="[
            isMobile ? 'yo-dialog-card-mobile' : 'yo-dialog-card',
            '__dialog-size-' + size,
          ]"
          :style="{
            zIndex: index,
          }"
          @click="cardClick"
          @mousedown="toActive"
          @mouseenter="cardEnter"
          @mouseleave="cardLeave"
        >
          <yo-vnode :hook="{ insert: headerCreated }">
            <header class="flex-v-between">
              <button
                v-if="isMobile"
                @click="closeBtn"
                class="
                  voyo-btn-icon voyo-btn-icon-size-small voyo-btn-pure
                  __primary
                  yo-dialog-back-btn
                "
                v-yo-ripple
              >
                <img :src="backSvg" />
              </button>
              {{ title }}
              <slot name="header"></slot>

              <div
                v-if="autoClose && !isMobile"
                class="flex-v-mid yo-modal-close-container"
              >
                <button class="yo-modal-close-btn0"></button>
                <button
                  @click="closeBtn"
                  class="yo-modal-close-btn"
                  color="default"
                >
                  <img :src="closeSvg" />
                </button>
              </div>
            </header>
          </yo-vnode>
          <div class="_content-wrapper">
            <main
              @scroll.stop="mainScroll"
              :class="{
                'flex-center': contentCenter || contentCenter === '',
              }"
            >
              <slot></slot>
            </main>
            <footer v-if="this.$slots.footer">
              <slot name="footer"></slot>
            </footer>
            <div v-if="isMobile" class="voyo-ios-safe-area-holder"></div>
          </div>
        </div>
        <span v-else></span>
      </yo-vnode>
    </yo-teleport>
  </div>
</template>

<script lang="ts">
import Vue, { VNode } from "vue";
import { Component, Emit, Prop, Watch } from "vue-property-decorator";
import { watchIsMobile, listenHistoryExit } from "../util";
import { Subscription } from "rxjs";
import { setting } from "../setting";
import { modalIndexManager } from "../util";
import { getUniqueId } from "@ztwx/utils";
import { touch } from "@voyo/core/dest/utils";

const EventName = "yo-dialog-card";

@Component({})
export default class extends Vue {
  @Prop({ default: true }) autoClose: boolean;
  @Prop({ default: false }) bgClose: boolean;
  @Prop({}) show: boolean;
  @Prop({}) title: string;
  @Prop({}) loneliness: boolean;
  @Prop({ default: "now" }) size: "now" | "large" | "small";
  @Prop({ default: false }) contentCenter: boolean;
  @Emit("update:show") showUpdate(e: boolean) {}
  @Watch("show", { immediate: true }) watchShow(v:boolean) {
    if (v == this.visible) return;
    !v ? this.closeByControl() : this.open();
  }
  transition = {
    enterClass: "yo-dialog-an-card-enter",
    enterActiveClass: "yo-dialog-an-card-active",
    leaveToClass: "yo-dialog-an-card-leave",
    leaveActiveClass: "yo-dialog-an-card-active",
  };
  transitionBg = {
    enterClass: "yo-an-fadein-enter",
    enterActiveClass: "yo-an-fadein-active",
    leaveToClass: "yo-an-fadein-leave-to",
    leaveActiveClass: "yo-an-fadein-active",
  };
  modalName: string;
  index = 1;
  visible = false;
  visiblePre: "close" | "show" | "hold" = "close";
  closeSvg = setting.icons.closeImg;
  backSvg = setting.icons.backImg;
  cardActive = false;
  isMobile = false;
  watchOrder: Subscription;
  changeBodyOver: boolean;
  changeRouterOrder: Subscription;
  timeoutAnimate: any;
  headerEl: HTMLElement;
  cardEl: HTMLElement;
  created() {
    this.watchOrder = watchIsMobile({}).subscribe((mobile) => {
      this.isMobile = mobile;
      this.checkBodyHid();
    });
    this.modalName = getUniqueId();
    this.index = modalIndexManager.registryModal(this.modalName);
  }
  mounted() {}
  headerCreated(vNode: VNode) {
    if (this.loneliness) return;
    this.cardEl = (this.$refs as any).card;
    this.headerEl = vNode.elm as HTMLElement;
    let x = 0,
      y = 0,
      x1 = 0,
      y1 = 0;
    touch({
      element: this.headerEl,
      begin() {
        x += x1;
        y += y1;
      },
      move: ({ disX, disY }) => {
        x1 = disX;
        y1 = disY;
        this.cardEl.style.transform = `translate3d(calc( -50% + ${
          x + x1
        }px ),calc( -50% + ${y + y1}px ),0)`;
      },
    });
  }
  cardEnter() {
    this.cardActive = true;
  }
  cardLeave() {
    this.cardActive = false;
  }
  bgClick(e: any) {
    if (!this.bgClose || e[EventName]) return;
    if (this.autoClose) this.closeByControl();
  }
  cardClick(e: any) {
    e[EventName] = true;
  }
  closeBtn() {
    this.closeByControl();
  }
  clearAn() {
    if (this.timeoutAnimate) {
      clearTimeout(this.timeoutAnimate);
      this.timeoutAnimate = null;
    }
  }
  toActive() {
    this.index = modalIndexManager.activeModal(this.modalName);
  }
  open() {
    this.clearAn();
    this.visible = true;
    this.checkBodyHid();
    this.index = modalIndexManager.activeModal(this.modalName);
  }
  deactivated() {}
  checkBodyHid() {
    if (this.isMobile && this.visible) {
      this.changeBodyOver = true;
      document.body.classList.add("y-hid");
    } else if ((!this.isMobile || !this.visible) && this.changeBodyOver) {
      document.body.classList.remove("y-hid");
    }
  }
  closeByControl() {
    // history.back();
    this.close();
  }
  closeByHistory() {
    this.close();
  }
  close() {
    this.visible = false;
    this.showUpdate(false);
  }

  beforeDestroy(this: any) {
    if (this.visiblePre !== "close") {
      this.closeByControl();
    }
    modalIndexManager.unRegistryModal(this.name);
    this.cardActive = false;
    this.checkBodyHid();
    this.watchOrder && this.watchOrder.unsubscribe();
    this.changeRouterOrder && this.changeRouterOrder.unsubscribe();
  }
  pushHistory() {
    history.pushState(null, "", location.href);
  }
  popHistory() {
    history.back();
  }
}
</script>
