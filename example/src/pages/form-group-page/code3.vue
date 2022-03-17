<template>
  <div>
    <yo-form-group ref="yoFormGroup" :form="form"></yo-form-group>
    <div class="voyo-area-content text-center">
      <el-button @click="confirm" type="primary">confirm</el-button>
      <el-button @click="reset">reset</el-button>
    </div>
  </div>
</template>

<script>
import {regExpValidator, requiredValidator} from "@ztwx/form";

export default {
  data() {
    return {
      form:[
        {
          label :"姓名",
          id: "name",
          tag: "el-input",
          required: true,
        },
        {
          label: "年龄",
          id: "age",
          tag: "el-input",
          props:{
            type:"number",
          },
          required: false,
        },
        {
          label: "职业",
          tag: "yo-select",
          id: "occupation",
          span:2,
          props:{
            options: [
              {label: "年龄重要",value:"a"},
              {label: "姓名重要",value:"b"}
            ]
          },
          //监听当前 controller值发生变化,动态修改required
          valueChange:{
            immediate: true,
            handle:(v,form)=>{

              const nameController= this.form.find(i=>i.id==="name");
              const ageController= this.form.find(i=>i.id==="age");
              nameController.required= v==="a";
              ageController.required= v==="b";

            }
          }
        },
        {
          label: "1开头4位数",
          id: "numValid",
          tag: "el-input",
          span:2,
          star: true,
          validators:[
              new requiredValidator("这里不可为空哦"), //你可以不使用required属性，而是自定义校验器
              new regExpValidator("正则校验不通过",/^1\d{3}$/) //可以写填写任意校验器 来自`@ztwx/form`
          ]
        }
      ]
    }
  },
  methods: {
    async confirm(){
      const errors=await this.$refs.yoFormGroup.checkError(); //校验并获取表单错误
      if(errors&&errors.length)return;  //表单校验未通过
      console.log("errors:",errors);
      console.log(
          this.$refs.yoFormGroup.getValue() //获得表单结果
      );
    },

    async reset(){
      this.$refs.yoFormGroup.reset(); //重置表单
    }
  },
}

</script>


