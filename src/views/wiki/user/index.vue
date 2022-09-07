<template>
  <div>
    <el-menu
        :default-active="1"
        mode="horizontal"
        style="margin:0px;pardding:0px"
    >
      <el-menu-item index="1" :to="{path:'/users/index'}"><span style="font-size: 20px;font-weight:bold;">基础详细</span></el-menu-item>
    </el-menu>
  </div>
  <el-descriptions
        class="margin-top"
        title="基础"
        :column="2"
        :size="large"
        border
    >
      <el-descriptions-item width="100px">
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <user />
            </el-icon>
            用户名称
          </div>
        </template>
        {{ user.userName }}
      </el-descriptions-item>
    <el-descriptions-item width="100px">
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <user />
          </el-icon>
          用户昵称
        </div>
      </template>
      {{ user.nickName }}
    </el-descriptions-item>
      <el-descriptions-item width="100px">
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <iphone />
            </el-icon>
            手机号码
          </div>
        </template>
        {{ user.telephone }}
      </el-descriptions-item>
      <el-descriptions-item width="100px">
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <email />
            </el-icon>
            邮箱
          </div>
        </template>
        {{ user.email }}
      </el-descriptions-item>
      <el-descriptions-item width="100px">
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <office-building />
            </el-icon>
            签名
          </div>
        </template>
        {{user.sign}}
      </el-descriptions-item>
    </el-descriptions>


  <el-descriptions
      class="margin-top"
      title="其他"
      :column="5"
      :size="large"
      border
  >
    <el-descriptions-item width="100px">
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <user />
          </el-icon>
          等级
        </div>
      </template>
      {{ user.ranks }}
    </el-descriptions-item>
    <el-descriptions-item width="100px">
      <template #label>
        <div class="cell-item">
          经验
        </div>
      </template>
      {{ user.exp }}
    </el-descriptions-item>
    <el-descriptions-item width="100px">
      <template #label>
        <div class="cell-item">
          世界数
        </div>
      </template>
      {{ user.countWorld }}
    </el-descriptions-item>
    <el-descriptions-item width="100px">
      <template #label>
        <div class="cell-item">
          元素数
        </div>
      </template>
      {{ user.countElement }}
    </el-descriptions-item>
    <el-descriptions-item width="100px">
      <template #label>
        <div class="cell-item">
          讨论数
        </div>
      </template>
      {{user.countDiscuss}}
    </el-descriptions-item>
  </el-descriptions>
</template>

<script lang="ts" setup>
import {getCurrentInstance, ref} from 'vue'
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'
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
