<template>
  <div id="app">
    <h1>文件差异对比</h1>
    <span v-text="test"></span>
    <div id="myDiffElement" v-html="rawHtml">
    </div>
    <div v-html="test"></div>
  </div>
</template>

<script lang="ts" setup>
import * as Diff2Html from 'diff2html';
import 'diff2html/bundles/css/diff2html.min.css';
import {ref} from "vue";

const diffString = `
--- n1.txt
+++ n2.txt
@@ -0,0 +0,0 @@
 asdfaf
 文件金拉夫亲
@@ -3,4 +3,6 @@
-额契若金兰 就落款日期李会计连接器
-全家人8剪力墙软件
-   贰仟家人去楼空人就
-就;确认;林俊杰j;j
+额契若金兰 就落款日期李会计连接器客户还客户了可
+全家人8剪力墙软件 req
+   贰仟家人空人就
+erw elj j ljwerj l
+ejrlqr lqkr
+ljkqewrq rljk qreq

 二级区离开两节课;就 讲日;
@@ -9,1 +11,1 @@
-确认缺
+确认afda缺

`;
const rawHtml=ref('');
const prettyHtml  = () => {
   return Diff2Html.html(diffString, {
    drawFileList: false,
    matching: 'lines',
    outputFormat: 'side-by-side',
  });
}
rawHtml.value=prettyHtml();
console.log(rawHtml)
</script>

<style scoped>

</style>
