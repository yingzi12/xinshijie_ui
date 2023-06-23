<template>
  <div class="app-container" >
    <div>
      <el-menu
          :default-active="1"
          mode="horizontal"
          style="margin:0px;pardding:0px"
      >
        <el-menu-item index="1" style="margin:0px;pardding:0px"><span style="font-size: 20px;font-weight:bold;">元素详细</span></el-menu-item>
      </el-menu>
    </div>
    <div >
      <!--  元素名称-->
      <div >
        <h1>{{ worldElement.title }}</h1>
        <span>创建时间:</span><el-tag>{{worldElement.createTime}}</el-tag>
        <span>分类:</span> <el-tag v-for="category in worldElement.categoryList">
        {{category.label}}
      </el-tag>
      </div>
      <el-divider />
      <!--  元素简介 -->
      <div style="margin-bottom: 20px">
        <div v-html="worldElement.intro"> </div>
      </div>
    <!--    内容简介-->
      <div id="elementContent">
    <component  :is="temPage"  v-bind="worldElement" ></component>
      </div>
    <el-divider />
      <!--功能-->
      <div class="center" style="height: 80px;">
        <el-button v-if="worldElement.status == 0 " @click="submitPush()">发布</el-button>
        <el-button  @click="handDiff()">查看差异</el-button>
        <el-button v-if="worldElement.status == 0 " @click="submitEdit()">继续编辑</el-button>
        <el-button @click="handClean()">保存</el-button>
        <el-button @click="insertElementPageHtml()">打印html</el-button>

      </div>
    </div>

  </div>
</template>

<script  lang="ts" setup>
import { ref, shallowRef} from 'vue'
import {  getDraftDetails ,issue,updateDraftPageHtml} from "@/api/admin/draftElement";
//接受参数
import { useRoute ,useRouter}  from "vue-router";  // 引用vue-router

import biologly from '../../preview/biology.vue'
import goods from '../../preview/goods.vue'
import index from '../../preview/index.vue'
import race from '../../preview/race.vue'
import role from '../../preview/role.vue'

const temTypesMap=new Map([
  [1,shallowRef(index)],
  [2,shallowRef(role)],
  [3,shallowRef(biologly)],
  [4,shallowRef(race)],
  [5,shallowRef(goods)],

])

const router = useRouter()
// 接收url里的参数
const route = useRoute();

const temType = ref(1);
if(!route.query.temType || isNaN(route.query.temType)){
  temType.value =1
}else {
  temType.value =route.query.temType;
  if(temType.value>5 || temType.value<=0 ){
    temType.value =1
  }
}
const  temPage=temTypesMap.get(parseInt(temType.value))
const worldElement=ref({})

//世界信息
const deid = ref(null);
const wid = ref(null);
deid.value = route.query.deid;
wid.value = route.query.wid;
//console.log("元素deid="+deid.value);
//console.log("世界id="+wid.value);

const elementStatus = new Map([
  [0, "草稿"],
  [1, "待审核"],
  [3, "审核不通过"],
  [2, "通过审核"],
  [4, "删除"]
]);

/** 查询世界详细 */
function getDraft(wid:number,deid:number) {
  getDraftDetails(wid,deid,0).then(response => {
    //console.log("查询世界详细:"+JSON.stringify(response))
    worldElement.value = response.data
    //console.log("状态:"+element.value.status)
    //console.log("状态:"+elementStatus.get(element.value.status))
  });
}
function submitPush(){
  issue(wid.value,deid.value).then(response => {
    //console.log("发布成功")
    worldElement.value.status=1
    if(response.data.types == 0){
      router.push("/admin/draftPreview?wid="+ response.data.wid+"&deid=" +response.data.id+"&temType="+temType.value)
    }else{
      router.push("/element/details?wid="+ response.data.wid+"&eid=" +response.data.id+"&temType="+temType.value)
    }
  });
}
function insertElementPageHtml(){
  worldElement.value.pageHtml=document.getElementById('elementContent').outerHTML;
  updateDraftPageHtml(worldElement.value).then(response => {
    //console.log("保存成功")
    router.push("/admin/draft")
    // if(response.data.types == 0){
    //   router.push("/admin/draftPreview?wid="+ response.data.wid+"&deid=" +response.data.id+"&temType="+temType.value)
    // }else{
    //   router.push("/element/details?wid="+ response.data.wid+"&eid=" +response.data.id+"&temType="+temType.value)
    // }
  });
}
function submitEdit(){
  router.push("/admin/draftEdit?wid="+ wid.value+"&deid=" +deid.value)
}
function handDiff(){
  router.push("/admin/diffPreview?wid="+ wid.value+"&deid=" +deid.value)
}
function handClean(){
  router.push("/admin/draft")
}
function handleHtml(){
  console.log(document.getElementById('elementContent').outerHTML);
}
getDraft(wid.value,deid.value);
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
