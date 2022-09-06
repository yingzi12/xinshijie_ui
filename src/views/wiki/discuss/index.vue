<template>
  <div class="app-container">
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>世界列表</el-breadcrumb-item>
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
                <el-col><el-avatar :size="50" :src="circleUrl" /></el-col>
                <el-col><span class="demonstration">{{discuss.createName}}</span></el-col>
              </el-row>
            </el-col>
            <el-col :span="22">
              <div><el-tag>#{{discuss.wname}}#</el-tag></div>
              <div>
                <span style="font-weight:bold;font-size:15px;">{{ discuss.title }}</span>
                <el-tag>{{ discussTypesMap.get(discuss.types) }}</el-tag>
                <el-tag>{{ discussStatusMap.get(discuss.status)}}</el-tag>
              </div>
              <div>
                <p>{{discuss.comment}}</p>
              </div>
              <div style="color:#A3A6AD">
                <span>{{ discuss.createTime }}</span>
                <span><BootstrapIcon icon="chat-dots" size="1x" flip-v />20 </span>
                <span><BootstrapIcon icon="hand-thumbs-up" size="1x" flip-v />10</span>
                <span><BootstrapIcon icon="hand-thumbs-down" size="1x" flip-v />20</span>
              </div>
            </el-col>
          </el-row>
        </div>
        <div v-if="discuss.status == 1 ">
          <el-form :model="form" label-width="120px">
            <el-row>
              <el-col :span="20" class="center">
                <el-input
                    v-model="dissComment"
                    :rows="2"
                    type="textarea"
                    placeholder="Please input"
                />
              </el-col>
              <el-col :span="4" class="center">
                <el-button type="primary" @click="onSubmit">发布评论</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
      <!--    已经发布的的评论-->
      <div>
        <div v-if="discuss.status != 1 " style="background-color: #009926">
            <p>已经处理，同意该意见，关闭讨论</p>
          <p>2022-11-11 02:23:01</p>
        </div>
        <el-tabs v-model="commentActive"  >
          <el-tab-pane label="全部评论" name="allComm">
            <div v-for="comment in commentList">
              <el-row>
                <el-col :span="2" class="center">
                    <el-avatar :size="50" :src="comment.circleUrl" />
                </el-col>
                <el-col :span="22">
                  <div >
                    <h3 style="font-weight:bold;margin: 5px">{{ comment.createName }}</h3>
                  </div>
                  <div v-html="comment.reply">
                  </div>
                  <div style="color:#A3A6AD">
                    <span>{{ comment.createTime }}</span>
                    <span @click="handleReply(comment)"><BootstrapIcon  icon="chat-dots" size="1x" flip-v />20 </span>
                    <span><BootstrapIcon icon="hand-thumbs-up" size="1x" flip-v />10</span>
                    <span><BootstrapIcon icon="hand-thumbs-down" size="1x" flip-v />20</span>
                  </div>
                </el-col>
              </el-row>
              <div  v-if="comment.replyHide" style="margin-left: 150px;width: 40%;">
                <div>
                  <el-avatar    size="small" :src="circleUrl" /><el-input v-model="comment.replyComment"   style="width:80%"  size="small" @keyup.enter="sudmitReply(comment)"  ></el-input>
                </div>
                <div v-if="comment.replyList.length>0">
                  <el-table  :show-header="false"  :data="comment.replyList"  size="small">
                    <el-table-column  label="replyNickname" >
                      <template #default="scopeReply">
                        <!--                          <div v-if="comment.reply.front" style="background-color: #6b778c">-->
                        <!--                            <el-tag>{{ scope.row.replyNickname }}</el-tag>:{{ scope.row.front }}-->
                        <!--                          </div>-->
                        <el-tag >{{ scopeReply.row.nickname }}</el-tag>@<el-tag>{{ scopeReply.row.replyNickname }}</el-tag>:<span >{{ scopeReply.row.reply }}</span>
                        <p style="margin: 0px">{{ scopeReply.row.createTime }}<BootstrapIcon @click="handleReplyComm(comment,scopeReply.row)" icon="chat-dots" size="1x" flip-v /></p>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-button class="mt-4"  @click="handleReplyDetail(comment)" size="small">更多</el-button>
                </div>
              </div>
              <el-divider style="margin: 0px;padding: 0px"/>
            </div>
            <div style="float:right; position:relative; ">
              <pagination
                  v-show="total > 0"
                  :total="total"
                  v-model:page="queryParams.pageNum"
                  v-model:limit="queryParams.pageSize"
                  @pagination="getList"/>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
      <el-dialog v-model="dialogFormVisible" title="Shipping address">
        <span></span>
      <el-form :model="form">
        <el-form-item label="Promotion name" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">Confirm</el-button>
      </span>
      </template>
    </el-dialog>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, reactive, ref, toRefs} from 'vue'
import { listDiscussComment } from "@/api/wiki/discussComment";
import { getDiscuss } from "@/api/wiki/discuss";
import { addDiscussComment } from "@/api/admin/discussComment";
import { getWorld } from "@/api/wiki/world";
import {useRoute, useRouter} from "vue-router";
import {ElMessage} from "element-plus";
import useUserStore from '@/store/modules/user'


// 接收url里的参数
const route = useRoute();
const router = useRouter()
const {  appContext : { config: { globalProperties } }  } = getCurrentInstance();
const {  proxy  } = getCurrentInstance();

//获取用户信息
const userStore = useUserStore()
const circleUrl=ref('')
const disabled=ref(true)

const username=ref('')
console.log("userStore name:"+(userStore.name==''))

const did = ref(null);
const wid = ref(null);
did.value = route.query.did;
wid.value = route.query.wid;
console.log("元素id="+did.value);
console.log("世界id="+wid.value);

if(userStore.name==''){
  username.value="未登录"
  disabled.value=true;
}else{
  username.value=userStore.name;
  circleUrl.value=userStore.avatar;
  disabled.value=false;
}

const discussTypesMap = new Map([
  [1, "自由讨论"],
  [2, "建议"],
  [3, "内容错误"],
  [4, "内容缺失"],
  [5, "过多重复"],
  [6, "内容不相关"],
  [7, "其他"],

]);
const discussStatusMap = new Map([
  [1, "待处理"],
  [2, "已处理"],
  [3, "关闭"],
])
//评论
const dissComment = ref('')

//分页
const dateRange = ref([]);
//分类选项
const dataStree = ref([])
const loading = ref(true);
const total = ref(0);
const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    auditStatus:0,
    name: undefined,
    types: undefined,
    pid:null,
    wid:wid.value,
    did:did.value,
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
  console.log(indexPath)
}

/** 查询世界列表 */
function getList() {
  queryParams.value.ranks=0
  listDiscussComment(globalProperties.addDateRange(queryParams.value, dateRange.value)).then(response => {
    loading.value = false;
    commentList.value = response.rows;
    total.value = response.total;
  });
}
//世界信息
const world=ref({})

/** 查询世界详细 */
function handWorld() {
  if(wid.value == undefined){
    ElMessage.error("缺少必要参数")
    return;
  }
  getWorld(wid.value).then(response => {
    console.log("查询世界详细:"+JSON.stringify(response))
    world.value = response.data
  });
}
//世界信息
const discuss=ref({})

/** 查询讨论详细 */
function handleDiscuss() {
  if(did.value == undefined){
    ElMessage.error("缺少必要参数")
    return;
  }
  getDiscuss(did.value).then(response => {
    console.log("查询讨论详细:"+JSON.stringify(response))
    discuss.value = response.data
  });
}

function onSubmit(){
  console.log("添加评论"+dissComment.value);
  console.log("添加评论"+wid.value);
  console.log("添加评论"+did.value);
  console.log("添加评论"+JSON.stringify(userStore));

  if(dissComment.value.length<10 || dissComment.value.length>500){
    ElMessage.error("回复内容需大于10小于500")
    return;
  }
  if(wid.value == undefined){
    ElMessage.error("缺少必要参数")
    return;
  }else{
    form.value.wid=world.value.id
  }
  if(did.value == undefined){
    ElMessage.error("缺少必要参数")
    return;
  }else{
    form.value.did=did.value
  }
  form.value.wname=world.value.name
  form.value.circleUrl=userStore.avatar
  form.value.comment=discuss.value.comment
  form.value.reply=dissComment.value
  form.value.eid=discuss.value.eid
  form.value.title=discuss.value.title
  form.value.ranks=0
  form.value.upid=0
  form.value.pid=0
  form.value.nickname=userStore.username
  form.value.replyNickname=discuss.value.createName
  console.log("添加评论")
  addDiscussComment(form.value).then(response => {
    dissComment.value=''

    // ElMessage.info("评论成功")
    console.log("评论成功")
    getList()
  })
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
  console.log("添加回复:"+JSON.stringify(comment))
  form.value.did=did.value
  form.value.wid=world.value.id
  form.value.wname=world.value.name
  form.value.circleUrl=userStore.avatar
  form.value.comment=comment.reply
  form.value.reply=comment.replyComment
  form.value.eid=discuss.value.eid
  form.value.title=discuss.value.title
  form.value.upid=comment.id
  form.value.ranks=comment.ranks+1
  form.value.nickname=userStore.username
  form.value.replyNickname=comment.nickname
  if(comment.ranks == 0) {
    form.value.pid = comment.id
  }else{
    form.value.pid = comment.pid
  }
  addDiscussComment(form.value).then(response => {
    console.log("评论成功"+JSON.stringify(response.data))
    comment.replyList.push(response.data)
    comment.replyComment=""
    console.log("评论成功"+JSON.stringify(comment))
    ElMessage.info("回复成功")
  })
}
handleDiscuss()
handWorld()
getList();
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

  console.log("点击"+comment.replyHide)
  comment. comHide=true
  console.log(JSON.stringify(comment))
  if(comment.replyHide){
    comment.replyHide=false;
    show.value=false;
    return false
  }else{
    comment.replyHide=true;
    show.value=true;
    console.log("查询回复信息:"+JSON.stringify(comment))
    queryParams.value.pid=comment.id
    queryParams.value.pageSize=3
    queryParams.value.ranks=null
    listDiscussComment(globalProperties.addDateRange(queryParams.value, dateRange.value)).then(response => {
      comment.replyList=response.rows
      console.log("查询回复信息:"+JSON.stringify(comment))
    })
    return true
  }
}
function handleReplyDetail(comment){
  router.push("/discuss/reply?wid="+wid.value+"&did="+comment.did+"&dcid="+comment.id);
}

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
