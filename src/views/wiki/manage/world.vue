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
            <el-menu-item index="1">关注的世界</el-menu-item>
<!--            <el-menu-item index="2">关注的故事</el-menu-item>-->
          </el-menu>
        </div>
        <!--        多选-->
        <div style="padding: 10px">
          <el-space wrap>
            <div v-for="i in 9" :key="i">
              <el-button text> Text{{i}} </el-button>
            </div>
          </el-space>
        </div>
        <!--        统计-->
        <div style="background-color:#b0c4de;margin: auto;padding: 10px">
          <el-row>
            <el-col  :span="4">
              合计(65)
            </el-col >
            <el-col :span="20"  style="text-align: right;">
              <div style="text-align: right; font-size: 12px" class="toolbar">
                <el-dropdown>
                  <el-icon style="margin-right: 8px; margin-top: 1px"><setting/></el-icon>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item>View</el-dropdown-item>
                      <el-dropdown-item>Add</el-dropdown-item>
                      <el-dropdown-item>Delete</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
                <span>Tom</span>
              </div>
            </el-col>
          </el-row>
        </div>
        <!--        表格-->
        <div>
          <el-scrollbar>
            <el-table :data="tableData">
              <el-table-column label="序号" >
                <template #default="scope">
                  {{scope.$index+1}}
                </template>
              </el-table-column>
              <el-table-column prop="date" label="Date" width="140" />
              <el-table-column prop="name" label="Name" width="120" />
              <el-table-column prop="address" label="Address" />
              <el-table-column fixed="right" label="Operations" width="220">
                <template #default>
                  <el-button link type="primary" size="small" @click="handleClick">创建分类</el-button>
                  <el-button link type="primary" size="small" @click="handleClick">创建元素</el-button>
                  <el-button link type="primary" size="small" @click="handleClick">Detail</el-button>
                  <el-button link type="primary" size="small">Edit</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-scrollbar>
        </div>
        <!--        分页-->
        <div style="float:right; ">
          <el-pagination  layout="prev, pager, next" :total="50" />
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
