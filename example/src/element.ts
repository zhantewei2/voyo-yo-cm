import Vue from "vue";
import {
  Button,
  Table,
  TableColumn,
  Input,
  Option,
  OptionGroup,
  Select,
} from "element-ui";
//注册window 上的自定义element 组件
// Vue.use(ElementUi);

export const registryElement=()=>{
  Vue.use(Button);
  Vue.use(Input);
  Vue.use(Table);
  Vue.use(TableColumn);
  Vue.use(Option);
  Vue.use(OptionGroup);
  Vue.use(Select);
}
