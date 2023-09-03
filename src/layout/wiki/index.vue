<template>
  <div style="margin:0 auto; width:1248px;">
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        :router="true"
        @select="handleSelect"
    >
      <el-menu-item disabled><el-image style="width: 100%;height:55px" :src="logo2" fit="fill"></el-image></el-menu-item>
      <el-menu-item index="/index" ><span style="font-size: 30px;font-weight:bold;">首页</span></el-menu-item>
      <el-menu-item index="/world/index" ><span style="font-size: 30px;font-weight:bold;">世界树</span></el-menu-item>
      <el-menu-item index="/user/index" ><span style="font-size: 30px;font-weight:bold;">家园</span></el-menu-item>
      <el-menu-item index="/wiki/help" ><span style="font-size: 30px;font-weight:bold;">帮助</span></el-menu-item>
      <div class="flex-grow" />
      <el-button v-if="!isLogin" text style="margin-top: 10px" @click="handleLogin">登录</el-button>
      <el-button v-if="!isLogin"  text style="margin-top: 10px" @click="handleRegister">注册</el-button>
      <el-button v-if="isLogin" link  style="margin-top: 10px" @click="handleUserMessage">{{ userStore.name }}</el-button>
      <el-button v-if="isLogin" link  style="margin-top: 10px" @click="handleWorldMessage">管理中心</el-button>
      <el-button v-if="isLogin" text style="margin-top: 10px" @click="logout()">退出</el-button>
    </el-menu>
  </div>
  <el-divider  style="margin:0px"/>
  <section class="app-main" style="width: 1250px">
    <el-alert title="系统测试中" type="warning" effect="dark" />
    <router-view v-slot="{ Component, route }">
    </router-view>
  </section>
  <wiki-footer/>
</template>

<script lang="ts" setup name="LayoutWiki">
import WikiFooter from './footer'
import { useWindowSize } from '@vueuse/core'
import {ElMessageBox} from "element-plus";
import {useRoute, useRouter} from "vue-router";
import useUserStore from '@/store/modules/user'
import logo2 from '@/assets/logo/logo2.png'
import {ref} from "vue";
const userStore = useUserStore()
const router = useRouter()


const  isLogin=ref(false)
if(!userStore.name){
  isLogin.value=false
}else{
  isLogin.value=true
}
const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  activeIndex.value=key
}
const { width, height } = useWindowSize();
const WIDTH = 992; // refer to Bootstrap's responsive design

// const tagsViewStore = useTagsViewStore()
const route = useRoute()
// tagsViewStore.addCachedView(route)

function logout() {
  ElMessageBox.confirm('确定注销并退出系统吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    userStore.logOut().then(() => {
      location.href = '/index';
    })
  }).catch(() => { });
}

const emits = defineEmits(['setLayout'])
function setLayout() {
  emits('setLayout');
}
function handleUserMessage(){
  router.push("/user/index");
}
function handleWorldMessage(){
  router.push("/admin/index");
}
function handleLogin(){
  router.push("/login");
}
function handleRegister(){
  router.push("/register");
}
</script>

<style scoped>
.app-main{ margin:0 auto; width:1250px;}
.flex-grow {
  flex-grow: 1;
}
</style>
