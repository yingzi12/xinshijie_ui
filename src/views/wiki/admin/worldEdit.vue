<template>
        <!--        标题-->
  <div>
    <el-menu
        :default-active="1"
        mode="horizontal"
        style="margin:0px;pardding:0px"
    >
      <el-menu-item index="1"><span style="font-size: 20px;font-weight:bold;">{{wname}}</span></el-menu-item>
    </el-menu>
  </div>
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
              <el-form-item label="照 片" prop="name">
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
                <el-input v-model="form.name" placeholder="请输入世界名称" maxlength="30"   />
              </el-form-item>
              <el-form-item label="分 类" prop="types">
                <el-select v-model="form.types" placeholder="请选择世界类型">
                  <el-option
                      v-for="item in worldTypes"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="来 源" prop="checkList">
                <el-checkbox-group v-model="form.checkList" @change="handleSurce">
                  <el-checkbox label="原创" v-if="ischeck==0 || ischeck==1" />
                  <el-checkbox label="游戏"  v-if="ischeck==0 || ischeck==2"/>
                  <el-checkbox label="小说" v-if="ischeck==0 || ischeck==2" />
                  <el-checkbox label="电影"  v-if="ischeck==0 || ischeck==2"  />
                  <el-checkbox label="动漫"  v-if="ischeck==0 || ischeck==2"  />
                  <el-checkbox label="电视剧"  v-if="ischeck==0 || ischeck==2"  />
                  <el-checkbox label="其他"  v-if="ischeck==0 || ischeck==2"  />
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="简 介" prop="intro">
                <el-input v-model="form.intro" type="textarea" placeholder="请选择世界简介"/>
              </el-form-item>
              <el-form-item label="描 述" prop="description">
                <el-input v-model="form.description" type="textarea" rows="10"  placeholder="请输入世界说明"/>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)">修改</el-button>
                <el-button @click="reset()">返回</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
</template>

<script lang="ts" setup>
import {getCurrentInstance, inject, reactive, ref, toRefs} from 'vue'
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'
import { useRoute,useRouter }  from "vue-router";  // 引用vue-router
import {  updateWorld,getWorld } from "@/api/admin/world";
import {ElMessage, FormInstance, UploadProps} from "element-plus";
const {  appContext : { config: { globalProperties } }  } = getCurrentInstance();
const {  proxy  } = getCurrentInstance();
const router = useRouter()
// 接收url里的参数
const route = useRoute();
const wid = ref(null);

//世界信息
const world=ref({})
wid.value = route.query.wid;
world.value.id = wid.value
//console.log("世界id="+world.value.id);
const baseUrl = inject("$baseUrl")
const imgUrl = inject("$imgUrl")

const imageUrl=ref('')
const uploadImgUrl = ref(baseUrl + "/common/uploadImage"); // 上传的图片服务器地址
const imageUrlPath = ref('')
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const activeIndex = ref('1')
const worldTypes=reactive([{id:6,name:"科学"},{id:1,name:"武侠"},{id:2,name:"仙侠"},{id:3,name:"魔幻"},{id:4,name:"奇幻"},{id:5,name:"其他"}])
const worldTypesMap=new Map([
  [6,"科学"],
  [1,"武侠"],
  [2,"仙侠"],
  [3,"魔幻"],
  [4,"奇幻"],
  [5,"其他"],
])
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
    checkList: [{
      required: true,
      message: '请选择世界来源',
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


//上传图片
// const imageUrl = ref('')
/** 查询世界详细 */
function handleWorld(id:number) {
  getWorld(id).then(response => {
    //console.log("查询世界详细:"+JSON.stringify(response))
    form.value = response.data;
    form.value.checkList=form.value.source.split(';')
    handleSurce();
    imageUrl.value=imgUrl+response.data.imgUrl;
    imageUrlPath.value=response.data.imgUrl;
    // form.value.imgUrl='https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    //console.log("查询世界详细:"+JSON.stringify(world.value))
  });
}

const submitForm = async (formEl: FormInstance | undefined) => {
  proxy.$refs["worldRef"].validate(valid => {
    //console.log("查询世界详细worldRef valid:"+JSON.stringify(valid))
    if (valid) {
      if (form.value.id != undefined) {
        form.value.source=form.value.checkList.map(String).join(';')
        form.value.imgUrl=imageUrlPath.value
        updateWorld(form.value).then(response => {
          globalProperties.$modal.msgSuccess("修改成功");
          router.push("/admin/worldInfo?wid="+wid.value);
        });
      }else {
        globalProperties.$modal.msgError("非法操作");
      }
    }
  });
  //console.log("查询世界详细formEl:"+JSON.stringify(formEl))
}

const reset = () => {
  router.push("/admin/worldInfo?wid="+wid.value);
}



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
  //console.log("原创"+form.value.checkList.indexOf("原创"))
  //console.log("原创长度"+form.value.checkList.length)
  //console.log("原创长度"+JSON.stringify(form.value.checkList))
  if(form.value.checkList.length==0){
    ischeck.value=0;
  }else {
    if (form.value.checkList.indexOf("原创") != -1) {
      ischeck.value = 1;
    } else {
      ischeck.value = 2;
    }
  }

}

handleWorld(wid.value);
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
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
