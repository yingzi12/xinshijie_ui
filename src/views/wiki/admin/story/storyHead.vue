<template>
        <!--        标题-->
        <div>
          <el-menu
              :default-active="1"
              mode="horizontal"
              style="margin:0px;pardding:0px"
          >
            <el-menu-item index="1"><el-text  style="font-size: var(--el-font-size-large);" >{{props.sname}}</el-text>
                <el-text v-if=" props.headType == 1 && props.secondType==2" class="mx-1" type="info"> - 修改故事</el-text>
                <el-text v-if=" props.headType == 3 && props.secondType==1" class="mx-1" type="info"> - 分卷目录</el-text>
                <el-text v-if=" props.headType == 3 && props.secondType==2" class="mx-1" type="info"> - {{props.reelName}} </el-text>
                <el-text v-if=" props.headType == 3 && props.secondType==3" class="mx-1" type="info"> - {{props.reelName}} - 新增章节</el-text>
                <el-text v-if=" props.headType == 3 && props.secondType==4" class="mx-1" type="info"> - {{props.reelName}} - 修改章节</el-text>
                <el-text v-if=" props.headType == 3 && props.secondType==5" class="mx-1" type="info"> - {{props.reelName}} - 章节内容</el-text>

                <el-text v-if=" props.headType == 4 && props.secondType==1" class="mx-1" type="info"> - 章节审核</el-text>
                <el-text v-if=" props.headType == 4 && props.secondType==2" class="mx-1" type="info"> - 章节历史记录</el-text>
                <el-text v-if=" props.headType == 5 && props.secondType==1" class="mx-1" type="info"> - 评论管理</el-text>
                <el-text v-if=" props.headType == 5 && props.secondType==2" class="mx-1" type="info"> - 评论历史记录</el-text>
                <el-text v-if=" props.headType == 6 && props.secondType==1" class="mx-1" type="info"> - 讨论管理</el-text>
                <el-text v-if=" props.headType == 6 && props.secondType==2" class="mx-1" type="info"> - 讨论历史记录</el-text>
                <el-text v-if=" props.headType == 10 && props.secondType==2" class="mx-1" type="info"> - 历史记录</el-text>

            </el-menu-item>
          </el-menu>
        </div>
        <!--        多选-->
        <div style="padding: 10px">
          <el-space wrap>
            <el-button text :type="props.headType==1? 'primary':''"> <router-link  :to="{path:'/admin/storyInfo?', query: {sid:props.sid,sname:props.sname,wid:story.wid,wname:story.wname}}">简介</router-link></el-button>
            <el-button text :type="props.headType==2? 'primary':''">  <router-link :to="{path:'/admin/storyAuthor', query: {sid:props.sid,sname:props.sname,wid:story.wid,wname:story.wname}}">作者列表</router-link></el-button>
              <el-badge  v-if="story.countAuditAuthor > 0 && story.authorType == 3"  :value="story.countAuditAuthor" class="item" >
                  <el-button text  :type="props.headType==10? 'primary':''">  <router-link :to="{path:'/admin/storyApplyAuthor', query: {headType:10,sid:props.sid,sname:props.sname,wid:story.wid,wname:story.wname}}">作家审核</router-link></el-button>
              </el-badge>
              <el-button v-if="story.countAuditAuthor <= 0 && story.authorType == 3 " text  :type="props.headType==10? 'primary':''">  <router-link :to="{path:'/admin/storyApplyAuthor', query: {headType:10,sid:props.sid,sname:props.sname,wid:story.wid,wname:story.wname}}">作家审核</router-link></el-button>

              <el-button text :type="props.headType==3? 'primary':''">  <router-link :to="{path:'/admin/storyReel', query: {sid:props.sid,sname:props.sname,wid:story.wid,wname:story.wname}}">分卷/章节目录</router-link></el-button>
              <el-badge v-if="story.countAuditChapter>0" :value="story.countAuditChapter" class="item" >
              <el-button text :type="props.headType==4? 'primary':''">  <router-link :to="{path:'/admin/storyAudit', query: {sid:props.sid,sname:props.sname,wid:story.wid,wname:story.wname}}">章节审核</router-link></el-button>
              </el-badge>
              <el-button  v-if="story.countAuditChapter == 0" text :type="props.headType==4? 'primary':''">  <router-link :to="{path:'/admin/storyAudit', query: {sid:props.sid,sname:props.sname,wid:story.wid,wname:story.wname}}">章节审核</router-link></el-button>
              <el-button text :type="props.headType==5? 'primary':''">  <router-link :to="{path:'/admin/storyComment', query: {sid:props.sid,sname:props.sname,wid:story.wid,wname:story.wname}}">评论管理</router-link></el-button>
              <el-badge v-if="story.countAuditDiscuss>0" :value="story.countAuditDiscuss" class="item" >
              <el-button text :type="props.headType==6? 'primary':''">  <router-link :to="{path:'/admin/storyDiscuss', query: {sid:props.sid,sname:props.sname,wid:story.wid,wname:story.wname}}">讨论管理</router-link></el-button>
              </el-badge>
              <el-button v-if="story.countAuditDiscuss == 0" text :type="props.headType==6? 'primary':''">  <router-link :to="{path:'/admin/storyDiscuss', query: {sid:props.sid,sname:props.sname,wid:story.wid,wname:story.wname}}">讨论管理</router-link></el-button>

          </el-space>
        </div>
</template>

<script lang="ts" setup>
import {  getStoryAdmin } from "@/api/admin/story";
import {ref} from "vue";
const props = defineProps({
    sid: Number,
    sname: String,
    headType: Number,
    secondType:{
        type: Number,
        default: 0, // 设置默认值为0
    },
    reelName:{
        type: String,
        default: "章节列表", // 设置默认值为0
    },
})
const story=ref({})

/** 查询世界详细 */
function handleStory() {
    getStoryAdmin(props.sid).then(response => {
        //console.log("查询世界详细:"+JSON.stringify(response))
        story.value = response.data

    });
}
handleStory()
</script>

<style scoped>
</style>
