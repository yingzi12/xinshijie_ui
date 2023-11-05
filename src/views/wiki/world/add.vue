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
        <el-form-item label="照 片" prop="image">
          <el-upload
              class="avatar-uploader"
              :action="uploadImgUrl"
              name="upload"
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
        <el-form-item label="是否公开">
          <el-radio-group v-model="form.isPrivate">
            <el-radio :label="2" >公开</el-radio>
            <el-radio :label="1">私有</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="来 源" prop="checkList">
          <el-checkbox-group v-model="ruleForm.checkList" @change="handleSurce">
            <el-checkbox label="原创" v-if="ischeck==0 || ischeck==1" />
            <el-checkbox label="游戏"  v-if="ischeck==0 || ischeck==2"/>
            <el-checkbox label="小说" v-if="ischeck==0 || ischeck==2" />
            <el-checkbox label="电影"  v-if="ischeck==0 || ischeck==2"  />
            <el-checkbox label="动漫"  v-if="ischeck==0 || ischeck==2"  />
            <el-checkbox label="电视剧"  v-if="ischeck==0 || ischeck==2"  />
            <el-checkbox label="其他"  v-if="ischeck==0 || ischeck==2"  />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="简介" prop="intro">
          <el-input rows="2" v-model="ruleForm.intro" type="textarea" />
        </el-form-item>
        <el-form-item label="描述" prop="descriptionZip">
          <el-input rows="10" v-model="ruleForm.descriptionZip" type="textarea" />
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
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { addWorld } from "@/api/admin/world";
import { useRouter} from "vue-router";
import {  inject} from "vue";
import {worldTypes } from "@/utils/constant";

const baseUrl = inject("$baseUrl")
const imgUrl = inject("$imgUrl")

const imageUrl = ref('')
const imageUrlPath = ref('')

const uploadImgUrl = ref(baseUrl + "/common/uploadImage"); // 上传的图片服务器地址
const router = useRouter()

import type { UploadProps } from 'element-plus'

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()

const data = reactive({
  ruleForm: {
    isPrivate:2,
  },
  rules: {
    name: [{ required: true, message: '请输入世界名字', trigger: 'blur' },
      { min: 1, max: 80, message: '世界名字长度在  1 至 80', trigger: 'blur' }
    ],
    types: [{
      required: true,
      message: '请选择世界类型',
      trigger: 'change',
    }
    ],
    checkList: [{
      required: true,
      message: '请选择世界来源',
      trigger: 'change',
    }
    ],
    intro: [ { required: true, message: '请输入世界简介', trigger: 'blur' },
      { min: 10, max: 300, message: '世界名字长度在  10 至 300', trigger: 'blur' }],
    descriptionZip: [ { required: true, message: '请输入世界描述', trigger: 'blur' },
      { min: 10, max: 1000, message: '世界名字长度在  10 至 1000', trigger: 'blur' }],
  }
});

const {  ruleForm, rules } = toRefs(data);


const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      //console.log('submit!')
      ruleForm.value.source=ruleForm.value.checkList.map(String).join(';')
      ruleForm.value.imgUrl=imageUrlPath.value
      addWorld(ruleForm.value).then(response => {
        //console.log("添加成功")
        router.push("/admin/worldInfo?wid="+response.data.id);
      })
    } else {
      //console.log('error submit!', fields)
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


const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
  imageUrlPath.value=uploadFile.response.fileName
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

const ischeck=ref(0)
function handleSurce(){
  if(ruleForm.value.checkList.length==0){
    ischeck.value=0;
  }else {
    if (ruleForm.value.checkList.indexOf("原创") != -1) {
      ischeck.value = 1;
    } else {
      ischeck.value = 2;
    }
  }

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
