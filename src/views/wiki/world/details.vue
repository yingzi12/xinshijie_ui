<template>
  <div class="app-container">
    <!--  内容区-->
    <div>
      <div>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">promotion management</a></el-breadcrumb-item>
          <el-breadcrumb-item>promotion list</el-breadcrumb-item>
          <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div  style="margin: 15px">
        <el-row>
          <el-col :span="4" class="center">
            <el-image  style="width: 150px; height: 200px;  display: block;margin: 0 auto;" :src="url" :fit="fit" />
          </el-col>
          <el-col :span="16">
            <div>
              <div>
                <h1 style="margin: 2px">测试</h1>
              </div>
              <div style="margin-top: 5px">
                <el-space wrap>
                  <div v-for="i in 6" :key="i">
                    <el-tag size="small" type="success">Tag 2</el-tag>
                  </div>
                </el-space>
              </div>
              <div style="margin-top: 5px">
                <span style="font-size:10px;color: #525457">更新时间:2020-11-11 11:22:43</span><el-tag style="font-size:10px;">银河舰队</el-tag>
              </div>
              <div style="margin-top: 2px">
                <p style="margin-top: 5px">2020年，画满了2本手绘本，用完了3管白颜料，数不清设计了多少稿。来到新年之交，将一年的作品整理打包，才发现，每一G文件都是这一年熬过的夜，加过的班；每一份飞机稿，都是这一年打过的小怪，升过的级。发布你的2020年度作品合</p>
              </div>
              <div style="margin-top: 2px;color:#A3A6AD">
                <span><BootstrapIcon icon="chat-dots" size="1x" flip-v />20</span>
                <span><BootstrapIcon icon="pencil-square" size="1x" flip-v />20</span>
                <span><BootstrapIcon icon="hand-thumbs-up" size="1x" flip-v />10</span>
                <span><BootstrapIcon icon="hand-thumbs-down" size="1x" flip-v />20</span>
              </div>
              <div style="margin-top: 2px">
                <el-button type="primary">Primary</el-button>
                <el-button type="primary">Primary</el-button>
                <el-button type="primary">Primary</el-button>
                <el-button type="primary">Primary</el-button>
              </div>
            </div>
          </el-col>
          <el-col :span="4">
          </el-col>
        </el-row>
      </div>
    </div>
    <!--    简介区-->
    <div>
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="简介" name="first">
          <div>
            <span>Consistent with real life: in line with the process and logic of real
          life, and comply with languages and habits that the users are used to;</span>
            Consistent within interface: all elements should be consistent, such
            <span> as: design style, icons and texts, position of elements, etc.
          Consistent with real life: in line with the process and logic of real
          life, and comply with languages and habits that the users are used to;</span>
            <span> Consistent within interface: all elements should be consistent, such
          as: design style, icons and texts, position of elements, etc.
          Consistent with real life: in line with the process and logic of real</span>
            <span>life, and comply with languages and habits that the users are used to;
          Consistent within interface: all elements should be consistent, such</span>
            <span> as: design style, icons and texts, position of elements, etc.</span>
          </div>
        </el-tab-pane>
        <el-tab-pane label="元素" name="second">Config</el-tab-pane>
        <el-tab-pane label="造物主" name="third">
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="date" label="Date" width="180" />
            <el-table-column prop="name" label="Name" width="180" />
            <el-table-column prop="address" label="Address" />
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
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
              disabled
          />
            <el-button type="primary" @click="onSubmit">发布评论</el-button>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <!--    已经发布的的评论-->
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
</template>

<script lang="ts" setup name="Details">
import { ref } from 'vue'
//接受参数
import { useRoute }  from "vue-router";  // 引用vue-router
import type { TabsPaneContext } from 'element-plus'
import useUserStore from '@/store/modules/user'


// 接收url里的参数
const route = useRoute();
console.log(route.query.id,"参数");
const id = route.query.id
console.log("世界id="+id);
const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
const onSubmit = () => {
  console.log('submit!')
}
const url =
    'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
//管理员
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
const name= useUserStore().name
const token= useUserStore().token

console.log(name)
console.log(token)

const textarea = ref('')

</script>

<style scoped>
*{
  margin: 0px;
  margin-top: 5px;
  padding: 0px;
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
