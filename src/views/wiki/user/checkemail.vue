<template>
  <div>
    <el-menu
        :default-active="1"
        mode="horizontal"
        style="margin:0px;pardding:0px"
    >
      <el-menu-item index="1"><span style="font-size: 20px;font-weight:bold;">邮箱验证</span></el-menu-item>
    </el-menu>
  </div>
  <el-container class="layout-container-demo" >
    <el-form  ref="ruleFormRef"
             :model="ruleForm"
             :rules="rules"
             label-width="120px">
      <el-form-item label="邮箱">
        <el-input  type="email"
                   placeholder="请输入电子邮箱"
                   v-model="ruleForm.email" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">发送验证邮件</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script lang="ts" setup>
import { reactive, ref} from 'vue'
import {  sendEmail } from "@/api/admin/user";
import {Action, ElMessage, ElMessageBox, FormInstance, FormRules} from "element-plus";
import {useRouter} from "vue-router";

const ruleFormRef = ref<FormInstance>()
const router = useRouter()

const ruleForm = reactive({
  email: ''
})

const rules = reactive<FormRules>({
  email: [
    {
      required: true,
      message: '请输入电子邮箱',
      trigger: 'change',
    },
    {
      type: "email",
      message: "请输入正确的邮箱地址",
      trigger: ["blur", "change"],
    },
  ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      sendEmail(ruleForm.email).then(response => {
        ElMessageBox.alert('发送验证邮件成功，请去邮箱查看，返回个人消息', '提示', {
          // if you want to disable its autofocus
          // autofocus: false,
          confirmButtonText: 'OK',
          callback: (action: Action) => {
            router.push("/user/index");
          },
        })
        // ElMessage.success("发送验证邮件成功，请去邮箱查看")
      })
      //console.log('submit!')
    } else {
      //console.log('error submit!', fields)
    }
  })
}

</script>

<style scoped>

</style>
