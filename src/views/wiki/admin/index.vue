<template>
  <el-container class="layout-container-demo" >
    <!--    侧边栏-->
    <!--    表格-->
    <el-container style="margin: 10px">
      <!--       内容区-->
      <el-main>
        <div>
          <el-menu
              :default-active="1"
              mode="horizontal"
              style="margin:0px;pardding:0px"
          >
            <el-menu-item index="1">关注的世界</el-menu-item>
<!--            <el-menu-item index="2">关注的故事</el-menu-item>-->
          </el-menu>
        </div>
        <!--        统计-->
        <div style="background-color:#b0c4de;margin: auto;padding: 10px">
          <el-row>
            <el-col  :span="4">
              合计({{total}})
            </el-col >
            <el-col :span="20"  style="text-align: right;">
            </el-col>
          </el-row>
        </div>
        <!--        表格-->
        <div>
          <el-scrollbar>
            <el-table :data="fllowList">
              <el-table-column label="序号" width="50"  >
                <template #default="scope">
                  {{scope.$index+1}}
                </template>
              </el-table-column>
              <el-table-column prop="wname" label="名称"  />
              <el-table-column label="类别" align="center"  >
                <template #default="scope">
                  <span>{{worldTypesMap.get(scope.row.types)}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="ranks" label="等级" />
              <el-table-column prop="intro" label="简介" :show-overflow-tooltip="true" />
              <el-table-column prop="updateNewElementTime" label="更新时间" :show-overflow-tooltip="true" />
              <el-table-column prop="updateNewElement" label="更新元素" />
              <el-table-column prop="createTime" label="关注时间" :show-overflow-tooltip="true" />
              <el-table-column fixed="right" label="操作" width="100">
                <template #default="scope">
                  <el-button link type="primary" size="small" @click="handleClick(scope.row)">取消关注</el-button>
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
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import {getCurrentInstance, reactive, ref, toRefs} from 'vue'
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'
import { listFllow,fllowClose } from "@/api/admin/fllow";
import {ElMessage} from "element-plus";
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
const {  appContext : { config: { globalProperties } }  } = getCurrentInstance();
const worldTypes=reactive([{id:0,name:"科学"},{id:1,name:"武侠"},{id:2,name:"仙侠"},{id:3,name:"魔幻"},{id:4,name:"奇幻"},{id:5,name:"其他"}])
const worldTypesMap=new Map([
    [0,"科学"],
    [1,"武侠"],
    [2,"仙侠"],
    [3,"魔幻"],
    [4,"奇幻"],
    [5,"其他"],
])


const { queryParams, form, rules } = toRefs(data);
const dateRange = ref([]);
const fllowList = ref([]);
function handleClick(row){
  fllowClose(row.wid).then(response => {
    ElMessage.success("取消成功");
    getList();
  });
}
/** 查询世界列表 */
function getList() {
  listFllow(globalProperties.addDateRange(queryParams.value, dateRange.value)).then(response => {
    fllowList.value = response.rows;
    total.value = response.total;
  });
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
