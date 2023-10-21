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
        <h1>{{ worldElement.title }}</h1>
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
    <!--    内容简介-->
    <component :is="temPage"  v-bind="worldElement" ></component>
    <el-divider />
      <!--功能-->
      <div class="center" style="height: 80px;">
        <el-button @click="handleReturn()">返回</el-button>
      </div>
    </div>
</template>

<script  lang="ts" setup>
import {reactive, ref, shallowRef} from 'vue'
import {  getDraftDetailsAdmin ,updatePush} from "@/api/admin/draftElement";
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



const wname = ref(route.query.wname);
const deid = ref(route.query.deid);
const wid = ref(route.query.wid);

/** 查询世界详细 */
function getDraft(wid:number,deid:number) {
  getDraftDetailsAdmin(wid,deid,0).then(response => {
    worldElement.value = response.data
  });
}
function handleReturn(){
  router.back()
}
getDraft(wid.value,deid.value);
</script>

<style scoped>

.center {
  top: 50%;
  width: 100%;
  text-align: center;
  font-size: 18px;
}
</style>
