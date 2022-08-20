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
