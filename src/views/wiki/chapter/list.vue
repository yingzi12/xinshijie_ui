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
                    <router-link  :to="{path:'/chapter/index', query: {sid:sid,scid:chap.id}}">{{chap.title}}</router-link>
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
import { listChapter } from "@/api/wiki/chapter";
import { getStory} from "@/api/wiki/story";
import { useRoute, useRouter} from "vue-router";

const {  appContext : { config: { globalProperties } }  } = getCurrentInstance();

// 接收url里的参数
const route = useRoute();
const router = useRouter()
const sid = ref(null);
sid.value = route.query.sid;
const data = reactive({
  form: {},
  queryParams: {
    page: 1,
    pageSize: 500,

    title: undefined,
    types: undefined,
    pid:0,
    sid:sid.value
  }
});


const { queryParams, form } = toRefs(data);

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
const wname =ref("");
const wid =ref(undefined);
const sname=ref("")
/** 查询世界详细 */
function handStory() {
  getStory(sid.value).then(response => {
    //console.log("查询世界详细:"+JSON.stringify(response))
    story.value = response.data
    sname.value = story.value.name
    wname.value = story.value.wname
    wid.value =  story.value.wid
  });
}

const reelList = ref<Array<InstanceType<Reel>>>();

/** 查询元素 */
function getList(page: number) {
  queryParams.value.page = page;
  queryParams.value.sid = sid.value;
  listChapter(queryParams.value).then(response => {
    reelList.value = response.data;
    getChapterList(reelList.value);
  });
}

async function getChapterList(reelList) {
  for (var reel = 0; reel < reelList.length; reel++) {
    console.log("total1:" + total.value);

    queryParams.value.pid = reelList[reel].id;
    total.value = 0;

    const response = await listChapter(queryParams.value);
    reelList[reel].chapterList = response.data;
    total.value = response.total;
    console.log("total2:" + total.value);
    var pageNum = Math.ceil(total.value / queryParams.value.pageSize); // 使用 Math.ceil 向上取整

    for (var i = 2; i <= pageNum; i++) { // 从第二页开始
      queryParams.value.page = i;
      const chapterResponse = await listChapter(queryParams.value);
      reelList[reel].chapterList = reelList[reel].chapterList.concat(chapterResponse.data);
    }
  }
}
getList(queryParams.value.page);

handStory();
</script>

<style scoped>

</style>
