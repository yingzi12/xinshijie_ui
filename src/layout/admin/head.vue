<template>
  <div style="margin:0 auto; width:1248px;">
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
  >
    <el-menu-item index="1" :to="{path:'/wiki/index'}"><span style="font-size: 30px;font-weight:bold;">首页</span></el-menu-item>
    <el-menu-item index="2" :to="{path:'/world/index'}"><span style="font-size: 30px;font-weight:bold;">世界树</span></el-menu-item>
    <el-menu-item index="3" :to="{path:'/users/index'}"><span style="font-size: 30px;font-weight:bold;">家园</span></el-menu-item>
    <el-menu-item index="4" :to="{path:'/wiki/help'}"><span style="font-size: 30px;font-weight:bold;">帮助</span></el-menu-item>
  </el-menu>
  </div>
  <el-divider  style="margin:0px"/>
</template>

<script setup>
import {getCurrentInstance, ref} from 'vue'
const  activeIndex=ref(1)
function  handleSelect(index){
  activeIndex.value=index
}
</script>

<style scoped>

</style>
