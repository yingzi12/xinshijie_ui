<template>
  <!--        标题-->
  <div>
    <el-menu
        :default-active="activeIndex"
        mode="horizontal"
        @select="handleSelect"
        style="margin:0px;pardding:0px"
    >
      <el-menu-item index="1"><span style="font-size: 20px;font-weight:bold;">我的讨论</span></el-menu-item>
    </el-menu>
  </div>  <!--        多选-->
  <!--        统计-->
  <div style="background-color:#b0c4de;margin: auto;padding: 10px">
    <el-row>
      <el-col  :span="20">
        <el-select v-model="queryParams.types" placeholder="类型" clearable >
          <el-option
              v-for="item in discussTypes"
              :key="item.id"
              :label="item.name"
              :value="item.id"
          />
        </el-select>
        <el-select placeholder="处理状态" v-model="queryParams.status" clearable >
          <el-option
              v-for="item in discussStatus"
              :key="item.id"
              :label="item.name"
              :value="item.id"
          />
        </el-select>
        <el-input v-model="queryParams.title" placeholder="请输入主题" class="input-with-select" style="width: 250px"/>
        <el-button :icon="Search" circle @click="getList"/>
      </el-col >
      <el-col :span="4"  style="text-align: right;">
        <div style="text-align: right; font-size: 12px" class="toolbar">
        </div>
      </el-col>
    </el-row>
  </div>
  <!--        表格-->
  <div>
    <el-scrollbar>
      <el-table :data="discussList">
        <el-table-column label="序号" width="50">
          <template #default="scope">
            {{scope.$index+1}}
          </template>
        </el-table-column>
        <el-table-column prop="wname" label="世界" width="100" :show-overflow-tooltip="true"/>
        <el-table-column prop="etitle" label="元素" width="100" :show-overflow-tooltip="true"/>
        <el-table-column prop="title" label="主题"   :show-overflow-tooltip="true"/>
        <el-table-column  label="讨论类型"  :show-overflow-tooltip="true">
          <template #default="scope">
            <span>{{discussTypesMap.get(scope.row.types)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="comment" label="讨论内容"  :show-overflow-tooltip="true" />
        <el-table-column prop="createTime" label="创建时间"  :show-overflow-tooltip="true" />
        <el-table-column  label="状态" >
          <template #default="scope">
            <span>{{discussStatusMap.get(scope.row.status)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="reply" label="审核结果" :show-overflow-tooltip="true"/>
        <el-table-column fixed="right" label="操作" width="150">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="handleSee(scope.row)">查看</el-button>
            <el-button link v-if="scope.row.types == 1" type="primary" size="small" @click="handleCloes(scope.row)">关闭</el-button>
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
import {getCurrentInstance, reactive, ref, toRefs} from 'vue'
import {useRoute, useRouter} from "vue-router";
import { Search } from '@element-plus/icons-vue'
import { listDiscuss,updateStatus } from "@/api/admin/discuss";
import {ElMessage, ElMessageBox} from "element-plus";

// 接收url里的参数
// 接收url里的参数
const route = useRoute()
const router = useRouter()
//console.log(route.query.wid,"参数");
const wid = ref(null);
const wname = ref('');
wname.value = <string>route.query.wname;
wid.value = route.query.wid;
const discussTypesMap = new Map([
  [1, "自由讨论"],
  [2, "建议"],
  [3, "内容错误"],
  [4, "内容缺失"],
  [5, "过多重复"],
  [6, "内容不相关"],
  [7, "其他"],

]);
const discussStatusMap = new Map([
  [1, "待处理"],
  [2, "已处理"],
  [3, "关闭"],
])
const discussTypes = ref([
  {id:1,name:"自由讨论"},
  {id:2,name:"建议"},
  {id:3,name:"内容错误"},
  {id:4,name:"内容缺失"},
  {id:5,name:"过多重复"},
  {id:6,name:"内容不相关"},
  {id:7,name:"其他"},
]);
const discussStatus =ref([
  {id:1, name:"待处理"},
  {id:2, name:"已处理"},
  {id:3, name:"关闭"},
])
const {  appContext : { config: { globalProperties } }  } = getCurrentInstance();
const {  proxy  } = getCurrentInstance();
//分页
const dateRange = ref([]);
//分类选项
const dataStree = ref([])
const loading = ref(true);
const discussList = ref([]);
const total = ref(0);
const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    auditStatus:0,
    title: undefined,
    types: undefined,
    status:1
  },
  rules: {
    // userName: [{ required: true, message: "用户名称不能为空", trigger: "blur" }, { min: 2, max: 20, message: "用户名称长度必须介于 2 和 20 之间", trigger: "blur" }],
  }
});
const { queryParams, form, rules } = toRefs(data);

/** 查询世界列表 */
function getList() {
  listDiscuss(globalProperties.addDateRange(queryParams.value, dateRange.value)).then(response => {
    loading.value = false;
    discussList.value = response.rows;
    total.value = response.total;
  });
}
//搜索框
const input3 = ref('')

//弹出框
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
function handleSee(row){
  router.push("/discuss/index?wid="+row.wid+"&wname="+row.wname+"&did="+row.id);
}
function handleCloes(row){
  form.value.id=row.id
  form.value.wid=row.wid
  form.value.status=3
  form.value.reply='手动关闭'
  ElMessageBox.confirm('是否确定关闭该讨论')
      .then(() => {
        updateStatus(form.value).then(response => {
          ElMessage.success("关闭成功")
          getList();
        })
      })
      .catch(() => {
        // catch error
      })

}

getList()
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
