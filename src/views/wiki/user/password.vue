<template>
  <el-container class="layout-container-demo" >
    <el-form :model="form" label-width="120px">
      <el-form-item label="原始密码">
        <el-input v-model="form.oldPassword" />
      </el-form-item>
      <el-form-item label="新密码">
        <el-input v-model="form.newPassword" />
      </el-form-item>
      <el-form-item label="重复新密码">
        <el-input v-model="form.newPassword2" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

// do not use same name with ref
const form = reactive({
  newPassword: '',
  oldPassword: '',
  newPassword2: '',
})

const onSubmit = () => {
console.log('submit!')
}
</script>

<style scoped>

</style>
