<template>
  <h3>联系我们</h3>
  <el-form
      ref="ruleFormRef"
      :model="form"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      status-icon
  >
    <el-form-item label="称谓"  prop="name" >
      <el-input v-model="form.name" style="width: 150px;"/>
    </el-form-item>
    <el-form-item label="联系方式"  prop="phone">
      <el-input v-model="form.phone" style="width: 150px;" />
    </el-form-item>
    <el-form-item label="类型" prop="types">
      <el-select v-model="form.types" placeholder="请选择类型" style="width: 150px;" >
        <el-option label="意见" value="1" />
        <el-option label="建议" value="2" />
        <el-option label="反馈" value="3" />
        <el-option label="BUG提交" value="4" />
        <el-option label="需求帮助" value="5" />
        <el-option label="举报" value="6" />
        <el-option label="其他" value="8" />
      </el-select>
    </el-form-item>
    <el-form-item label="说明"   prop="content">
      <el-input v-model="form.content" type="textarea"
                :autosize="{ minRows: 2, maxRows: 5 }"
                style="width:300px;"/>
    </el-form-item>
    <el-form-item prop="code" label="验证码">
      <el-input
          v-model="form.code"
          size="large"
          auto-complete="off"
          placeholder="验证码"
          style="width: 100px"
      >
        <template #prefix><svg-icon icon-class="validCode" class="el-input__icon input-icon" /></template>
      </el-input>
      <div class="login-code">
        <img :src="codeUrl" @click="getCode" class="login-code-img"/>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary"  @click="submitForm(ruleFormRef)">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue'
import { addFeedback } from "@/api/wiki/feedback";
import { getCodeImg } from "@/api/login";
import type { FormInstance, FormRules } from 'element-plus'
import {ElMessage} from "element-plus";
const ruleFormRef = ref<FormInstance>()

// do not use same name with ref
const form = reactive({
  name: '',
  phone: '',
  types: '1',
  content: '',
  uuid:'',
  code:'',
})

const rules = reactive<FormRules>({
  name: [{required: true, message: '请输入称谓', trigger: 'blur'},
    {min: 3, max: 20, message: '称谓长度在 3 到 20 之间', trigger: 'blur'},
  ],
  phone: [{required: true, message: '请输入联系方式', trigger: 'blur'},
    {min: 3, max: 100, message: '联系方式长度在 10 到 100 之间', trigger: 'blur'},
  ],
  types: [{required: true, message: '请选择类型', trigger: 'blur'}],
  code: [{required: true, message: '请输入验证码', trigger: 'blur'}],
  content: [{required: true, message: '请输入说明', trigger: 'blur'},
    {min: 10, max: 500, message: '内容长度在 10 到 500 之间', trigger: 'blur'},
  ],
})
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      addFeedback(form).then(response => {
        ElMessage.success("提交成功")
        // router.push("/user/index");
        form.name= ''
        form.phone= ''
        form.types= '1'
        form.content= ''
        form.uuid=''
        form.code=''

      })
      getCode();
      console.log('submit!')
    } else {
      console.log('error submit!')
    }
  })
}
const codeUrl = ref("");
function getCode() {
  getCodeImg().then(res => {
    codeUrl.value = "data:image/gif;base64," + res.img;
    form.uuid = res.uuid;
  });
}
getCode();
</script>

<style scoped>

</style>
