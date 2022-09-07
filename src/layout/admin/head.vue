<template>
  <div style="margin:0 auto; width:1248px;">
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
  >
    <el-menu-item disabled><el-image style="width: 100%;height:55px" :src="logo2" fit="fill"></el-image></el-menu-item>
    <el-menu-item index="1" :to="{path:'/wiki/index'}"><span style="font-size: 30px;font-weight:bold;">首页</span></el-menu-item>
    <el-menu-item index="2" :to="{path:'/world/index'}"><span style="font-size: 30px;font-weight:bold;">世界树</span></el-menu-item>
    <el-menu-item index="3" :to="{path:'/users/index'}"><span style="font-size: 30px;font-weight:bold;">家园</span></el-menu-item>
    <el-menu-item index="4" :to="{path:'/wiki/help'}"><span style="font-size: 30px;font-weight:bold;">帮助</span></el-menu-item>
    <div class="flex-grow" />
    <el-button v-if="!isLogin" text style="margin-top: 10px">登录</el-button>
    <el-button v-if="!isLogin"  text style="margin-top: 10px">注册</el-button>
    <el-button v-if="isLogin" link  style="margin-top: 10px" @click="handleUserMessage">{{ props.username }}</el-button>
    <el-button v-if="isLogin" text style="margin-top: 10px">退出</el-button>
  </el-menu>
  </div>
  <el-divider  style="margin:0px"/>
</template>

<script lang="ts" setup>
import {getCurrentInstance, ref} from 'vue'
import logo2 from '@/assets/logo/logo2.png'
import {useRouter} from "vue-router";
const router = useRouter()

const activeIndex = ref('3')
const handleSelect = (key: string, keyPath: string[]) => {
  activeIndex.value=key
  console.log(key, keyPath)
}
const props = defineProps({
  foo: { type: String, required: true },
  bar: Number,
  userid: Number,
  username: String
})
console.log("username"+props.username)
const  isLogin=ref(false)
if(!props.username){
  isLogin.value=false
}else{
  isLogin.value=true
}
function handleUserMessage(){
  router.push("/users/index");
}
</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}
</style>
