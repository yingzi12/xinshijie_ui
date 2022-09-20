<template>
这是A
<!--  <ckeditor :editor="editor" ></ckeditor>-->
<!--  <el-input v-model="basic.title" placeholder="Please input" />-->

  <!--<el-tag>{{test}}</el-tag>-->
  子组件获取到的值: <el-tag> {{props.title}}</el-tag>
</template>

<script lang="ts" setup>
import  Editor  from 'ckeditor5-custom-build/build/ckeditor';
import {ref} from "vue";
const a=ref(1)
const editor = Editor
function  aFu(){

}
const title=ref("2222");
const props = defineProps({
  title:String
})
title.value=props.title
const count: number = 44444
//扩充
const basic=ref({});

basic.value.id=1
// 传递参数到index
defineExpose({  basic})
</script>

<style scoped>

</style>
