<template>
  <admin-head />
  <section class="app-main" style="width: 1250px">
    <el-alert title="系统测试中" type="warning" effect="dark" />
    <router-view></router-view>
  </section>
  <admin-footer/>
</template>

<script setup>
import AdminHead from '../admin/head'
import AdminFooter from '../admin/footer'

</script>

<style scoped>
.app-main{ margin:0 auto; width:1250px;}

</style>
