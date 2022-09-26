<template>
  <div class="app-container">
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/world/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/world/list">世界树</a></el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/world/details', query: {wid:wid} }">{{story.wname}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/story/list', query: {wid:wid,wname:wname} }">故事列表</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/story/index', query: {sid:sid,sname:sname} }">{{ story.name }}</el-breadcrumb-item>
        <el-breadcrumb-item>评论列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <!--    评论区-->
      <div>
        <el-divider />
        <el-row>
          <el-col :span="2" class="center">
            <el-row>
              <el-col><el-avatar :size="50" :src="imgUrl+circleUrl" /></el-col>
              <el-col>
                <span   class="demonstration">{{username}}</span>
              </el-col>
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
                    <span><el-icon :size="15"><ChatDotRound /></el-icon>{{comment.countReply}} </span>
                    <span><el-icon :size="15"><Pointer /></el-icon>{{comment.countReply}}</span>
                    <!--                  <span><BootstrapIcon icon="hand-thumbs-down" size="small" />{{comment.countReply}}</span>-->
                  </div>
                </el-col>
              </el-row>
              <el-divider />
            </div>
            <div style="float:right; position:relative;height: 50px">
              <pagination
                  v-show="total > 0"
                  :total="total"
                  v-model:page="queryParams.pageNum"
                  v-model:limit="queryParams.pageSize"
                  @pagination="getList"
              />
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import {getCurrentInstance, inject, reactive, ref, toRefs} from 'vue'
import { addComment} from "@/api/admin/comment";
import { listComment} from "@/api/wiki/comment";
import {ElMessage} from "element-plus";
import useUserStore from '@/store/modules/user'
import {useRoute} from "vue-router";
import {  getStory } from "@/api/wiki/story";

const {  appContext : { config: { globalProperties } }  } = getCurrentInstance();
const {  proxy  } = getCurrentInstance();
// 接收url里的参数
const route = useRoute();
//获取用户信息
const userStore = useUserStore()
const circleUrl=ref('')
const disabled=ref(false)

const username=ref('')
//console.log("userStore name:"+(userStore.name==''))

const eid = ref(null);
const wid = ref(null);
const source = ref(null);
const sid = ref(null);

eid.value = route.query.eid;
wid.value = route.query.wid;
source.value = route.query.source;
sid.value = route.query.sid;
const imgUrl = inject("$imgUrl")

//console.log("元素id="+eid.value);
//console.log("世界id="+wid.value);
if(userStore.name==''){
  username.value="未登录"
  disabled.value=true;
}else{
  username.value=userStore.name;
  circleUrl.value=imgUrl+userStore.avatar;
  disabled.value=false;
}

//console.log("userStore:"+JSON.stringify(userStore))

const commentActive = ref('allComm')
const commentList = ref([])
const data = reactive({
  commentForm: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    source:2,
    wid: wid.value,
    sid: sid.value,
    eid: undefined,
  },
  rules: {
    comment: [{ required: true, message: "评论不能为空", trigger: "blur" }],
  }
});
const total = ref(0);

const { queryParams, commentForm, rules } = toRefs(data);
//分页信息
const dateRange = ref([]);
//评论信息
function getList() {
  listComment(globalProperties.addDateRange(queryParams.value, dateRange.value)).then(response => {
    //console.log("查询世界详细:"+JSON.stringify(response))
    commentList.value = response.rows
    total.value = response.total;
  });
}
//世界信息
const story=ref({})
/** 查询世界详细 */
function handStory() {
  getStory(sid.value).then(response => {
    //console.log("查询世界详细:"+JSON.stringify(response))
    story.value = response.data
  });
}
function onSubmit(){
  if(!disabled){
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
  commentForm.value.wname=world.value.name
  commentForm.value.circleUrl=userStore.avatar
  addComment(commentForm.value).then(response => {
    ElMessage.info("评论成功")
    //console.log("评论成功")
    getList()
  })
}
handStory()
getList();
</script>

<style >
.pagination-container{
  margin: 0px;
}
</style>
