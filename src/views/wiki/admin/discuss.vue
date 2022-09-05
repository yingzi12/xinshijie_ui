<template>
  <el-container class="layout-container-demo" >
    <!--    表格-->
    <el-container style="margin: 10px">
      <!--       内容区-->
      <el-main>
        <div>
          <el-menu
              default-active="1"
              mode="horizontal"
              style="margin:0px;pardding:0px;"
          >
            <el-menu-item index="1"><span style="font-size: 20px;font-weight:bold;">我的讨论</span></el-menu-item>
          </el-menu>
        </div>
        <!--        统计-->
        <div style="background-color:#b0c4de;margin: auto;padding: 10px">
          <el-row>
            <el-col  :span="20">
              <el-select v-model="value" placeholder="类型">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                />
              </el-select>
              <el-select placeholder="处理状态">
                <el-option label="已处理" value="已处理"/>
                <el-option label="讨论中" value="讨论中"/>
              </el-select>
              <el-input v-model="input3" placeholder="Please input" class="input-with-select" style="width: 250px"/>
              <el-button :icon="Search" circle />
            </el-col >
            <el-col :span="4"  style="text-align: right;">
              <div style="text-align: right; font-size: 12px" class="toolbar">
                <span>Tom</span>
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
              <el-table-column prop="wname" label="世界名称" width="140" />
              <el-table-column prop="etitle" label="元素名称" width="120" />
              <el-table-column prop="title" label="讨论主题"   :show-overflow-tooltip="true"/>
              <el-table-column prop="types" label="讨论类型"  />
              <el-table-column prop="content" label="讨论内容"  :show-overflow-tooltip="true" />
              <el-table-column prop="createTime" label="创建时间"  :show-overflow-tooltip="true" />
              <el-table-column prop="status" label="状态" />
              <el-table-column prop="audit" label="审核结果" :show-overflow-tooltip="true"/>
              <el-table-column fixed="right" label="操作" width="220">
                <template #default>
                  <el-button link type="primary" size="small" @click="handleClick">查看</el-button>
                  <el-button link type="primary" size="small" @click="dialogFormVisible = true">关闭</el-button>
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
import {useRoute, useRouter} from "vue-router";
import { Search } from '@element-plus/icons-vue'
import { listDiscuss } from "@/api/admin/discuss";


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
    name: undefined,
    types: undefined,
    // wid:wid.value,
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
