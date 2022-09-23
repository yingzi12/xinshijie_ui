<template>
  <div class="app-container">
    <!--  世界名称-->
    <div style="background-color:#8c939d;height: 30px">
        <h2  class="center2">{{ wname }}</h2>
    </div>
    <!--  分类管理 -->
    <div >
      <div style="background-color: #E5EAF3;height: 25px">
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

    <component :is="temPage" ref="temElement"></component>

    <!--功能-->
    <div class="center" style="height: 80px;">
      <el-button @click="submit()">保存并预览</el-button>
    </div>
  </div>
</template>

<script  lang="ts" setup>
import {getCurrentInstance, markRaw, ref} from 'vue'
import {ElTree, FormInstance, ElMessage} from "element-plus";
import { getTree} from "@/api/wiki/category";
import { addElement} from "@/api/admin/element";
import { getWorld} from "@/api/wiki/world";
import {useRoute, useRouter} from "vue-router";
import biologly from '../../add/biology.vue'
import goods from '../../add/goods.vue'
import index from '../../add/index.vue'
import race from '../../add/race.vue'
import role from '../../add/role.vue'

// 接收url里的参数
const route = useRoute();
const router = useRouter()

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

const wid = ref(null);
wid.value = route.query.wid;


const {  appContext : { config: { globalProperties } }  } = getCurrentInstance();
const {  proxy  } = getCurrentInstance();
// 分类模板
const categoryList = ref()

const dataStree = ref([])
//分类标签
const dynamicTags = ref([])
//分类选择
const treeRef = ref<InstanceType<typeof ElTree>>()
//基础信息
const element = ref<InstanceType<Element>>({})
element.value.wid=wid;
//原始的选中的value
const sleValue=ref({})
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
  contentList:[]
}
interface Tree {
  id: number
  label: string
  children?: Tree[]
}

function submit(){
  console.log(JSON.stringify(temElement))
  element.value=temElement.value.element;
  element.value.wid=wid.value
  element.value.ext=JSON.stringify(temElement.value.basic);
  element.value.categoryList=sleValue;

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
  //console.log("简介长度:"+element.value.intro.length)
  if(element.value.intro.length<10 || element.value.intro.length >300){
    ok=false;
    ElMessage.error('简介长度不能小于10超过300!')
    return;
  }
  //console.log("分类长度:"+element.value.categoryList.length)
  if(element.value.categoryList.length<1 || element.value.categoryList.length >10){
    ok=false;
    ElMessage.error('分类不能小于1超过10!')
    return;
  }
  if(ok) {
    addElement(element.value).then(response => {
      //console.log("添加成功")
        router.push("/admin/draftPreview?wid="+ response.data.wid+"&deid=" + response.data.id)
    });
  }
}

const wname=ref('')
/** 查询世界详细 */
function handWorld() {
  getWorld(wid.value).then(response => {
    //console.log("查询世界详细:"+JSON.stringify(response))
    wname.value = response.data.name
  });
}
/** 查询分类列表 */
function getList() {
  getTree(wid.value).then(response => {
    dataStree.value = response.data
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
}
getList()
handWorld();
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
