<template>
  <!--  内容区-->
  <div class="app-container">
    <div style="background-color: #cccccc">
      <BootstrapIcon icon="pencil-square" size="1x" flip-v /><span>创建新世界</span>
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
        <el-tag >图 片:</el-tag>
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
        <el-form-item label="名 称" prop="name">
          <el-input v-model="ruleForm.name" style="width: 100px"/>
        </el-form-item>
        <el-form-item label="分 类" prop="types">
          <el-select v-model="ruleForm.types" placeholder="分类">
            <el-option label="科幻" value="0" />
            <el-option label="魔法" value="1" />
            <el-option label="武侠" value="2" />
            <el-option label="修真" value="3" />
            <el-option label="其他" value="4" />
          </el-select>
        </el-form-item>
        <el-form-item label="简介" prop="description">
          <el-input rows="20" v-model="ruleForm.description" type="textarea" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">Create</el-button>
          <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref, toRefs} from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { addWorld} from "@/api/wiki/world";
import { useRouter} from "vue-router";
const router = useRouter()

import type { UploadProps } from 'element-plus'

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()

const data = reactive({
  ruleForm: {
  },
  rules: {
    name: [{ required: true, message: 'Please input Activity name', trigger: 'blur' },
      { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
    ],
    types: [{
      required: true,
      message: 'Please select Activity zone',
      trigger: 'change',
    }
    ],
    description: [ { required: true, message: 'Please input activity form', trigger: 'blur' }]
  }
});

const {  ruleForm, rules } = toRefs(data);


const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      addWorld(ruleForm.value).then(() => {
        console.log("添加成功")
        router.push("/world/list")
      })
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


import { getCurrentInstance ,inject} from "vue";
const baseUrl = inject("$baseUrl")

const imageUrl = ref('')
const uploadImgUrl = ref(baseUrl + "/common/upload"); // 上传的图片服务器地址

const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}
</script>


<style scoped>
.avatar-uploader .avatar {
  width: 150px;
  height: 200px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 200px;
  text-align: center;
}
</style>
