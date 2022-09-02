<template>
  <div class="app-container">
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/world/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/world/list">世界树</a></el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/world/details', query: {wid:wid} }">{{world.name}}</el-breadcrumb-item>
        <el-breadcrumb-item>世界列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <!--    评论区-->
      <div>
        <el-divider />
        <div class="center">
           <span style="font-size:30px;">舰队</span>
        </div>
        <div style="margin-bottom: 10px;margin-top: 10px">
          你可以在这里发起和回复与元素有关的讨论。指出词条的错误点、缺失，请选择“编辑讨论”，以便问题快速解决；发布对词条主体的观点、见解，请选择“开放讨论”，以便收获更多互动。请理智、和谐讨论，遵守科星球社区规范。请勿发表过激/不实/不友善言论，不符合规范的内容会被删除。
        </div>
        <div style="margin: 0px;padding: 0px">
          <span style="font-size:15px;">发布主题</span><span style="font-size:10px;">文明上网理性发言，请遵守评论服务协议</span>
        </div>
        <el-divider  style="margin: 0px"/>
        <el-row>
          <el-col :span="3" class="center">
            <el-row>
              <el-col><el-avatar :size="50" :src="circleUrl" /></el-col>
              <el-col><span class="demonstration">未登录</span></el-col>
            </el-row>
          </el-col>
          <el-col :span="21">
            <el-radio-group v-model="radio">
              <el-radio :label="1">内容错误</el-radio>
              <el-radio :label="2">内容争议</el-radio>
              <el-radio :label="3">添加内容</el-radio>
              <el-radio :label="4">内容讨论</el-radio>
              <el-radio :label="5">建议</el-radio>
              <el-radio :label="6">其他</el-radio>
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
          <el-tab-pane label="全部讨论" name="allComm">
            <div v-for="discuss in discussList">
              <el-row>
                <el-col :span="2">
                    <!--              头像-->
                    <p style="margin: 0px;padding: 0px"><el-avatar :size="50" :src="discuss.circleUrl" /></p>
                    <p style="font-weight:bold;margin: 0px;padding: 0px;">{{ discuss.createName }}</p>
                </el-col>
                <el-col :span="22">
                  <div >
                    <span style="font-weight:bold;font-size:15px;">{{ discuss.title }}</span>
                    <el-tag>{{ discuss.typesName }}</el-tag>
                    <el-tag>{{ discuss.status }}</el-tag>
                  </div>
                  <div v-html="discuss.comment">
                  </div>
                  <div style="color:#A3A6AD">
                    <span>{{ discuss.createTime }}</span>
                    <span><BootstrapIcon @click="dialogFormVisible = true" icon="chat-dots" size="1x" flip-v />20 </span>
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
const discussList =[ {
  id:1,
  circleUrl:'',
  date: '2020-05-02',
  createName: 'Tom',
  status:"已处理",
  typesName:"其他",
  title:'标题，比什么都重要',
  comment: 'No. 189, Grove St, Los Angeles',
  createTime:"2020-05-02 11:23:09",
},
  {
    id:2,
    circleUrl:'',
    typesName:"其他",
    status:"讨论中",
    date: '2016-05-02',
    createName: 'Tom jaknecs',
    title:'标题，比什么都重要',
    comment: 'No. 189, Grove St, Los Angeles',
    createTime:"2020-05-02 11:23:09",

  },
  {
    id:3,
    circleUrl:'',
    date: '2016-05-02',
    createName: 'harry dejafwae',
    status:"已处理",
    typesName:"其他",
    title:'标题，比什么都重要',
    comment: 'No. 189, Grove St, Los Angeles',
    createTime:"2020-05-02 11:23:09",
  },
  {
    id:4,
    circleUrl:'',
    date: '2016-05-02',
    status:"讨论中",
    createName: '哈哈哈哈 一个按',
    typesName:"其他",
    title:'标题，比什么都重要',
    comment: 'No. 189, Grove St, Los Angeles',
    createTime:"2020-05-02 11:23:09",
  },
  {
    id:5,
    circleUrl:'',
    status:"讨论中",
    date: '2016-05-02',
    createName: 'Tom',
    typesName:"其他",
    title:'标题，比什么都重要',
    comment: 'No. 189, Grove St, Los Angeles',
    createTime:"2020-05-02 11:23:09",
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
