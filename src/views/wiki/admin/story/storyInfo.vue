<template>
  <div>
    <el-menu
        :default-active="activeIndex"
        mode="horizontal"
        style="margin:0px;pardding:0px"
    >
      <el-menu-item index="1">{{ story.name }}</el-menu-item>
    </el-menu>
  </div>
  <!--        多选-->
  <div style="padding: 10px">
    <el-space wrap>
      <el-button text type="primary"> <router-link :to="{path:'/admin/storyInfo', query: {sid:sid,sname:sname}}">简介</router-link></el-button>
      <el-button text>  <router-link :to="{path:'/admin/storyAuthor', query: {sid:sid,sname:sname}}">作者列表</router-link></el-button>
      <el-button text>  <router-link :to="{path:'/admin/storyReel', query: {sid:sid,sname:sname}}">分卷/章节目录</router-link></el-button>
      <el-button text>  <router-link :to="{path:'/admin/storyAudit', query: {sid:sid,sname:sname}}">章节审核</router-link></el-button>
      <el-button text>  <router-link :to="{path:'/admin/storyComment', query: {sid:sid,sname:sname,source:2}}">评论管理</router-link></el-button>
      <el-button text>  <router-link :to="{path:'/admin/storyDiscuss', query: {sid:sid,sname:sname,source:2}}">讨论管理</router-link></el-button>
    </el-space>
  </div>
  <!--   内容区-->
  <div style="  border-style: solid; border-width: 1px;border-color:#CFD3DC">
    <div  style="margin: 15px">
      <el-row>
        <el-col :span="4" class="center">
          <el-image  style="width: 105px; height: 128px;  display: block;margin: 0 auto;" :src="imageUrl" :fit="fit" />
        </el-col>
        <el-col :span="12">
          <div>
            <div>
              <el-badge :value="story.ranks" class="item">
                <h1 style="margin: 2px">{{ story.name }}</h1>
              </el-badge>
            </div>
            <div style="margin-top: 5px" >
              <el-space wrap>
                <el-tag size="small" type="success">{{ storyStatus.get(story.status) }}</el-tag>
                <el-tag size="small" type="success">{{ story.typeName }}</el-tag>
                <div v-if="story.tags != null " v-for="tag in story.tags.split(';')" :key="i">
                  <el-tag size="small" type="success">{{tag}}</el-tag>
                </div>
              </el-space>
            </div>
            <div style="margin-top: 2px">
              <div style="margin-top: 5px" v-html="story.intro"></div>
            </div>
          </div>
        </el-col>
        <el-col :span="8"  >
          <div  style="text-align: right;vertical-align: top;"><el-button  @click="handleEdit" type="primary" :icon="Edit" circle /></div>
          <div class="center" style="height: 100px">
            <div style="width: 150px;float:left;" ><el-progress  :text-inside="true" :stroke-width="26" :percentage="70" :format="format" /></div>
            <div style="width: 20%;float:left;" ><el-tag>LV{{story.ranks}}</el-tag></div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!--    简介区-->
    <div style="background-color: #E5EAF3">
      <h1 style="padding: 10px;margin: 0px"><Flag style="width: 1em; height: 1em; margin-right: 8px" />简介</h1>
      <el-divider  style="padding: 0px;margin: 0px"/>
    </div>

    <div style=" padding: 10px;margin: 0px;white-space:pre; word-break:break-all;word-wrap:break-word;" >
      <p style="white-space: pre-wrap">{{story.description}}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {inject, markRaw, ref} from 'vue'
import {Flag, Edit,Menu as IconMenu, Message, Setting} from '@element-plus/icons-vue'
import type { TabsPaneContext } from 'element-plus'
import {  getStoryAdmin } from "@/api/admin/story";
//接受参数
import { useRoute,useRouter }  from "vue-router";  // 引用vue-router


const router = useRouter()
// 接收url里的参数
const route = useRoute();
//console.log(route.query.id,"参数");
const storyStatus = new Map([
  [0, "正常"],
  [1, "待发布"],
  [2, "锁定"],
  [3, "删除"]
]);
//世界信息
const story=ref({})
const sid = ref(null);
const sname = ref('');
sid.value = route.query.sid;
sname.value = <string>route.query.sname;
// story.value.id = route.query.sid;
//console.log("世界id="+story.value.id);
// const baseUrl = inject("$baseUrl")
const imgUrl = inject("$imgUrl")

const imageUrl=ref('')
const activeIndex = ref('1')
const fits = ['世界', '粉丝', '关注']
//编辑世界
function handleEdit(){
  router.push("/admin/storyEdit?sid="+story.value.id);
}
/** 查询世界详细 */
function handleStory() {
  getStoryAdmin(sid.value).then(response => {
    //console.log("查询世界详细:"+JSON.stringify(response))
    story.value = response.data
    imageUrl.value=imgUrl+response.data.imgUrl;

  });
}

function format(percentage){
  return percentage === 100 ? '100' : `7000/10000`;
}
handleStory();
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
