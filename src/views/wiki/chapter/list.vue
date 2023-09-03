<template>
  <div class="app-container">
    <div>
      <el-row >
        <el-col :span="21">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/world/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/world/list">世界树</a></el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/world/details', query: {wid:story.wid} }">{{story.wname}}</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/story/list', query: {wid:story.wid,wname:story.wname} }">故事列表</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/story/detail', query: {wid:story.wid,wname:story.wname,sid:story.id,sname:story.name} }">{{ story.name }}</el-breadcrumb-item>
            <el-breadcrumb-item>章节目录</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
        <el-col :span="3">
          <el-button @click="handleAddDialog"> 添加新章节</el-button>
        </el-col>
      </el-row>
    </div>
    <div>
      <div class="common-layout">
        <el-container>
          <el-main>
            <div v-for="(reel, index) in reelList"
                 :key="reel.id"
                 :label="'Reel' + index"
                 :prop="'reel.' + index + '.value'"
                 :rules="{  required: true,  message: 'domain can not be null', trigger: 'blur',}"
                 style="margin-bottom: 20px"
            >
              <div     class="smallTitle">
                <el-row >
                  <el-col :span="19">
                    <div class="biaoti">
                      <h3><el-icon><Tickets /></el-icon><span>{{reel.title  }}</span></h3>
                    </div>
                  </el-col>
                  <el-col :span="5">
                  </el-col>
                </el-row>
              </div>
              <div   style="margin-left: 25px">
                <el-row :gutter="24">
                  <el-col :span="3" v-for="chap in reel.chapterList">
                    <router-link  :to="{path:'/chapter/index', query: {sid:chap.sid,wid:chap.wid,sname:chap.sname,wname:chap.wname,scid:chap.id}}">{{chap.title}}</router-link>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-main>
        </el-container>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { getCurrentInstance, reactive, ref, toRefs} from 'vue'
import { listChapterAll } from "@/api/wiki/chapter";
import { getStory} from "@/api/wiki/story";
import { useRoute, useRouter} from "vue-router";

const {  appContext : { config: { globalProperties } }  } = getCurrentInstance();

// 接收url里的参数
const route = useRoute();
const router = useRouter()
const sid = ref(null);
sid.value = route.query.sid;
const wid = ref(null);
wid.value = route.query.wid;
const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,

    title: undefined,
    types: undefined,
    sid:sid.value
  }
});


const { queryParams, form } = toRefs(data);

const reelList = ref([]);
const total = ref(0);
const dateRange = ref([]);

/**查看元素详细*/
function handleSee(id:number,wid:number,softtype:number){
  router.push("/element/details?eid="+id+"&wid="+wid+"&temType="+softtype);
}

//添加新元素,需要登录权限
function handleAdd(){
  router.push("/admin/storyChapterAdd?sid=" + sid.value +"&wid=" + wid.value);
}

const story=ref('')
/** 查询世界详细 */
function handStory() {
  getStory(sid.value).then(response => {
    //console.log("查询世界详细:"+JSON.stringify(response))
    story.value = response.data
  });
}
/** 查询元素列表 */
function getList(page: number) {
  window.scrollTo(0, 0); // 滚动到顶部
  queryParams.value.pageNum=page;

  queryParams.value.sid=sid.value;
  listChapterAll(globalProperties.addDateRange(queryParams.value, dateRange.value)).then(response => {
    reelList.value = response.data;
  });
}
getList(queryParams.value.pageNum);

handStory();
</script>

<style scoped>

</style>
