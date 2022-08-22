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
import WikiHead from './head'
import WikiFooter from './footer'

import { useWindowSize } from '@vueuse/core'
import defaultSettings from '@/settings'

import useAppStore from '@/store/modules/app'
import useSettingsStore from '@/store/modules/settings'

const settingsStore = useSettingsStore()
const theme = computed(() => settingsStore.theme);
const sideTheme = computed(() => settingsStore.sideTheme);
const sidebar = computed(() => useAppStore().sidebar);
const device = computed(() => useAppStore().device);
const needTagsView = computed(() => settingsStore.tagsView);
const fixedHeader = computed(() => settingsStore.fixedHeader);

const classObj = computed(() => ({
  hideSidebar: !sidebar.value.opened,
  openSidebar: sidebar.value.opened,
  withoutAnimation: sidebar.value.withoutAnimation,
  mobile: device.value === 'mobile'
}))

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

function handleClickOutside() {
  useAppStore().closeSideBar({ withoutAnimation: false })
}

const settingRef = ref(null);
function setLayout() {
  settingRef.value.openSetting();
}

const tagsViewStore = useTagsViewStore()
const route = useRoute()
tagsViewStore.addCachedView(route)
const cachedViews = computed(() => {
  return tagsViewStore.cachedViews
})
</script>

<style scoped>
.app-main{ margin:0 auto; width:1250px;}

</style>
