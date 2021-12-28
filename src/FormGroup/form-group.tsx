import Vue, { CreateElement, VNode } from "vue";
import { Component, Emit, Inject, Prop, Watch } from "vue-property-decorator";
import { Form, requiredValidator, Validator } from "@ztwx/form";
import {
  YoForm,
  YoFormController,
  ControllerVal
} from "./form.types";
import { preInstallControllerData, PreInstallControllerData } from "./form";
import {filterIncludeObj} from "@ztwx/utils";


export const errorMsg = (
  h: CreateElement,
  controller: YoFormController,
): VNode | null =>
  controller.error
    ? h(
        "span",
        {
          class: "yo-cell-error",
          transition: {},
        },
        [controller.error],
      )
    : null;

@Component({
  render(this: FormGroup, h: CreateElement) {
    return h(
      "yo-group",
      {
        props: {
          grid: this.grid,
        },
      },
      this.controllers.map(controller =>
        controller.shadow?null:
        h(
          "yo-cell",
          {
            class: [controller.error ? "__error" : ""],
            props: {
              label: controller.label,
              important: controller.star,
              span: controller.span,
            },
          },
          [
            controller.tag
              ? h(
                  controller.tag,
                  preInstallControllerData.handle(
                    controller.tag,
                    {
                      props: {
                        disabled: controller.disabled??this.formDisabled,
                        ...(controller.props || {}),
                        value: this.valueForm.value[controller.id],
                      },
                      attrs: {
                        disabled: controller.disabled??this.formDisabled,
                        ...(controller.attrs || {})
                      },
                      on: {
                        input: (v: ControllerVal) => {
                          const val=preInstallControllerData.handleInputVal(
                            controller,
                            v,
                          );
                          this.valueForm.value[
                            controller.id
                          ] = val;
                          if(controller.valueChange)controller.valueChange(val,this.valueForm);
                          if(controller.on&&controller.on.input)controller.on.input(val);
                        },
                        ...(controller.on?filterIncludeObj(controller.on,["input"]):{})
                        
                      },
                    },
                    controller.disablePreInstall,
                  ),
                )
              : controller.render
              ? controller.render(h, this.valueForm)
              : null,
            errorMsg(h, controller),
          ],
        ),
      ),
    );
  },
})
export class FormGroup extends Vue {
  @Prop({}) form: YoFormController[];
  @Prop({}) grid: number;
  @Prop({ default: true }) controllerError: boolean; // 表单错误时，显示controller错误信息
  @Prop({default:false})formDisabled:boolean;
  @Watch("form", { immediate: true })
  watchForm(controllers: YoFormController[]) {
    if (!controllers) return;
    this.valueForm = new Form(
      controllers.map(controller => ({
        id: controller.id,
        value: controller.value,
        validator: (controller.validators || []).concat(
          controller.required
            ? [new requiredValidator(`${controller.label}不能为空`)]
            : [],
        ),
      })),
    );
    this.controllers = controllers.map(controller => ({
      star: controller.star ?? controller.required,
      error: "",
      ...controller,
    }));
    this.valueForm.valueChange.subscribe(v=>this.formChange(v));
  }
  @Watch("valueForm._isChanged") watchValueFormChanged(changed: boolean) {
    this.hasChanged(changed);
  }
  
  
  @Emit("hasChanged") hasChanged(v: boolean) {}
  @Emit("formChange")formChange(v:any){}
  valueForm: Form = new Form([]);
  controllers: YoFormController[] = [];
  // 获得form值
  getValue() {
    return preInstallControllerData.handleResult(this.controllers, {
      ...this.valueForm.value,
    });
  }

  /* 检查form校验结果
    @return null 时
   */
  async checkError(): Promise<string[] | void> {
    const errors = await this.valueForm.catchValidatorsErr();
  
    this.valueForm.controllers.forEach(item => {
      const controller: YoFormController = this.controllers.find(
        i => i.id === item.id,
      ) as YoFormController;

      controller.error =
        item.errors && item.errors.length ? item.errors[0] : "";
    });
    return errors;
  }
  reset() {
    this.valueForm.reset();
    this.controllers.forEach(i => (i.error = ""));
  }
  getUpdateValue() {
    return this.valueForm.getUpdatedValue();
  }
  setOrigin(v: Record<string, any>) {
    this.valueForm.setOriginValue(v);
  }
}
