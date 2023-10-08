<template>
  <div class="app-container" >
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/world/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/world/list">世界树</a></el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/world/details', query: {wid:story.wid} }">{{story.wname}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/story/list', query: {wid:story.wid} }">故事列表</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/story/detail', query: {wid:story.wid,wname:story.wname,sid:story.id,sname:story.name} }">{{ story.name }}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/chapter/list', query: {wid:story.wid,wname:story.wname,sid:story.id,sname:story.name} }">章节目录</el-breadcrumb-item>
        <el-breadcrumb-item>章节详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div >
      <!--  元素名称-->
      <div >
        <h1 class="title">{{ chapter.title }}</h1>
        <div class="lessen"><span>更新时间:</span><el-tag size="small">{{chapter.updateTime}}</el-tag></div>
      </div>
      <el-divider />
      <div   style="margin-left: 25px">
        <div v-html="chapter.content"> </div>
      </div>
    </div>
    <!-- 元素内容 -->
    <el-divider />
    <!--功能-->
    <div class="center" style="height: 80px;">
      <router-link v-if="chapter.previous" :to="{path:'/chapter/index', query: {sid:chapter.previous.sid,wid:chapter.previous.wid,sname:chapter.previous.sname,wname:wname,scid:chapter.previous.id}}">
        <el-button text type="success" style="width: 100px;"> 上一章</el-button>
      </router-link>
      <router-link v-if="chapter.next" :to="{path:'/chapter/index', query: {sid:chapter.next.sid,wid:chapter.next.wid,sname:chapter.next.sname,wname:wname,scid:chapter.next.id}}">
        <el-button  text type="success" style="width: 100px;">下一章</el-button>
      </router-link>
      <el-button @click="handleReturn()" text type="success" style="width: 100px;">返回</el-button>
      <el-button @click="handleEdit()" text type="success" style="width: 100px;">编辑</el-button>
    </div>
  </div>
</template>

<script  lang="ts" setup>
import {  ref } from 'vue'
import {  getChapter } from "@/api/wiki/chapter";
import {  getStory } from "@/api/wiki/story";
//接受参数
import { useRoute ,useRouter}  from "vue-router";

const router = useRouter()
// 接收url里的参数
const route = useRoute();

//世界信息
const scid = ref(null);
scid.value = route.query.scid;
const sid = ref(null);
sid.value = route.query.sid;

const chapter=ref({})

/** 查询元素详细 */
function getInfo() {
  getChapter(sid.value,scid.value).then(response => {
    chapter.value = response.data
    sid.value=chapter.value.sid
    handStory();
  });
}

// function handleList(){
//   router.push("/chapter/list?sid="+ sid.value+"&scid=" +scid.value+"&sname=" +chapter.value.sname+"&wname=" +chapter.value.wname+"&wid=" +wid.value)
// }
function handleEdit(){
  router.push("/admin/storyChapterEdit?sid="+ sid.value+"&scid=" +scid.value+"&sname=" +chapter.value.sname+"&wname=" +chapter.value.wname+"&wid=" +wid.value)
}
function handleReturn(){
  router.back()
}
const story=ref({})
/** 查询世界详细 */
const wname =ref("");
const wid =ref(undefined);
const sname=ref("")
function handStory() {
  getStory(sid.value).then(response => {
    //console.log("查询世界详细:"+JSON.stringify(response))
    story.value = response.data
    sname.value = story.value.name
    wname.value = story.value.wname
    wid.value =  story.value.wid

  });
}
getInfo();

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
