<template>
  <div>
    <el-menu
        :default-active="1"
        mode="horizontal"
        style="margin:0px;pardding:0px"
    >
      <el-menu-item index="1"><span style="font-size: 20px;font-weight:bold;">故事管理</span></el-menu-item>
    </el-menu>
  </div>
  <!--        多选-->
  <div style="padding: 10px">
    <el-space wrap>
      <el-button text @click="findType(null)">全部</el-button>
      <div v-for="types in storyTypes" :key="i">
        <el-button text @click="findType(types.id)">{{types.name }} </el-button>
      </div>
    </el-space>
  </div>
  <!--        统计-->
  <div style="background-color:#b0c4de;margin: auto;padding: 10px">
    <el-row>
      <el-col  :span="4">
        合计({{ total }})
      </el-col >
      <el-col :span="20"  style="text-align: right;">
<!--        <div style="text-align: right; font-size: 12px" class="toolbar">-->
<!--          <el-button text @click="handleAdd">创建世界</el-button>-->
<!--        </div>-->
      </el-col>
    </el-row>
  </div>
  <!--        表格-->
  <div>
    <el-scrollbar>
      <el-table v-loading="loading" :data="storyList" >
        <el-table-column label="序号" width="50" >
          <template #default="scope">
            {{scope.$index+1+(queryParams.pageNum-1)*10}}
          </template>
        </el-table-column>
        <el-table-column label="故事" align="center" key="name" prop="name"  :show-overflow-tooltip="true">
          <template #default="scope">
            <router-link  :to="{path:'/admin/storyInfo', query: {sid:scope.row.id,sname:scope.row.name}}"><el-tag v-if="scope.row.source=='原创'">原创</el-tag>{{scope.row.name}}</router-link>
          </template>
        </el-table-column>
        <el-table-column label="世界" align="center" key="name" prop="name"  :show-overflow-tooltip="true">
          <template #default="scope">
            <router-link  :to="{path:'/admin/worldInfo', query: {wid:scope.row.wid,wname:scope.row.wname}}">{{scope.row.wname}}</router-link>
          </template>
        </el-table-column>
        <el-table-column label="等级" align="center" key="ranks" prop="ranks"   width="50"/>
        <el-table-column label="类型" align="center" :show-overflow-tooltip="true"  width="80" >
          <template #default="scope">
            <span>{{storyTypesMap.get(scope.row.types)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="简介" align="center" key="intro" prop="intro"  :show-overflow-tooltip="true" />
        <el-table-column label="状态" align="center"  >
          <template #default="scope">
            <span>{{storyStatus.get(scope.row.status)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建人" align="center" key="createName" prop="createName"  :show-overflow-tooltip="true" />
        <el-table-column label="更新时间" align="center" prop="updateTime"  width="160" :show-overflow-tooltip="true">
          <template #default="scope">
            <span>{{scope.row.updateTime}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="详情" placement="top" >
              <el-button
                  type="text"
                  icon="View"
                  @click="handleSee(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip content="修改" placement="top" >
              <el-button
                  type="text"
                  icon="Edit"
                  @click="handleUpdate(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip v-if="scope.row.status == 1" content="发布" placement="top" >
              <el-button
                  type="text"
                  icon="Position"
                  @click="handleIssue(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top" >
              <el-button
                  type="text"
                  icon="Delete"
                  @click="handleDelete(scope.row)"
              ></el-button>
            </el-tooltip>
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
        @pagination="getList"
    />
  </div>
</template>

<script lang="ts" setup>
import {getCurrentInstance, inject, reactive, ref, toRefs} from 'vue'
import {  listStoryAdmin,delStory,issue } from "@/api/admin/story";
import { useRouter} from "vue-router";
const fits = ['世界', '粉丝', '关注']
const activeIndex = ref('1')
const baseUrl = inject("$baseUrl")

const router = useRouter()
const {  appContext : { config: { globalProperties } }  } = getCurrentInstance();
const {  proxy  } = getCurrentInstance();
class Story {
  id: number
  name: string
  types: string
  intro: string
  createTime:string
}
const storyStatus = new Map([
  [1, "草稿"],
  [2, "待审核"],
  [3, "正常"],
  [5, "审核不通过"],
  [4, "删除"],
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
const loading = ref(true);
const storyList = ref([]);
const total = ref(0);
const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    name: undefined,
    types: undefined,
  },
  rules: {
    // userName: [{ required: true, message: "用户名称不能为空", trigger: "blur" }, { min: 2, max: 20, message: "用户名称长度必须介于 2 和 20 之间", trigger: "blur" }],
  }
});
const storyTypes=reactive([{id:6,name:"科学"},{id:1,name:"武侠"},{id:2,name:"仙侠"},{id:3,name:"魔幻"},{id:4,name:"奇幻"},{id:5,name:"其他"}])
const { queryParams, form, rules } = toRefs(data);
const dateRange = ref([]);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const search = ref('')
function handleUpdate (row)  {
  router.push("/admin/storyEdit?sid="+row.id);
}
function handleAdd ()  {
  router.push("/story/add");
}

function handleDelete ( row){
  const storyId = row.id ;
  globalProperties.$modal.confirm('是否确认删除故事名称为"' + row.name + '"的数据？').then(function () {
    return delStory(storyId);
  }).then(() => {
    getList();
    globalProperties.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

function handleSee(row){
  router.push("/admin/storyInfo?sid="+row.id);
}
function handleIssue(row){
  //console.log("发布："+JSON.stringify(row))
  issue(row.id).then(response => {
    getList();
  });
}
/** 查询故事列表 */
function getList() {
  listStoryAdmin(globalProperties.addDateRange(queryParams.value, dateRange.value)).then(response => {
    loading.value = false;
    storyList.value = response.rows;
    total.value = response.total;
  });
}
getList();
</script>

<style scoped>
</style>
