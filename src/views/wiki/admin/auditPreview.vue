<template>
  <div class="app-container" >
    <div>
      <el-menu
          :default-active="activeIndex"
          mode="horizontal"
          @select="handleSelect"
          style="margin:0px;pardding:0px"
      >
        <el-menu-item index="1"><span style="font-size: 20px;font-weight:bold;">内容详细</span></el-menu-item>
      </el-menu>
    </div>
    <div style="border-style:solid;">
    <!--  世界名称-->
    <div >
        <h1>{{ worldElement.title }}</h1>
      <span>更新时间:</span><el-tag>{{worldElement.updateTime}}</el-tag>
        <span>分类:</span> <el-tag v-for="category in worldElement.categoryList">
        {{category.label}}
      </el-tag>
    </div>
    <el-divider />
    <!--  基本信息 -->
    <div style="margin-bottom: 20px">
      <div v-html="worldElement.intro"> </div>
    </div>
    <!-- 元素内容 -->
    <component :is="temPage"  v-bind="worldElement" ></component>
    <el-divider />
      <!--功能-->
      <div class="center" style="height: 80px;">
        <el-button @click="handClean()">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script  lang="ts" setup>
import {reactive, ref, shallowRef} from 'vue'
import {FormInstance} from "element-plus";
import {  getDraftDetails ,updatePush} from "@/api/admin/draftElement";
//接受参数
import { useRoute ,useRouter}  from "vue-router";  // 引用vue-router

import biologly from '../preview/biology'
import goods from '../preview/goods'
import index from '../preview/index'
import race from '../preview/race'
import role from '../preview/role'

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
  console.log("111:"+route.query.temType)
  temType.value =1
}else {
  console.log("2222:"+route.query.temType)
  temType.value =route.query.temType;
  if(temType.value>5 || temType.value<=0 ){
    temType.value =1
  }
}
const  temPage=temTypesMap.get(temType.value)
const worldElement=ref({})
//世界信息
const deid = ref(null);
const wid = ref(null);
deid.value = route.query.deid;
wid.value = route.query.wid;

/** 查询草稿详细 */
function getDraft(wid:number,deid:number) {
  getDraftDetails(wid,deid,0).then(response => {
    //console.log("查询草稿详细:"+JSON.stringify(response))
    worldElement.value = response.data
  });
}
function submitPush(){
  updatePush(wid,deid).then(response => {
    //console.log("发布成功")
    router.push("/element/content?wid="+ wid.value+"&deid=" +deid.value)
  });
}
function handDiff(){
  router.push("/admin/auditDiffPreview?wid="+ wid.value+"&deid=" +deid.value)
}
function handClean(){
  router.push("/admin/audit")
}
interface DomainItem {
  key: number
  title: string
  value: string
}

getDraft(wid.value,deid.value);
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
</style>
