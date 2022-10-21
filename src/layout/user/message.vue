<template>
  <el-container class="layout-container-demo" >
    <!--    侧边栏-->
    <el-aside width="250px" style="margin: 10px">
      <div>
        <!--        个人信息-->
        <div class="center" style="text-align: center;">
          <el-card :body-style="{ padding: '0px' ,width: '202px'}">
            <!--  头像-->
            <el-avatar :size="50" :src="imageUrl" />
            <div>
              <h3 style="margin:10px;margin-bottom: 10px;font-size:14px;">{{ user.userName }}({{ user.nickName }})</h3>
              <p style="margin: 0px;padding: 0px;font-size:10px;">id:{{ user.userId }}</p>
              <div class="bottom" >
                <p style="margin: 0px;padding: 0px;font-size:10px;line-height:120%;">{{user.sign}}</p>
                <div class="demo-count">
                  <div  class="block">
                    <span class="demonstration">0</span>
                    <span class="demonstration">世界</span>
                  </div>
                  <div  class="block">
                    <span class="demonstration">0</span>
                    <span class="demonstration">粉丝</span>
                  </div>
                  <div  class="block">
                    <span class="demonstration">0</span>
                    <span class="demonstration">关注</span>
                  </div>
                </div>
                <el-button text class="button" @click="handleAdmin">管理中心</el-button>
              </div>
            </div>
          </el-card>
        </div>
        <!--        功栏栏-->
        <div style="margin-top: 10px">
          <el-scrollbar>
            <el-menu   :router="true"
                       default-active="2">
              <el-menu-item index="/user/index">
                <el-icon><icon-menu /></el-icon>
                <template #title>基础信息</template>
              </el-menu-item>
              <el-menu-item index="/user/edit">
                <el-icon><icon-menu /></el-icon>
                <template #title>信息修改</template>
              </el-menu-item>
              <el-menu-item index="/user/password">
                <el-icon><icon-menu /></el-icon>
                <template #title>修改密码</template>
              </el-menu-item>
              <el-menu-item index="/user/email">
                <el-icon><icon-menu /></el-icon>
                <template #title>邮箱验证</template>
              </el-menu-item>
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
import {getCurrentInstance, inject, ref} from 'vue'
import { useRouter} from "vue-router";
import { Menu as IconMenu } from '@element-plus/icons-vue'
const {  appContext : { config: { globalProperties } }  } = getCurrentInstance();
import {  getUser } from "@/api/admin/user";

const {  proxy  } = getCurrentInstance();
//获取用户信息
const user = ref({})
const router = useRouter()
const baseUrl = inject("$baseUrl")
const imgUrl = inject("$imgUrl")

const imageUrl=ref('')

function handleUser(){
  getUser().then(response => {
    user.value=response.data
    imageUrl.value=imgUrl+response.data.avatar;
  })
}
function handleAdmin(){
  router.push("/admin/index");
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
