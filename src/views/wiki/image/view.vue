<template>
  <el-image  style="sidth: 105px; height: 128px;  display: block;margin: 0 auto;" :src="imageUrl" :fit="fit" />
</template>

<script lang="ts" setup>
import {inject, ref} from "vue";
import {ElMessage, UploadProps} from "element-plus";

const baseUrl = inject("$baseUrl")
const imgUrl = inject("$imgUrl")

const imageUrl = ref('')
const imageUrlPath = ref('')


//扩充
// const basic=ref({});
// 传递参数到index
// defineExpose({  imageUrl,imageUrlPath})
</script>

<style scoped>

</style>
