<template>
  <div class="app-container">
    <!--  世界名称-->
    <div style="background-color: #E5EAF3">
        <h2  class="center2">{{ wname }}</h2>
    </div>
    <!--  分类管理 -->
    <div>
      <div style="background-color: #E5EAF3">
        <BootstrapIcon icon="card-list" size="1x" flip-v /><span>分类管理</span>
      </div>
      <div style="height: 55px">
        <div>
          分类: <el-tree-select
            ref="treeRef"
            v-model="categoryList"
            :data="dataStree"
            multiple
            collapse-tags
            :render-after-expand="false"
            @change="show"
            show-checkbox />
        </div>
        <div>
          已选择: <el-tag
            v-for="tag in dynamicTags"
            :key="tag"
            class="mx-1"
            :disable-transitions="false">
          {{ tag }}
        </el-tag>

        </div>
      </div>
    </div>
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
        <el-form  :inline="true"  class="demo-form-inline">
        <div style="background-color: #cccccc">
          <el-row >
            <el-col :span="19">
              <div class="biaoti">
                <BootstrapIcon icon="pencil-square" size="1x" flip-v />
                <span v-if="content.isUpdate == 0">{{ content.title }}</span>
                <el-input  style="width:100px" v-if="content.isUpdate == 1"  size="small" v-model="content.title" placeholder="小标题" />
              </div>
            </el-col>
            <el-col :span="5">
              <div class="center">
<!--                <el-button v-if="content.isUpdate == 1" @click="submitForm(formRef)"><BootstrapIcon icon="save" size="1x" flip-v />保存</el-button>-->
                <el-button v-if="content.isUpdate == 1" @click="handEditClean(content)"><BootstrapIcon icon="save" size="1x" flip-v />退出编辑</el-button>
                <el-button v-if="content.isUpdate == 0" @click="handEdit(content)"><BootstrapIcon icon="pencil-square" size="1x" flip-v  />编辑</el-button>
                <el-button v-if="content.isUpdate == 0" @click.prevent="removeDomain(content)"><BootstrapIcon icon="trash" size="1x" flip-v />删除</el-button>
                <el-button v-if="content.status == 2" ><BootstrapIcon icon="lock" size="1x" flip-v />锁定</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
        <div>
              <ckeditor :editorDisabled="true" @input="onEditorInput(content)" :editor="editor" v-model="content.content" :config="editorConfig"></ckeditor>
        </div>
        </el-form>

      </div>
    </div>
<!--    修改原因-->
    <div>
      <el-radio-group v-model="causeNumber">
        <el-radio :label="2">其他</el-radio>
        <el-radio :label="3">添加内容</el-radio>
        <el-radio :label="4">修改错误</el-radio>
        <el-radio :label="5">去重复内容</el-radio>
      </el-radio-group>
      <el-input
          v-model="causeContent"
          :autosize="{ minRows: 2, maxRows: 4 }"
          type="textarea"
          placeholder="修改原因"
      />
    </div>
    <!--功能-->
      <div class="center" style="height: 80px;">
        <el-button @click="submit()">保存并预览</el-button>
        <el-button @click="submitClear()">取消</el-button>
      </div>
  </div>
</template>

<script  lang="ts" setup>
import {inject, reactive, ref} from 'vue'
import {ElMessage, ElTree, FormInstance} from "element-plus";
import  Editor  from 'ckeditor5-custom-build/build/ckeditor';
import {  getElementDetails } from "@/api/wiki/element";
import {  updateElement } from "@/api/admin/element";
import { getTree} from "@/api/wiki/category";
import { getWorld} from "@/api/admin/world";

//接受参数
import { useRoute ,useRouter}  from "vue-router";  // 引用vue-router
const router = useRouter()
// 接收url里的参数
const route = useRoute();
//世界信息
const eid = ref(null);
const wid = ref(null);
eid.value = route.query.eid;
wid.value = route.query.wid;
//console.log("元素id="+eid.value);
//console.log("世界id="+wid.value);
//多选框
const causeNumber = ref(1)
const causeContent = ref('')

//基本信息
interface Element {
  id:number,
  wid:number,
  title:string,
  intro:string,
  softtype: number,
  causeNumber: number,
  causeContent: String,
  categoryList:[],
  contentList:Content[],
  contentIdList:[],
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

const editor = Editor
const baseUrl = inject("$baseUrl")
const imgUrl = inject("$imgUrl")

const uploadImgUrl = ref(baseUrl + "/common/uploadEditFile"); // 上传的图片服务器地址
const editorConfig ={
  language:"zh-cn",
  simpleUpload: {
    // The URL the images are uploaded to.
    uploadUrl: uploadImgUrl.value,
  },
}

//章节模块
const formRef = ref<FormInstance>()

const removeDomain = (item: Content) => {
  if(item.id != null){
    item.status=4
    element.value.contentIdList.push(item.id)
  }
  // //console.log("删除："+JSON.stringify(item))
  const index = element.value.contentList.indexOf(item)
  ////console.log("删除index："+index)
  if (index !== -1) {
    element.value.contentList.splice(index, 1)
  }
}

const addDomain = () => {
  element.value.contentList.push({
    id:null,
    key: Date.now(),
    status:1,
    title: '',
    value: '',
    isUpdate: 0,
    isNew:1
  })
}
function onEditorInput(content: Content){
  content.isUpdate=1;
  //只有正常状态下会改变
    content.status = 3
  ////console.log('onEditorInput!')
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
   //   //console.log('submit!')
    } else {
   //   //console.log('error submit!')
      return false
    }
  })
}
// 分类模板
const categoryList = ref([])

const dataStree = ref([])
//分类标签
const dynamicTags = ref([])
//分类选择
const treeRef = ref<InstanceType<typeof ElTree>>()
//基础信息
const element = ref<InstanceType<Element>>({})
//原始的选中的value
const sleValue=ref({})

const wname=ref('')
/** 查询世界详细 */
function handWorld() {
  getWorld(wid.value).then(response => {
    // //console.log("查询世界详细:"+JSON.stringify(response))
    wname.value = response.data.name
  });
}

/** 查询世界列表 */
function getList() {
  getTree(wid.value).then(response => {
    dataStree.value = response.data
    // //console.log("树:"+JSON.stringify( dataStree.value))
  });
}

function  show(val){
//let that = this ,将this保存在that中，再在函数中使用that均可
  dynamicTags.value=categoryList.value
  // //console.log("选中的对象value1"+categoryList.value)
  // //console.log("选中的对象treeRef"+JSON.stringify(treeRef.value))

  sleValue.value=new Array();
  dynamicTags.value=new Array();
  for(let i=0;i<=categoryList.value.length-1;i++){
    dynamicTags.value[i]=categoryList.value[i].split('$$')[1]
    sleValue.value[i]=categoryList.value[i].split('$$')[0]
  }
  element.value.categoryList=sleValue;
  // //console.log("选中的对象value2"+categoryList.value)
  // //console.log("选中的对象sleValue2"+sleValue.value)
  // //console.log("选中的对象element:"+JSON.stringify(element.value))
}
// const treeRef = ref<InstanceType<typeof ElTree>>()

/** 查询世界详细 */
function getElement(wid:number,eid:number) {
  getElementDetails(wid,eid).then(response => {
    // //console.log("查询世界详细:"+JSON.stringify(response))
    element.value = response.data
    element.value.contentIdList=[];
    categoryList.value=[];
    dynamicTags.value=[];
    sleValue.value=[];
    for(var i=0;i<element.value.categoryList.length;i++){
      categoryList.value[i]=element.value.categoryList[i].value
      dynamicTags.value[i]=element.value.categoryList[i].label
      sleValue.value[i]=element.value.categoryList[i].id
    }
    element.value.categoryList=sleValue
    // //console.log("打印查询到的categoryList"+JSON.stringify(categoryList))
  });
}

function submit(){
  var ok=true;
  if(!element.value.title ){
    ok=false;
    ElMessage.error('名称不能为空!')
    return;
  }
  if(!element.value.intro ){
    ok=false;
    ElMessage.error('简介不能为空!')
    return;
  }
  if(element.value.title.length <1 || element.value.title.length > 100){
    ok=false;
    ElMessage.error('元素名称长度不能小于1超过100')
    return;
  }
  if(element.value.contentList.length <1 || element.value.contentList.length > 10){
    ok=false;
    ElMessage.error('内容小节数不能超过10个小于1个')
    return;
  }
  for(var i=0;i<element.value.contentList.length;i++) {
    if(element.value.contentList[i].content.length>20000){
      ElMessage.error("标题<<"+element.value.contentList[i].title+">>内容长度为"+element.value.contentList[i].content.length+"，已超过最大许可值2万")
      return;
    }
  }
  if(!causeContent ){
    ok=false;
    ElMessage.error('修改原因不能为空!')
    return;
  }
  if(causeContent.value.length<=10 || causeContent.value.length > 500){
    ok=false;
    ElMessage.error('修改原因不能少于10，超过500!')
    return;
  }

  // //console.log("简介长度:"+element.value.intro.length)
  if(element.value.intro.length<10 || element.value.intro.length >300){
    ok=false;
    ElMessage.error('简介长度不能小于10超过300!')
    return;
  }
  // //console.log("分类长度:"+element.value.categoryList.length)
  if(element.value.categoryList.length<1 || element.value.categoryList.length >10){
    ok=false;
    ElMessage.error('分类不能小于1超过10!')
    return;
  }
  // //console.log("添加："+JSON.stringify(element.value))
  if(ok) {
    element.value.causeContent=causeContent.value
    element.value.causeNumber=causeNumber.value
    updateElement(element.value).then(response => {
  //    //console.log("添加成功")
      router.push("/admin/draftPreview?wid="+ response.data.wid+"&deid=" + response.data.id)
    });
  }
}

function submitClear(){
  router.push("/element/details?wid="+ wid.value+"&eid=" + eid.value)
}
getElement(wid.value,eid.value);
getList()
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
