<template>
  <div class="app-container">
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/world/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/world/list">世界树</a></el-breadcrumb-item>
        <el-breadcrumb-item  :to="{ path: '/world/details', query: {wid:wid} }">{{wname}}</el-breadcrumb-item>
        <el-breadcrumb-item v-if="source == 2 " :to="{ path: '/story/detail', query: {wid:wid,sid:sid} }">{{sname}}</el-breadcrumb-item>
        <el-breadcrumb-item>主题列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <!--    评论区-->
      <div>
        <div class="center">
           <span style="font-size:30px;">{{ world.name }}</span>
        </div>
        <div style="margin-bottom: 10px;margin-top: 10px">
          你可以在这里发起和回复与世界/元素有关的讨论。指出世界/元素的错误点、缺失，除自由讨论之外选择,都会被管理员处理，使问题快速解决；发布对词条主体的观点、见解，请选择“自由讨论”，以便收获更多互动。请理智、和谐讨论，遵守公园规范。请勿发表过激/不实/不友善言论，不符合规范的内容会被删除。
        </div>
        <div style="margin: 0px;padding: 0px">
          <span style="font-size:15px;">发布主题</span><span style="font-size:10px;">文明上网理性发言，请遵守评论服务协议</span>
        </div>
        <el-divider  style="margin: 0px"/>
        <el-row>
          <el-col :span="3" class="center">
            <el-row>
              <el-col><el-avatar :size="50" :src="imgUrl+circleUrl" /></el-col>
              <el-col><span class="demonstration">{{ username }}</span></el-col>
            </el-row>
          </el-col>
          <el-col :span="21">
            <el-radio-group v-model="disType">
              <el-radio :label="1">自由讨论</el-radio>
              <el-radio :label="2">建议</el-radio>
              <el-radio :label="3">内容错误</el-radio>
              <el-radio :label="4">内容缺失</el-radio>
              <el-radio :label="5">过多重复</el-radio>
              <el-radio :label="6">内容不相关</el-radio>
              <el-radio :label="7">其他</el-radio>
            </el-radio-group>
            <el-form :model="form" label-width="120px">
              <el-input :disabled="disabled"  v-model="title" placeholder="请输入讨论标题"></el-input>
              <el-input :disabled="disabled"
                  v-model="discuss"
                  :rows="2"
                  type="textarea"
                  placeholder="请输入讨论内容"
              />
              <el-button :disabled="disabled"  type="primary" @click="onSubmit">发布讨论</el-button>
            </el-form>
          </el-col>
        </el-row>
      </div>
      <!--    已经发布的的评论-->
      <div>
        <el-tabs v-model="commentActive"  >
          <el-tab-pane label="全部讨论" name="allComm">
            <div v-for="discuss in discussList">
              <el-row>
                <el-col :span="2">
                    <!--              头像-->
                    <p style="margin: 0px;padding: 0px"><el-avatar :size="50" :src="imgUrl+discuss.circleUrl" /></p>
                    <p style="font-weight:bold;margin: 0px;padding: 0px;">{{ discuss.createName }}</p>
                </el-col>
                <el-col :span="22">
                  <div >
                    <span style="font-weight:bold;font-size:15px;">
                      <router-link :to="{path:'/discuss/index',query: {wid:wid,wname:world.name,did:discuss.id,source:source,sid:sid}}">
                      <el-tag v-if="source == 1">#{{discuss.wname}}#</el-tag><el-tag v-if="source == 2">#{{discuss.sname}}#</el-tag>{{ discuss.title }}
                    </router-link>
                    </span>
                    <el-tag>{{ discussTypesMap.get(discuss.types) }}</el-tag>
                    <el-tag>{{ discussStatusMap.get(discuss.status) }}</el-tag>
                  </div>
                  <div v-html="discuss.comment">
                  </div>
                  <div style="color:#A3A6AD">
                    <span>{{ discuss.createTime }}</span>
                    <span><BootstrapIcon icon="chat-dots" size="1x" flip-v />{{discuss.countReply}} </span>
                    <span><BootstrapIcon icon="hand-thumbs-up" size="1x" flip-v />{{discuss.countLike}} </span>
                    <span><BootstrapIcon icon="hand-thumbs-down" size="1x" flip-v />{{discuss.countDisagree}} </span>
                  </div>
                </el-col>
              </el-row>
              <el-divider />
            </div>
            <!--        分页-->
            <div style="float:right; position:relative;margin: 0px ">
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
</template>

<script lang="ts" setup>
import {getCurrentInstance, inject, reactive, ref, toRefs} from 'vue'
import { listDiscuss } from "@/api/wiki/discuss";
import { addDiscuss } from "@/api/admin/discuss";
import { getWorld } from "@/api/wiki/world";
import { getStory } from "@/api/wiki/story";
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
//console.log("userStore name:"+(userStore.name==''))
const imgUrl = inject("$imgUrl")

const eid = ref(null);
const wid = ref(null);
const sid = ref(null);
const wname = ref(undefined);
const sname = ref(undefined);
const source = ref(undefined);
source.value = parseInt(<string>route.query.source);
eid.value = route.query.eid;
wid.value = route.query.wid;
sid.value = route.query.sid;

//console.log("元素id="+eid.value);
//console.log("世界id="+wid.value);

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
//分页
const dateRange = ref([]);
//分类选项
const dataStree = ref([])
const loading = ref(true);
const discussList = ref([]);
const total = ref(0);
const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,

    auditStatus:0,
    name: undefined,
    types: undefined,
    wid: wid.value,
    sid: sid.value,
    source:source.value
  },
  rules: {
    // userName: [{ required: true, message: "用户名称不能为空", trigger: "blur" }, { min: 2, max: 20, message: "用户名称长度必须介于 2 和 20 之间", trigger: "blur" }],
  }
});
const { queryParams, form, rules } = toRefs(data);



/** 查询世界列表 */
function getList(page: number) {
  window.scrollTo(0, 0); // 滚动到顶部
  queryParams.value.pageNum=page;

  listDiscuss(globalProperties.addDateRange(queryParams.value, dateRange.value)).then(response => {
    loading.value = false;
    discussList.value = response.rows;
    total.value = response.total;
  });
}

const discuss=ref('')
const title=ref('')

const disType=ref(7)
//世界信息
const world=ref({})
const story=ref({})

/** 查询世界详细 */
function handWorld() {
  if(wid.value == undefined){
    ElMessage.error("缺少必要参数,世界")
    return;
  }
  getWorld(wid.value).then(response => {
    //console.log("查询世界详细:"+JSON.stringify(response))
    world.value = response.data
    wname.value=response.data.name
  });
}
/** 查询世界详细 */
function handStory() {
  if(sid.value == undefined){
    ElMessage.error("缺少必要参数,故事")
    return;
  }
  getStory(sid.value).then(response => {
    //console.log("查询世界详细:"+JSON.stringify(response))
    story.value = response.data
    wname.value=response.data.wname
    sname.value=response.data.name
    wid.value=response.data.wid
  });
}

//弹出框
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

//评论列表
const commentActive = ref('allComm')

function onSubmit(){
  //console.log("添加评论"+disType.value);
  //console.log("添加评论"+discuss.value);
  //console.log("添加评论"+wid.value);
  //console.log("添加评论"+eid.value);
  //console.log("添加评论"+JSON.stringify(userStore));

  if(disType.value<1 || disType.value>7){
     ElMessage.error("讨论类别必选")
     return;
   }
  if(discuss.value.length<10 || discuss.value.length>500){
    ElMessage.error("讨论内容需大于10小于500")
    return;
  }
  if(title.value.length<5 || title.value.length>100){
    ElMessage.error("讨论标题需大于5小于500")
    return;
  }
  if(eid.value == undefined){
    form.value.eid=null
  }else{
    form.value.eid=eid.value
  }
  if(sid.value == undefined){
    form.value.sid=null
  }else{
    form.value.sid=sid.value
  }
  if(sname.value == undefined){
    form.value.sname=null
  }else{
    form.value.sname=sid.value
  }
  if(wid.value == undefined){
    form.value.wid=null
  }else{
    form.value.wid=wid.value
  }
  form.value.wname=world.value.name
  form.value.circleUrl=userStore.avatar
  form.value.types=disType.value
  form.value.comment=discuss.value
  form.value.title=title.value
  form.value.source=source.value
  //console.log("添加主题")
  addDiscuss(form.value).then(response => {
    // ElMessage.info("评论成功")
    disType.value=7
    discuss.value=''
    title.value=''
    //console.log("评论成功")
    getList()
  })
}
function  getInfo(){
  if(source.value !=1 && source.value !=2){
    ElMessage.error("缺少必要参数,来源")
    return;
  }
  if(source.value == 1){
    handWorld();
  }
  if(source.value == 2){
    handStory();
  }
}
getInfo()
getList(queryParams.value.pageNum);

</script>

<style scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
