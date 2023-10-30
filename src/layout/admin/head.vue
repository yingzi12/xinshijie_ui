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
    <el-menu-item index="/world/index" ><span style="font-size: 30px;font-weight:bold;">世界</span></el-menu-item>
    <el-menu-item index="/story/index" ><span style="font-size: 30px;font-weight:bold;">故事</span></el-menu-item>
    <el-menu-item index="/wiki/help" ><span style="font-size: 30px;font-weight:bold;">帮助</span></el-menu-item>
    <div class="flex-grow" />
    <div>
    <el-button v-if="!isLogin" text style="margin-top: 10px" @click="handleLogin">登录</el-button>
    <el-button v-if="!isLogin"  text style="margin-top: 10px" @click="handleRegister">注册</el-button>
    <el-button v-if="isLogin" link  style="margin-top: 10px" @click="handleUserMessage">{{ userStore.name }}</el-button>
    <el-button v-if="isLogin" text style="margin-top: 10px" @click="logout()">退出</el-button>
    </div>
  </el-menu>
  </div>
  <el-divider  style="margin:0px"/>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import logo2 from '@/assets/logo/logo2.png'
import {useRouter} from "vue-router";
import useUserStore from '@/store/modules/user'
import {ElMessageBox} from "element-plus";
const router = useRouter()
const userStore = useUserStore()

const activeIndex = ref('3')
const handleSelect = (key: string, keyPath: string[]) => {
  activeIndex.value=key
  // console.log(key, keyPath)
}
const props = defineProps({
  foo: { type: String, required: true },
  bar: Number,
  userid: Number,
  username: String
})
const  isLogin=ref(false)
if(!props.username){
  isLogin.value=false
}else{
  isLogin.value=true
}

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
function handleLogin(){
  router.push("/login");
}
function handleRegister(){
  router.push("/register");
}
</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}
</style>
