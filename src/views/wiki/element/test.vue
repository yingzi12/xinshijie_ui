<template>
  <div>
  </div>
</template>

<script setup>
import Editor  from 'ckeditor5-custom-build/build/ckeditor';

import {inject, ref} from "vue";
import { InfoFilled } from '@element-plus/icons-vue'


const editor =   Editor;
const baseUrl = inject("$baseUrl")

const imageUrl = ref('')
const imageUrlPath = ref('')

const uploadImgUrl = ref(baseUrl + "/common/uploadEditFile"); // 上传的图片服务器地址
const editorConfig ={
  language:"zh-cn",
  simpleUpload: {
    // The URL the images are uploaded to.
    uploadUrl: uploadImgUrl.value,
  },
}
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
