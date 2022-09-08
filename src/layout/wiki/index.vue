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
      <el-menu-item index="/wiki/index" ><span style="font-size: 30px;font-weight:bold;">首页</span></el-menu-item>
      <el-menu-item index="/world/index" ><span style="font-size: 30px;font-weight:bold;">世界树</span></el-menu-item>
      <el-menu-item index="/user/index" ><span style="font-size: 30px;font-weight:bold;">家园</span></el-menu-item>
      <el-menu-item index="/wiki/help" ><span style="font-size: 30px;font-weight:bold;">帮助</span></el-menu-item>
      <div class="flex-grow" />
      <el-button v-if="!isLogin" text style="margin-top: 10px">登录</el-button>
      <el-button v-if="!isLogin"  text style="margin-top: 10px">注册</el-button>
      <el-button v-if="isLogin" link  style="margin-top: 10px" @click="handleUserMessage">{{ userStore.name }}</el-button>
      <el-button v-if="isLogin" text style="margin-top: 10px">退出</el-button>
    </el-menu>
  </div>
  <el-divider  style="margin:0px"/>
<!--  <wiki-head @username="useUserStore.username"/>-->
  <section class="app-main" style="width: 1250px">
    <router-view v-slot="{ Component, route }">
    </router-view>
  </section>
  <wiki-footer/>
</template>

<script lang="ts" setup name="LayoutWiki">
import WikiFooter from './footer'
import { useWindowSize } from '@vueuse/core'
import useSettingsStore from '@/store/modules/settings'
import {ElMessageBox} from "element-plus";
import {useRoute, useRouter} from "vue-router";
import useTagsViewStore from '@/store/modules/tagsView'
import useUserStore from '@/store/modules/user'
import logo2 from '@/assets/logo/logo2.png'
import {ref} from "vue";
const userStore = useUserStore()
const router = useRouter()

console.log("是否登录:"+JSON.stringify(userStore))
console.log("是否登录:"+userStore.name)

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  activeIndex.value=key
  console.log(key, keyPath)
}
const  isLogin=ref(false)
if(!userStore.name){
  isLogin.value=false
}else{
  isLogin.value=true
}
console.log("isLogin"+isLogin.value)
// console.log("username"+props.username)

// const settingsStore = useSettingsStore()
// const theme = computed(() => settingsStore.theme);
// const sidebar = computed(() => useAppStore().sidebar);
// const device = computed(() => useAppStore().device);

const { width, height } = useWindowSize();
const WIDTH = 992; // refer to Bootstrap's responsive design

// watchEffect(() => {
//   if (device.value === 'mobile' && sidebar.value.opened) {
//     useAppStore().closeSideBar({ withoutAnimation: false })
//   }
//   if (width.value - 1 < WIDTH) {
//     useAppStore().toggleDevice('mobile')
//     useAppStore().closeSideBar({ withoutAnimation: true })
//   } else {
//     useAppStore().toggleDevice('desktop')
//   }
// })

// const settingRef = ref(null);
const tagsViewStore = useTagsViewStore()
const route = useRoute()
tagsViewStore.addCachedView(route)

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
</script>

<style scoped>
.app-main{ margin:0 auto; width:1250px;}
.flex-grow {
  flex-grow: 1;
}
</style>
