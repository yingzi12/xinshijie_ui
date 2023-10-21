<template>
        <AdminHead :head-type="1" :wid="wid" :wname="wname"></AdminHead>
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
                      <el-tag size="small" type="success">{{ worldStatusMap.get(world.status) }}</el-tag>
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
          <!--    简介区-->
          <div style="background-color: #E5EAF3">
            <h1 style="padding: 10px;margin: 0px"><Flag style="width: 1em; height: 1em; margin-right: 8px" />其他</h1>
            <el-divider  style="padding: 0px;margin: 0px"/>
          </div>

          <div style=" padding: 10px;margin: 0px;white-space:pre; word-break:break-all;word-wrap:break-word;" >
            <el-descriptions  >
              <el-descriptions-item label="是否私有">{{ world.isPrive }}</el-descriptions-item>
              <el-descriptions-item label="经验">{{ world.vitality }}</el-descriptions-item>
              <el-descriptions-item label="得分">{{ world.scores }}</el-descriptions-item>
              <el-descriptions-item label="元素数">{{ world.countElement }}</el-descriptions-item>
              <el-descriptions-item label="居民数">{{ world.countResident }}</el-descriptions-item>
              <el-descriptions-item label="评论数">{{ world.countComment }}</el-descriptions-item>
              <el-descriptions-item label="点赞数">{{world.countLike }}</el-descriptions-item>
              <el-descriptions-item label="关注数">{{ world.countFllow }}</el-descriptions-item>
              <el-descriptions-item label="故事数">{{ world.countStory }}</el-descriptions-item>
              <el-descriptions-item label="编辑数">{{ world.countEdit }}</el-descriptions-item>

              <el-descriptions-item label="创建人">{{ world.createName }}</el-descriptions-item>
              <el-descriptions-item label="创建时间">{{world.createTime }}</el-descriptions-item>
              <el-descriptions-item label="更新人">{{ world.updateName }}</el-descriptions-item>
              <el-descriptions-item label="更新时间">{{ world.updateTime }}</el-descriptions-item>
            </el-descriptions>
          </div>
        </div>
</template>

<script lang="ts" setup>
import {inject, ref} from 'vue'
import {Flag, Edit} from '@element-plus/icons-vue'
import AdminHead from './worldHead'
import {  getWorld } from "@/api/admin/world";
//接受参数
import { useRoute,useRouter }  from "vue-router";  // 引用vue-router
import { worldStatusMap } from "@/utils/constant";

const router = useRouter()
// 接收url里的参数
const route = useRoute();

//世界信息
const world=ref({})
const wid = ref(route.query.wid);
const wname = ref(route.query.wname);

world.value.id = route.query.wid;
const baseUrl = inject("$baseUrl")
const imgUrl = inject("$imgUrl")

const imageUrl=ref('')
const activeIndex = ref('1')
const fits = ['世界', '粉丝', '关注']
//编辑世界
function handleEdit(){
  router.push("/admin/worldEdit?wid="+world.value.id+"&wname="+world.value.name);
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

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}


</style>
