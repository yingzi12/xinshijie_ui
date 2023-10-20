<template>
  <div class="app-container" >
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/world/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/world/list">世界树</a></el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/world/details', query: {wid:wid} }">{{world.name}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/element/list', query: {wid:wid} }">元素</el-breadcrumb-item>
        <el-breadcrumb-item>元素详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div >
      <!--  元素名称-->
      <div >
        <div ><h1 class="title">{{ worldElement.title }}</h1><el-text class="mx-1" type="info">{{ worldElement.updateTime }}</el-text></div>
        <div class="lessen">
          <span>分类:</span>
          <el-tag size="small" v-for="cname in worldElement.cnameList">
          {{cname}}
          </el-tag>
        </div>
      </div>
      <el-divider />
      <!--  简介 -->
      <div style="margin-bottom: 20px;margin-left: 25px">
        <div v-html="worldElement.intro"> </div>
      </div>
      <!-- 元素内容 -->
      <component :is="temPage"  v-bind="worldElement" ></component>
      <el-divider />
      <!--功能-->
      <div class="center" style="height: 80px;">
        <el-button @click="handleReturn()" text type="success" style="width: 100px;">返回</el-button>
        <el-button @click="handleEdit()" text type="success" style="width: 100px;">编辑</el-button>
      </div>
    </div>
  </div>
</template>

<script  lang="ts" setup>
import {markRaw, reactive, ref, shallowRef} from 'vue'
import {  getElementDetails } from "@/api/wiki/element";
import {  getWorld } from "@/api/wiki/world";
//接受参数
import { useRoute ,useRouter}  from "vue-router";

import biologly from '../view/biology'
import goods from '../view/goods'
import index from '../view/index'
import race from '../view/race'
import role from '../view/role'

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
  temType.value =1
}else {
  temType.value =route.query.temType;
  if(temType.value>5 || temType.value<=0 ){
    temType.value =1
  }
}
const  temPage=temTypesMap.get(parseInt(temType.value))
const worldElement=ref({})

//世界信息


const eid = ref(route.query.eid);
const wid = ref(route.query.wid);

/** 查询元素详细 */
function getElement() {
  getElementDetails(wid.value,eid.value).then(response => {
    worldElement.value = response.data
  });
}

function handleList(){
  router.push("/element/list?wid="+ wid.value+"&deid=" +eid.value)
}
function handleEdit(){
  router.push("/admin/elementEdit?wid="+ wid.value+"&eid=" +eid.value+"&temType="+temType)
}
function handleReturn(){
  router.back()
}
const world=ref({})
/** 查询世界详细 */
function handWorld() {
  getWorld(wid.value).then(response => {
    //console.log("查询世界详细:"+JSON.stringify(response))
    world.value = response.data
  });
}
handWorld()
getElement();

</script>

<style scoped>
.center2 {
  top: 50%;
  width: 100%;
  text-align: center;
  font-size: 18px;
}
.center {
  top: 50%;
  width: 100%;
  text-align: center;
  font-size: 18px;
}
.lessen {
  color: #a6a6a6;
  font: 12px/20px PingFangSC-Regular,-apple-system,Simsun;
  height: 20px;
  overflow: hidden;
}
.smallTitle{
  background: inherit;
  background-color: rgba(249, 249, 249, 1);
  box-sizing: border-box;
  border-width: 1px;
  border-style: solid;
  border-color: rgba(233, 233, 233, 1);
  border-radius: 0px;
  -moz-box-shadow: none;
  -webkit-box-shadow: none;
  box-shadow: none;
}
.smallTitle h3{
  font-family: 'PingFangSC-Semibold', 'PingFang SC Semibold', 'PingFang SC', sans-serif;
  font-weight: 650;
  font-size: 18px;
}
.title{
  font-family: 'PingFangSC-Semibold', 'PingFang SC Semibold', 'PingFang SC', sans-serif;
  font-weight: 650;
  /* font-style: normal; */
  font-size: 24px;
  text-align: left;
}
</style>
