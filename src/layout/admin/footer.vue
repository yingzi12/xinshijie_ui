<template>

  <div>
    <el-divider style="margin: 0px"/>
    <el-row :gutter="20">
     <el-col :span="2"> </el-col>
     <el-col :span="20" style="margin: 0px">
       <div class="tiaozhuan" style="margin: 0px;text-align: center;">
         <el-space  spacer="|">
           <div><router-link to="">关于心世界</router-link></div>
           <div><router-link to="">联系我们</router-link></div>
           <div> <router-link to="">帮助中心</router-link></div>
           <div><router-link to="">提交建议</router-link></div>
           <div><router-link to="">举报中心</router-link></div>
           <div> <router-link to="">漏洞提交</router-link></div>
           </el-space>
       </div>
       <div style="margin: 0px;text-align: center;"> <p  style="margin: 0px;">Copyright © 2002-2022 www.xingshijie.com All Rights Reserved 版权所有 心世界信息科技有限公司</p></div>
       <div style="margin: 0px;text-align: center;"><p style="margin: 0px;">本站所收录的作品、社区话题、用户评论、用户上传内容或图片等均属用户个人行为。如前述内容侵害您的权益，欢迎举报投诉，一经核实，立即删除，本站不承担任何责任</p></div>
     </el-col>
     <el-col :span="2"></el-col>
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
p{
  color: #a6a6a6;
  font: 12px/20px PingFangSC-Regular,-apple-system,Simsun;
  height: 20px;
  overflow: hidden;
}

.tiaozhuan {
  color: #1a1a1a;
  font-family: PingFangSC-Regular,-apple-system,Simsun;
  font-size: 12px;
  line-height: 27px;
  margin-right: 16px;
}
</style>
