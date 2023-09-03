<template>
  <div class="app-container">
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/world/list">世界树</a></el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/world/details', query: {wid:wid} }">{{wname}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/story/list', query: {wid:wid,wname:wname} }">故事列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div >
      <el-container >
        <el-aside width="180px">
          <h3 class="mb-2">分类</h3>
          <el-menu
              default-active="-1"
              class="el-menu-vertical-demo"
          >
            <el-menu-item index="-1" @click="handFind(null)">
              <el-icon><icon-menu /></el-icon>
              <span>全部</span>
            </el-menu-item>
            <el-menu-item  v-for="types in storyTypes"  :index="types.id" @click="handFind(types.id)">
              <el-icon><icon-menu /></el-icon>
              <span>{{types.name }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <div>
            <span style="size: 30px">故事列表</span><el-button style="float: right" @click="handleAdd">创建故事</el-button>
            <el-table v-loading="loading" :data="storyList"  style="width:100%">
              <el-table-column label="序号" width="80px" >
                <template #default="scope">
                  {{scope.$index+1+(queryParams.pageNum-1)*20}}
                </template>
              </el-table-column>
              <el-table-column label="名称" align="center"   >
                <template #default="scope">
                  <router-link :to="{path:'/story/detail', query: {wid:scope.row.wid,wname:scope.row.wname,sname:scope.row.name,sid:scope.row.id}}">
                        <span><el-tag v-if="scope.row.source=='原创'">原创</el-tag>{{scope.row.name}} </span>
                  </router-link>
                </template>
              </el-table-column>
              <el-table-column label="等级" align="center" key="ranks" prop="ranks"  width="50" />
              <el-table-column label="类型" align="center" :show-overflow-tooltip="true" width="80" >
                <template #default="scope">
                  <span>{{storyTypesMap.get(scope.row.types)}}</span>
                </template>
              </el-table-column>
              <el-table-column label="简介" align="center" key="intro" prop="intro"  :show-overflow-tooltip="true" />
              <el-table-column label="创建人" align="center" key="createName" prop="createName"  :show-overflow-tooltip="true" />
              <el-table-column label="更新时间" align="center" prop="updateTime"  width="160">
                <template #default="scope">
                  <span>{{scope.row.updateTime}}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
                <template #header>
                  <el-input v-model="wname" size="small" placeholder="请输入世界名称" @change="handFind(wtypes)"/>
                </template>
                <template #default="scope">
                  <el-tooltip content="详情" placement="top" >
                    <el-button
                        type="text"
                        icon="View"
                        @click="handleSee(scope.row)"
                    ></el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!--            分页-->
          <div style="float:right; position:relative">
            <el-pagination
                :total="total"
                layout="total, prev, pager, next"
                :page-size=20
                @current-change="getList"
            />
          </div>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, reactive, ref, toRefs } from 'vue';
import { listStory } from '@/api/wiki/story';
import { useRoute, useRouter } from 'vue-router';
import { storyTypesMap,storyTypes } from '@/utils/constants'; // 根据你的项目路径调整引入路径
import { isNotEmpty } from '@/utils/tools'; // 根据你的项目路径调整引入路径

const router = useRouter()
const route = useRoute()

const {  appContext : { config: { globalProperties } }  } = getCurrentInstance();
const {  proxy  } = getCurrentInstance();
class World {
  id: number
  name: string
  types: string
  intro: string
  createTime:string
}

const wid = route.query.wid; // 获取查询参数param1的值
const wname = route.query.wname; // 获取查询参数param2的值


// const wid = ref(null);
// wid.value = route.query.wid;
// const wname = ref(null);
// wname.value = route.query.wname;
const wtypes=ref(null);
const loading = ref(true);
const storyList = ref([]);
const total = ref(0);
const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,

    wid: undefined,
    name: undefined,
    types: null,
  },
  rules: {
    // userName: [{ required: true, message: "用户名称不能为空", trigger: "blur" }, { min: 2, max: 20, message: "用户名称长度必须介于 2 和 20 之间", trigger: "blur" }],
  }
});
const { queryParams, form, rules } = toRefs(data);
const dateRange = ref([]);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const search = ref('')

function handFind(types: number) {
  // 根据所选的故事类型和 wid 更新 queryParams
  if (!types || types === -1) {
    queryParams.value.types = null;
  } else {
    queryParams.value.types = types;
  }
  if (isNotEmpty(wid)) {
    queryParams.value.wid = wid;
  } else {
    queryParams.value.wid = null;
  }

  // 获取并更新故事列表
  listStory(globalProperties.addDateRange(queryParams.value, dateRange.value)).then((response) => {
    loading.value = false;
    storyList.value = response.rows;
    total.value = response.total;
  });
}

function handleAdd() {
  // 跳转到创建故事页面，并带上 wid 和 wname 参数
  router.push(`/admin/storyAdd?wid=${wid}&wname=${wname}`);
}

function handleSee(row) {
  // 跳转到故事的详细视图
  router.push(`/story/detail?sid=${row.id}`);
}

function getList(page: number) {
  window.scrollTo(0, 0); // 滚动到顶部
  queryParams.value.pageNum=page;
  if (isNotEmpty(wid)) {
    queryParams.value.wid = wid;
  } else {
    queryParams.value.wid = null;
  }
  // 获取初始故事列表
  listStory(globalProperties.addDateRange(queryParams.value, dateRange.value)).then((response) => {
    loading.value = false;
    storyList.value = response.rows;
    total.value = response.total;
  });
}

// 调用 getList 函数以获取初始列表
getList(queryParams.value.pageNum);

</script>

<style scoped>

</style>
