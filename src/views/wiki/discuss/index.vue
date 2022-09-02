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
              <div><el-tag>#{{discuss.elementName}}#</el-tag></div>
              <div>
                <span style="font-weight:bold;font-size:15px;">{{ discuss.title }}</span>
                <el-tag>{{ discuss.typesName }}</el-tag>
                <el-tag>{{ discuss.status }}</el-tag>
              </div>
              <div>
                <p>{{discuss.comment}}</p>
              </div>
              <div style="color:#A3A6AD">
                <span>{{ discuss.createTime }}</span>
                <span><BootstrapIcon @click="dialogFormVisible = true" icon="chat-dots" size="1x" flip-v />20 </span>
                <span><BootstrapIcon icon="hand-thumbs-up" size="1x" flip-v />10</span>
                <span><BootstrapIcon icon="hand-thumbs-down" size="1x" flip-v />20</span>
              </div>
            </el-col>
          </el-row>
        </div>
        <div>
          <el-form :model="form" label-width="120px">
            <el-row>
              <el-col :span="20" class="center">
                <el-input
                    v-model="textarea"
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
        <div style="background-color: #009926">
            <p>已经处理，同意该意见，关闭讨论</p>
          <p>2022-11-11 02:23:01</p>
        </div>
        <el-tabs v-model="commentActive"  >
          <el-tab-pane label="全部评论" name="allComm">
            <div v-for="comment in commentList">
              <el-row>
                <el-col :span="2" class="center">
<!--                  <div  class="center">-->
                    <!--              头像-->
                    <el-avatar :size="50" :src="comment.circleUrl" />
<!--                  </div>-->
                </el-col>
                <el-col :span="22">
                  <div >
                    <h3 style="font-weight:bold;margin: 5px">{{ comment.createName }}</h3>
                  </div>
                  <div v-html="comment.comment">
                  </div>
                  <div style="color:#A3A6AD">
                    <span>{{ comment.createTime }}</span>
                    <span><BootstrapIcon @click="dialogFormVisible = true" icon="chat-dots" size="1x" flip-v />20 </span>
                    <span><BootstrapIcon icon="hand-thumbs-up" size="1x" flip-v />10</span>
                    <span><BootstrapIcon icon="hand-thumbs-down" size="1x" flip-v />20</span>
                  </div>
                </el-col>
              </el-row>
              <div  style="margin-left: 150px;background-color: #8c939d;border-style: dotted;width: 40%">
                <div v-if="comment.comHide">
                  <el-avatar :size="20" :src="circleUrl" /><el-input style="width:80%"></el-input>
                </div>
                <div v-if="comment.replyHide">
                  <el-table  :show-header="false"  :data=" comment.reply" >
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
              </div>
              <el-divider style="margin: 0px;padding: 0px"/>
            </div>
            <div class="center">
              <el-pagination layout="prev, pager, next" :total="1000" />
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
  </div>
</template>

<script lang="ts" setup>
import { reactive,ref } from 'vue'

//世界信息
const world=ref({})
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

const discuss ={
  id: 1,
  circleUrl: '',
  elementName:"世界树",
  createName: 'Tom',
  status: "已处理",
  isEdit:0,
  typesName: "其他",
  title: '标题，比什么都重要',
  comment: 'No. 189, Grove St, Los Angeles',
  createTime: "2020-05-02 11:23:09",
}
const commentList =[ {
  id:1,
  circleUrl:'',
  date: '2020-05-02',
  createName: 'Tom',
  comment: 'No. 189, Grove St, Los Angeles',
  createTime:"2020-05-02 11:23:09",
  replyHide:false,
  comHide:false,

},
  {
    id:2,
    circleUrl:'',
    date: '2016-05-02',
    createName: 'Tom',
    comment: 'No. 189, Grove St, Los Angeles',
    createTime:"2020-05-02 11:23:09",
    replyHide:true,
    comHide:true,
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
    replyHide:true,
    comHide:true,
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
    comHide:true,
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
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
