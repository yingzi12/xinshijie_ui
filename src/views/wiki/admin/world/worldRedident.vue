<template>
    <AdminHead :head-type="7" :wid="wid" :wname="wname"></AdminHead>

  <!--        统计-->
        <div style="background-color:#b0c4de;margin: auto;padding: 10px">
          <el-row>
            <el-col  :span="20">
              <el-input v-model="queryParams.userName" placeholder="请输入用户名称" class="input-with-select" style="width: 250px"/>
              <el-button :icon="Search" circle @click="getList(1)"/>
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
            <el-table :data="redidentList">
              <el-table-column label="序号" width="80" >
                <template #default="scope">
                  {{scope.$index+1}}
                </template>
              </el-table-column>
              <el-table-column prop="createTime" label="时间" width="140" :show-overflow-tooltip="true" />
              <el-table-column prop="createName" label="姓名" width="120" :show-overflow-tooltip="true"  />
              <el-table-column prop="ranks" label="等级" width="120" />
              <el-table-column prop="countNew" label="新增" width="120" />
              <el-table-column prop="countEdit" label="编辑" width="120" />
              <el-table-column prop="countSee" label="查看" width="120" />
              <el-table-column prop="countComment" label="评论数" width="120" />
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
              @current-change="getList"
          />
        </div>
</template>

<script lang="ts" setup>
import AdminHead from './worldHead'

import { reactive, ref, toRefs} from 'vue'
import {useRoute} from "vue-router";
import { listRedident } from "@/api/admin/redident";

// 接收url里的参数
const route = useRoute();
//console.log(route.query.wid,"参数");
const wid = ref(null);
wid.value = route.query.wid;
const wname = ref('');
wname.value = <string>route.query.wname;




//分页
const dateRange = ref([]);
//分类选项
const dataStree = ref([])
const loading = ref(true);
const redidentList = ref([]);
const total = ref(0);
const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,

    auditStatus:0,
    userName: undefined,
    wid: wid.value,
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

  listRedident(queryParams.value).then(response => {
    loading.value = false;
    redidentList.value = response.data;
    total.value = response.total;
  });
}


import { Search } from '@element-plus/icons-vue'
const input3 = ref('')

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
