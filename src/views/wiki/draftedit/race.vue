<template>
  <div class="app-container" >
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/world/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/world/list">世界</a></el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/world/details', query: {wid:wid} }">{{world.name}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/element/list', query: {wid:wid} }">元素</el-breadcrumb-item>
        <el-breadcrumb-item>元素详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div >
      <!--  世界名称-->
      <div >
        <h1 class="title">{{ element.title }}</h1>
        <div class="lessen"><span>分类:</span> <el-tag size="small" v-for="category in element.categoryList">
          {{category.label}}
        </el-tag></div>
        <div class="lessen"><span>更新时间:</span><el-tag size="small">{{element.updateTime}}</el-tag></div>
      </div>
      <el-divider />
      <!--  基本信息 -->
      <div style="margin-bottom: 20px;margin-left: 25px">
        <div v-html="element.intro"> </div>
      </div>
      <!--    内容简介-->
      <div>
      </div>
      <!-- 元素内容 -->
      <div>
        <div v-for="(domain, index) in element.contentList"
             :key="domain.key"
             :label="'Domain' + index"
             :prop="'domains.' + index + '.value'"
             :rules="{
        required: true,
        message: 'domain can not be null',
        trigger: 'blur',
      }"
             style="margin-bottom: 20px"
        >
          <div class="smallTitle">
            <h3><el-icon><Tickets /></el-icon>{{domain.title  }}</h3>
          </div>
          <div style="margin-left: 25px">
            <div v-html="domain.contentZip"> </div>
          </div>
        </div>
      </div>
      <el-divider />
      <!--功能-->
      <div class="center" style="height: 80px;">
        <el-button @click="handleList()" text type="success" style="width: 100px;">返回</el-button>
        <el-button @click="handleEdit()" text type="success" style="width: 100px;">编辑</el-button>
      </div>
    </div>
  </div>
</template>

<script  lang="ts" setup>
import {  ref } from 'vue'
import {  getElementDetails } from "@/api/wiki/element";
import {  getWorld } from "@/api/wiki/world";

//接受参数
import { useRoute ,useRouter}  from "vue-router";  // 引用vue-router
const router = useRouter()
// 接收url里的参数
const route = useRoute();
//世界信息
const eid = ref(route.query.eid);
const wid = ref(route.query.wid);
//console.log("元素id="+eid.value);
//console.log("世界id="+wid.value);


const element=ref({})
/** 查询世界详细 */
function getElement(wid:number,eid:number) {
  getElementDetails(wid,eid).then(response => {
    //console.log("查询世界详细:"+JSON.stringify(response))
    element.value = response.data
  });
}
function handleList(){
  router.push("/element/list?wid="+ wid.value+"&deid=" +eid.value)
}
function handleEdit(){
  router.push("/admin/elementEdit?wid="+ wid.value+"&eid=" +eid.value)
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
getElement(wid.value,eid.value);
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
