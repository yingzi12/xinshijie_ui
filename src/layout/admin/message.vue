<template>
  <el-container class="layout-container-demo" >
    <!--    侧边栏-->
    <el-aside width="250px" style="margin: 10px">
      <div>
        <!--        个人信息-->
        <div class="center" style="margin-bottom: 10px;text-align: center;">
          <el-card :body-style="{ padding: '0px' }">
            <!--  头像-->
            <el-avatar :size="50" :src="user.avatar" />
            <div>
              <h3 style="margin:10px;margin-bottom: 10px;font-size:14px;">{{ user.name }}</h3>
              <p style="margin: 0px;padding: 0px;font-size:10px;">id:{{ user.userId }}</p>
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
        <!--        功栏栏-->
        <div style="margin-top: 10px">
          <el-scrollbar>
            <el-menu   :router="true"
                       default-active="2">
              <el-menu-item index="/admin/index">
                <el-icon><icon-menu /></el-icon>
                <template #title>我的关注</template>
              </el-menu-item>
              <el-menu-item index="/admin/world">
                <el-icon><icon-menu /></el-icon>
                <template #title>世界管理</template>
              </el-menu-item>
              <el-menu-item index="/admin/draft">
                <el-icon><icon-menu /></el-icon>
                <template #title>元素草稿</template>
              </el-menu-item>
              <el-menu-item index="/admin/audit">
                <el-icon><icon-menu /></el-icon>
                <template #title>已发布元素</template>
              </el-menu-item>
              <el-menu-item index="/admin/disscuss">
                <el-icon><icon-menu /></el-icon>
                <template #title>我的讨论</template>
              </el-menu-item>
              <el-menu-item index="/admin/comment">
                <el-icon><icon-menu /></el-icon>
                <template #title>我的评论</template>
              </el-menu-item>
<!--              <el-menu-item index="/admin/message">-->
<!--                <el-icon><icon-menu /></el-icon>-->
<!--                <template #title>我的信息</template>-->
<!--              </el-menu-item>-->


            </el-menu>
          </el-scrollbar>
        </div>
      </div>
    </el-aside>
    <!--    侧边栏-->
    <el-container style="margin: 10px">
      <!--       内容区-->
      <el-main>
        <router-view v-slot="{ Component, route }">
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import {getCurrentInstance, ref} from 'vue'
import {useRoute, useRouter} from "vue-router";
import { Menu as IconMenu,CirclePlus, Message, Setting } from '@element-plus/icons-vue'
const {  appContext : { config: { globalProperties } }  } = getCurrentInstance();
import {  getUser } from "@/api/admin/user";

const {  proxy  } = getCurrentInstance();
//获取用户信息
const user = ref({})

function handleUser(){
  getUser().then(response => {
    user.value=response.data
    console.log(JSON.stringify(user))
  })
}
handleUser();
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
