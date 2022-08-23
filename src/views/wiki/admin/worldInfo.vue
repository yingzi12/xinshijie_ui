<template>
  <el-container class="layout-container-demo" >
    <!--    侧边栏-->
    <el-aside width="250px" style="margin: 10px;background-color: #E5EAF3">
      <div>
        <!--        个人信息-->
        <div class="center" style="margin-bottom: 10px;text-align: center;">
          <el-card :body-style="{ padding: '0px' }">
            <!--  头像-->
            <el-avatar :size="50" :src="circleUrl" />
            <div>
              <h3 style="margin:10px;margin-bottom: 10px;font-size:14px;">Yumnumkl</h3>
              <p style="margin: 0px;padding: 0px;font-size:10px;">id:111111</p>
              <div class="bottom" >
                <p style="margin: 0px;padding: 0px;font-size:10px;line-height:120%;">这是一个签名,表达自己的想法用的,没什么实际的意义</p>
                <div class="demo-count">
                  <div  class="block">
                    <span class="demonstration">4</span>
                    <span class="demonstration">世界</span>
                  </div>
                  <div  class="block">
                    <span class="demonstration">4440000</span>
                    <span class="demonstration">粉丝</span>
                  </div>
                  <div  class="block">
                    <span class="demonstration">433</span>
                    <span class="demonstration">关注</span>
                  </div>
                </div>
                <el-button text class="button">用户中心</el-button>
              </div>
            </div>
          </el-card>
        </div>
        <!--        分类-->
        <div style="margin-top: 10px">
          <el-scrollbar>
            <el-menu :default-openeds="['1', '3']">
              <el-sub-menu index="1">
                <template #title>
                  <el-icon><message /></el-icon>我的关注
                </template>
              </el-sub-menu>
              <el-sub-menu index="2">
                <template #title>
                  <el-icon><icon-menu /></el-icon>世界管理
                </template>
              </el-sub-menu>
              <el-sub-menu index="3">
                <template #title>
                  <el-icon><setting /></el-icon>元素草稿
                </template>
              </el-sub-menu>
              <el-sub-menu index="4">
                <template #title>
                  <el-icon><setting /></el-icon>我的评论
                </template>
              </el-sub-menu>
              <el-sub-menu index="5">
                <template #title>
                  <el-icon><setting /></el-icon>我的信息
                </template>
              </el-sub-menu>
            </el-menu>
          </el-scrollbar>
        </div>
      </div>
    </el-aside>
    <!--    表格-->
    <el-container style="margin: 10px">
      <!--       内容区-->
      <el-main>
        <div>
          <el-menu
              :default-active="activeIndex"
              mode="horizontal"
              @select="handleSelect"
              style="margin:0px;pardding:0px"
          >
            <el-menu-item index="1">{{ world.name }}</el-menu-item>
          </el-menu>
        </div>
        <!--        多选-->
        <div style="padding: 10px">
          <el-space wrap>
              <el-button text type="primary"> 简介 </el-button>
              <el-button text> 造物主列表 </el-button>
              <el-button text> 元素列表 </el-button>
              <el-button text> 元素分类 </el-button>
              <el-button text> 元素审核 </el-button>
              <el-button text> 居民管理 </el-button>
              <el-button text> 评论管理 </el-button>
              <el-button text> 讨论管理 </el-button>
          </el-space>
        </div>
        <!--   内容区-->
        <div style="  border-style: solid; border-width: 1px;border-color:#CFD3DC">
          <div  style="margin: 15px">
            <el-row>
              <el-col :span="4" class="center">
                <el-image  style="width: 105px; height: 128px;  display: block;margin: 0 auto;" :src="url" :fit="fit" />
              </el-col>
              <el-col :span="12">
                <div>
                  <div>
                    <el-badge :value="world.ranks" class="item">
                      <h1 style="margin: 2px">{{ world.name }}</h1>
                    </el-badge>
                  </div>
                  <div style="margin-top: 5px" >
                    <el-space wrap>
                      <el-tag size="small" type="success">{{ world.typeName }}</el-tag>
                      <div v-if="world.tags != null " v-for="tag in world.tags.split(';')" :key="i">
                        <el-tag size="small" type="success">{{tag}}</el-tag>
                      </div>
                    </el-space>
                  </div>
                  <div style="margin-top: 2px">
                    <div style="margin-top: 5px" v-html="world.intro"></div>
                  </div>
                </div>
              </el-col>
              <el-col :span="8"  >
                <div  style="text-align: right;vertical-align: top;"><el-button  @click="handleEdit" type="primary" :icon="Edit" circle /></div>
                <div class="center" style="height: 100px">
                  <div style="width: 150px;float:left;" ><el-progress  :text-inside="true" :stroke-width="26" :percentage="70" :format="format" /></div>
                  <div style="width: 20%;float:left;" ><el-tag>LV12</el-tag></div>
                </div>
              </el-col>
            </el-row>
          </div>
          <!--    简介区-->
          <div style="background-color: #E5EAF3">
            <h1 style="padding: 10px;margin: 0px"><Flag style="width: 1em; height: 1em; margin-right: 8px" />简介</h1>
            <el-divider  style="padding: 0px;margin: 0px"/>
          </div>
          <div style=" padding: 10px;margin: 0px" v-html="world.description"></div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {Flag, Edit,Menu as IconMenu, Message, Setting} from '@element-plus/icons-vue'


import type { TabsPaneContext } from 'element-plus'
import {  getWorld } from "@/api/wiki/world";
//接受参数
import { useRoute }  from "vue-router";  // 引用vue-router
import { useRouter} from "vue-router";
const router = useRouter()

const activeIndex = ref('1')
const fits = ['世界', '粉丝', '关注']

// 接收url里的参数
const route = useRoute();
console.log(route.query.id,"参数");
//世界信息
const world=ref({})

world.value.id = route.query.id;
console.log("世界id="+world.value.id);
//编辑世界
function handleEdit(){
  router.push("/admin/worldEdit?id="+world.value.id);
}
/** 查询世界详细 */
function getWorld2(id:number) {
  getWorld(id).then(response => {
    console.log("查询世界详细:"+JSON.stringify(response))
    world.value = response.data
  });

}
const url =
    'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'

function format(percentage){
  return percentage === 100 ? '100' : `7000/10000`;
}
getWorld2(world.value.id);
</script>

<style scoped>
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.demo-count .block {
  padding: 0px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  display: inline-block;
  width: 33%;
  box-sizing: border-box;
  vertical-align: top;
}
.demo-count .block:last-child {
  border-right: none;
}
.demo-count .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 9px;
  margin-bottom: 0px;
}
</style>
