<template>
  <div class="app-container">
    <!--  内容区-->
    <div>
      <div>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/world/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/world/list">世界树</a></el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/world/details', query: {wid:wid} }">{{story.wname}}</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/story/list', query: {wid:wid,wname:wname} }">故事列表</el-breadcrumb-item>
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
                <el-badge :value="story.ranks" class="item">
                  <h1 style="margin: 2px" class="title">{{ story.name }}</h1>
                </el-badge>
              </div>
              <div>
                <router-link :to="{path:'/world/details', query: {wid:story.wid} }">
                  <h5 style="margin: 0px;font-size: 15px;" class="title">世界: {{ story.wname }}</h5>
                </router-link>
              </div>
              <div style="margin-top: 5px" >
                <el-space wrap>
                  <el-tag style="width: 70px;" size="default">{{ storyTypesMap.get(story.types) }}</el-tag>
                  <el-tag v-if="story.source != null " v-for="tag in story.source.split(';')"  style="width: 70px;" size="default" type="success">{{tag}}</el-tag>
                  <el-tag v-if="story.tags != null "  v-for="tag in story.tags.split(';')"  style="width: 70px;" size="default" type="danger">{{tag}}</el-tag>
                </el-space>
              </div>
              <div style="margin-top: 5px" v-if="story.updateChapterId != null">
                <span style="font-size:10px;color:#999999;">更新时间:</span><span style="font-size:10px;color:#999999;">{{ story.updateChapterTime }}</span><span style="font-size:10px;margin-left: 10px;color:#70B603;">{{ story.updateChapter }}</span>
              </div>
              <div style="height: 52px;overflow:hidden">
                <p style="font-size: 18px;color: #666666;margin: 5px 0 0 0">{{ story.intro }}</p>
              </div>
              <div style="margin-top: 5px;color:#A3A6AD">
                <span><el-icon size="20"><ChatDotRound /></el-icon>{{story.countComment}}</span>
                <span><el-icon size="20"><Edit /></el-icon>{{story.countEdit}}</span>
                <span><el-icon size="20"><Pointer /></el-icon>{{story.countLike}}</span>
                <span><el-icon size="20"><View /></el-icon>{{story.countSee}}</span>
              </div>
              <div style="margin-top: 5px;" >
                <el-button v-if="isFllow" style="width: 90px;" type="primary" @click="handleHarding">关注</el-button>
                <el-button @click="handleDiscuss" style="width: 90px;">讨论({{story.countDiscuss}})</el-button>
                  <el-tooltip  v-if="isAdmin == 2"
                          class="box-item"
                          effect="dark"
                          content="可以分享故事的收益"
                          placement="top-start"
                  >
                  <el-button @click="handOpenDia" style="width: 90px;">申请作家</el-button>
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
      <el-tabs v-model="storyActive" class="world-tabs" @tab-click="handleClick">
        <el-tab-pane label="描述" name="description">
          <p style="white-space: pre-wrap;">{{story.description}}</p>
        </el-tab-pane>
        <el-tab-pane label="章节" name="element">
          <el-table :data="chapterList" stripe style="width: 100%">
            <el-table-column prop="title" label="章节名" width="180" >
              <template #default="scope">
                <router-link :to="{path:'/chapter/index', query: {sid:scope.row.sid,scid:scope.row.id,wid:scope.row.wid,wname:scope.row.wname,sname:scope.row.sname}}">{{ scope.row.title }}</router-link>
              </template>
            </el-table-column>
            <el-table-column prop="createName" label="创建人" />
            <el-table-column prop="createTime" label="创建时间" />
            <el-table-column prop="updateTime" label="更新时间" />
          </el-table>
          <el-button style="margin-top:10px" text  @click="handChapter">更多</el-button>
        </el-tab-pane>
        <el-tab-pane label="作家" name="message">
          <el-table :data="authorList" stripe style="width: 100%">
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
                  <el-avatar :size="50" :src="imgUrl+circleUrl" />
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
                  <span><el-icon :size="15"><ChatDotRound /></el-icon>{{comment.countReply}} </span>
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

    <el-dialog v-model="dialogFormVisible" title="申请成为作家"
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
import {  getStory } from "@/api/wiki/story";
import {  listComment,addComment } from "@/api/wiki/comment";
import { addHarding,getInfoBySid } from "@/api/admin/harding";
import {  listAuthor } from "@/api/wiki/author";
import { listChapter } from "@/api/wiki/chapter";
import { addApplyAuthor } from "@/api/admin/applyAuthor";

import useUserStore from '@/store/modules/user'
import {ElMessage, ElMessageBox, FormInstance, FormRules} from "element-plus";
import { isNotEmpty } from '@/utils/tools';
import {ChatDotRound, Pointer} from "@element-plus/icons-vue"; // 根据你的项目路径调整引入路径

const {  appContext : { config: { globalProperties } }  } = getCurrentInstance();

const router = useRouter()

// 接收url里的参数
const route = useRoute();

const sid = ref(null);
sid.value = route.query.sid;

const wid = ref(null);
wid.value = route.query.wid;
const wname = ref('');

const storyTypesMap=new Map([
  [6,"科学"],
  [1,"武侠"],
  [2,"仙侠"],
  [3,"魔幻"],
  [4,"奇幻"],
  [5,"其他"]
])

//console.log(route.query.id,"参数");
//世界信息
const story=ref({})
//评论信息
const commentList=ref([])
//管理员信息
const authorList=ref([])
//分页信息
const dateRange = ref([]);
//管理员信息
const chapterList = ref([]);
//评论内容与通用分页查询条件
const data = reactive({
  commentForm: {},
  queryParams: {
    pageNum: 1,

    wid: undefined,
    sid: sid.value,
    level: 1,

  },
  rules: {
    comment: [{ required: true, message: "评论不能为空", trigger: "blur" }],
  }
});

const { queryParams, commentForm, rules } = toRefs(data);

//console.log("世界id="+story.value.id);
const imgUrl = inject("$imgUrl")
const imageUrl=ref('')

function handChapter(){
  router.push("/chapter/list?sid="+sid.value+"&wid="+wid.value);
}
function handleDiscuss(){
  router.push("/discuss/list?sid="+sid.value+"&wid="+wid.value+"&source="+2);
}
function handleHarding(){
  addHarding(sid.value).then(response => {
    ElMessage.success("关注成功");
  });
}

function handStory() {
  getStory(sid.value).then(response => {
    //console.log("查询世界详细:"+JSON.stringify(response))
    story.value = response.data
    wid.value = response.data.wid;
    wname.value = response.data.wname;
    imageUrl.value=imgUrl+response.data.imgUrl;
  });
}
//评论信息
function getAllStoryComment() {
  queryParams.value.wid=wid.value;
  queryParams.value.sid=sid.value;
  listComment(globalProperties.addDateRange(queryParams.value, dateRange.value)).then(response => {
    //console.log("查询世界详细:"+JSON.stringify(response))
    commentList.value = response.rows
  });
}

//判断是否是作家
const isAdmin=ref(2)
//小心
function handleAuthor() {
  listAuthor(sid.value).then(response => {
      authorList.value = response.rows
      if(isNotEmpty(userStore.name)) {
          if (response.rows.length> 0) {
              // 列表不为空，执行循环
              for (var i = 0; i < response.rows.length; i++) {
                  if (userStore.userId == response.rows[i].userId) {
                      isAdmin.value = 1;
                  }
              }
          }
      }
  });
}
/** 查询元素 */
function handleChapterList() {
  queryParams.value.wid=wid.value;
  listChapter(globalProperties.addDateRange(queryParams.value, dateRange.value)).then(response => {
    chapterList.value = response.rows;
  });
}


const storyActive = ref('description')

const commentActive = ref('allComm')



//获取用户信息
const userStore = useUserStore()
const circleUrl=ref('')
const disabled=ref(false)

const username=ref('')
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
  if(sid.value == undefined){
    ElMessage.error("缺少必要参数")
    return;
  }else{
    commentForm.value.sid=sid.value
  }
  commentForm.value.circleUrl=userStore.avatar
  if(disabled) {
    commentForm.value.source=2
    commentForm.value.sname=story.value.name
    commentForm.value.wname=story.value.wname
    commentForm.value.wid=story.value.wid
    addComment(commentForm.value).then(response => {
      ElMessage.success("评论成功")
      commentForm.value.comment = ''
      //console.log("评论成功")
      getAllStoryComment();
    })
  }
}

function handleComment(){
  router.push("/story/comment?sid="+story.value.id+"&wid="+story.value.wid+"&source="+2);
}

//判断是否已经关注
const isFllow=ref(false)
function handleIsFllow(){
  if(disabled) {
    getInfoBySid(sid.value).then(response => {
      if (!response.data) {
        isFllow.value = true
      }
    });
  }
}

const dialogFormVisible = ref(false)
const addApplyFormRef = ref<FormInstance>()
const addApplyForm = reactive<{
    applyExplain:string,
    sid:number,
    sname:string,
    wid:number,
    wname:string
}
>({
    applyExplain: '',
    sid: story.value.id,
    sname: story.value.name,
    wid: story.value.wid,
    wname: story.value.wname
});
const addApplyRules = reactive<FormRules>({
    applyExplain: [{ required: true, message: '请输入申请理由', trigger: 'blur' },
        { min: 10, max: 500, message: 'Length should be 10 to 500', trigger: 'blur' },],

})

function  handOpenDia(){
    if(userStore.name=='') {
        ElMessageBox.alert('请先登录', '警告', {
            confirmButtonText: '确定',
        })
        // ElMessage.warning("请先登录")
    }else {
        dialogFormVisible.value = true;
    }
}
function handSumitApply(formEl: FormInstance | undefined){
    dialogFormVisible.value=false
    addApplyAuthor(addApplyForm).then(response => {
       ElMessage.success("申请成功")
    });
}

getAllStoryComment()
handleIsFllow();
handStory();
//评论功能
handleAuthor();
handleChapterList()
</script>

<style>

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

</style>
