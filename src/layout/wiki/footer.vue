<template>
  <div>
    <el-divider />
    <el-row :gutter="20">
     <el-col :span="5"> ee1</el-col>
     <el-col :span="14">ee2</el-col>
     <el-col :span="5">ee3</el-col>
   </el-row>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeIndex = ref('1')
const activeIndex2 = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style scoped>

</style>
