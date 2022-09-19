<template>

  <div>
    <el-menu
        :default-active="1"
        mode="horizontal"
        style="margin:0px;pardding:0px"
    >
      <el-menu-item index="1"><span style="font-size: 20px;font-weight:bold;">编辑用户</span></el-menu-item>
    </el-menu>
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
                      name="upload"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload"
                  >
                    <el-avatar v-if="imageUrl" :size="50" :src="imageUrl" />
                    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                  </el-upload>
                </el-form-item>
                <el-form-item label="用户名" prop="userName">
                   <span>{{user.userName}}</span>
                </el-form-item>
                <el-form-item label="用户昵称" prop="nickName">
                  <el-input v-model="ruleForm.nickName" />
                </el-form-item>
<!--                <el-form-item label="电子邮箱" prop="email">-->
<!--                  <el-input v-model="ruleForm.email" />-->
<!--                </el-form-item>-->
                <el-form-item label="手机号" prop="phonenumber">
                  <el-input v-model="ruleForm.phonenumber" />
                </el-form-item>
                <el-form-item label="签名" prop="sign">
                  <el-input v-model="ruleForm.sign" type="textarea" />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm(ruleFormRef)">修改</el-button>
                </el-form-item>
              </el-form>
            </div>
</template>


<script lang="ts" setup>
import {getCurrentInstance, inject, reactive, ref} from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import {  getUser,updateUserBasic } from "@/api/admin/user";
import {ElMessage, UploadProps} from "element-plus";
import {useRouter} from "vue-router";
const router = useRouter()

const {  proxy  } = getCurrentInstance();

const baseUrl = inject("$baseUrl")
const imgUrl = inject("$imgUrl")

const uploadImgUrl = ref(baseUrl + "/common/uploadImage"); // 上传的图片服务器地址
const imageUrlPath = ref('')

//获取用户信息
const user = ref({})
const imageUrl=ref('')
function handleUser(){
  getUser().then(response => {
    user.value=response.data
    ruleForm.email=user.value.email
    ruleForm.avatar=user.value.avatar
    ruleForm.nickName=user.value.nickName
    ruleForm.phonenumber=user.value.phonenumber
    ruleForm.sign=user.value.sign
    imageUrl.value=imgUrl+user.value.avatar;
    imageUrlPath.value=user.value.avatar;
    //console.log(JSON.stringify(user))
  })
}
handleUser()

// 输入
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  nickName: '',
  email: '',
  phonenumber: '',
  sign: '',
  avatar:'',
})

const rules = reactive<FormRules>({
  nickName: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 3, max: 100, message: 'Length should be 3 to 100', trigger: 'blur' },
  ],
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
  ],
  phonenumber: [
    {
      required: true,
      message: '请输入手机号码',
      trigger: 'change',
    }
  ],
  sign: [
    { required: true, message: '请输入签名', trigger: 'blur' },
  ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      updateUserBasic(ruleForm).then(response => {
           ElMessage.success("修改成功")
        router.push("/user/index");
      })
    } else {
      //console.log('error submit!', fields)
    }
  })
}

const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
  imageUrlPath.value=uploadFile.response.fileName
  ruleForm.avatar=response.fileName
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
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
