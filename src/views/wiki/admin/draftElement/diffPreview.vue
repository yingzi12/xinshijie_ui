<template>
  <div class="app-container" >
    <div>
      <el-menu
          :default-active="1"
          mode="horizontal"
          style="margin:0px;pardding:0px"
      >
        <el-menu-item index="1"><span style="font-size: 20px;font-weight:bold;">差异比对</span></el-menu-item>
      </el-menu>
    </div>
    <div style="border-style:solid;">
    <!--  基本信息-->
    <div >
        <h1>{{ worldElement.title }}<el-tag size="small">{{elementStatus.get(worldElement.status)}}</el-tag></h1>
      <span>创建时间:</span><el-tag>{{worldElement.createTime}}</el-tag>
        <span>分类:</span> <el-tag v-for="category in worldElement.categoryList">
        {{category.label}}
      </el-tag>
    </div>
    <el-divider />
    <!--  简介 -->
    <div style="margin-bottom: 20px">
      <div v-html="worldElement.intro"> </div>
    </div>
    <!-- 元素内容 -->
    <component :is="temPage"  v-bind="worldElement" ></component>
    <el-divider />
      <!--功能-->
      <div class="center" style="height: 80px;">
        <el-button v-if="worldElement.status == 0" @click="submitPush()">发布</el-button>
        <el-button v-if="worldElement.status == 0" @click="submitEdit()">继续编辑</el-button>
        <el-button @click="handleReturn()">返回</el-button>
      </div>
    </div>
  </div>


</template>

<script  lang="ts" setup>
import {reactive, ref, shallowRef} from 'vue'
import {FormInstance} from "element-plus";
import {getDraftDetails ,updatePush,getDiff} from "@/api/admin/draftElement";
//接受参数
import { useRoute ,useRouter}  from "vue-router";  // 引用vue-router

import biologly from '../../diffpreview/biology.vue'
import goods from '../../diffpreview/goods.vue'
import index from '../../diffpreview/index.vue'
import race from '../../diffpreview/race.vue'
import role from '../../diffpreview/role.vue'

const temTypesMap=new Map([
  [1,shallowRef(index)],
  [2,shallowRef(role)],
  [3,shallowRef(biologly)],
  [4,shallowRef(race)],
  [5,shallowRef(goods)],

])

const router = useRouter()
// 接收url里的参数
const route = useRoute();

const temType = ref(1);
if(!route.query.temType || isNaN(route.query.temType)){
  // console.log("111:"+route.query.temType)
  temType.value =1
}else {
  console.log("2222:"+route.query.temType)
  // temType.value =route.query.temType;
  if(temType.value>5 || temType.value<=0 ){
    temType.value =1
  }
}
const  temPage=temTypesMap.get(parseInt(temType.value))
const worldElement=ref({})
//世界信息
const deid = ref(null);
const wid = ref(null);
deid.value = route.query.deid;
wid.value = route.query.wid;
const elementStatus = new Map([
  [0, "草稿"],
  [1, "待审核"],
  [3, "审核不通过"],
  [2, "通过审核"],
  [4, "删除"]
]);


/** 查询草稿详细 */
function getDraft(wid:number,deid:number) {
  getDraftDetails(wid,deid,1).then(response => {
    worldElement.value = response.data
  });
}
function submitPush(){
  updatePush(wid.value,deid.value).then(response => {
    router.push("/admin/draftPreview?wid="+ wid.value+"&deid=" +deid.value)
  });
}
function submitEdit(){
  router.push("/admin/draftEdit?wid="+ wid.value+"&deid=" +deid.value)
}
function handleReturn(){
  router.back()
}


getDraft(wid.value,deid.value);
//console.log("状态:"+elementStatus.get(element.value.status))

const getHtml = function(desc){
  // let temp=document.createElement("div");
  // temp.innerHTML=desc;
  // let output=temp.innerText||temp.textContent;
  // temp=null;
  return desc;
}
</script>

<style scoped>
.center2 {
  top: 50%;
  width: 100%;
  text-align: center;
  font-size: 18px;
}
.my-label {
  background: var(--el-color-success-light-9);
}
.my-content {
  background: var(--el-color-danger-light-9);
}
.center {
  top: 50%;
  width: 100%;
  text-align: center;
  font-size: 18px;
}
.editNewInline div{
  width:auto;display:inline-block !important; display:inline;
  background-color: #009926;
}
.editOldInline div{
  width:auto;display:inline-block !important; display:inline;
  background-color: #990000;
  text-decoration: line-through;
}
</style>
