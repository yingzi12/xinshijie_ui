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
      <div>
        <el-divider />
        <el-row>
          <el-col :span="2" class="center">
            <el-row>
              <el-col><el-avatar :size="50" :src="circleUrl" /></el-col>
              <el-col>
                <span   class="demonstration">{{username}}</span>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="22">
            <el-form ref="refComment" :model="commentForm" :rules="rulesComment"  label-width="120px">
              <el-input :disabled="disabled" v-model="commentForm.content" :rows="2" type="textarea" placeholder="请输入评论"/>
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
                    <el-avatar :size="50" :src="comment.circleUrl" />
                  </div>
                </el-col>
                <el-col :span="22">
                  <div >
                    <h3 style="font-weight:bold;">{{ comment.createName }}</h3>
                  </div>
                  <div v-html="comment.comment">
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
              <el-pagination layout="prev, pager, next" :total="1000" />
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {getCurrentInstance, reactive, ref, toRefs} from 'vue'
import { addComment} from "@/api/admin/comment";
import { listComment} from "@/api/wiki/comment";
import {ElMessage} from "element-plus";
import useUserStore from '@/store/modules/user'
import {useRoute} from "vue-router";

const {  appContext : { config: { globalProperties } }  } = getCurrentInstance();
const {  proxy  } = getCurrentInstance();
// 接收url里的参数
const route = useRoute();
//获取用户信息
const userStore = useUserStore()
const circleUrl=ref('')
const disabled=ref(true)

const username=ref('')
console.log("userStore name:"+(userStore.name==''))

const eid = ref(null);
const wid = ref(null);
eid.value = route.query.eid;
wid.value = route.query.wid;
console.log("元素id="+eid.value);
console.log("世界id="+wid.value);
if(userStore.name==''){
  username.value="未登录"
  disabled.value=true;
}else{
  username.value=userStore.name;
  circleUrl.value=userStore.avatar;
  disabled.value=false;
}

console.log("useUserStore:"+JSON.stringify(useUserStore))
console.log("userStore:"+JSON.stringify(userStore))

const commentActive = ref('allComm')
const commentList =[ {
  circleUrl:'',
  date: '2020-05-02',
  createName: 'Tom',
  comment: 'No. 189, Grove St, Los Angeles',
  createTime:"2020-05-02 11:23:09",
},
  {  circleUrl:'',
    date: '2016-05-02',
    createName: 'Tom',
    comment: 'No. 189, Grove St, Los Angeles',
    createTime:"2020-05-02 11:23:09",
  },
  {
    circleUrl:'',
    date: '2016-05-02',
    createName: 'Tom',
    comment: 'No. 189, Grove St, Los Angeles',
    createTime:"2020-05-02 11:23:09",
  },
  {
    circleUrl:'',
    date: '2016-05-02',
    createName: 'Tom',
    comment: 'No. 189, Grove St, Los Angeles',
    createTime:"2020-05-02 11:23:09",
  }
]

const data = reactive({
  commentForm: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    wid: undefined,
    eid: undefined,
    configKey: undefined,
    configType: undefined
  },
  rules: {
    content: [{ required: true, message: "评论不能为空", trigger: "blur" }],
  }
});

const { queryParams, commentForm, rules } = toRefs(data);

function onSubmit(){
  if(!commentForm.value.content){
    ElMessage.error("评论不能为空")
    return;
  }
  if(commentForm.value.content.size>20){
    ElMessage.error("评论不了少于20字")
    return;
  }
  if(wid.value == undefined){
    ElMessage.error("缺少必要参数")
    return;
  }else{
    commentForm.value.wid=wid.value
  }
  if(eid.value == undefined){
    commentForm.value.eid=eid.value
  }
  addComment(commentForm.value).then(response => {
    ElMessage.info("评论成功")
    console.log("评论成功")
  })
}
</script>

<style scoped>
</style>
