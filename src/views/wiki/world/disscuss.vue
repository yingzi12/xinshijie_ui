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
              <el-col><span class="demonstration">未登录</span></el-col>
            </el-row>
          </el-col>
          <el-col :span="22">
            <el-radio-group v-model="radio">
              <el-radio :label="3">Option A</el-radio>
              <el-radio :label="6">Option B</el-radio>
              <el-radio :label="9">Option C</el-radio>
            </el-radio-group>
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
                    <span><BootstrapIcon @click="dialogFormVisible = true" icon="chat-dots" size="1x" flip-v />20 </span>
                    <span><BootstrapIcon icon="hand-thumbs-up" size="1x" flip-v />10</span>
                    <span><BootstrapIcon icon="hand-thumbs-down" size="1x" flip-v />20</span>
                  </div>
                  <div  v-if="!(!comment.reply)" style="margin-left: 50px;background-color: #8c939d;border-style: dotted;width: 40%">
                    <el-table :show-header="false"  :data=" comment.reply" >
                      <el-table-column  label="replyNickname" >
                        <template #default="scope">
<!--                          <div v-if="comment.reply.front" style="background-color: #6b778c">-->
<!--                            <el-tag>{{ scope.row.replyNickname }}</el-tag>:{{ scope.row.front }}-->
<!--                          </div>-->
                          <el-tag>{{ scope.row.nickname }}</el-tag>@<el-tag>{{ scope.row.replyNickname }}</el-tag>:<span>{{ scope.row.content }}</span>
                          <p style="margin: 0px">{{ scope.row.createTime }}<BootstrapIcon @click="dialogFormVisible = true" icon="chat-dots" size="1x" flip-v /></p>
                        </template>
                      </el-table-column>
                    </el-table>
                    <el-button class="mt-4" style="width: 100%" @click="onAddItem">更多</el-button>
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
    <el-dialog v-model="dialogFormVisible" title="Shipping address">
      <el-form :model="form">
        <el-form-item label="Promotion name" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Zones" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="Please select a zone">
            <el-option label="Zone No.1" value="shanghai" />
            <el-option label="Zone No.2" value="beijing" />
          </el-select>
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
</template>

<script lang="ts" setup>
import { reactive,ref } from 'vue'

//弹出框
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const form = reactive({
  name: '',
  region: ''
})
//单选框
const radio = ref(3)
//评论列表
const commentActive = ref('allComm')
const commentList =[ {
  id:1,
  circleUrl:'',
  date: '2020-05-02',
  createName: 'Tom',
  comment: 'No. 189, Grove St, Los Angeles',
  createTime:"2020-05-02 11:23:09",
},
  {
    id:2,
    circleUrl:'',
    date: '2016-05-02',
    createName: 'Tom',
    comment: 'No. 189, Grove St, Los Angeles',
    createTime:"2020-05-02 11:23:09",
    reply:[
      {
        nickname:"test",
        replyNickname:"admin",
        content:"这是一个回复",
        front:"",
        createTime:"2020-05-02 11:23:09",
      },{
        nickname:"test",
        replyNickname:"admin",
        content:"这是一个回复",
        front:"回复第一个回复",
        createTime:"2020-05-02 11:23:09",
      },{
        nickname:"test",
        replyNickname:"admin",
        content:"这是二个回复",
        front:"",
        createTime:"2020-05-02 11:23:09",
      },{
        nickname:"test",
        replyNickname:"admin",
        content:"这是一个回复",
        front:"回复第一个回复",
        createTime:"2020-05-02 11:23:09",
      },{
        nickname:"test",
        replyNickname:"admin",
        content:"这是三个回复",
        front:"回复第二个回复",
        createTime:"2020-05-02 11:23:09",
      }
    ]
  },
  {
    id:3,
    circleUrl:'',
    date: '2016-05-02',
    createName: 'Tom',
    comment: 'No. 189, Grove St, Los Angeles',
    createTime:"2020-05-02 11:23:09",
    reply:[
      {
        nickname:"test",
        replyNickname:"admin",
        content:"这是一个回复",
        front:"",
        createTime:"2020-05-02 11:23:09",
      }
    ]
  },
  {
    id:4,
    circleUrl:'',
    date: '2016-05-02',
    createName: 'Tom',
    comment: 'No. 189, Grove St, Los Angeles',
    createTime:"2020-05-02 11:23:09",
    reply:[
      {
        nickname:"test",
        replyNickname:"admin",
        content:"这是一个回复",
        front:"",
        createTime:"2020-05-02 11:23:09",
      },{
        nickname:"test",
        replyNickname:"admin",
        content:"这是一个回复",
        front:"",
        createTime:"2020-05-02 11:23:09",
      },{
        nickname:"test",
        replyNickname:"admin",
        content:"这是一个回复",
        front:"",
        createTime:"2020-05-02 11:23:09",
      },{
        nickname:"test",
        replyNickname:"admin",
        content:"这是一个回复",
        front:"",
        createTime:"2020-05-02 11:23:09",
      }
    ]
  },
  {
    id:5,
    circleUrl:'',
    date: '2016-05-02',
    createName: 'Tom',
    comment: 'No. 189, Grove St, Los Angeles',
    createTime:"2020-05-02 11:23:09",
    reply:[
      {
        nickname:"test",
        replyNickname:"admin",
        content:"这是一个回复",
        front:"",
        createTime:"2020-05-02 11:23:09",
      }
    ]
  }
]
function onSubmit(){

}
const onAddItem = () => {

}
</script>

<style scoped>
</style>
