<template>
        <div>
          <el-menu
              :default-active="1"
              mode="horizontal"
              style="margin:0px;pardding:0px"
          >
            <el-menu-item index="1"><span style="font-size: 20px;font-weight:bold;">草稿管理</span></el-menu-item>
          </el-menu>
        </div>
        <!--        统计-->
        <div style="background-color:#b0c4de;margin: auto;padding: 10px">
          <el-row>
            <el-col :span="20">
              <el-input v-model="queryParams.title" placeholder="请输入元素名" class="input-with-select" style="width: 250px"/>
              <el-button :icon="Search" circle @click="getList"/>
            </el-col>
            <el-col :span="4" style="text-align: right;">
              <div style="text-align: right; font-size: 12px" class="toolbar">
                <el-button text @click="handleSeeLog">历史记录</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
        <!--        表格-->
        <div>
          <el-scrollbar>
            <el-table v-loading="loading" :data="elementList" >
              <el-table-column label="序号" width="50">
                <template #default="scope">
                  {{ scope.$index + 1 + (queryParams.pageNum - 1) * 10 }}
                </template>
              </el-table-column>
              <el-table-column label="名称" align="center" key="title" prop="title" :show-overflow-tooltip="true"/>
              <el-table-column label="世界" align="center" key="wname" prop="wname" :show-overflow-tooltip="true"/>
              <el-table-column label="类型" align="center" :show-overflow-tooltip="true">
              <template #default="scope">
                <el-tag v-for='idLabel in scope.row.idLabels.split(",")'>
                  {{idLabel.split("$$")[1]}}
                </el-tag>
              </template>
              </el-table-column>
              <el-table-column label="状态" align="center"  >
                <template #default="scope">
                  <span>{{elementStatus.get(scope.row.status)}}</span>
                </template>
              </el-table-column>
              <el-table-column label="简介" align="center" key="intro" prop="intro" :show-overflow-tooltip="true"/>
              <el-table-column label="更新时间" align="center" prop="updateTime" width="160" :show-overflow-tooltip="true">
                <template #default="scope">
                  <span>{{ scope.row.updateTime }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
                <template #default="scope">
                  <el-tooltip content="详情" placement="top">
                    <el-button
                        type="text"
                        icon="View"
                        @click="handleSee(scope.row)"
                    ></el-button>
                  </el-tooltip>
                  <el-tooltip content="修改" placement="top">
                    <el-button
                        type="text"
                        icon="Edit"
                        @click="handleUpdate(scope.row)"
                    ></el-button>
                  </el-tooltip>
                  <el-tooltip content="删除" placement="top">
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
import { getCurrentInstance, reactive, ref, toRefs} from 'vue'
import {  listDraft,delDraft,issue } from "@/api/admin/draftElement";
// import { getTree} from "@/api/wiki/category";
import {useRoute, useRouter} from "vue-router";
import { Menu as IconMenu, Search,Message, Setting } from '@element-plus/icons-vue'
const fits = ['世界', '粉丝', '关注']
const activeIndex = ref('1')

// 接收url里的参数
const route = useRoute();
const router = useRouter()
// const wid = ref(null);
// wid.value = route.query.wid;
// //console.log("世界id="+wid.value);
const {  appContext : { config: { globalProperties } }  } = getCurrentInstance();
const {  proxy  } = getCurrentInstance();
class World {
  id: number
  name: string
  types: string
  intro: string
  createTime:string
}
const elementStatus = new Map([
  [0, "草稿"],
  [1, "发布"],
  [3, "审核不通过"],
  [2, "通过审核"],
  [4, "删除"]
]);

const loading = ref(true);
const elementList = ref([]);
const total = ref(0);
const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    title: undefined,
    types: undefined,
    status:0,
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

function handleDelete ( row){
  globalProperties.$modal.confirm('是否确认删除元素名称为"' + row.title + '"的草稿数据？').then(function () {
    return delDraft(row.wid,row.id);
  }).then(() => {
    getList();
    globalProperties.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}
function handleUpdate (row)  {
  router.push("/admin/draftEdit?wid="+row.wid+"&deid="+row.id);
}
function handleSeeLog(row){
  router.push("/admin/draftLog?wid="+row.wid+"&deid="+row.id);
}
function handleSee(row){
  router.push("/admin/draftPreview?wid="+row.wid+"&deid="+row.id);
}
function handleIssue(row){
  //console.log("发布："+JSON.stringify(row))
  issue(row.id).then(response => {
    getList();
  });
}
/**根据分类查询世界*/
function findType(typeId:number) {
  // queryParams.value.wid=wid.value;
  listDraft(globalProperties.addDateRange(queryParams.value, dateRange.value)).then(response => {
    loading.value = false;
    elementList.value = response.rows;
    total.value = response.total;
  });
}
/** 查询元素列表 */
function getList() {
  listDraft(globalProperties.addDateRange(queryParams.value, dateRange.value)).then(response => {
    loading.value = false;
    elementList.value = response.rows;
    total.value = response.total;
  });
}
getList();


const value = ref()

const input3 = ref('')
const dialogFormVisible = ref(false)

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
