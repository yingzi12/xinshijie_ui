<template>
  <wiki-head/>
  <section class="app-main" style="width: 1250px">
    <router-view v-slot="{ Component, route }">
    </router-view>
  </section>
  <wiki-footer/>
</template>

<script setup name="LayoutWiki">
import WikiHead from './head'
import WikiFooter from './footer'
</script>

<style scoped>

</style>
