<template>
  <admin-head />
  <section class="app-main" style="width: 1250px">
    <el-alert title="系统测试中" type="warning" effect="dark" />
    <admin-message></admin-message>
  </section>
  <admin-footer/>
</template>

<script setup>
import AdminHead from './head'
import AdminFooter from './footer'
import AdminMessage from './message'
</script>

<style scoped>
.app-main{ margin:0 auto; width:1250px;}

</style>
