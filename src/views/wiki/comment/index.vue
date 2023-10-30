<template>
  <!--  内容区-->
  <div class="app-container">
    <!--标题-->
    <div>
      <el-row>
        <el-col :span="2">
          <el-row>
            <el-col><el-tag></el-tag></el-col>
            <el-col><el-avatar :size="50" :src="circleUrl" /></el-col>
          </el-row>
        </el-col>
        <el-col :span="22">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span># 我觉得呀,这个问题不能这样说! #</span>
              </div>
            </template>
            <div>
              <span>windlse </span> <time class="time">2022-07-09 11:22:43</time>
              <h1>相关元素: </h1><h1>极兔速递</h1>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div>
      <p>
        我觉得现在很多年轻人也挺勇敢的呀，敢于创新和改变我觉得现在很多年轻人也挺勇敢的呀，
        敢于创新和改变我觉得现在很多年轻人也挺勇敢的呀，敢于创新和改变我觉得现在很多年轻人也挺勇敢的呀，
        敢于创新和改变我觉得现在很多年轻人也挺勇敢的呀，敢于创新和改变我觉得现在很多年轻人也挺勇敢的呀，
        敢于创新和改变我觉得现在很多年轻人也挺勇敢的呀，敢于创新和改变
      </p>
    </div>
    <!--    发布评论-->
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
                disabled
            />
            <el-button type="primary" @click="onSubmit">发布评论</el-button>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <!--    评论列表-->
    <div>
      <el-tabs v-model="activeName"  >
        <el-tab-pane label="全部评论" name="first">
          <div v-for="n in 3">
            <el-row>
              <el-col :span="2">
                <div  class="center">
                  <!--              头像-->
                  <el-avatar :size="50" :src="circleUrl" />
                </div>
              </el-col>
              <el-col :span="22">
                <div >
                  <h3 style="font-weight:bold;">widnws</h3>
                </div>
                <div>
                  <p>在一步步完善作品细节、完成展示的过程中真的收获很多。最后希望大家喜欢我的作品，欢迎交流！</p>
                </div>
                <div style="color:#A3A6AD">
                  <span>2022-11-11 11:11:23</span>
                  <span><BootstrapIcon icon="chat-dots" size="1x" flip-v />20 </span>
                  <span><BootstrapIcon icon="hand-thumbs-up" size="1x" flip-v />10</span>
                  <span><BootstrapIcon icon="hand-thumbs-down" size="1x" flip-v />20</span>
                </div>
                <div style="color:#A3A6AD;margin-left: 50px">
                    <div v-for="j in 3">
                        <div>
                           <el-tag>Harry</el-tag>: 回复<el-tag>@Windir:</el-tag> <span> 那必须的人</span>
                           <p>2021-11-12 12:12:34</p>
                        </div>
                    </div>
                </div>
              </el-col>
            </el-row>
            <el-divider />
          </div>
<!--          回复评论-->
          <div>
            <el-row>
              <el-col :span="2">
                <div  class="center">
                  <!--              头像-->
                  <el-avatar :size="50" :src="circleUrl" />
                </div>
              </el-col>
              <el-col :span="22">
                <div >
                  <h3 style="font-weight:bold;">widnws</h3>
                </div>
                <div>
                  <p>在一步步完善作品细节、完成展示的过程中真的收获很多。最后希望大家喜欢我的作品，欢迎交流！</p>
                </div>
                <div style="color:#A3A6AD">
                  <span>2022-11-11 11:11:23</span>
                  <span><BootstrapIcon icon="chat-dots" @click="checkPopup(11,true)" size="1x" flip-v />20 </span>
                  <span><BootstrapIcon icon="hand-thumbs-up" size="1x" flip-v />10</span>
                  <span><BootstrapIcon icon="hand-thumbs-down" size="1x" flip-v />20</span>
                </div>
                <div style="color:#A3A6AD;margin-left: 50px">
                  <div>
                    <div>
                      <el-tag>Harry</el-tag>: 回复<el-tag>@Windir:</el-tag> <span> 那必须的人</span>
                      <p>2021-11-12 12:12:34</p>
                    </div>
                  </div>
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

  <el-dialog v-model="dialogFormVisible" title="参与/回复">
    <div>
      <p>在一步步完善作品细节、完成展示的过程中真的收获很多。最后希望大家喜欢我的作品，欢迎交流！</p>
    </div>
    <div>
    <el-form :model="form">
      <el-form-item label="回复" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
    </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue'
//接受参数
import { useRoute }  from "vue-router";  // 引用vue-router
import type { TabsPaneContext } from 'element-plus'

const activeName = ref('first')

//弹出框
const dialogFormVisible = ref(false)

//
const checkPopup=(id:number,popup:boolean) => {
  dialogFormVisible.value=true
}


const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})

const handleClick = (tab: TabsPaneContext, event: Event) => {
  //console.log(tab, event)
}
</script>

<style scoped>
*{
  margin: 0px;
  margin-top: 5px;
  padding: 0px;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
