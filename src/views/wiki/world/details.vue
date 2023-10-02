<template>
  <div class="app-container">
    <!--  内容区-->
    <div>
      <div>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/world/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/world/list">世界树</a></el-breadcrumb-item>
          <el-breadcrumb-item :to=" { path: '/world/details', query: {wid:wid} }">{{world.name}}</el-breadcrumb-item>
          <el-breadcrumb-item>详细</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div  style="margin: 15px 0px 15px 0px">
        <el-row>
          <el-col :span="3">
            <el-image  style="width: 150px; height: 200px;  display: block;margin: 0 auto;" :src="imageUrl" :fit="fit" />
          </el-col>
          <el-col :span="16"  class="mb-4">
            <div style="margin-left: 5px">
              <div>
                <el-badge :value="world.ranks" class="item">
                  <h1 style="margin: 2px" class="title">{{ world.name }}</h1>
                </el-badge>
                <!--                <h1 style="margin: 0px" class="title">{{ world.name }}</h1>-->
              </div>
              <div style="margin-top: 5px" >
                <el-space wrap>
                  <el-tag style="width: 70px;" size="default">{{ world.typeName }}</el-tag>
                  <el-tag v-if="world.source != null " v-for="tag in world.source.split(';')"  style="width: 70px;" size="default" type="success">{{tag}}</el-tag>
                  <el-tag v-if="world.tags != null "  v-for="tag in world.tags.split(';')"  style="width: 70px;" size="default" type="danger">{{tag}}</el-tag>
                </el-space>
              </div>
              <div style="margin-top: 5px" v-if="world.updateNewElementId != null">
                <span style="font-size:10px;color:#999999;">更新时间:</span><span style="font-size:10px;color:#999999;">{{ world.updateNewElementTime }}</span><span style="font-size:10px;margin-left: 10px;color:#70B603;">{{ world.updateNewElement }}</span>
              </div>
              <div style="height: 52px;overflow:hidden">
                <p style="font-size: 18px;color: #666666;margin: 5px 0px 0px 0px">{{ world.intro }}</p>
              </div>
              <div style="margin-top: 5px;color:#A3A6AD">
                <span><el-icon size="20"><ChatDotRound /></el-icon>{{world.countComment}}</span>
                <span><el-icon size="20"><Edit /></el-icon>{{world.countEdit}}</span>
                <span><el-icon size="20"><Pointer /></el-icon>{{world.countLike}}</span>
                <span><el-icon size="20"><View /></el-icon>{{world.countSee}}</span>
              </div>
              <div style="margin-top: 5px;" >
                <el-button v-if="isFllow == false" style="width: 90px;" type="primary" @click="handleFllow">关注</el-button>
                <el-button v-if="isFllow" style="width: 90px;" type="primary" @click="handleFllowClose">取消关注</el-button>
                <el-button @click="handleDiscuss" style="width: 90px;">讨论({{world.countDiscuss}})</el-button>
                <el-button @click="handleAddStory" style="width: 90px;">创建故事</el-button>
                  <el-tooltip v-if="isAdmin == 2"
                          class="box-item"
                          effect="dark"
                          content="可以分享世界,故事的收益"
                          placement="top-start"
                  >
                 <el-button @click="handOpenDia" style="width: 90px;">申请管理员</el-button>
                  </el-tooltip>
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
      <el-tabs v-model="worldActive" class="world-tabs" @tab-click="handleClick">
        <el-tab-pane label="描述" name="description">
          <p style="white-space: pre-wrap;">{{world.description}}</p>
        </el-tab-pane>
        <el-tab-pane label="元素" name="element">
          <el-table :data="elementList" stripe style="width: 100%">
            <el-table-column prop="title" label="元素" width="180" >
              <template #default="scope">
                <router-link :to="{path:'/element/details', query: {eid:scope.row.id,wid:scope.row.wid,temType:scope.row.softtype}}">{{ scope.row.title }}</router-link>
              </template>
            </el-table-column>
            <el-table-column label="分类" width="180"  :show-overflow-tooltip="true">
              <template #default="scope">
                <el-tag v-for='idLabel in scope.row.idLabels.split(",")'>
                  {{idLabel.split("$$")[1]}}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="intro" label="简介" :show-overflow-tooltip="true"/>
<!--            <el-table-column prop="createTime" label="创建时间" />-->
          </el-table>
          <el-button style="margin-top:10px" text  @click="handleElement">更多</el-button>
        </el-tab-pane>
        <el-tab-pane label="故事" name="story">
          <el-table :data="storyList" stripe style="width: 100%">
            <el-table-column prop="title" label="故事" width="180" >
              <template #default="scope">
                <router-link :to="{path:'/story/detail', query: {sid:scope.row.id,wid:scope.row.wid}}">{{ scope.row.name }}</router-link>
              </template>
            </el-table-column>
            <el-table-column label="分类" width="180"  :show-overflow-tooltip="true">
              <template #default="scope">
                {{storyTypesMap.get(scope.row.types)}}
              </template>
            </el-table-column>
            <el-table-column prop="intro" label="简介"  :show-overflow-tooltip="true"/>
<!--            <el-table-column prop="createTime" label="创建时间" />-->
          </el-table>
          <el-button style="margin-top:10px" text  @click="handleStory">更多</el-button>
        </el-tab-pane>
        <el-tab-pane label="造物主" name="message">
          <el-table :data="manageList" stripe style="width: 100%">
            <el-table-column prop="createTime" label="创建时间" width="180" />
            <el-table-column prop="userName" label="用户名" width="180" />
            <el-table-column prop="sign" label="签名" width="180"/>
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
            <el-col><el-avatar :size="50" :src="imgUrl+circleUrl" /></el-col>
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
                  <el-avatar :size="50" :src="imgUrl+comment.circleUrl" />
                </div>
              </el-col>
              <el-col :span="22">
                <div >
                  <h3 style="font-weight:bold;margin: 0px">{{ comment.createName }}</h3>
                </div>
                <div>
                  <p  style="margin:5px 0px 0px 0px;">{{ comment.comment }}</p>
                </div>
                <div style="color:#A3A6AD">
                  <span>{{ comment.createTime }}</span>
<!--                    <span @click="handleReply(comment)"><BootstrapIcon  icon="chat-dots" size="1x" flip-v />{{comment.countReply}} </span>-->
<!--                    <span @click="handleHideReply(comment)"><el-icon :size="15"><ChatDotRound /></el-icon>{{comment.countReply}} </span>-->
                  <span><el-icon :size="15"><Pointer /></el-icon>{{comment.countReply}}</span>
                  <!--                  <span><BootstrapIcon icon="hand-thumbs-down" size="small" />{{comment.countReply}}</span>-->
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
    <el-dialog
            v-model="dialogFormVisible" title="申请成为管理员"
            align-center
    >
        <!--        <el-alert title="Once a time slot with a specific date is configured and submitted, it will overwrite any existing content for the same date." type="warning" />-->
        <el-form
                :model="addApplyForm"
                ref="addApplyFormRef"
                :rules="addApplyRules"

        >
            <el-form-item label="申请理由"  prop="applyExplain">
                <el-input
                        v-model="addApplyForm.applyExplain"
                        :rows="3"
                        type="textarea"
                        placeholder="请输入申请理由.不能超过500字"
                />
            </el-form-item>
        </el-form>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handSumitApply(addApplyFormRef)">
          提交
        </el-button>
      </span>
        </template>
    </el-dialog>


</template>

<script lang="ts" setup >
import {getCurrentInstance, inject, reactive, ref, toRefs} from 'vue'
//接受参数
import {useRoute, useRouter} from "vue-router";  // 引用vue-router
import {  getWorld } from "@/api/wiki/world";
import {  listComment } from "@/api/wiki/comment";
import { addComment} from "@/api/admin/comment";
import { addFllow,fllowClose,getInfoByWid } from "@/api/admin/fllow";
import {  getWorldManage } from "@/api/wiki/manage";
import { listElement } from "@/api/wiki/element";
import { listStory } from "@/api/wiki/story";
import { addApplyManage } from "@/api/admin/applyManage";

import useUserStore from '@/store/modules/user';

import { isNotEmpty } from '@/utils/tools'; // 根据你的项目路径调整引入路径
import {ElMessage, ElMessageBox, FormInstance, FormRules} from "element-plus";

const userStore = useUserStore()


const  isLogin=ref(false)
if(isNotEmpty(userStore.name)){
  isLogin.value=true
}else{
  isLogin.value=false
}
const {  appContext : { config: { globalProperties } }  } = getCurrentInstance();

const router = useRouter()

// 接收url里的参数
const route = useRoute();
//console.log(route.query.id,"参数");
//世界信息
const world=ref({})
//评论信息
const commentList=ref([])

//分页信息
const dateRange = ref([]);

//评论内容与通用分页查询条件
const data = reactive({
  commentForm: {},
  queryParams: {
    pageNum: 1,
    pageSize:3,
    wid: undefined,
      source:1,
  },
  rules: {
    comment: [{ required: true, message: "评论不能为空", trigger: "blur" }],
  }
});
const storyTypesMap=new Map([
  [6,"科学"],
  [1,"武侠"],
  [2,"仙侠"],
  [3,"魔幻"],
  [4,"奇幻"],
  [5,"其他"]
])
const { queryParams, commentForm, rules } = toRefs(data);
world.value.id = route.query.wid;
//console.log("世界id="+world.value.id);
const imgUrl = inject("$imgUrl")
const imageUrl=ref('')

function handleElement(){
  router.push("/element/list?wid="+world.value.id+"&wname="+world.value.name);
}
function handleDiscuss(){
  router.push("/discuss/list?wid="+world.value.id+"&wname="+world.value.name+"&source="+1);
}
function handleAddStory(){
  router.push("/admin/storyAdd?wid="+world.value.id+"&wname="+world.value.name+"&source="+1);
}
function handleStory(){
  router.push("/story/list?wid="+world.value.id+"&wname="+world.value.name+"&source="+1);
}
const worldActive = ref('description')

const commentActive = ref('allComm')
function handleFllow(){
  if(!isLogin.value){
    ElMessage.warning("请先登录");
    return;
  }
  addFllow(wid.value).then(response => {
    isFllow.value=true
    ElMessage.success("关注成功");
  });
}

function handleFllowClose(){
  if(!isLogin.value){
    ElMessage.warning("请先登录");
    return;
  }
  fllowClose(wid.value).then(response => {
    isFllow.value=false
    ElMessage.success("取消成功");
  });
}
// function handleHideReply(comment){
//     if(comment.replyHide) {
//         comment.replyHide = false;
//     }else {
//         comment.replyHide = true;
//     }
//     getReplyList(comment,1)
// }
/** 查询世界详细 */
function handWorld(id:number) {
  getWorld(id).then(response => {
    //console.log("查询世界详细:"+JSON.stringify(response))
    world.value = response.data
    imageUrl.value=imgUrl+response.data.imgUrl;
  });
}
//评论信息
function getAllWorldComment() {
  queryParams.value.wid=wid.value;
    queryParams.value.source=1;
   listComment(globalProperties.addDateRange(queryParams.value, dateRange.value)).then(response => {
    //console.log("查询世界详细:"+JSON.stringify(response))
    commentList.value = response.rows
  });
}
//管理员信息
const manageList=ref([])
//判断是否是管理员
const isAdmin=ref(2)
//小心
function getAllWorldManage(id:number) {
  getWorldManage(id).then(response => {
      //console.log("查询世界详细:"+JSON.stringify(response))
      manageList.value = response.rows
      if(isNotEmpty(userStore.name)) {
          if (response.rows.length > 0) {
              // 列表不为空，执行循环
              for (var i = 0; i < response.rows.length; i++) {
                  if (userStore.userId == response.rows[i].userId) {
                        isAdmin.value = 1;
                        break;
                  }
              }
          }
      }
  });
}
//管理员信息
const elementList = ref([]);
/** 查询元素 */
function getElementList() {
  queryParams.value.wid=wid.value;
  listElement(globalProperties.addDateRange(queryParams.value, dateRange.value)).then(response => {
    elementList.value = response.rows;
  });
}

const  storyList=ref([{}])
function getStoryList() {
  queryParams.value.wid=wid.value;
  listStory(globalProperties.addDateRange(queryParams.value, dateRange.value)).then(response => {
    storyList.value = response.rows;
  });
}

//获取用户信息
const circleUrl=ref('')
const disabled=ref(false)

const username=ref('')
//console.log("userStore name:"+(userStore.name==''))

const wid = ref(null);
wid.value = route.query.wid;
//console.log("世界id="+wid.value);
if(userStore.name==''){
  username.value="未登录"
  disabled.value=true;
}else{
  username.value=userStore.name;
  circleUrl.value=userStore.avatar;
  disabled.value=false;
}

function onSubmit(){
  if(!isLogin.value){
    ElMessage.warning("请先登录");
    return;
  }
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
  commentForm.value.source=1
  commentForm.value.wname=world.value.name
  commentForm.value.circleUrl=userStore.avatar
  addComment(commentForm.value).then(response => {
    ElMessage.success("评论成功")
    commentForm.value.comment=''
    //console.log("评论成功")
    getAllWorldComment();
  })
}

function handleComment(){
  router.push("/world/comment?wid="+world.value.id+"&source="+1);
}

//判断是否已经关注
const isFllow=ref(false)
function handleIsFllow(){
  if(!disabled){
    return;
  }
  if(isLogin==true) {
    getInfoByWid(wid.value).then(response => {
      if (isNotEmpty(response.data)) {
        isFllow.value = true
      } else {
        isFllow.value = false
      }
    });
  }
}

const dialogFormVisible = ref(false)
const addApplyFormRef = ref<FormInstance>()
const addApplyForm = reactive<{
    applyExplain:string,
    wid:number,
    wname:string
}
>({
    applyExplain: '',
    wid: world.value.id,
    wname: world.value.name
});
const addApplyRules = reactive<FormRules>({
    applyExplain: [{ required: true, message: '请输入申请理由', trigger: 'blur' },
        { min: 10, max: 500, message: 'Length should be 10 to 500', trigger: 'blur' },],

})

function  handOpenDia(){
    if(userStore.name=='') {
        ElMessageBox.alert('请先登录', '警告', {
            confirmButtonText: '确定',
            type: 'warning',
         })
        // ElMessage.warning("请先登录")
    }else {
        dialogFormVisible.value = true;
    }
}
function handSumitApply(formEl: FormInstance | undefined){
    dialogFormVisible.value=false
    addApplyManage(addApplyForm).then(response => {
        ElMessage.success("申请成功")
    });
}
handleIsFllow();
//世界信息
handWorld(world.value.id);
//管理员信息
getAllWorldManage(world.value.id)
//评论功能
getAllWorldComment()
getElementList()
getStoryList();
</script>

<style>
/**{*/
/*  margin: 0px;*/
/*  margin-top: 5px;*/
/*  padding: 0px;*/
/*}*/
.world-tabs > .el-tabs__content {
  padding: 10px;
  color: #6b778c;
  font-size: 15px;
  font-weight: 600;
  line-height: 15px;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.title{
  font-family: 'PingFangSC-Semibold', 'PingFang SC Semibold', 'PingFang SC', sans-serif;
  font-weight: 650;
  /* font-style: normal; */
  font-size: 24px;
  text-align: left;
}
.el-tabs__item {
  font-family: 'PingFangSC-Semibold', 'PingFang SC Semibold', 'PingFang SC', sans-serif;
  font-weight: 650;
  font-style: normal;
  line-height: 24px;
}
</style>
