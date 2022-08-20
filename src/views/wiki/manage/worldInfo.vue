<template>
  <el-container class="layout-container-demo" >
    <!--    侧边栏-->
    <el-aside width="250px" style="margin: 10px">
      <div>
        <!--        个人信息-->
        <div class="center" style="margin-bottom: 10px;text-align: center;">
          <el-card :body-style="{ padding: '0px' }">
            <!--  头像-->
            <el-avatar :size="50" :src="circleUrl" />
            <div>
              <h3 style="margin:10px;margin-bottom: 10px;font-size:14px;">Yumnumkl</h3>
              <p style="margin: 0px;padding: 0px;font-size:10px;">id:111111</p>
              <div class="bottom" >
                <p style="margin: 0px;padding: 0px;font-size:10px;line-height:120%;">这是一个签名,表达自己的想法用的,没什么实际的意义</p>
                <div class="demo-count">
                  <div  class="block">
                    <span class="demonstration">4</span>
                    <span class="demonstration">世界</span>
                  </div>
                  <div  class="block">
                    <span class="demonstration">4440000</span>
                    <span class="demonstration">粉丝</span>
                  </div>
                  <div  class="block">
                    <span class="demonstration">433</span>
                    <span class="demonstration">关注</span>
                  </div>
                </div>
                <el-button text class="button">用户中心</el-button>
              </div>
            </div>
          </el-card>
        </div>
        <!--        分类-->
        <div style="margin-top: 10px">
          <el-scrollbar>
            <el-menu :default-openeds="['1', '3']">
              <el-sub-menu index="1">
                <template #title>
                  <el-icon><message /></el-icon>我的关注
                </template>
              </el-sub-menu>
              <el-sub-menu index="2">
                <template #title>
                  <el-icon><icon-menu /></el-icon>世界管理
                </template>
              </el-sub-menu>
              <el-sub-menu index="3">
                <template #title>
                  <el-icon><setting /></el-icon>元素草稿
                </template>
              </el-sub-menu>
              <el-sub-menu index="4">
                <template #title>
                  <el-icon><setting /></el-icon>我的评论
                </template>
              </el-sub-menu>
              <el-sub-menu index="5">
                <template #title>
                  <el-icon><setting /></el-icon>我的信息
                </template>
              </el-sub-menu>
            </el-menu>
          </el-scrollbar>
        </div>
      </div>
    </el-aside>
    <!--    表格-->
    <el-container style="margin: 10px">
      <!--       内容区-->
      <el-main>
        <div>
          <el-menu
              :default-active="activeIndex"
              mode="horizontal"
              @select="handleSelect"
              style="margin:0px;pardding:0px"
          >
            <el-menu-item index="1">帝国崛起</el-menu-item>
          </el-menu>
        </div>
        <!--        多选-->
        <div style="padding: 10px">
          <el-space wrap>
              <el-button text> 简介 </el-button>
              <el-button text type="primary"> 造物主列表 </el-button>
              <el-button text> 元素列表 </el-button>
              <el-button text> 元素分类 </el-button>
              <el-button text> 元素审核 </el-button>
              <el-button text> 居民管理 </el-button>
              <el-button text> 评论管理 </el-button>
              <el-button text> 讨论管理 </el-button>
          </el-space>
        </div>
        <!--   内容区-->
        <div style="  border-style: solid; border-width: 1px;border-color:#CFD3DC">
          <div  style="margin: 15px">
            <el-row>
              <el-col :span="4" class="center">
                <el-image  style="width: 150px; height: 200px;  display: block;margin: 0 auto;" :src="url" :fit="fit" />
              </el-col>
              <el-col :span="20">
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
                  <div style="margin-top: 2px">
                    <p style="margin-top: 5px">2020年，画满了2本手绘本，用完了3管白颜料，数不清设计了多少稿。来到新年之交，将一年的作品整理打包，才发现，每一G文件都是这一年熬过的夜，加过的班；每一份飞机稿，都是这一年打过的小怪，升过的级。发布你的2020年度作品合</p>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
          <!--    简介区-->
          <div>
            <h1 style=" padding: 0px;margin: 0px">简介</h1>
            <el-divider  style="padding: 0px;margin: 0px"/>
          </div>
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
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'
const fits = ['世界', '粉丝', '关注']
const activeIndex = ref('1')

const item = {
  date: '2016-05-02',
  name: 'Tom',
  address: 'No. 189, Grove St, Los Angeles',
}
const tableData = ref(Array.from({ length: 20 }).fill(item))
</script>

<style scoped>
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.demo-count .block {
  padding: 0px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  display: inline-block;
  width: 33%;
  box-sizing: border-box;
  vertical-align: top;
}
.demo-count .block:last-child {
  border-right: none;
}
.demo-count .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 9px;
  margin-bottom: 0px;
}
</style>
