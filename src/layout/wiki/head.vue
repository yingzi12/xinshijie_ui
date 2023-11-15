<template>
  <div style="margin:0 auto; width:100%;max-width: 1258px;">
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      :router="true"
      @select="handleSelect"
  >
    <el-menu-item disabled><el-image style="width: 100%;height:55px" :src="logo" fit="fill"></el-image></el-menu-item>
    <el-menu-item index="/index" ><span style="font-size: 30px;font-weight:bold;">首页</span></el-menu-item>
    <el-menu-item index="/world/index" ><span style="font-size: 30px;font-weight:bold;">世界</span></el-menu-item>
    <el-menu-item index="/story/index" ><span style="font-size: 30px;font-weight:bold;">故事</span></el-menu-item>
    <el-menu-item index="/user/index" ><span style="font-size: 30px;font-weight:bold;">家园</span></el-menu-item>
    <el-menu-item index="/wiki/help" ><span style="font-size: 30px;font-weight:bold;">帮助</span></el-menu-item>
    <div class="flex-grow" />
    <div>
    <el-button v-if="!isLogin" text style="margin-top: 10px"><router-link :to="{path:'/login'}">登录</router-link></el-button>
      <el-button v-if="!isLogin"  text style="margin-top: 10px"><router-link :to="{path:'/register'}">注册</router-link></el-button>
      <el-button v-if="isLogin" text style="margin-top: 10px">{{ username }}</el-button>
      <el-button v-if="isLogin" text style="margin-top: 10px">管理中心</el-button>
      <el-button v-if="isLogin" text style="margin-top: 10px">退出</el-button>
    </div>
  </el-menu>
  </div>
  <el-divider  style="margin:0px"/>
</template>

<script lang="ts" setup>
import logo from '@/assets/logo/logo.png'
import { ref} from 'vue'
const activeIndex = ref('1')
const handleSelect = (key: string,indexPath:String,keyPath: string[]) => {
  activeIndex.value=key
}
const  isLogin=ref(false)
const props = defineProps({
    foo: { type: String, required: true },
    bar: Number,
    userid: Number,
    username: String
})
if(!props.username){
  isLogin.value=false
}else{
  isLogin.value=true
}

// 第一种写法 没有默认值
// defineProps<Props>();
//
// 第二种写法 有默认值
// withDefaults(defineProps<Props>(), {
//   msg: "子组件默认值",
//   list: () => [1, 2, 3],
// });
</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}
</style>
