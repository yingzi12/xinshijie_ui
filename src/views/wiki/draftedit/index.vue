<template>
    <!--  基本信息 -->
    <div>
      <div style="background-color: #E5EAF3">
        <BootstrapIcon icon="card-checklist" size="1x" flip-v /><span>基本信息</span>
      </div>
      <div>
        <el-form :model="element" label-width="120px">
          <el-form-item label="名称">
            <el-input v-model="element.title" />
          </el-form-item>
          <el-form-item label="Activity form">
            <el-input v-model="element.intro" type="textarea" />
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 元素内容 -->
    <div>
      <div style="background-color: #E5EAF3">
        <el-row >
          <el-col :span="21">
            <div class="biaoti">
              <BootstrapIcon icon="pencil-square" size="1x" flip-v /><span>元素内容</span>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="center">
              <el-button type="info" @click="addDomain" round>添加内容小节</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
      <div v-for="(content, index) in element.contentList"
           :key="content.key"
           :label="'Content' + index"
           :prop="'content.' + index + '.value'"
           :rules="{
        required: true,
        message: 'domain can not be null',
        trigger: 'blur',
      }"
      >
        <el-form :inline="true"  class="demo-form-inline">
          <div style="background-color: #cccccc">
            <el-row >
              <el-col :span="19">
                <div class="biaoti">
                  <BootstrapIcon icon="pencil-square" size="1x" flip-v />
                  <span v-if="content.isUpdate != 1">{{ content.title }}</span>
                  <el-input  style="width:100px" v-if="content.isUpdate == 1"  size="small" v-model="content.title"  />
                </div>
              </el-col>
              <el-col :span="5">
                <div class="center">
                  <!--                <el-button v-if="content.isUpdate == 1" @click="submitForm(formRef)"><BootstrapIcon icon="save" size="1x" flip-v />保存</el-button>-->
                  <el-button v-if="content.isUpdate == 1" @click="handEditClean(content)"><BootstrapIcon icon="save" size="1x" flip-v />退出编辑</el-button>
                  <el-button v-if="content.isUpdate != 1" @click="handEdit(content)"><BootstrapIcon icon="pencil-square" size="1x" flip-v  />编辑</el-button>
                  <el-button v-if="content.isUpdate != 1" @click.prevent="removeDomain(content)"><BootstrapIcon icon="trash" size="1x" flip-v />删除</el-button>
                  <el-button v-if="content.status == 2" ><BootstrapIcon icon="lock" size="1x" flip-v />锁定</el-button>
                </div>
              </el-col>
            </el-row>
          </div>
          <div>
            <ckeditor    :editorDisabled="true" @input="onEditorInput(content)" :editor="editor" v-model="content.content" :config="editorConfig"></ckeditor>
          </div>
        </el-form>

      </div>
    </div>

</template>

<script  lang="ts" setup>
import {inject, ref} from 'vue'
import {ElMessage, FormInstance} from "element-plus";
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import  Editor  from 'ckeditor5-custom-build/build/ckeditor';

//接受参数
import { useRoute ,useRouter}  from "vue-router";  // 引用vue-router
const router = useRouter()
// 接收url里的参数
const route = useRoute();
//世界信息
const deid = ref(null);
const wid = ref(null);
deid.value = route.query.deid;
wid.value = route.query.wid;
//console.log("deid="+deid.value);
//console.log("世界id="+wid.value);

//基本信息
interface WorldElement {
  id:number,
  wid:String,
  title:string,
  intro:String,
  softtype: number,
  categoryList:[],
  contentList:Content[],
  contentIdList:number[],
}

interface Content {
  id:number
  key: number
  title: string
  status: number
  isUpdate: number
  content: string,
  isNew: number
}
const props = defineProps<WorldElement>()
//基础信息
const element = ref<InstanceType<WorldElement>>({})
element.value=props

const editor = Editor
const baseUrl = inject("$baseUrl")
const uploadImgUrl = ref(baseUrl + "/common/uploadImage"); // 上传的图片服务器地址
const editorConfig ={
  language:"zh-cn",
  simpleUpload: {
    // The URL the images are uploaded to.
    uploadUrl: uploadImgUrl.value,
  },
}
const elementStatus = new Map([
  [0, "草稿"],
  [1, "发布"],
  [3, "审核不通过"],
  [2, "通过审核"],
  [4, "删除"]
]);
//章节模块
const formRef = ref<FormInstance>()

const removeDomain = (item: Content) => {
  if(item.id != null){
    item.status=4
    element.value.contentIdList.push(item.id)
  }
  // //console.log("删除："+JSON.stringify(item))
  const index = element.value.contentList.indexOf(item)
  // //console.log("删除index："+index)
  if (index !== -1) {
    element.value.contentList.splice(index, 1)
  }
}

const addDomain = () => {
  element.value.contentList.push({
    id:null,
    key: Date.now(),
    status:1 ,
    title: '标题',
    content: '',
    isUpdate: 0,
    isNew:1
  })
}
function onEditorInput(content: Content){
  content.isUpdate=1;
  //出生了修改,需要更新
  content.status = 3
  //console.log('onEditorInput!')
  if(content.content.length>20000){
    ElMessage.error("内容长度为"+content.content.length+"，已超过最大许可值2万")
  }
}
const handEdit = (content: Content) => {
  content.isUpdate=1;
}
const handEditClean = (content: Content) => {
  content.isUpdate=0;
}
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      //console.log('submit!')
    } else {
      //console.log('error submit!')
      return false
    }
  })
}
//扩充
const basic=ref({});
// 传递参数到index
defineExpose({  element,basic})
</script>

<style scoped>
.center2 {
  top: 50%;
  width: 100%;
  text-align: center;
  font-size: 18px;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
