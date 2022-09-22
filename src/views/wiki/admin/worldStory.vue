<template>
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
  <!--        多选-->
  <div style="padding: 10px">
    <el-space wrap>
      <el-button text > <router-link :to="{path:'/admin/worldInfo', query: {wid:wid,wname:wname}}">简介</router-link></el-button>
      <el-button text>  <router-link :to="{path:'/admin/worldManage', query: {wid:wid,wname:wname}}">造物主列表</router-link></el-button>
      <el-button text >  <router-link :to="{path:'/admin/worldElement', query: {wid:wid,wname:wname}}">元素列表</router-link></el-button>
      <el-button text>  <router-link :to="{path:'/admin/worldCategory', query: {wid:wid,wname:wname}}">分类管理</router-link></el-button>
      <el-button text>  <router-link :to="{path:'/admin/worldAudit', query: {wid:wid,wname:wname}}">元素审核</router-link></el-button>
      <el-button text type="primary">  <router-link :to="{path:'/admin/worldStory', query: {wid:wid,wname:wname}}">故事管理</router-link></el-button>
      <el-button text>  <router-link :to="{path:'/admin/worldRedident', query: {wid:wid,wname:wname}}">居民管理</router-link></el-button>
      <el-button text>  <router-link :to="{path:'/admin/worldComment', query: {wid:wid,wname:wname}}">评论管理</router-link></el-button>
      <el-button text>  <router-link :to="{path:'/admin/worldDiscuss', query: {wid:wid,wname:wname}}">讨论管理</router-link></el-button>
    </el-space>
  </div>
  <!--        统计-->
  <div style="background-color:#b0c4de;margin: auto;padding: 10px">
    <el-row>
      <el-col :span="20">
        <el-select v-model="queryParams.types" clearable  placeholder="请选择">
          <el-option
              v-for="item in storyTypes"
              :key="item.id"
              :label="item.name"
              :value="item.id">
          </el-option>
        </el-select>
        <el-select v-model="queryParams.status" clearable placeholder="请选择">
          <el-option
              v-for="item in storyStatus"
              :key="item.id"
              :label="item.name"
              :value="item.id">
          </el-option>
        </el-select>
        <el-input v-model="queryParams.title" placeholder="请输入元素名" class="input-with-select" style="width: 250px"/>
        <el-button :icon="Search" circle @click="getList"/>
      </el-col>
      <el-col :span="4" style="text-align: right;">
        <div style="text-align: right; font-size: 12px" class="toolbar">
          <el-button text @click="handleAdd">创建故事</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
  <!--        表格-->
  <div>
    <el-scrollbar>
      <el-table v-loading="loading" :data="storyList" >
        <el-table-column label="序号" width="50">
          <template #default="scope">
            {{ scope.$index + 1 + (queryParams.pageNum - 1) * 10 }}
          </template>
        </el-table-column>
        <el-table-column label="故事名" align="center" key="name" prop="name" :show-overflow-tooltip="true"/>
        <el-table-column label="状态" align="center"  >
          <template #default="scope">
            <span>{{storyStatusMap.get(scope.row.status)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="类型" align="center" :show-overflow-tooltip="true">
          <template #default="scope">
            <span>{{storyTypesMap.get(scope.row.types)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="简介" align="center" key="intro" prop="intro" :show-overflow-tooltip="true"/>
        <el-table-column label="创建人" align="center" key="createName" prop="createName"
                         :show-overflow-tooltip="true"/>
        <el-table-column label="更新时间" align="center" prop="updateTime" width="160" :show-overflow-tooltip="true" />
        <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="详情" placement="top">
              <el-button
                  type="text"
                  icon="View"
                  @click="handleSee(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip v-if="scope.row.status==2" content="审核" placement="top">
              <el-button
                  type="text"
                  @click="handleAudit(scope.row)"
              >审核</el-button>
            </el-tooltip>
<!--            <el-tooltip content="删除" placement="top">-->
<!--              <el-button-->
<!--                  type="text"-->
<!--                  icon="Delete"-->
<!--                  @click="handleDelete(scope.row)"-->
<!--              ></el-button>-->
<!--            </el-tooltip>-->
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
  </div>
  <!--        分页-->
  <div style="float:right; position:relative; ">
    <pagination
        v-show="total > 0"
        :total="total"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        @pagination="getList"/>
  </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, reactive, ref, toRefs } from 'vue'
import { listStoryAdmin,audit } from "@/api/admin/story";
import { useRoute, useRouter } from "vue-router";
import {Search} from '@element-plus/icons-vue'
const fits = ['世界', '粉丝', '关注']
const activeIndex = ref('1')
const storyStatusMap = new Map([
  [1, "草稿"],
  [2, "待审核"],
  [3, "审核通过正常"],
  [4, "删除"],
  [5, "审核不通过"],
  [6, "隐藏"],
  [7, "锁定"],
]);

const storyTypesMap=new Map([
  [6,"科学"],
  [1,"武侠"],
  [2,"仙侠"],
  [3,"魔幻"],
  [4,"奇幻"],
  [5,"其他"]
])
const storyTypes=reactive([{id:6,name:"科学"},{id:1,name:"武侠"},{id:2,name:"仙侠"},{id:3,name:"魔幻"},{id:4,name:"奇幻"},{id:5,name:"其他"}])
const storyStatus=reactive([
  {id:2,name:"待审核"},
  {id:3,name:"审核通过正常"},
  {id:4,name:"删除"},
  {id:5,name:"审核不通过"},
  {id:6,name:"隐藏"},
  {id:7,name:"锁定"}

])


const temType = ref(1)
// 接收url里的参数
const route = useRoute();
const router = useRouter()
const wid = ref(null);
wid.value = route.query.wid;
const wname = ref('');
wname.value = <string>route.query.wname;
//console.log("世界id="+wid.value);
const {  appContext : { config: { globalProperties } }  } = getCurrentInstance();
const {  proxy  } = getCurrentInstance();
class World {
  id: number
  name: string
  types: string
  intro: string
  createTime:string
}
//分类选项
const dataStree = ref([])
const loading = ref(true);
const storyList = ref([]);
const total = ref(0);
const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    title: undefined,
    types: '',
    wid:wid.value,
    status:2,
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
function handleAudit (row)  {
  // router.push("/admin/elementEdit?eid="+row.id+"&wid=" + wid.value+"&temType=" + row.softtype);
}
function handleAdd()  {
  router.push("/admin/storyAdd?wname="+wname.value+"&wid=" + wid.value);
}

function handleSee(row){
  router.push("/element/details?wid="+row.wid+"&eid="+row.id);
}

/** 查询元素列表 */
function getList() {
  listStoryAdmin(globalProperties.addDateRange(queryParams.value, dateRange.value)).then(response => {
    loading.value = false;
    storyList.value = response.rows;
    total.value = response.total;
  });
}
getList();
const value = ref()
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
