<template>
        <!--        标题-->
    <AdminHead :head-type="1" :wid="wid" :wname="wname"></AdminHead>
    <div style="background-color:#b0c4de;margin: auto;padding: 10px">
        <el-row>
            <el-col :span="20">
                                <h1>编辑世界</h1>
            </el-col>
            <el-col :span="4" style="text-align: right;">
                <div style="text-align: right; font-size: 12px" class="toolbar">
                    <el-button text @click="handleReturn()">返回</el-button>
                </div>
            </el-col>
        </el-row>
    </div>
    <div style=" border-style: solid; border-width: 1px;border-color:#CFD3DC">
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
              <el-form-item label="是否公开">
                <el-radio-group v-model="form.isPrivate">
                  <el-radio :label="2" >公开</el-radio>
                  <el-radio :label="1">私有</el-radio>
                </el-radio-group>
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
              <el-form-item label="描 述" prop="descriptionZip">
                <el-input v-model="form.descriptionZip" type="textarea" rows="10"  placeholder="请输入世界说明"/>
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
import { inject, reactive, ref, toRefs} from 'vue'
import { useRoute,useRouter }  from "vue-router";  // 引用vue-router
import {  updateWorld,getWorld } from "@/api/admin/world";
import {ElMessage, FormInstance, UploadProps} from "element-plus";
import AdminHead from "./worldHead.vue";
import {worldTypes } from "@/utils/constant";


const router = useRouter()
// 接收url里的参数
const route = useRoute();

//世界信息
const world=ref({})
const wid = ref(route.query.wid);
const wname = ref(route.query.wname);
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
    descriptionZip: [ { required: true, message: '请输入世界描述', trigger: 'blur' },
      { min: 10, max: 1000, message: 'Length should be 10 to 1000', trigger: 'blur' }],
  }
});
const {  form, rules } = toRefs(data);


//上传图片
// const imageUrl = ref('')
/** 查询世界详细 */
function handleWorld(id:number) {
  getWorld(id).then(response => {
    form.value = response.data;
    form.value.checkList=form.value.source.split(';')
    handleSurce();
    imageUrl.value=imgUrl+response.data.imgUrl;
    imageUrlPath.value=response.data.imgUrl;
  });
}

const submitForm = async (formEl: FormInstance | undefined) => {
  // proxy.$refs["worldRef"].validate(valid => {
    //console.log("查询世界详细worldRef valid:"+JSON.stringify(valid))
    // if (valid) {
      if (form.value.id != undefined) {
        form.value.source=form.value.checkList.map(String).join(';')
        form.value.imgUrl=imageUrlPath.value
        updateWorld(form.value).then(response => {
          ElMessage.success("修改成功");
          router.push("/admin/worldInfo?wid="+wid.value);
        });
      }else {
        ElMessage.error("非法操作");
      }
  //   }
  // });
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
function handleReturn(){
    router.back()
}
handleWorld(wid.value);
</script>

<style scoped>

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}


.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
