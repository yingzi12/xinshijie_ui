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
        <el-row>
          <el-col :span="12">
            <div class="grid-content ep-bg-purple" />
            <h1 class="title">{{ chapter.title }}</h1>
            <div class="lessen"><span>更新时间:</span><el-tag size="small">{{chapter.updateTime}}</el-tag></div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content ep-bg-purple-light" >
              <div class="align-right">
<!--                <el-text class="mx-1" type="primary">章节内容错误</el-text>-->
              </div>
            </div>

          </el-col>
        </el-row>

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
      <a v-if="chapter.previous" :href='"/chapter/index?sid="+chapter.previous.sid+"&wid="+chapter.previous.wid+"&sname="+chapter.previous.sname+"&wname="+wname+"&scid="+chapter.previous.id'>
        <el-text style="margin: 20px" class="mx-1" type="primary">上一章</el-text>
      </a>
      <a v-if="chapter.next" :href='"/chapter/index?sid="+chapter.next.sid+"&wid="+chapter.next.wid+"&sname="+chapter.next.sname+"&wname="+wname+"&scid="+chapter.next.id'>
        <el-text style="margin: 20px" class="mx-1" type="primary">下一章</el-text>

      </a>
      <a>
      <el-text style="margin: 20px" class="mx-1" type="primary" @click="handleReturn()">返回</el-text>
      </a>
      <a  :href='"/admin/storyChapterEdit?sid="+ sid+"&scid=" +scid+"&sname=" +chapter.sname+"&wname=" +chapter.wname+"&wid=" +wid'>
        <el-text style="margin: 20px" class="mx-1" type="primary">编辑</el-text>
      </a>
<!--      <a  :href='"/story/comment?sid="+story.value.id+"&wid="+story.value.wid+"&source="+2'>-->
<!--        <el-text style="margin: 20px" class="mx-1" type="primary">评论</el-text>-->
<!--      </a>-->
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
const scid = ref(route.query.scid);
const sid = ref(route.query.sid);

const chapter=ref({})

/** 查询元素详细 */
function getInfo() {
  getChapter(sid.value,scid.value).then(response => {
    chapter.value = response.data
    sid.value=chapter.value.sid
    handStory();
  });
}

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
    story.value = response.data
    sname.value = story.value.name
    wname.value = story.value.wname
    wid.value =  story.value.wid

  });
}
getInfo();

</script>

<style scoped>
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
.align-right {
  text-align: right;
  margin: 10px;
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
