<template>
  <el-alert v-if="user.isEmail != 1 " title="安全邮箱未验证,将无法使用找回密码功能" type="warning" />
  <div>
    <el-menu
        :default-active="1"
        mode="horizontal"
        style="margin:0px;pardding:0px"
    >
      <el-menu-item index="1"><span style="font-size: 20px;font-weight:bold;">基础详细</span></el-menu-item>
    </el-menu>
  </div>
  <el-avatar v-if="imageUrl" :size="50" :src="imageUrl" />
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
        {{ user.phonenumber }}
      </el-descriptions-item>
      <el-descriptions-item width="100px">
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <email />
            </el-icon>
            邮箱<el-tag v-if="user.isEmail == 1" type="success">（已验证）</el-tag>
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
  <el-descriptions
      class="margin-top"
      title="安全"
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
          最后登录IP
        </div>
      </template>
      {{ user.loginIp }}
    </el-descriptions-item>
    <el-descriptions-item width="100px">
      <template #label>
        <div class="cell-item">
          最后登录时间
        </div>
      </template>
      {{ user.loginDate }}
    </el-descriptions-item>
  </el-descriptions>

</template>

<script lang="ts" setup>
import { inject, ref} from 'vue'
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'
import {  getUser } from "@/api/admin/user";
import {useRouter} from "vue-router";


//获取用户信息
const user = ref({})
const router = useRouter()
const imgUrl = inject("$imgUrl")

const imageUrl=ref('')
function handleUser(){
  getUser().then(response => {
    user.value=response.data
    imageUrl.value=imgUrl+response.data.avatar;
    //console.log(JSON.stringify(user))
  })
}
handleUser();
</script>

<style scoped>

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}


</style>
