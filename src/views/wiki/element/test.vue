<template>
  <div>
    <ckeditor  :editor="editor"  :config="editorConfig"></ckeditor>
  </div>
</template>

<script type="ts" setup>
import  Editor from 'ckeditor5-custom-build/build/ckeditor';
import {inject, ref} from "vue";
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
</style>