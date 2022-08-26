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
import { ref } from 'vue'
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

function onSubmit(){

}
</script>

<style scoped>
</style>
