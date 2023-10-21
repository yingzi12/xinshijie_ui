<template>
  <div class="app-container">
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/world/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/world/list">世界树</a></el-breadcrumb-item>
            <el-breadcrumb-item  :to="{ path: '/world/details', query: {wid:discussComment.wid} }">{{discussComment.wname}}</el-breadcrumb-item>
            <el-breadcrumb-item  v-if="source == 2" :to="{ path: '/story/detail', query: {wid:wid,sid:sid} }">{{discussComment.sname}}</el-breadcrumb-item>
            <el-breadcrumb-item  :to="{ path: '/discuss/list', query: {wid:wid,sid:sid,source:source} }">讨论</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/discuss/index',query: {wid:wid,wname:discussComment.wname,did:discussComment.did,source:source,sid:sid}}">{{ discussComment.title }}</el-breadcrumb-item>
            <el-breadcrumb-item >回复列表</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div>
      <!--    评论区-->
      <div style="margin-top: 20px">
        <!--    评论区-->
        <div>
          <el-row>
            <el-col :span="2" class="center">
              <el-row>
                <el-col><el-avatar :size="50" :src="imgUrl+discussComment.circleUrl" /></el-col>
                <el-col><span class="demonstration">{{discussComment.createName}}</span></el-col>
              </el-row>
            </el-col>
            <el-col :span="22">
              <div>
                  <span style="font-weight:bold;font-size:15px;"><router-link :to="{path:'/discuss/index',query: {wid:discussComment.wid,wname:discussComment.wname,did:discussComment.did,source:source,sid:sid}}"><el-tag type="success">{{ discussComment.title }}</el-tag></router-link></span>
                <p>{{discussComment.comment}}</p>
              </div>
              <div style="color:#A3A6AD">
                <span>{{ discussComment.createTime }}</span>
                <span><BootstrapIcon icon="chat-dots" size="1x" flip-v />{{discussComment.countReply}} </span>
                <span><BootstrapIcon icon="hand-thumbs-up" size="1x" flip-v />{{discussComment.countLike}} </span>
                <span><BootstrapIcon icon="hand-thumbs-down" size="1x" flip-v />{{discussComment.countDisagree}} </span>

              </div>
            </el-col>
          </el-row>
        </div>
        <div v-if="discuss.status == 1 ">
          <el-form :model="form" label-width="120px">
            <el-row>
              <el-col :span="20" class="center">
                <el-input
                    v-model="discussComment.replyComment"
                    :rows="2"
                    type="textarea"
                    placeholder="Please input"
                />
              </el-col>
              <el-col :span="4" class="center">
                <el-button type="primary" @click="sudmitReply(discussComment)">回复</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
      <!--    已经发布的的评论-->
      <div>
        <el-tabs v-model="commentActive"  >
          <el-tab-pane label="全部评论" name="allComm">
            <div v-for="comment in commentList">
              <el-row>
                <el-col :span="2" class="center">
                    <el-avatar :size="50" :src="imgUrl+comment.circleUrl" />
                </el-col>
                <el-col :span="22">
                  <div v-if="comment.ranks == 1">
                      <el-tag >{{ comment.nickname }}</el-tag>:<span >{{ comment.comment }}</span>
                  </div>
                    <div v-if="comment.ranks != 1">
                  <el-tag >{{ comment.nickname }}</el-tag>@<el-tag>{{ comment.replyNickname }}</el-tag>:<span >{{ comment.comment }}</span>
                    </div>
<!--                  <div v-html="comment.reply">-->
<!--                  </div>-->
                  <div style="color:#A3A6AD">
                    <span>{{ comment.createTime }}</span>
                    <span @click="handleReply(comment)"><BootstrapIcon  icon="chat-dots" size="1x" flip-v />{{comment.countReply}} </span>
                    <span><BootstrapIcon icon="hand-thumbs-up" size="1x" flip-v />{{comment.countLike}} </span>
                    <span><BootstrapIcon icon="hand-thumbs-down" size="1x" flip-v />{{comment.countDisagree}} </span>
                  </div>
                    <div  v-if="comment.replyHide && discuss.status == 1 " style="margin-left: 20px;width: 40%;">
                        <div>
                            <el-avatar    size="small" :src="imgUrl+circleUrl" /><el-input v-model="comment.replyComment"   style="width:80%"  size="small" @keyup.enter="sudmitReply(comment)"  ></el-input>
                        </div>
                    </div>
                </el-col>
              </el-row>

              <el-divider style="margin: 0px;padding: 0px"/>
            </div>
            <div style="float:right; position:relative; ">
              <el-pagination

                  :total="total"
                  layout="total, prev, pager, next"

                  v-model:page="queryParams.pageNum"
                  :page-size=20
                  @current-change="getList"/>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject, reactive, ref, toRefs} from 'vue'
import { listDiscussComment,getDiscussComment } from "@/api/wiki/discussComment";
import { replyDiscussComment } from "@/api/admin/discussComment";
import { getDiscuss } from "@/api/wiki/discuss";
import {useRoute, useRouter} from "vue-router";
import {ElMessage} from "element-plus";
import useUserStore from '@/store/modules/user'


// 接收url里的参数
const route = useRoute();
const router = useRouter()


const imgUrl = inject("$imgUrl")

//获取用户信息
const userStore = useUserStore()
const circleUrl=ref('')
const disabled=ref(true)

const username=ref('')
//console.log("userStore name:"+(userStore.name==''))

const dcid = ref(route.query.dcid);

const did = ref(route.query.did);
const wid = ref(route.query.wid);
const sid = ref(route.query.sid);
const source = ref(route.query.source);

if(userStore.name==''){
  username.value="未登录"
  disabled.value=true;
}else{
  username.value=userStore.name;
  circleUrl.value=userStore.avatar;
  disabled.value=false;
}


//分页
const dateRange = ref([]);
//分类选项
const dataStree = ref([])
const loading = ref(true);
const total = ref(0);
const data = reactive({
  form: {
      comment:undefined,
      wid:wid.value,
      did:did.value,
      sid:sid.value,
      upid:undefined,
      source:source.value
  },
  queryParams: {
    pageNum: 1,

    auditStatus:0,
    name: undefined,
    types: undefined,
    pid:null,
    wid:wid.value,
    did:did.value,
    sid:sid.value,
    source:source.value,
    ranks:0,
    // wid:wid.value,
  },
  rules: {
    // userName: [{ required: true, message: "用户名称不能为空", trigger: "blur" }, { min: 2, max: 20, message: "用户名称长度必须介于 2 和 20 之间", trigger: "blur" }],
  }
});
const { queryParams, form, rules } = toRefs(data);

function handleSelect(index:String,indexPath:String){
  if(index =='2'){
    router.push("/admin/auditLog");
  }
  //console.log(indexPath)
}

/** 查询世界列表 */
function getList(page: number) {
  window.scrollTo(0, 0); // 滚动到顶部
  queryParams.value.pageNum=page;

  queryParams.value.pid=dcid
  queryParams.value.ranks=null
  listDiscussComment(queryParams.value).then(response => {
    loading.value = false;
    commentList.value = response.data;
    total.value = response.total;
  });
}

//世界信息
const discussComment=ref({})

/** 查询讨论详细 */
function handleDiscussComment() {
  if(dcid.value == undefined){
    ElMessage.error("缺少必要参数")
    return;
  }
  getDiscussComment(dcid.value).then(response => {
    //console.log("查询讨论详细:"+JSON.stringify(response))
    discussComment.value = response.data
  });
}

function sudmitReply(comment){
  if(!comment.replyComment){
    ElMessage.error("回复不能为空")
    return;
  }
  if(comment.replyComment.length<10 || comment.replyComment.length>200){
    ElMessage.error("回复内容需大于10小于200")
    return;
  }
  form.value.comment=comment.replyComment
  form.value.upid=comment.id
  replyDiscussComment(form.value).then(response => {
    comment.replyComment=""
    ElMessage.info("回复成功")
    getList(1)
  })
}
handleDiscussComment()
getList(queryParams.value.pageNum);

//世界信息
const reply=ref({})
const show=ref(false)
interface  Comment{
  id:number
  circleUrl:string
  date: string

  createName: string
  comment: string
  createTime:string

  replyHide:boolean
  comHide:boolean
  reply:string,
  replyList?: Reply[]
}
interface  Reply {
  nickname:string
  replyNickname:string
  content:string
  reply:string
  createTime:string
}
//弹出框
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

//评论列表
const commentActive = ref('allComm')
const commentList = ref<Comment[]>([])

function handleReply(comment){
  show.value=true;
  //console.log("点击"+comment.replyHide)
  comment. comHide=true
  //console.log(JSON.stringify(comment))
  if(comment.replyHide){
    comment.replyHide=false;
    show.value=false;
    return false
  }else{
    comment.replyHide=true;
    show.value=true;
    return true
  }
}

//讨论信息
const discuss=ref({})

/** 查询讨论详细 */
function handleDiscuss() {
    if(did.value == undefined){
        ElMessage.error("缺少必要参数")
        return;
    }
    getDiscuss(did.value).then(response => {
        discuss.value = response.data
    });
}
handleDiscuss()
</script>

<style scoped>
.reply span {
  font-size: 5px;
  font-family:'PingFangSC-Regular', 'PingFang SC', sans-serif;
  color:#999999;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
