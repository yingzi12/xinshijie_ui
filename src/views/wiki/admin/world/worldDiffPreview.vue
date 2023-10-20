<template>
  <div class="app-container" >
    <!--        标题-->
    <div>
      <el-menu
          :default-active="1"
          mode="horizontal"
          style="margin:0px;pardding:0px"
      >
        <el-menu-item index="1">{{wname}}</el-menu-item>
      </el-menu>
    </div>
    <!--  世界名称-->
    <div >
        <h1>{{ worldElement.title }}<el-tag size="small">{{elementStatus.get(worldElement.status)}}</el-tag></h1>
      <span>更新时间:</span><el-tag>{{worldElement.updateTime}}</el-tag>
        <span>分类:</span> <el-tag v-for="category in worldElement.categoryList">
        {{category.label}}
      </el-tag>
    </div>
    <el-divider />
    <!--  基本信息 -->
    <div style="margin-bottom: 20px">
      <div v-html="worldElement.intro"> </div>
    </div>
    <!-- 元素内容 -->
    <el-divider />
    <!--    内容简介-->
    <component :is="temPage"  v-bind="worldElement" ></component>
      <!--功能-->
    <div class="center" style="height: 80px;">
<!--        <el-button v-if="element.status == 0" @click="submitPush()">发布</el-button>-->
        <el-button @click="handleReturn()">返回</el-button>
      </div>
    </div>
<!--   弹出框-->
  <el-dialog v-model="dialogTableVisible" title="差异对比">
    <el-row>
      <el-col :span="12">
        <div v-html="newContent"></div>
      </el-col>
      <el-col :span="12">
        <div v-html="oldContent"></div>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script  lang="ts" setup>
import { ref, shallowRef} from 'vue'
import {getDraftDetailsAdmin ,getDiff} from "@/api/admin/draftElement";
//接受参数
import { useRoute ,useRouter}  from "vue-router";  // 引用vue-router

import biologly from '../../diffpreview/biology.vue'
import goods from '../../diffpreview/goods.vue'
import index from '../../diffpreview/index.vue'
import race from '../../diffpreview/race.vue'
import role from '../../diffpreview/role.vue'

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


const wname = ref(null);

const deid = ref(route.query.deid);
const wid = ref(route.query.wid);
wname.value = route.query.wname;
//console.log("元素deid="+deid.value);
//console.log("世界id="+wid.value);
const elementStatus = new Map([
  [0, "草稿"],
  [1, "待审核"],
  [3, "审核不通过"],
  [2, "通过审核"],
  [4, "删除"]
]);
const dialogTableVisible = ref(false)

/** 查询草稿详细 */
function getDraft(wid:number,deid:number) {
  getDraftDetailsAdmin(wid,deid,1).then(response => {
    worldElement.value = response.data
  });
}

function handleReturn(){
  router.back()
}
const newContent=ref('');
const oldContent=ref('');
function handDiff(newId:number,oldId:number) {
  getDiff(newId,oldId).then(response => {
    //console.log("查询世界详细:"+JSON.stringify(response))
    dialogTableVisible.value=true
    newContent.value=getHtml(response.data.newContent)
    oldContent.value=getHtml(response.data.oldContent)
  });
}
getDraft(wid.value,deid.value);
//console.log("状态:"+elementStatus.get(element.value.status))

const getHtml = function(desc){
  // let temp=document.createElement("div");
  // temp.innerHTML=desc;
  // let output=temp.innerText||temp.textContent;
  // temp=null;
  return desc;
}
</script>

<style scoped>
.center2 {
  top: 50%;
  width: 100%;
  text-align: center;
  font-size: 18px;
}
.my-label {
  background: var(--el-color-success-light-9);
}
.my-content {
  background: var(--el-color-danger-light-9);
}
.center {
  top: 50%;
  width: 100%;
  text-align: center;
  font-size: 18px;
}
.editNewInline div{
  width:auto;display:inline-block !important; display:inline;
  background-color: #990000;
}
.editOldInline div{
  width:auto;display:inline-block !important; display:inline;
  background-color: #009926;
}
</style>
