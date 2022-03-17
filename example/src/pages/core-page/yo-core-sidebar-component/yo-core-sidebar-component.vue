<!--
    auto created by @ztwx vue template!!
    @pageAuthor  :  zhan
    @AuthorEmail :  zhantewei@gmail.com
    @pageCreated :  2021-6-24 11:41:30
-->

<template>
  <div>
    <ul class="list-ul">
      <li
        @click="selectLi(i)"
        class="list-li"
        :class="{
          __active: i.el === activeEl,
        }"
        v-for="(i, index) in list"
        :key="index"
      >
        {{ i.label }}
      </li>
    </ul>
    <yo-modal
      size="small"
      title="提醒"
      :bgClose="true"
      :loneliness="true"
      :show.sync="warnModalShow"
    >
      <div class="voyo-title-line">将要跳转至</div>
      <div class="voyo-area-deep">
        {{ warnHref }}
      </div>
      <div class="text-right mt-4">
        <voyoc-btn @voyotap="closeModal" type="candy" color="gentle" round
          >取消</voyoc-btn
        >
        <voyoc-btn @voyotap="skipHref" type="candy" color="primary" round
          >确定</voyoc-btn
        >
      </div>
    </yo-modal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import { from, fromEvent, merge, of, Subscription } from "rxjs";
import { filter, map } from "rxjs/operators";

interface Item {
  label: string;
  el: HTMLElement;
  top: number;
}

@Component({})
export default class extends Vue {
  contentArticleEl: HTMLElement;
  list: Item[] = [];
  order: Subscription;
  activeEl: HTMLElement | null = null;
  calPristine = true;
  warnModalShow = false;
  warnHref = "";

  @Watch("$route.path", { immediate: true }) watchRoute(v: string) {
    this.warnModalShow = false;
    setTimeout(() => {
      this.cal();
      this.handleATag();
    });
  }

  closeModal() {
    this.warnModalShow = false;
  }
  skipHref() {
    window.open(this.warnHref);
    this.closeModal();
  }

  /**
   * 处理content中的a[href]标签
   */
  handleATag() {
    const aList: any = this.contentArticleEl.querySelectorAll("a[href]");
    Array.prototype.forEach.call(aList, (a) => {
      // a.href = undefined;
      this.warnHref = a.href;
      a.removeAttribute("href");
      a.className = "href";
      a.addEventListener("click", () => {
        this.warnModalShow = true;
      });
    });
  }

  handleTagEl(els: HTMLElement[]) {
    const top = document.documentElement.scrollTop;
    this.list = Array.prototype.map.call(els, (i) => ({
      label: i.innerText,
      el: i,
      top: top + i.getBoundingClientRect().top,
    })) as Item[];
  }

  cal() {
    if (!this.contentArticleEl)
      this.contentArticleEl = document.querySelector(
        ".yo-core-content article",
      ) as HTMLElement;
    const tagEls = this.contentArticleEl.querySelectorAll(
      "h1,.itd-header",
    ) as any;
    this.handleTagEl(tagEls);

    if (this.calPristine && location.hash) this.activeItemByTag(location.hash);
  }

  selectLi({ el }: Item) {
    this.cal();
    const item = this.list.find((i) => i.el === el);
    item && item.el.scrollIntoView({ behavior: "smooth" });
  }

  checkActiveItem(top: number) {
    const list = [...this.list].reverse();
    for (let i of list) {
      if (top >= i.top - 70) {
        this.activeItemByScroll(i);
        break;
      }
    }
  }
  activeItemByScroll(i: Item) {
    if (this.activeEl === i.el) return;
    this.activeEl = i.el;
    const urlMather = location.href.match(/^http[^#]*/);
    urlMather &&
      history.replaceState(null, "", urlMather.toString() + "#" + i.label);
  }
  activeItemByTag(tag: string) {
    this.calPristine = false;
    tag = decodeURIComponent(tag).slice(1);
    const item: Item | undefined = this.list.find((i) => i.label === tag);

    item &&
      setTimeout(() => {
        window.scrollTo({
          top: item.top,
        });
      }, 10);
  }

  mounted() {
    this.order = merge(
      of(document.documentElement.scrollTop),
      fromEvent(document, "scroll").pipe(
        filter((e) => e.target === document),
        map(() => document.documentElement.scrollTop),
      ),
    ).subscribe((top) => {
      this.checkActiveItem(top)
    });
  }
  beforeDestroy() {
    this.order && this.order.unsubscribe;
  }
}
</script>
<style scoped src="./yo-core-sidebar-component.scss" lang="scss"></style>
