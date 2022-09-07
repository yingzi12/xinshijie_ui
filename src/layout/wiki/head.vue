<template>
  <div style="margin:0 auto; width:1248px;">
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
  >
    <el-menu-item disabled>LOGO</el-menu-item>
    <el-menu-item index="1" :to="{path:'/wiki/index'}"><span style="font-size: 30px;font-weight:bold;">首页</span></el-menu-item>
    <el-menu-item index="2" :to="{path:'/world/index'}"><span style="font-size: 30px;font-weight:bold;">世界树</span></el-menu-item>
    <el-menu-item index="3" :to="{path:'/users/index'}"><span style="font-size: 30px;font-weight:bold;">家园</span></el-menu-item>
    <el-menu-item index="4" :to="{path:'/wiki/help'}"><span style="font-size: 30px;font-weight:bold;">帮助</span></el-menu-item>
    <div class="flex-grow" />
      <el-button v-if="!isLogin" text style="margin-top: 10px">登录</el-button>
      <el-button v-if="!isLogin"  text style="margin-top: 10px">注册</el-button>
      <el-button v-if="isLogin" text style="margin-top: 10px">{{ username }}</el-button>
      <el-button v-if="isLogin" text style="margin-top: 10px">退出</el-button>
  </el-menu>
  </div>
  <el-divider  style="margin:0px"/>
</template>

<script lang="ts" setup>
import {getCurrentInstance, ref} from 'vue'
const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  activeIndex.value=key
  console.log(key, keyPath)
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
console.log("isLogin"+isLogin.value)
console.log("username"+props.username)

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
