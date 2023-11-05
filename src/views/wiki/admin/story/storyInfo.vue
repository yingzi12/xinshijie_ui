<template>
    <StoryHead :head-type="1" :sid="sid" :sname="sname"></StoryHead>
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
              <el-badge :value="story.ranks" class="item">
                <h1 style="margin: 2px">{{ story.name }}</h1>
              </el-badge>
            </div>
            <div style="margin-top: 5px" >
              <el-space wrap>
                <el-tag size="small" type="success">{{ storyStatusMap.get(story.status) }}</el-tag>
                <el-tag size="small" type="success">{{ story.typeName }}</el-tag>
                <div v-if="story.tags != null " v-for="tag in story.tags.split(';')" :key="i">
                  <el-tag size="small" type="success">{{tag}}</el-tag>
                </div>
              </el-space>
            </div>
            <div style="margin-top: 2px">
              <div style="margin-top: 5px" v-html="story.intro"></div>
            </div>

          </div>
        </el-col>
        <el-col :span="8"  >
          <div  style="text-align: right;vertical-align: top;"><el-button  @click="handleEdit" type="primary" :icon="Edit" circle /></div>
          <div class="center" style="height: 100px">
            <div style="width: 150px;float:left;" ><el-progress  :text-inside="true" :stroke-width="26" :percentage="70" :format="format" /></div>
            <div style="width: 20%;float:left;" ><el-tag>LV{{story.ranks}}</el-tag></div>
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
      <p style="white-space: pre-wrap">{{story.descriptionZip}}</p>
    </div>
    <!--    简介区-->
    <div style="background-color: #E5EAF3">
      <h1 style="padding: 10px;margin: 0px"><Flag style="width: 1em; height: 1em; margin-right: 8px" />其他</h1>
      <el-divider  style="padding: 0px;margin: 0px"/>
    </div>
      <div style=" padding: 10px;margin: 0px;white-space:pre; word-break:break-all;word-wrap:break-word;" >
          <el-descriptions  >
              <el-descriptions-item label="是否私有">{{ story.isPrive }}</el-descriptions-item>
              <el-descriptions-item label="章节数">{{ story.countElement }}</el-descriptions-item>
              <el-descriptions-item label="评论数">{{ story.countComment }}</el-descriptions-item>
              <el-descriptions-item label="点赞数">{{story.countLike }}</el-descriptions-item>
              <el-descriptions-item label="关注数">{{ story.countFllow }}</el-descriptions-item>
              <el-descriptions-item label="创建人">{{ story.createName }}</el-descriptions-item>
              <el-descriptions-item label="创建时间">{{story.createTime }}</el-descriptions-item>
              <el-descriptions-item label="更新人">{{ story.updateName }}</el-descriptions-item>
              <el-descriptions-item label="更新时间">{{ story.updateTime }}</el-descriptions-item>
          </el-descriptions>
      </div>
  </div>
</template>

<script lang="ts" setup>
import StoryHead from './storyHead'
import {inject, ref} from 'vue'
import {Flag, Edit} from '@element-plus/icons-vue'
import {  getStoryAdmin } from "@/api/admin/story";
//接受参数
import { useRoute,useRouter }  from "vue-router";
import {storyStatusMap } from "@/utils/constant";


const router = useRouter()
// 接收url里的参数
const route = useRoute();

//世界信息
const story=ref({})
const sid = ref(route.query.sid);
const sname = ref(route.query.sname);
const imgUrl = inject("$imgUrl")

const imageUrl=ref('')
const activeIndex = ref('1')
const fits = ['世界', '粉丝', '关注']
//编辑世界
function handleEdit(){
  router.push("/admin/storyEdit?sid="+story.value.id+"&sname="+story.value.name+"&wid="+story.value.wid+"&wname="+story.value.wname);
}
/** 查询世界详细 */
function handleStory() {
  getStoryAdmin(sid.value).then(response => {
    //console.log("查询世界详细:"+JSON.stringify(response))
    story.value = response.data
    imageUrl.value=imgUrl+response.data.imgUrl;

  });
}

function format(percentage){
  return percentage === 100 ? '100' : `7000/10000`;
}
handleStory();
</script>

<style scoped>

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
