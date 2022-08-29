<template>
  <div class="app-container">
    <!--  内容区-->
    <div>
      <div>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">promotion management</a></el-breadcrumb-item>
          <el-breadcrumb-item>promotion list</el-breadcrumb-item>
          <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div  style="margin: 15px">
        <el-row>
          <el-col :span="4" class="center">
            <el-image  style="width: 150px; height: 200px;  display: block;margin: 0 auto;" :src="imageUrl" :fit="fit" />
          </el-col>
          <el-col :span="16">
            <div>
              <div>
                <h1 style="margin: 2px">{{ world.name }}</h1>
              </div>
              <div style="margin-top: 5px" >
                <el-space wrap>
                  <el-tag size="small" type="success">{{ world.typeName }}</el-tag>
                  <div v-if="world.tags != null "  v-for="tag in world.tags.split(';')" :key="i">
                    <el-tag size="small" type="success">{{tag}}</el-tag>
                  </div>
                </el-space>
              </div>
              <div style="margin-top: 5px" v-if="world.updateNewElementId != null">
                <span style="font-size:10px;color: #525457">更新时间:<time>{{ world.updateNewElementTime }}</time></span><el-tag style="font-size:10px;">{{ world.updateNewElement }}</el-tag>
              </div>
              <div style="margin-top: 2px">
                <p style="margin-top: 5px">{{ world.intro }}</p>
              </div>
              <div style="margin-top: 2px;color:#A3A6AD">
                <span><BootstrapIcon icon="chat-dots" size="1x" flip-v />{{world.countComment}}</span>
                <span><BootstrapIcon icon="pencil-square" size="1x" flip-v />{{world.countEdit}}</span>
                <span><BootstrapIcon icon="hand-thumbs-up" size="1x" flip-v />{{world.countLike}}</span>
                <span><BootstrapIcon icon="eye" size="1x" flip-v />{{world.countSee}}</span>
              </div>
              <div style="margin-top: 2px">
                <el-button type="primary">关注</el-button>
                <el-button type="primary">点赞</el-button>
              </div>
            </div>
          </el-col>
          <el-col :span="4" >
            <el-button type="primary" style="float:right;">举报</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <!--    简介区-->
    <div>
      <el-tabs v-model="worldActive" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="描述" name="description">
          <div v-html="world.description"></div>
        </el-tab-pane>
        <el-tab-pane label="元素" name="element">Config</el-tab-pane>
        <el-tab-pane label="造物主" name="message">
          <el-table :data="manageList" stripe style="width: 100%">
            <el-table-column prop="createTime" label="创建时间" width="180" />
            <el-table-column prop="userName" label="用户名" width="180" />
            <el-table-column prop="credit" label="贡献值" width="180"/>
            <el-table-column prop="ranks" label="等级" />
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!--    评论区-->
    <div>
      <el-divider />
      <el-row>
        <el-col :span="2" class="center">
          <el-row>
            <el-col><el-avatar :size="50" :src="circleUrl" /></el-col>
            <el-col><span class="demonstration">未登录</span></el-col>
          </el-row>
        </el-col>
        <el-col :span="22">
          <el-form :model="form" label-width="120px">
          <el-input
              v-model="textarea"
              :rows="2"
              type="textarea"
              placeholder="Please input"
          />
            <el-button type="primary" @click="onSubmit">发布评论</el-button>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <!--    已经发布的的评论-->
    <div>
      <el-tabs v-model="commentActive"  >
        <el-tab-pane label="全部评论" name="allComm">
          <div v-for="comment in commentList">
            <el-row>
              <el-col :span="2">
                <div  class="center">
                   <!--              头像-->
                   <el-avatar :size="50" :src="circleUrl" />
                </div>
              </el-col>
              <el-col :span="22">
                <div >
                  <h3 style="font-weight:bold;">{{ comment.createName }}</h3>
                </div>
                <div>
                  <p>{{ comment.comment }}</p>
                </div>
                <div style="color:#A3A6AD">
                  <span>{{ comment.createTime }}</span>
                  <span><BootstrapIcon icon="chat-dots" size="1x" flip-v />20 </span>
                  <span><BootstrapIcon icon="hand-thumbs-up" size="1x" flip-v />10</span>
                  <span><BootstrapIcon icon="hand-thumbs-down" size="1x" flip-v />20</span>
                </div>
              </el-col>
            </el-row>
            <el-divider />
          </div>
          <div class="center">
            <el-button type="danger">更多</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts" setup >
import {inject, reactive, ref} from 'vue'
//接受参数
import { useRoute }  from "vue-router";  // 引用vue-router
import type { TabsPaneContext } from 'element-plus'
import {  getWorld } from "@/api/wiki/world";
import {  getWorldComment } from "@/api/wiki/comment";
import {  getWorldManage } from "@/api/wiki/manage";

// 接收url里的参数
const route = useRoute();
console.log(route.query.id,"参数");
//世界信息
const world=ref({})
//评论信息
const commentList=ref([])
//
const manageList=ref([])

world.value.id = route.query.wid;
console.log("世界id="+world.value.id);
const baseUrl = inject("$baseUrl")
const imageUrl=ref('')

/** 查询世界详细 */
function handWorld(id:number) {
  getWorld(id).then(response => {
    console.log("查询世界详细:"+JSON.stringify(response))
    world.value = response.data
    imageUrl.value=baseUrl+response.data.imgUrl;
  });
}
//评论信息
function getAllWorldComment(id:number) {
  getWorldComment(id).then(response => {
    console.log("查询世界详细:"+JSON.stringify(response))
    commentList.value = response.rows
  });
}
//小心
function getAllWorldManage(id:number) {
  getWorldManage(id).then(response => {
    console.log("查询世界详细:"+JSON.stringify(response))
    manageList.value = response.rows
  });
}


const worldActive = ref('description')

const commentActive = ref('allComm')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
const onSubmit = () => {
  console.log('submit!')
}
const url =
    'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'

const textarea = ref('')
handWorld(world.value.id);
getAllWorldComment(world.value.id)
getAllWorldManage(world.value.id)

// 获取当前用户名
</script>

<style scoped>
*{
  margin: 0px;
  margin-top: 5px;
  padding: 0px;
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
