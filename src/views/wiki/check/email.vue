<template>
  <el-alert title="安全邮箱验证失败" type="error" center show-icon />

</template>

<script lang="ts" setup>
import { reactive, ref} from 'vue'
import {  checkEmail } from "@/api/wiki/user";
import {ElMessage, FormInstance, FormRules} from "element-plus";
import {useRoute,useRouter} from "vue-router";

const ruleFormRef = ref<FormInstance>()
const key=ref('');
const check=ref('');

const route = useRoute()
const router = useRouter()

key.value = <string>route.query.key;
check.value = <string>route.query.check;

function emailCheck(){
  checkEmail(key.value,check.value).then(response => {
    ElMessage.success("验证成功")
    router.push("/user/index");
  })
}
emailCheck();
</script>

<style scoped>

</style>
