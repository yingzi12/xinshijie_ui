<template>
  <div>
    <el-menu
        :default-active="1"
        mode="horizontal"
        style="margin:0px;pardding:0px"
    >
      <el-menu-item index="1"><span style="font-size: 20px;font-weight:bold;">找回密码</span></el-menu-item>
    </el-menu>
  </div>
  <el-container class="layout-container-demo" >
    <el-form :model="form" label-width="120px">
      <el-form-item label="新密码">
        <el-input type="password"
                  placeholder="请输入新密码"
                  show-password v-model="form.newPassword" />
      </el-form-item>
      <el-form-item label="重复新密码">
        <el-input type="password"
                  placeholder="请重复输入新密码"
                  show-password v-model="form.newPassword2" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue'
import { ElMessage} from "element-plus";
import {  resetPwd } from "@/api/wiki/user";
import {useRouter,useRoute} from "vue-router";

const router = useRouter()
const route = useRoute()

const key=ref('');
const check=ref('');

key.value = <string>route.query.key;
check.value = <string>route.query.check;

// do not use same name with ref
const form = reactive({
  newPassword: '',
  newPassword2: '',
  key: key.value,
  check: check.value
})

const onSubmit = () => {
  if(!form.newPassword){
    ElMessage.error("新密码不能为空");
    return
  }
  if(form.newPassword != form.newPassword2 ){
    ElMessage.error("重复密码不匹配");
    return
  }
  resetPwd(form).then(response => {
    ElMessage.success("重置成功")
    router.push("/login")
  })
  //console.log('submit!')
}
</script>

<style scoped>

</style>
