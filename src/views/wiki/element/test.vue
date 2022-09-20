<template>
  <component :is="name" ref="child" :title="title"></component>
  <button @click="getProp2">获取子组件属性</button>
  <el-input v-model="title" placeholder="Please input" />
<!--  <el-input v-model="title" placeholder="Please input" />-->
  <el-button @click="handleTest">测试</el-button>
<!--{{child}}-->
</template>

<script lang="ts" setup>
import A from './a'
import B from './b'

import {inject, markRaw, ref} from "vue";
import {ElMessage} from "element-plus";
const test=ref("1");
const worldTypesMap=new Map([
  [1,markRaw(A)],
  [2,markRaw(B)],
])
const name=worldTypesMap.get(1);

const baseUrl = inject("$baseUrl")
function  testFun(){

}
const title=ref("标题");

// <template>  父组件  <child-com ref="child"></child-com>

// import ChildCom from './component/ChildCom.vue'
const child = ref()
const getProp2 = (): void => {  console.log(child.value.count)}
title.value="修改标题"
function  handleTest(){
  // title.value="修改标题2"
   ElMessage.success(title.value)
}
handleTest()
</script>

<style>
.el-collapse-item__header {
  background: inherit;
  background-color: rgba(249, 249, 249, 1);
  box-sizing: border-box;
  border-width: 1px;
  border-style: solid;
  border-color: rgba(233, 233, 233, 1);
  border-radius: 0px;
  text-align: left;
  line-height: 24px;
}
</style>
