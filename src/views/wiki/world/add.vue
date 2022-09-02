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
        <el-form-item label="照 片" prop="name">
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
        <el-form-item label="名 称" prop="name">
          <el-input v-model="ruleForm.name" style="width: 100px"/>
        </el-form-item>
        <el-form-item label="分 类" prop="types">
          <el-select v-model="ruleForm.types" placeholder="分类">
            <el-option
                v-for="item in worldTypes"
                :key="item.id"
                :label="item.name"
                :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="简介" prop="intro">
          <el-input rows="2" v-model="ruleForm.intro" type="textarea" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input rows="10" v-model="ruleForm.description" type="textarea" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">创建</el-button>
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
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
import { addWorld,updateImageUrl} from "@/api/admin/world";
import { useRouter} from "vue-router";
import { getCurrentInstance ,inject} from "vue";

const router = useRouter()

import type { UploadProps } from 'element-plus'

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()

const data = reactive({
  ruleForm: {
  },
  rules: {
    name: [{ required: true, message: '请输入世界名字', trigger: 'blur' },
      { min: 1, max: 80, message: 'Length should be 1 to 80', trigger: 'blur' }
    ],
    types: [{
      required: true,
      message: '请选择世界类型',
      trigger: 'change',
    }
    ],
    intro: [ { required: true, message: '请输入世界简介', trigger: 'blur' },
      { min: 10, max: 255, message: 'Length should be 5 to 255', trigger: 'blur' }],
    description: [ { required: true, message: '请输入世界描述', trigger: 'blur' },
      { min: 10, max: 1000, message: 'Length should be 10 to 1000', trigger: 'blur' }],

  }
});

const {  ruleForm, rules } = toRefs(data);

const worldTypes=reactive([{id:0,name:"科学"},{id:1,name:"武侠"},{id:2,name:"仙侠"},{id:3,name:"魔幻"},{id:4,name:"奇幻"},{id:5,name:"其他"}])

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      ruleForm.value.imgUrl=imageUrlPath.value
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


const baseUrl = inject("$baseUrl")

const imageUrl = ref('')
const imageUrlPath = ref('')

const uploadImgUrl = ref(baseUrl + "/common/upload"); // 上传的图片服务器地址

const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
  imageUrlPath.value=uploadFile.response.fileName
  console.log("照片：" + JSON.stringify(uploadFile))
  // let formData = new FormData();
  // console.log("照片：" +  JSON.stringify(uploadFile))
  // formData.append("imageUrl", uploadFile);
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
