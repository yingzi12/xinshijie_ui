<template>
  <el-container class="layout-container-demo" >
    <!--    侧边栏-->
    <!--    表格-->
    <el-container style="margin: 10px">
      <!--       内容区-->
      <el-main>
        <div>
          <div>
            <h1>大标题</h1>
          </div>
          <div>
            <div>
              <h3>大标题</h3>
            </div>
            <div>
              <el-form
                  ref="ruleFormRef"
                  :model="ruleForm"
                  :rules="rules"
                  label-width="120px"
                  class="demo-ruleForm"
                  :size="formSize"
                  status-icon
              >
                <el-form-item label="头 像" prop="name">
                  <el-upload
                      class="avatar-uploader"
                      :action="uploadImgUrl"
                      name="file"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload"
                  >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                  </el-upload>
                </el-form-item>
                <el-form-item label="用户名" prop="name">
                  <el-input v-model="ruleForm.name" />
                </el-form-item>
                <el-form-item label="用户昵称" prop="name">
                  <el-input v-model="ruleForm.nickName" />
                </el-form-item>
                <el-form-item label="生日" prop="region">
                  <el-date-picker
                      v-model="ruleForm.birth"
                      type="date"
                      placeholder="Pick a day"
                      :size="size"
                  />
                </el-form-item>
                <el-form-item label="电子邮箱" prop="count">
                  <el-input v-model="ruleForm.email" />
                </el-form-item>
                <el-form-item label="手机号" prop="count">
                  <el-input v-model="ruleForm.telephone" />
                </el-form-item>
                <el-form-item label="签名" prop="desc">
                  <el-input v-model="ruleForm.desc" type="textarea" />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm(ruleFormRef)"
                  >Create</el-button
                  >
                  <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>


<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'
const fits = ['世界', '粉丝', '关注']
const activeIndex = ref('1')

const item = {
  date: '2016-05-02',
  name: 'Tom',
  address: 'No. 189, Grove St, Los Angeles',
}
const tableData = ref(Array.from({ length: 20 }).fill(item))

// 输入
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  name: 'Hello',
  region: '',
  count: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})

const rules = reactive<FormRules>({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  region: [
    {
      required: true,
      message: 'Please select Activity zone',
      trigger: 'change',
    },
  ],
  count: [
    {
      required: true,
      message: 'Please select Activity count',
      trigger: 'change',
    },
  ],
  date1: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a date',
      trigger: 'change',
    },
  ],
  date2: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a time',
      trigger: 'change',
    },
  ],
  type: [
    {
      type: 'array',
      required: true,
      message: 'Please select at least one activity type',
      trigger: 'change',
    },
  ],
  resource: [
    {
      required: true,
      message: 'Please select activity resource',
      trigger: 'change',
    },
  ],
  desc: [
    { required: true, message: 'Please input activity form', trigger: 'blur' },
  ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}))
</script>

<style scoped>
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.demo-count .block {
  padding: 0px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  display: inline-block;
  width: 33%;
  box-sizing: border-box;
  vertical-align: top;
}
.demo-count .block:last-child {
  border-right: none;
}
.demo-count .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 9px;
  margin-bottom: 0px;
}
</style>
