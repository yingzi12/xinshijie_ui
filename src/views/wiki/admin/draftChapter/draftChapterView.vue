storyChapterEdit.vue<template>
  <!--        标题-->
  <div>
    <el-menu
        :default-active="1"
        mode="horizontal"
        style="margin:0px;pardding:0px"
    >
      <el-menu-item index="1">{{sname}} -{{scname}}-章节目录</el-menu-item>
    </el-menu>
  </div>
  <!--        表格-->
  <div>
    <h1>所属分卷 --  {{scname}}</h1>

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
import { getDraftChapter } from "@/api/admin/draftChapter";


import {useRoute, useRouter} from "vue-router";
import {ElMessage, FormInstance} from "element-plus";

// 接收url里的参数
const route = useRoute();
const router = useRouter()
const sid = ref(null);
sid.value = route.query.sid;
const dscid = ref(null);
dscid.value = route.query.dscid;
const scname = ref('');
scname.value = <string>route.query.scname;
const sname = ref('');
sname.value = <string>route.query.sname;

const story=ref({})

function handleInfo(){
  getDraftChapter(sid.value,dscid.value).then(response => {
    story.value=response.data
  });
}
function handleReturn(){
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
