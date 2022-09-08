<template>
  <div>
    <ckeditor  :editor="editor"  :config="editorConfig"></ckeditor>
  </div>
  <div class="demo-collapse">
    <el-collapse accordion>
      <el-collapse-item name="1" style="background-color: #990000">
        <template #title >
          <h1 >Consistency</h1><el-icon class="header-icon">
          <info-filled />
          <el-button text style="text-align:right">编辑</el-button>
        </el-icon>
        </template>
        <div>
          Consistent with real life: in line with the process and logic of real
          life, and comply with languages and habits that the users are used to;
        </div>
        <div>
          Consistent within interface: all elements should be consistent, such
          as: design style, icons and texts, position of elements, etc.
        </div>
      </el-collapse-item>
      <el-collapse-item title="Feedback" name="2">
        <div>
          Operation feedback: enable the users to clearly perceive their
          operations by style updates and interactive effects;
        </div>
        <div>
          Visual feedback: reflect current state by updating or rearranging
          elements of the page.
        </div>
      </el-collapse-item>
      <el-collapse-item title="Efficiency" name="3">
        <div>
          Simplify the process: keep operating process simple and intuitive;
        </div>
        <div>
          Definite and clear: enunciate your intentions clearly so that the
          users can quickly understand and make decisions;
        </div>
        <div>
          Easy to identify: the interface should be straightforward, which helps
          the users to identify and frees them from memorizing and recalling.
        </div>
      </el-collapse-item>
      <el-collapse-item title="Controllability" name="4">
        <div>
          Decision making: giving advices about operations is acceptable, but do
          not make decisions for the users;
        </div>
        <div>
          Controlled consequences: users should be granted the freedom to
          operate, including canceling, aborting or terminating current
          operation.
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script type="ts" setup>
import  Editor from 'ckeditor5-custom-build/build/ckeditor';
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
