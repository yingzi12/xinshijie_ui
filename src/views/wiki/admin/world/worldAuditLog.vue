<template>
        <!--        标题-->
    <AdminHead :head-type="5" :wid="wid"></AdminHead>

  <!--        统计-->
        <div style="background-color:#b0c4de;margin: auto;padding: 10px">
          <el-row>
            <el-col  :span="20">
              <el-tree-select v-model="queryParams.types" :data="dataStree" check-strictly :render-after-expand="false" clearable />
              <el-input v-model="queryParams.title" placeholder="请输入元素名称" class="input-with-select" style="width: 250px"/>
              <el-button :icon="Search" circle @click="getList(1)"/>
            </el-col >
            <el-col :span="4"  style="text-align: right;">
              <div style="text-align: right; font-size: 12px" class="toolbar">
                <el-button text @click="handleAudit">返回</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
        <!--        表格-->
        <div>
          <el-scrollbar>
            <el-table :data="draftList">
              <el-table-column label="序号"  width="50" >
                <template #default="scope">
                  {{scope.$index+1}}
                </template>
              </el-table-column>
              <el-table-column prop="title" label="元素" width="140" :show-overflow-tooltip="true"/>
              <el-table-column label="状态" align="center" :show-overflow-tooltip="true" >
                <template #default="scope">
                  <span>{{elementStatus.get(scope.row.status)}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="createTime" label="修改时间" :show-overflow-tooltip="true"/>
              <el-table-column prop="causeNumber" label="修改原因" :show-overflow-tooltip="true" />
              <el-table-column prop="causeContent" label="修改说明" :show-overflow-tooltip="true"/>
              <el-table-column prop="createName" label="修改人" :show-overflow-tooltip="true"/>
              <el-table-column prop="updateTime" label="审核时间"  :show-overflow-tooltip="true"/>
              <el-table-column prop="updateName" label="审核人" :show-overflow-tooltip="true" />
              <el-table-column prop="auditContent" label="审核理由" :show-overflow-tooltip="true"/>
              <el-table-column fixed="right" label="操作" width="220">
                <template #default="scope">
                  <el-button link type="primary" size="small" @click="handleSee(scope.row)">详细</el-button>
                  <el-button link type="primary" size="small" @click="handleDiff(scope.row)">差异</el-button>
                  <el-button link type="primary" size="small" @click="handleAuditDetial(scope.row)">审核</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-scrollbar>
        </div>
        <!--        分页-->
        <div style="float:right; position:relative; ">
          <el-pagination

              :total="total"
              layout="total, prev, pager, next"

              v-model:page="queryParams.pageNum"
              :page-size=20
              @current-change="getList"/>
        </div>
</template>

<script lang="ts" setup>
import AdminHead from './worldHead'

import { reactive, ref, toRefs} from 'vue'
import {useRoute, useRouter} from "vue-router";
import { Menu as IconMenu,CirclePlus, Message, Setting } from '@element-plus/icons-vue'
import { listAudit } from "@/api/admin/draftElement";
import { getTree} from "@/api/wiki/category";
const router = useRouter()

// 接收url里的参数
const route = useRoute();
const wid = ref(null);
wid.value = route.query.wid;
const wname = ref('');
wname.value = <string>route.query.wname;
const elementStatus = new Map([
  [0, "草稿"],
  [1, "待审核"],
  [3, "不通过"],
  [2, "通过"],
  [4, "删除"],
  [5, "超时发布自动拒绝"],
  [6, "超时审核自动通过"],
]);
const activeIndex = ref('1')
//弹出框
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
//搜索框
import { Search } from '@element-plus/icons-vue'
const input3 = ref('')



//分页
const dateRange = ref([]);
//分类选项
const dataStree = ref([])
const loading = ref(true);
const draftList = ref([]);
const total = ref(0);
const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,

    auditStatus:1,
    title: undefined,
    types: '',
    wid:wid.value,
  },
  rules: {
    // userName: [{ required: true, message: "用户名称不能为空", trigger: "blur" }, { min: 2, max: 20, message: "用户名称长度必须介于 2 和 20 之间", trigger: "blur" }],
  }
});
const { queryParams, form, rules } = toRefs(data);

/** 查询世界列表 */
function getList(page: number) {
  window.scrollTo(0, 0); // 滚动到顶部
  queryParams.value.pageNum=page;

  if(queryParams.value.types != undefined && queryParams.value.types != '' ){
    queryParams.value.types=queryParams.value.types.split("$$")[0]
  }
  listAudit(queryParams.value).then(response => {
    loading.value = false;
    draftList.value = response.data;
    total.value = response.total;
  });
}
/** 查询分类列表 */
function getCategoryTree() {
  getTree(wid.value).then(response => {
    dataStree.value = response.data
  });
}
function handleAuditDetial(row){
  dialogFormVisible.value=true;
}
function handleSee(row){
  router.push("/admin/worldAuditPreview?wid="+wid.value+"&wname="+wname.value+"&deid="+row.id+"&temType="+row.softtype);
}
function handleAudit(){
  router.push("/admin/worldAudit?wid="+wid.value+"&wname="+wname.value);
}
function handleDiff(row){
  router.push("/admin/worldDiffPreview?wid="+row.wid+"&deid="+row.id+"&temType="+row.softtype);
}
getCategoryTree();
getList(queryParams.value.pageNum);

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
