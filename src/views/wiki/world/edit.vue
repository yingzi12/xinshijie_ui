<template>
  <!--  内容区-->
  <div class="app-container">
    <div style="background-color: #cccccc">
      <BootstrapIcon icon="pencil-square" size="1x" flip-v /><span>修改世界</span>
    </div>
    <div>
      <el-form
          ref="worldRef"
          :model="form"
          :rules="rules"
          label-width="120px"
          class="demo-ruleForm"
          :size="formSize"
          status-icon
      >
        <el-tag>图片：</el-tag>
        <el-upload
            class="avatar-uploader"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>

        <el-form-item label="名 称" prop="name">
          <el-input v-model="form.name" placeholder="请输入世界名称" maxlength="30"   />
        </el-form-item>
        <el-form-item label="类 型" prop="types">
          <el-select v-model="form.types" placeholder="请选择世界类型">
            <el-option label="科幻" value="0" key="0"/>
            <el-option label="魔法" value="1" key="1"/>
            <el-option label="修真" value="2" key="2"/>
            <el-option label="其他" value="3" key="3"/>
          </el-select>
        </el-form-item>
        <el-form-item label="简 介" prop="intro">
          <el-input v-model="form.intro" type="textarea" placeholder="请选择世界简介"/>
        </el-form-item>
        <el-form-item label="描 述" prop="description">
          <el-input v-model="form.description" type="textarea"  placeholder="请输入世界说明"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">修改</el-button>
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {getCurrentInstance, reactive, ref, toRefs} from 'vue'
import type { FormInstance, FormRules ,UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { useRoute }  from "vue-router";  // 引用vue-router
import {  updateWorld } from "@/api/admin/world";
import {  getWorld } from "@/api/wiki/world";

import { useRouter } from "vue-router";
const {  appContext : { config: { globalProperties } }  } = getCurrentInstance();
const {  proxy  } = getCurrentInstance();

const router = useRouter()

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()


const data = reactive({
  form: {
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
      { min: 10, max: 255, message: 'Length should be 10 to 255', trigger: 'blur' }],
    description: [ { required: true, message: '请输入世界描述', trigger: 'blur' },
      { min: 10, max: 1000, message: 'Length should be 10 to 1000', trigger: 'blur' }],

  }
});

const {  form, rules } = toRefs(data);

//世界信息
const world=ref({})

// 接收url里的参数
const route = useRoute();
world.value.id = route.query.id;
console.log("世界id="+world.value.id);

/** 查询世界详细 */
function handleUpdate(id:number) {
  getWorld(id).then(response => {
    console.log("查询世界详细:"+JSON.stringify(response))
    form.value = response.data;
    form.value.types=response.data.typeName
    console.log("查询世界详细:"+JSON.stringify(world.value))
  });
}

const submitForm = async (formEl: FormInstance | undefined) => {
  proxy.$refs["worldRef"].validate(valid => {
    console.log("查询世界详细worldRef valid:"+JSON.stringify(valid))
    if (valid) {
      if (form.value.id != undefined) {
        updateWorld(form.value).then(response => {
          globalProperties.$modal.msgSuccess("修改成功");
          router.push("/world/list");
        });
      }else {
        globalProperties.$modal.msgError("非法操作");
      }
    }
  });
  console.log("查询世界详细formEl:"+JSON.stringify(formEl))
  // if (!formEl) return
  // await formEl.validate((valid, fields) => {
  //   console.log("查询世界详细valid:"+JSON.stringify(formEl))
  //   console.log("查询世界详细fields:"+JSON.stringify(fields))
  //   if (valid) {
  //     console.log('submit!')
  //     updateWorld(form.value).then(() => {
  //       console.log("修改成功")
  //       router.push("/world/list")
  //     })
  //   } else {
  //     console.log('error submit!', fields)
  //   }
  // })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}))

//上传图片
const imageUrl = ref('')

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

handleUpdate(world.value.id);

</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
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

</style>
