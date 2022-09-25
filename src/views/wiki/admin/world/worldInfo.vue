<template>
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
            <el-button text type="primary"> <router-link :to="{path:'/admin/worldInfo', query: {wid:wid,wname:world.name}}">简介</router-link></el-button>
            <el-button text>  <router-link :to="{path:'/admin/worldManage', query: {wid:wid,wname:world.name}}">造物主列表</router-link></el-button>
            <el-button text>  <router-link :to="{path:'/admin/worldElement', query: {wid:wid,wname:world.name}}">元素列表</router-link></el-button>
            <el-button text>  <router-link :to="{path:'/admin/worldCategory', query: {wid:wid,wname:world.name}}">分类管理</router-link></el-button>
            <el-button text>  <router-link :to="{path:'/admin/worldAudit', query: {wid:wid,wname:world.name}}">元素审核</router-link></el-button>
            <el-button text>  <router-link :to="{path:'/admin/worldStory', query: {wid:wid,wname:wname}}">故事管理</router-link></el-button>
            <el-button text>  <router-link :to="{path:'/admin/worldRedident', query: {wid:wid,wname:world.name}}">居民管理</router-link></el-button>
            <el-button text>  <router-link :to="{path:'/admin/worldComment', query: {wid:wid,wname:world.name,source:1}}">评论管理</router-link></el-button>
            <el-button text>  <router-link :to="{path:'/admin/worldDiscuss', query: {wid:wid,wname:world.name,source:1}}">讨论管理</router-link></el-button>
          </el-space>
        </div>
        <!--   内容区-->
        <div style="  border-style: solid; border-width: 1px;border-color:#CFD3DC">
          <div  style="margin: 15px">
            <el-row>
              <el-col :span="4" class="center">
                <el-image  style="width: 105px; height: 128px;  display: block;margin: 0 auto;" :src="imageUrl" :fit="fit" />
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
                      <el-tag size="small" type="success">{{ worldStatus.get(world.status) }}</el-tag>
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
                  <div style="width: 20%;float:left;" ><el-tag>LV{{world.ranks}}</el-tag></div>
                </div>
              </el-col>
            </el-row>
          </div>
          <!--    简介区-->
          <div style="background-color: #E5EAF3">
            <h1 style="padding: 10px;margin: 0px"><Flag style="width: 1em; height: 1em; margin-right: 8px" />简介</h1>
            <el-divider  style="padding: 0px;margin: 0px"/>
          </div>

          <div style=" padding: 10px;margin: 0px;white-space:pre; word-break:break-all;word-wrap:break-word;" >
            <p style="white-space: pre-wrap">{{world.description}}</p>
          </div>
        </div>
</template>

<script lang="ts" setup>
import {inject, ref} from 'vue'
import {Flag, Edit,Menu as IconMenu, Message, Setting} from '@element-plus/icons-vue'
import type { TabsPaneContext } from 'element-plus'
import {  getWorld } from "@/api/admin/world";
//接受参数
import { useRoute,useRouter }  from "vue-router";  // 引用vue-router
const router = useRouter()
// 接收url里的参数
const route = useRoute();
//console.log(route.query.id,"参数");
const worldStatus = new Map([
  [0, "正常"],
  [1, "待发布"],
  [2, "锁定"],
  [3, "删除"]
]);
//世界信息
const world=ref({})
const wid = ref(null);
wid.value = route.query.wid;
world.value.id = route.query.wid;
//console.log("世界id="+world.value.id);
const baseUrl = inject("$baseUrl")
const imgUrl = inject("$imgUrl")

const imageUrl=ref('')
const activeIndex = ref('1')
const fits = ['世界', '粉丝', '关注']
//编辑世界
function handleEdit(){
  router.push("/admin/worldEdit?wid="+world.value.id);
}
/** 查询世界详细 */
function handleWorld(id:number) {
  getWorld(id).then(response => {
    //console.log("查询世界详细:"+JSON.stringify(response))
    world.value = response.data
    imageUrl.value=imgUrl+response.data.imgUrl;

  });

}

function format(percentage){
  return percentage === 100 ? '100' : `7000/10000`;
}
handleWorld(world.value.id);
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
