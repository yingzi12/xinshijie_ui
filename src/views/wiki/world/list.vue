<template>
  <div class="app-container">
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>世界列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <div class="common-layout">
        <el-container>
          <el-aside width="200px">
            <el-card class="box-card">
              <template #header>
                <div class="card-header">
                  <span>分类</span>
                </div>
              </template>
              <div v-for="o in 4" :key="o" class="text item">{{ '类型 ' + o }}</div>
            </el-card>
          </el-aside>
          <el-main>
            <h1>世界列表</h1>
            <el-table v-loading="loading" :data="worldList" @selection-change="handleSelectionChange">
                            <el-table-column label="序号" width="50px" >
                              <template #default="scope">
                                 {{scope.$index+1+(queryParams.pageNum-1)*10}}
                              </template>
                            </el-table-column>
              <el-table-column label="名称" align="center" key="name" prop="name"  />
              <el-table-column label="类型" align="center" key="typeName" prop="typeName" :show-overflow-tooltip="true" />
              <el-table-column label="简介" align="center" key="intro" prop="intro"  :show-overflow-tooltip="true" />
              <el-table-column label="创建人" align="center" key="createName" prop="createName"  :show-overflow-tooltip="true" />
<!--              <el-table-column label="状态" align="center" key="status" >-->
<!--                <template #default="scope">-->
<!--                  <el-switch-->
<!--                      v-model="scope.row.status"-->
<!--                      active-value="0"-->
<!--                      inactive-value="1"-->
<!--                      @change="handleStatusChange(scope.row)"-->
<!--                  ></el-switch>-->
<!--                </template>-->
<!--              </el-table-column>-->
              <el-table-column label="更新时间" align="center" prop="updateTime"  width="160">
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
            <pagination
                v-show="total > 0"
                :total="total"
                v-model:page="queryParams.pageNum"
                v-model:limit="queryParams.pageSize"
                @pagination="getList"
            />
          </el-main>
        </el-container>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, reactive, ref, toRefs} from 'vue'
import { delWorld } from "@/api/admin/world";
import { listWorld } from "@/api/wiki/world";
import { useRouter} from "vue-router";
const router = useRouter()
const {  appContext : { config: { globalProperties } }  } = getCurrentInstance();
const {  proxy  } = getCurrentInstance();
class World {
  id: number
  name: string
  types: string
  intro: string
  createTime:string
}

const loading = ref(true);
const worldList = ref([]);
const total = ref(0);
const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    name: undefined
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
function handleUpdate (row)  {
  router.push("/world/edit?id="+row.id);
}
function handleDelete ( row){
  const worldId = row.id ;
  globalProperties.$modal.confirm('是否确认删除世界名称为"' + row.name + '"的数据？').then(function () {
    return delWorld(worldId);
  }).then(() => {
    getList();
    globalProperties.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

function handleSee(row){
  router.push("/world/details?id="+row.id);
}
/** 选择条数  */
function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.userId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
};
/** 查询世界列表 */
function getList() {
  listWorld(globalProperties.addDateRange(queryParams.value, dateRange.value)).then(response => {
    loading.value = false;
    worldList.value = response.rows;
    total.value = response.total;
  });
}
getList();
</script>

<style scoped>

</style>
