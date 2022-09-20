<template>
  <!-- 元素内容 -->
  <div>
        <div v-for="(content, index) in props.contentList"
             :key="content.id"
             :label="'Content' + index"
             :prop="'content.' + index + '.value'"
             :rules="{
        required: true,
        message: 'content can not be null',
        trigger: 'blur',
      }"
             style="margin-bottom: 20px"
        >
          <div class="smallTitle">
            <h3><el-icon><Tickets /></el-icon>{{content.title  }}</h3>
          </div>
          <div style="margin-left: 25px">
            <div v-html="content.content"> </div>
          </div>
        </div>
      </div>
</template>

<script  lang="ts" setup>
//接受参数
import { useRoute ,useRouter}  from "vue-router";  // 引用vue-router
//基本信息
interface WorldElement {
  id:String,
  wid:String,
  title:string,
  intro:String,
  softtype: number,
  updateTime:String,
  categoryList:Category[],
  contentList:Content[]
}
interface Content {
  id: number
  title: string
  status: number,
  content: string,
}
interface Category{
  label: string
  value: string
}
const props = defineProps<WorldElement>()

// const element=props
console.log("子组件打印:"+JSON.stringify(props))
</script>

<style scoped>
.center2 {
  top: 50%;
  width: 100%;
  text-align: center;
  font-size: 18px;
}
.center {
  top: 50%;
  width: 100%;
  text-align: center;
  font-size: 18px;
}
.lessen {
  color: #a6a6a6;
  font: 12px/20px PingFangSC-Regular,-apple-system,Simsun;
  height: 20px;
  overflow: hidden;
}
.smallTitle{
  background: inherit;
  background-color: rgba(249, 249, 249, 1);
  box-sizing: border-box;
  border-width: 1px;
  border-style: solid;
  border-color: rgba(233, 233, 233, 1);
  border-radius: 0px;
  -moz-box-shadow: none;
  -webkit-box-shadow: none;
  box-shadow: none;
}
.smallTitle h3{
  font-family: 'PingFangSC-Semibold', 'PingFang SC Semibold', 'PingFang SC', sans-serif;
  font-weight: 650;
  font-size: 18px;
}
.title{
  font-family: 'PingFangSC-Semibold', 'PingFang SC Semibold', 'PingFang SC', sans-serif;
  font-weight: 650;
  /* font-style: normal; */
  font-size: 24px;
  text-align: left;
}
</style>
