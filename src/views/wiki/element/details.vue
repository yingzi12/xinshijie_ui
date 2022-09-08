<template>
  <div class="app-container" >
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/world/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/world/list">世界树</a></el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/world/details', query: {wid:wid} }">{{world.name}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/element/list', query: {wid:wid} }">元素列表</el-breadcrumb-item>
        <el-breadcrumb-item>元素详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div >
    <!--  世界名称-->
    <div >
        <h1>{{ element.title }}</h1>
      <div class="lessen"><span>分类:</span> <el-tag size="small" v-for="category in element.categoryList">
        {{category.label}}
      </el-tag></div>
      <div class="lessen"><span>更新时间:</span><el-tag size="small">{{element.updateTime}}</el-tag></div>
    </div>
    <el-divider />
    <!--  基本信息 -->
    <div style="margin-bottom: 20px">
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
        <div style="background-color: #cccccc;height:50px ;margin-bottom:10px">
          <el-row >
            <el-col :span="19">
              <div class="biaoti">
               <h3><BootstrapIcon icon="caret-down-fill" size="1x" flip-v /><span>{{domain.title  }}</span></h3>
              </div>
            </el-col>
            <el-col :span="5">
            </el-col>
          </el-row>
        </div>
        <div>
          <div v-html="domain.content"> </div>
        </div>
      </div>
    </div>
    <el-divider />
      <!--功能-->
      <div class="center" style="height: 80px;">
        <el-button @click="handleList()">返回</el-button>
        <el-button @click="handleEdit()">编辑</el-button>
      </div>
    </div>
  </div>
</template>

<script  lang="ts" setup>
import { reactive, ref } from 'vue'
import {  getElementDetails } from "@/api/wiki/element";
import {  getWorld } from "@/api/wiki/world";

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
console.log("元素id="+eid.value);
console.log("世界id="+wid.value);


const element=ref({})
/** 查询世界详细 */
function getElement(wid:number,eid:number) {
  getElementDetails(wid,eid).then(response => {
    console.log("查询世界详细:"+JSON.stringify(response))
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
    console.log("查询世界详细:"+JSON.stringify(response))
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
</style>
