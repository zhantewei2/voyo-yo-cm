import Vue, { CreateElement, VNode } from "vue";
import { FormGroup } from "./form-group";
import { resolveClass } from "@/util";
import { filterIncludeObj } from "@ztwx/utils/lib";
import { ExcuteAfterConnected } from "@ztwx/utils/lib/web";
import { Prop, Watch, Emit ,Component} from "vue-property-decorator";


@Component({
  render(this: UpdateFormGroup, h: CreateElement) {
    return h(
      "article",
      {
        class: resolveClass(this, ["yo-update-form-group"]),
      },
      [
        h(FormGroup, {
          props: filterIncludeObj(this.$attrs, ["originValue"]),
          ref: "form",
          hook: {
            insert: (e: VNode) => this.formGroupInserted(e),
          },
          on: {
            hasChanged: (v: boolean) => {
              this.hasChanged(v);
            },
            formChange: (v:any)=>this.formChange(v)
          },
        }),
        h("footer", {}, [
          this.$slots.default,
          h(
            "el-button",
            {
              props: {
                type: "primary",
                disabled: !this.formChanged,
                loading: this.updateLoading,
              },
              on: {
                click: () => this.toUpdate(),
              },
            },
            this.confirmText,
          ),
          h(
            "el-button",
            {
              props: { plain: true },
              on: {
                click: () => this.resetForm(),
              },
            }, this.cancelText,
          ),
        ]),
      ],
    );
  },
  computed: {},
})
export class UpdateFormGroup extends Vue {
  @Prop({}) originValue: any;
  @Prop({}) updateFn: (value:any) => Promise<void>;
  @Prop({ default: "更新失败" }) defaultError: string;
  @Prop({default:"保存"})confirmText:string;
  @Prop({default:"取消"})cancelText:string;
  @Prop({default:true})autoMsg:boolean;
  @Emit("reset")resetEmit(){}
  @Emit("formChange")formChange(v:any){}
  @Watch("originValue", { immediate: true }) watchOriginValue(
    v: Record<string, any>,
  ) {
    if (!v) return;
    this.executeAfterFormGroup.execute(() => {
      this.groupInstance.valueForm.setOriginValue(v);
      this.groupInstance.reset();
      this.groupInstance.valueForm.isChanged;
    });
  }

  executeAfterFormGroup: ExcuteAfterConnected;
  formChanged: boolean = false;
  $refs: {
    form: FormGroup;
  };
  updateLoading: boolean = false;
  groupInstance: FormGroup;
  beforeCreate() {
    this.executeAfterFormGroup = new ExcuteAfterConnected();
  }
  formGroupInserted(e: VNode) {
    this.groupInstance = e.componentInstance as FormGroup;
    this.executeAfterFormGroup.connect();
  }
  hasChanged(v: boolean) {
    this.formChanged = v;
  }
  resetForm() {
    this.groupInstance.reset();
    this.resetEmit();
  }
  async toUpdate() {
    if(await this.groupInstance.checkError())return;
    if (this.updateFn) {
      this.updateLoading = true;
      try {
        await this.updateFn(
          this.groupInstance.valueForm.getUpdatedValue() as any,
        );
      } catch (e) {
        if(this.autoMsg)(this as any).$message.error(typeof e == "string" ? e : this.defaultError);
      } finally {
        this.updateLoading = false;
      }
    }
  }
}
