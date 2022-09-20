<template>
  <admin-head :username="userStore.name"/>
  <section class="app-main" style="width: 1250px">
    <el-alert title="系统测试中" type="warning" effect="dark" />
    <admin-message></admin-message>
  </section>
  <admin-footer/>
</template>

<script setup name="LayoutAdmin">
import AdminHead from './head'
import AdminFooter from './footer'
import AdminMessage from './message'

import useTagsViewStore from '@/store/modules/tagsView'
import useUserStore from '@/store/modules/user'

// const appStore = useAppStore()
const userStore = useUserStore()
// const settingsStore = useSettingsStore()


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
