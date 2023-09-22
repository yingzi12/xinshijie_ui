<template>
  <!--  节日-->
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
        <el-form-item label="简介">
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
            <el-button type="info" @click="addContent" round>添加内容小节</el-button>
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
        message: 'content can not be null',
        trigger: 'blur',
      }"
    >
      <el-form            ref="ruleFormRef"
                          :inline="true" :model="dynamicValidateForm" class="demo-form-inline">
        <div style="background-color: #cccccc">
          <el-row >
            <el-col :span="19">
              <div class="biaoti">
                <BootstrapIcon icon="pencil-square" size="1x" flip-v />
                <span v-if="content.isUpdate = 0">小标题</span>
                <el-input  style="width:100px" v-if="content.isUpdate = 1"  size="small" v-model="content.title" placeholder="小标题" />
              </div>
            </el-col>
            <el-col :span="5">
              <div class="center">
                <!--                <el-button v-if="content.status == 0" @click="submitForm(ruleFormRef,element)"><BootstrapIcon icon="save" size="1x" flip-v />保存</el-button>-->
                <el-button v-if="content.status == 0" @click.prevent="removeContent(content)"><BootstrapIcon icon="trash" size="1x" flip-v />删除</el-button>
                <el-button v-if="content.status == 1" ><BootstrapIcon icon="lock" size="1x" flip-v />锁定</el-button>
                <el-button v-if="content.status == 2" ><BootstrapIcon icon="pencil-square" size="1x" flip-v />编辑</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
        <div>
          <ckeditor :editor="editor"  @input="onEditorInput(content)" v-model="content.content" :config="editorConfig"></ckeditor>
        </div>
      </el-form>
    </div>
  </div>

</template>

<script  lang="ts" setup>
import {getCurrentInstance, inject, reactive, ref} from 'vue'
import {FormInstance, ElInput, ElMessage} from "element-plus";
import  Editor  from 'ckeditor5-custom-build/build/ckeditor';

const editor = Editor
const baseUrl = inject("$baseUrl")
const imgUrl = inject("$imgUrl")

const uploadImgUrl = ref(baseUrl + "/common/uploadImage"); // 上传的图片服务器地址
const editorConfig ={
  language:"zh-cn",
  simpleUpload: {
    // The URL the images are uploaded to.
    uploadUrl: uploadImgUrl.value,
  },
}
const {  appContext : { config: { globalProperties } }  } = getCurrentInstance();
const {  proxy  } = getCurrentInstance();

//基础信息
const element = reactive<InstanceType<Element>>({
  title:'',
  intro:'',
  softtype:1,
  contentList: [
    {
      key: 1,
      title:'标题',
      status: 0,
      isUpdate: 0,
      content: '',
    },
  ]
})
//扩充
const basic=ref({});
//章节模块
const ruleFormRef = ref<FormInstance>()
interface Content {
  key: number
  title: string
  status: number,
  isUpdate: number,
  content: string,
}
//基本信息
interface Element {
  wid:String,
  title:string,
  intro:String,
  softtype: number,
  categoryList:[],
  contentList:Content[]
}

function onEditorInput(content: Content){
  if(content.content.length>20000){
    ElMessage.error("内容长度为"+content.content.length+"，已超过最大许可值2万")
  }
}
const removeContent = (item: Content) => {
  const index = element.contentList.indexOf(item)
  if (index !== -1) {
    element.contentList.splice(index, 1)
  }
}

const addContent = () => {
  element.contentList.push({
    key: Date.now(),
    title: '标题',
    status: 0,
    isUpdate: 1,
    content: '',
  })
}
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
