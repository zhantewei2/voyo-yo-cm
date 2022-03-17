<template>
  <div>
    <yo-form-group
        ref="yoFormGroup"
        :form="form"
        :originValue="originValue"
    />
    <div class="voyo-area-content text-center">
      <el-button @click="confirm" type="primary">更新</el-button>
      <el-button @click="reset">reset</el-button>
    </div>
    <div class="voyo-area-deep" v-if="result">
      {{result}}
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      result: null,
      form:[
        {
          label :"姓名",
          id: "name",
          tag: "el-input",
        },
        {
          label: "年龄",
          id: "age",
          tag: "el-input",
          props:{
            type:"number",
          },
        },
        {
          label: "id",
          id: "id",
          tag: "",
          shadow: true  //用户主键，不需要展示在页面上
        }
      ],
      originValue: null
    }
  },
  mounted(){
    //赋值原数据
    this.originValue={
      name: "张三",
      age: 22,
      id: "1001",
    }

  },
  methods: {

    async confirm(){
      const errors=await this.$refs.yoFormGroup.checkError(); //校验并获取表单错误
      if(errors&&errors.length)return;  //表单校验未通过

      this.result=this.$refs.yoFormGroup.getUpdateValue(); //仅获取更新值

      console.log("allResult",this.$refs.yoFormGroup.getValue()); //获得全部值
    },

    async reset(){
      this.$refs.yoFormGroup.reset(); //重置表单
      this.result=null;
    }
  },
}

</script>
