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
      <el-menu-item ><el-image style="width: 100%;height:55px" :src="logo" fit="fill"></el-image></el-menu-item>
      <el-menu-item index="/index" ><span style="font-size: 30px;font-weight:bold;">首页</span></el-menu-item>
      <el-menu-item index="/world/index" ><span style="font-size: 30px;font-weight:bold;">世界</span></el-menu-item>
      <el-menu-item index="/story/index" ><span style="font-size: 30px;font-weight:bold;">故事</span></el-menu-item>
      <el-menu-item index="/user/index" ><span style="font-size: 30px;font-weight:bold;">家园</span></el-menu-item>
      <el-menu-item index="/wiki/help" ><span style="font-size: 30px;font-weight:bold;">帮助</span></el-menu-item>
      <div class="flex-grow" />
      <div>
      <el-button v-if="!isLogin" text style="margin-top: 10px" @click="handleLogin">{{  t('navUtil.login')  }}</el-button>
      <el-button v-if="!isLogin"  text style="margin-top: 10px" @click="handleRegister">{{  t('navUtil.register')  }}</el-button>
      <el-button v-if="isLogin" link  style="margin-top: 10px" @click="handleUserMessage">{{ userStore.name }}</el-button>
      <el-button v-if="isLogin" link  style="margin-top: 10px" @click="handleWorldMessage">{{ t('navUtil.managementCenter') }}</el-button>
      <el-button v-if="isLogin" text style="margin-top: 10px" @click="logout()">{{  t('navUtil.loginOut')  }}</el-button>
        <el-button  text style="margin-top: 10px" ><el-switch
            v-model="lang"
            inline-prompt
            style="--el-switch-on-color: #13ce66; --el-switch-off-color: #97a0ff"
            active-text="中"
            inactive-text="英"
            @change="languageChange"
        /></el-button>

      </div>
    </el-menu>
  </div>
  <el-divider  style="margin:0px"/>
  <section class="app-main" style="width: 100%">
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
import logo from '@/assets/logo/logo.png'
import {ref} from "vue";
const userStore = useUserStore()
const router = useRouter()

import { useI18n } from "vue-i18n";

const { t } = useI18n();
const lang = ref(true);  // 开关，语言状态切换

/* getCurrentInstance()可以用来获取当前组件实例 */
let current = getCurrentInstance()?.appContext.config.globalProperties as any;

// 根据状态，切换国际化
const languageChange = (val : boolean) => {
  // false英 true中，此处的zh-US就是lang -> index.ts -> messages对象的键名
  val ? current.$i18n.locale = 'zh-US' : current.$i18n.locale = 'en-US'
}

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
.app-main{ margin:0 auto; width:100%;max-width: 1258px;}
.flex-grow {
  flex-grow: 1;
}
</style>
