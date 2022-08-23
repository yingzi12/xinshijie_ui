<template>
  <el-container class="layout-container-demo" >
    <!--    侧边栏-->
    <el-aside width="250px" style="margin: 10px">
      <div>
        <!--        个人信息-->
        <div class="center" style="margin-bottom: 10px;text-align: center;">
          <el-card :body-style="{ padding: '0px' }">
            <!--  头像-->
            <el-avatar :size="50" :src="circleUrl" />
            <div>
              <h3 style="margin:10px;margin-bottom: 10px;font-size:14px;">Yumnumkl</h3>
              <p style="margin: 0px;padding: 0px;font-size:10px;">id:111111</p>
              <div class="bottom" >
                <p style="margin: 0px;padding: 0px;font-size:10px;line-height:120%;">这是一个签名,表达自己的想法用的,没什么实际的意义</p>
                <div class="demo-count">
                  <div  class="block">
                    <span class="demonstration">4</span>
                    <span class="demonstration">世界</span>
                  </div>
                  <div  class="block">
                    <span class="demonstration">4440000</span>
                    <span class="demonstration">粉丝</span>
                  </div>
                  <div  class="block">
                    <span class="demonstration">433</span>
                    <span class="demonstration">关注</span>
                  </div>
                </div>
                <el-button text class="button">用户中心</el-button>
              </div>
            </div>
          </el-card>
        </div>
        <!--        分类-->
        <div style="margin-top: 10px">
          <el-scrollbar>
            <el-menu :default-openeds="['1', '3']">
              <el-sub-menu index="1">
                <template #title>
                  <el-icon><message /></el-icon>我的关注
                </template>
              </el-sub-menu>
              <el-sub-menu index="2">
                <template #title>
                  <el-icon><icon-menu /></el-icon>世界管理
                </template>
              </el-sub-menu>
              <el-sub-menu index="3">
                <template #title>
                  <el-icon><setting /></el-icon>元素草稿
                </template>
              </el-sub-menu>
              <el-sub-menu index="4">
                <template #title>
                  <el-icon><setting /></el-icon>我的评论
                </template>
              </el-sub-menu>
              <el-sub-menu index="5">
                <template #title>
                  <el-icon><setting /></el-icon>我的信息
                </template>
              </el-sub-menu>
            </el-menu>
          </el-scrollbar>
        </div>
      </div>
    </el-aside>
    <!--    表格-->
    <el-container style="margin: 10px">
      <!--       内容区-->
      <el-main>
        <div>
          <el-menu
              :default-active="activeIndex"
              mode="horizontal"
              @select="handleSelect"
              style="margin:0px;pardding:0px"
          >
            <el-menu-item index="1">关注的世界</el-menu-item>
<!--            <el-menu-item index="2">关注的故事</el-menu-item>-->
          </el-menu>
        </div>
        <!--        多选-->
        <div style="padding: 10px">
          <el-space wrap>
            <div v-for="i in 9" :key="i">
              <el-button text> Text{{i}} </el-button>
            </div>
          </el-space>
        </div>
        <!--        统计-->
        <div style="background-color:#b0c4de;margin: auto;padding: 10px">
          <el-row>
            <el-col  :span="4">
              合计(65)
            </el-col >
            <el-col :span="20"  style="text-align: right;">
              <div style="text-align: right; font-size: 12px" class="toolbar">
                <el-dropdown>
                  <el-icon style="margin-right: 8px; margin-top: 1px"><setting/></el-icon>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item>View</el-dropdown-item>
                      <el-dropdown-item>Add</el-dropdown-item>
                      <el-dropdown-item>Delete</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
                <span>Tom</span>
              </div>
            </el-col>
          </el-row>
        </div>
        <!--        表格-->
        <div>
          <div style="background-color: #E5EAF3;height: 30px;margin: 0px;padding: 0px">
            <h1>编辑世界</h1>
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
              <el-form-item label="图 片" prop="name">
              <el-upload
                  class="avatar-uploader"
                  action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                <img style="width: 105px; height: 128px;" v-if="form.imgUrl" :src="form.imgUrl" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
              </el-form-item>
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
                <el-button @click="reset()">返回</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import {getCurrentInstance, reactive, ref, toRefs} from 'vue'
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'
import { useRoute }  from "vue-router";  // 引用vue-router
import { useRouter} from "vue-router";
import {  updateWorld } from "@/api/admin/world";
import {  getWorld } from "@/api/wiki/world";
import {ElMessage, FormInstance, UploadProps} from "element-plus";
const {  appContext : { config: { globalProperties } }  } = getCurrentInstance();
const {  proxy  } = getCurrentInstance();

const fits = ['世界', '粉丝', '关注']
const router = useRouter()

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const activeIndex = ref('1')


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
//上传图片
// const imageUrl = ref('')
/** 查询世界详细 */
function handleUpdate(id:number) {
  getWorld(id).then(response => {
    console.log("查询世界详细:"+JSON.stringify(response))
    form.value = response.data;
    form.value.types=response.data.typeName
    form.value.imgUrl='https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
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
}

const reset = () => {
  router.push("/admin/worldInfo?id="+world.value.id);
}



const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
  form.value.imgUrl = URL.createObjectURL(uploadFile.raw!)
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
