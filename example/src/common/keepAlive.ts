import { setting } from "@voyom/vue-router";
import { CreateElement } from "vue";
export const registryKeepAlive = () => {
  setting.ChildComponent = {
    render(h: CreateElement) {
      return h(
        "keep-alive",
        {
          props: {
            include: ["xxx"],
          },
        },
        [[h("router-view")]],
      );
    },
  };
};

registryKeepAlive();
