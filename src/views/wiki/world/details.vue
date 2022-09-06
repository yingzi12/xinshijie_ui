<template>
  <div class="app-container">
    <!--  内容区-->
    <div>
      <div>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/world/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/world/list">世界树</a></el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/world/details', query: {wid:wid} }">{{world.name}}</el-breadcrumb-item>
          <el-breadcrumb-item>详细</el-breadcrumb-item>
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
                <el-button type="primary" @click="handleFllow">关注</el-button>
                <el-button type="primary">点赞</el-button>
                <el-button type="primary"  @click="handleDiscuss">讨论</el-button>
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
        <el-tab-pane label="元素" name="element">
          <el-table :data="elementList" stripe style="width: 100%">
            <el-table-column prop="title" label="元素名称" width="180" />
            <el-table-column label="分类" width="180"  :show-overflow-tooltip="true">
              <template #default="scope">
                <el-tag v-for='idLabel in scope.row.idLabels.split(",")'>
                  {{idLabel.split("$$")[1]}}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="intro" label="简介" width="250" :show-overflow-tooltip="true"/>
            <el-table-column prop="createTime" label="创建时间" />
          </el-table>
          <el-button @click="handElement()">更多</el-button>
        </el-tab-pane>
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
            <el-col><span class="demonstration">{{username}}</span></el-col>
          </el-row>
        </el-col>
        <el-col :span="22">
          <el-form ref="refComment" :model="commentForm" :rules="rulesComment"  label-width="120px">
            <el-input :disabled="disabled" v-model="commentForm.comment" :rows="2" type="textarea" placeholder="请输入评论"/>
            <el-button :disabled="disabled" type="primary" @click="onSubmit">发布评论</el-button>
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
            <el-button type="danger" @click="handleComment">更多</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts" setup >
import {getCurrentInstance, inject, reactive, ref, toRefs} from 'vue'
//接受参数
import {useRoute, useRouter} from "vue-router";  // 引用vue-router
import type { TabsPaneContext } from 'element-plus'
import {  getWorld } from "@/api/wiki/world";
import {  listComment } from "@/api/wiki/comment";
import { addComment} from "@/api/admin/comment";
import { addFllow} from "@/api/admin/fllow";
import {  getWorldManage } from "@/api/wiki/manage";
import { listElement } from "@/api/wiki/element";
import useUserStore from '@/store/modules/user'
import {ElMessage} from "element-plus";
const {  appContext : { config: { globalProperties } }  } = getCurrentInstance();

const router = useRouter()

// 接收url里的参数
const route = useRoute();
console.log(route.query.id,"参数");
//世界信息
const world=ref({})
//评论信息
const commentList=ref([])
//管理员信息
const manageList=ref([])
//分页信息
const dateRange = ref([]);
//管理员信息
const elementList = ref([]);
//评论内容与通用分页查询条件
const data = reactive({
  commentForm: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    wid: undefined,
  },
  rules: {
    comment: [{ required: true, message: "评论不能为空", trigger: "blur" }],
  }
});

const { queryParams, commentForm, rules } = toRefs(data);
world.value.id = route.query.wid;
console.log("世界id="+world.value.id);
const baseUrl = inject("$baseUrl")
const imageUrl=ref('')

function handElement(){
  router.push("/element/list?wid="+world.value.id);
}
function handleDiscuss(){
  router.push("/discuss/list?wid="+world.value.id);
}
function handleFllow(){
  addFllow(wid.value).then(response => {
    ElMessage.success("关注成功");
  })
}
/** 查询世界详细 */
function handWorld(id:number) {
  getWorld(id).then(response => {
    console.log("查询世界详细:"+JSON.stringify(response))
    world.value = response.data
    imageUrl.value=baseUrl+response.data.imgUrl;
  });
}
//评论信息
function getAllWorldComment() {
  queryParams.value.wid=wid.value;
  listComment(globalProperties.addDateRange(queryParams.value, dateRange.value)).then(response => {
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

/** 查询元素列表 */
function getElementList() {
  queryParams.value.wid=wid.value;
  listElement(globalProperties.addDateRange(queryParams.value, dateRange.value)).then(response => {
    elementList.value = response.rows;
  });
}

//获取用户信息
const userStore = useUserStore()
const circleUrl=ref('')
const disabled=ref(true)

const username=ref('')
console.log("userStore name:"+(userStore.name==''))

const wid = ref(null);
wid.value = route.query.wid;
console.log("世界id="+wid.value);
if(userStore.name==''){
  username.value="未登录"
  disabled.value=true;
}else{
  username.value=userStore.name;
  circleUrl.value=userStore.avatar;
  disabled.value=false;
}

function onSubmit(){
  if(!commentForm.value.comment){
    ElMessage.error("评论不能为空")
    return;
  }
  if(commentForm.value.comment.length<20){
    ElMessage.error("评论不了少于20字")
    return;
  }
  if(wid.value == undefined){
    ElMessage.error("缺少必要参数")
    return;
  }else{
    commentForm.value.wid=wid.value
  }
  commentForm.value.wname=world.value.name
  commentForm.value.circleUrl=userStore.avatar
  addComment(commentForm.value).then(response => {
    ElMessage.success("评论成功")
    console.log("评论成功")
    getAllWorldComment();
  })
}

function handleComment(){
  router.push("/world/comment?wid="+world.value.id);
}

//世界信息
handWorld(world.value.id);
//管理员信息
getAllWorldManage(world.value.id)
//评论功能
getAllWorldComment()
getElementList()
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
