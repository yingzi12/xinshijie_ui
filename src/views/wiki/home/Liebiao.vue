<template>
  <el-row :gutter="20">
    <el-col
        v-for="(o, index) in 4"
        :key="o"
        :span="6"
    >
    <el-card :body-style="{ padding: '0px',height:'150px',width:'100%' }">
      <el-image style="width:100%; height: 100px" :src="url" :fit="fit" />
      <div style="padding: 1px">
        <span>Yummy hamburger</span>
      </div>
    </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
const url =
    'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
</script>

<style scoped>
.image {
  width: 100%;
  display: block;
}
</style>
