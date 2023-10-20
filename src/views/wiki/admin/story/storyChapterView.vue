<template>
    <StoryHead :head-type="3" second-type="5" :sid="sid" :sname="sname" :reel-name="reelName"></StoryHead>
    <div style="background-color:#b0c4de;margin: auto;padding: 10px">
        <el-row>
            <el-col :span="20">
                <h1>所属分卷 --  {{scname}}</h1>
            </el-col>
            <el-col :span="4" style="text-align: right;">
                <div style="text-align: right; font-size: 12px" class="toolbar">
                    <el-button text @click="goBack()">返回</el-button>
                </div>
            </el-col>
        </el-row>
    </div>
  <!--        表格-->
  <div style="background-color:#b0c4de;margin: auto;padding: 10px">

    <div>
      <h3>{{ story.title }}</h3>
      <div v-html="story.content"></div>

    </div>
    <div>
      <el-button @click="handleReturn">返回</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject, reactive, ref, toRefs} from 'vue'
import { getDraftChapterAdmin } from "@/api/admin/draftChapter";


import {useRoute, useRouter} from "vue-router";
import {ElMessage, FormInstance} from "element-plus";
import StoryHead from "./storyHead.vue";

// 接收url里的参数
const route = useRoute();
const router = useRouter()

const sid = ref(route.query.sid);
const dscid = ref(null);
dscid.value = route.query.dscid;
const scname = ref('');
const reelName = ref(route.query.scname);

scname.value = <string>route.query.scname;

const sname = ref(route.query.sname);

const story=ref({})

function handleInfo(){
  getDraftChapterAdmin(sid.value,dscid.value).then(response => {
    story.value=response.data
  });
}
function handleReturn(){
  router.back()
}
function goBack() {
    router.back()
}
handleInfo()
</script>

<style scoped>
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}

.layout-container-demo .el-menu {
  border-right: none;
}

.layout-container-demo .el-main {
  padding: 0;
}

.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.demo-count .block {
  padding: 0px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  display: inline-block;
  width: 33%;
  box-sizing: border-box;
  vertical-align: top;
}

.demo-count .block:last-child {
  border-right: none;
}

.demo-count .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 9px;
  margin-bottom: 0px;
}
</style>
