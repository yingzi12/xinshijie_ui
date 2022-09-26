<template>
  <div class="app-container">
    <!--  世界名称-->
    <div style="background-color: #E5EAF3">
        <h2  class="center2">{{ world.name }}</h2>
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
    <component :is="temPage" ref="temElement" v-bind="element"></component>
    <!-- 元素内容 -->
    <!--功能-->
      <div class="center" style="height: 80px;">
        <el-button @click="submit()">保存并预览</el-button>
        <el-button @click="submitClear()">取消</el-button>
      </div>
  </div>
</template>

<script  lang="ts" setup>
import {inject, markRaw, reactive, ref} from 'vue'
import {ElMessage, ElTree, FormInstance} from "element-plus";
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import  Editor  from 'ckeditor5-custom-build/build/ckeditor';
import {  getDraftDetails,updateDraft } from "@/api/admin/draftElement";
import { getTree } from "@/api/wiki/category";
import { getWorld } from "@/api/admin/world";

//接受参数
import { useRoute ,useRouter}  from "vue-router";  // 引用vue-router
import index from "../../draftedit/index.vue";
import role from "../../draftedit/role.vue";
import biologly from "../../draftedit/biology.vue";
import race from "../../draftedit/race.vue";
import goods from "../../draftedit/goods.vue";  // 引用vue-router

const router = useRouter()
// 接收url里的参数
const route = useRoute();

const temTypesMap=new Map([
  [1,markRaw(index)],
  [2,markRaw(role)],
  [3,markRaw(biologly)],
  [4,markRaw(race)],
  [5,markRaw(goods)],
])

const temType = ref(1);
if(!route.query.temType || isNaN(route.query.temType)){
  console.log("111:"+route.query.temType)
  temType.value =1
}else {
  console.log("2222:"+route.query.temType)
  temType.value =parseInt(route.query.temType);
  if(temType.value>5 || temType.value<=0 ){
    console.log("333:"+route.query.temType)
    temType.value =1
  }
}
const  temPage=temTypesMap.get(temType.value)
const temElement=ref()
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
// 分类模板
const categoryList = ref([])
const world = ref({})

const dataStree = ref([])
//分类标签
const dynamicTags = ref([])
//分类选择
const treeRef = ref<InstanceType<typeof ElTree>>()
//基础信息
const element = ref<InstanceType<WorldElement>>({})
//原始的选中的value
const sleValue=ref({})

/** 查询世界列表 */
function getList() {
  getTree(wid.value).then(response => {
    dataStree.value = response.data
    // //console.log("树:"+JSON.stringify( dataStree.value))
  });
}
// /** 查询世界列表 */
function handWorld() {
  getWorld(wid.value).then(response => {
    world.value = response.data
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

/** 查询草稿详细 */
function getElement(wid:number,deid:number) {
  getDraftDetails(wid,deid,0).then(response => {
    // //console.log("查询草稿详细:"+JSON.stringify(response))
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
    // //console.log("打印查询到的element"+JSON.stringify(element))
  });
}

function submit(){
  var ok=true;
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
  if(element.value.categoryList.length <1 || element.value.categoryList.length > 10){
    ok=false;
    ElMessage.error('分类不能超过10个小于1个')
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
  // //console.log("简介长度:"+element.value.intro.length)
  if(element.value.intro.length<10 || element.value.intro.length >300){
    ok=false;
    ElMessage.error('简介长度不能小于10超过300!')
    return;
  }
  // //console.log("简介长度:"+element.value.categoryList.length)
  if(element.value.categoryList.length<1 || element.value.categoryList.length >10){
    ok=false;
    ElMessage.error('分类不能小于1超过10!')
    return;
  }
  //console.log("添加："+JSON.stringify(element.value))
  if(ok) {
    element.value.wname=world.value.name
    updateDraft(element.value).then(response => {
      //console.log("添加成功")
      router.push("/admin/draftPreview?wid="+ wid.value+"&deid=" + deid.value)
    });
  }
}

function submitClear(){
  router.push("/admin/draftPreview?wid="+ wid.value+"&deid=" + deid.value)
}
getElement(wid.value,deid.value);
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
