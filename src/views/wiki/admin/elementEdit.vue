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
    <!-- 元素内容 -->
    <component :is="temPage" ref="temElement" v-bind="element"></component>

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
import {inject, markRaw, reactive, ref} from 'vue'
import {ElMessage, ElTree, FormInstance} from "element-plus";
import {  getElementDetails } from "@/api/wiki/element";
import {  updateElement } from "@/api/admin/element";
import { getTree} from "@/api/wiki/category";
import { getWorld} from "@/api/admin/world";

//接受参数
import { useRoute ,useRouter}  from "vue-router";
import index from "../edit/index.vue";
import role from "../edit/role.vue";
import biologly from "../edit/biology.vue";
import race from "../edit/race.vue";
import goods from "../edit/goods.vue";  // 引用vue-router

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
  dynamicTags.value=categoryList.value
  sleValue.value=new Array();
  dynamicTags.value=new Array();
  for(let i=0;i<=categoryList.value.length-1;i++){
    dynamicTags.value[i]=categoryList.value[i].split('$$')[1]
    sleValue.value[i]=categoryList.value[i].split('$$')[0]
  }
  // element.value.categoryList=sleValue;
}

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

  console.log(JSON.stringify(temElement))
  element.value=temElement.value.element;
  element.value.ext=JSON.stringify(temElement.value.basic);
  element.value.categoryList=sleValue;

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
  router.push("/element/details?wid="+ wid.value+"&eid=" + eid.value+"&temType="+temType.value)
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
