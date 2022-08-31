<template>
  <wiki-head/>
  <section class="app-main" style="width: 1250px">
    <router-view v-slot="{ Component, route }">
    </router-view>
  </section>
  <wiki-footer/>
</template>

<script setup name="LayoutWiki">
import useTagsViewStore from '@/store/modules/tagsView'
// import useAppStore from '@/store/modules/app'
import useUserStore from '@/store/modules/user'
// import useSettingsStore from '@/store/modules/settings'

// const appStore = useAppStore()
const userStore = useUserStore()
// const settingsStore = useSettingsStore()
import WikiHead from './head'

import WikiFooter from './footer'

import { useWindowSize } from '@vueuse/core'
import useAppStore from '@/store/modules/app'
import useSettingsStore from '@/store/modules/settings'
import {ElMessageBox} from "element-plus";

const settingsStore = useSettingsStore()
const theme = computed(() => settingsStore.theme);
const sidebar = computed(() => useAppStore().sidebar);
const device = computed(() => useAppStore().device);

const { width, height } = useWindowSize();
const WIDTH = 992; // refer to Bootstrap's responsive design

watchEffect(() => {
  if (device.value === 'mobile' && sidebar.value.opened) {
    useAppStore().closeSideBar({ withoutAnimation: false })
  }
  if (width.value - 1 < WIDTH) {
    useAppStore().toggleDevice('mobile')
    useAppStore().closeSideBar({ withoutAnimation: true })
  } else {
    useAppStore().toggleDevice('desktop')
  }
})

const settingRef = ref(null);
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
</script>

<style scoped>
.app-main{ margin:0 auto; width:1250px;}

</style>
