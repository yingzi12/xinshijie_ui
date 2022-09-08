<template>
        <div>
          <el-menu
              default-active="2"
              mode="horizontal"
              @select="handleSelect"
              style="margin:0px;pardding:0px"
          >
            <el-menu-item index="1" ><span style="font-size: 20px;font-weight:bold;">待审核元素</span></el-menu-item>
            <el-menu-item index="2"><span style="font-size: 20px;font-weight:bold;">已审核元素</span></el-menu-item>
          </el-menu>
        </div>
        <!--        多选-->
        <!--        统计-->
        <div style="background-color:#b0c4de;margin: auto;padding: 10px">
          <el-row>
            <el-col  :span="20">
              <el-tree-select v-model="value" :data="dataStree" check-strictly :render-after-expand="false"/>
              <el-input v-model="input3" placeholder="Please input" class="input-with-select" style="width: 250px"/>
              <el-button :icon="Search" circle/>
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
              <el-table-column label="序号"  width="50">
                <template #default="scope">
                  {{scope.$index+1}}
                </template>
              </el-table-column>
              <el-table-column prop="title" label="元素" width="140" />
              <el-table-column label="类型" align="center" :show-overflow-tooltip="true">
                <template #default="scope">
                  <el-tag v-for='idLabel in scope.row.idLabels.split(",")'>
                    {{idLabel.split("$$")[1]}}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="wname" label="世界" width="140" />
              <el-table-column label="状态" align="center"  >
                <template #default="scope">
                  <span>{{elementStatus.get(scope.row.status)}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="createTime" label="修改时间" :show-overflow-tooltip="true" />
              <el-table-column prop="causeNumber" label="修改原因" />
              <el-table-column prop="causeContent" label="修改说明" :show-overflow-tooltip="true" />
              <el-table-column prop="createName" label="修改人" />
              <el-table-column fixed="right" label="操作" width="120">
                <template #default="scope">
                  <el-button link type="primary" size="small" @click="handleSee(scope.row)">详细</el-button>
                  <el-button link type="primary" size="small" @click="handleDiff(scope.row)">差异</el-button>
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
      <!--      审核弹出框-->
      <el-dialog v-model="dialogFormVisible" title="审核">
        <el-form :model="form">
          <el-form-item label="Zones" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="Please select a zone">
              <el-option label="Zone No.1" value="shanghai" />
              <el-option label="Zone No.2" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="说明" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off" />
          </el-form-item>
        </el-form>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确认</el-button>
      </span>
        </template>
      </el-dialog>
</template>

<script lang="ts" setup>
import {getCurrentInstance, reactive, ref, toRefs} from 'vue'
import {useRoute, useRouter} from "vue-router";
import { listDraft } from "@/api/admin/draftElement";
const router = useRouter()
const elementStatus = new Map([
  [0, "草稿"],
  [1, "发布"],
  [3, "审核不通过"],
  [2, "通过审核"],
  [4, "删除"]
]);
// 接收url里的参数
const route = useRoute();
console.log(route.query.wid,"参数");
const activeIndex = ref('1')
//弹出框
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

//搜索框
import { Search } from '@element-plus/icons-vue'
const input3 = ref('')

const {  appContext : { config: { globalProperties } }  } = getCurrentInstance();
const {  proxy  } = getCurrentInstance();
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
    pageSize: 10,
    auditStatus:1,
    name: undefined,
    types: undefined,
  },
  rules: {
    // userName: [{ required: true, message: "用户名称不能为空", trigger: "blur" }, { min: 2, max: 20, message: "用户名称长度必须介于 2 和 20 之间", trigger: "blur" }],
  }
});
const { queryParams, form, rules } = toRefs(data);

/** 查询世界列表 */
function getList() {
  listDraft(globalProperties.addDateRange(queryParams.value, dateRange.value)).then(response => {
    loading.value = false;
    draftList.value = response.rows;
    total.value = response.total;
  });
}
// /** 查询分类列表 */
// function getCategoryTree() {
//   getTree(wid.value).then(response => {
//     dataStree.value = response.data
//   });
// }
function handleSelect(index:String,indexPath:String){
  if(index =='1'){
    router.push("/admin/audit");
  }
  console.log(indexPath)
}
function handleAudit(row){
  router.push("/admin/audit");
}
function handleSee(row){
  router.push("/admin/draftPreview?wid="+row.wid+"&deid="+row.id);
}
function handleDiff(row){
  router.push("/admin/diffPreview?wid="+row.wid+"&deid="+row.id);
}
getList();
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
