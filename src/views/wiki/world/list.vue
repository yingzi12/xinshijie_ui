<template>
  <div class="app-container">
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/wiki/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>世界列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div >
        <el-container >
          <el-aside width="180px">
            <h3 class="mb-2">分类</h3>
            <el-menu
                  default-active="-1"
                  class="el-menu-vertical-demo"
              >
              <el-menu-item index="-1" @click="handFind(null)">
                <el-icon><icon-menu /></el-icon>
                <span>全部</span>
              </el-menu-item>
              <el-menu-item  v-for="types in worldTypes"  :index="types.id" @click="handFind(types.id)">
                  <el-icon><icon-menu /></el-icon>
                  <span>{{types.name }}</span>
                </el-menu-item>
              </el-menu>
          </el-aside>
          <el-main>
            <div>
            <span style="size: 30px">世界列表</span><el-button style="float: right" @click="handleAdd">创建世界</el-button>
            <el-table v-loading="loading" :data="worldList"  style="width:100%">
                            <el-table-column label="序号" width="50px" >
                              <template #default="scope">
                                 {{scope.$index+1+(queryParams.pageNum-1)*10}}
                              </template>
                            </el-table-column>
              <el-table-column label="名称" align="center" key="name" prop="name"  />
              <el-table-column label="等级" align="center" key="ranks" prop="ranks"  width="50" />
              <el-table-column label="类型" align="center" :show-overflow-tooltip="true" width="80" >
                <template #default="scope">
                  <span>{{worldTypesMap.get(scope.row.types)}}</span>
                </template>
              </el-table-column>
              <el-table-column label="简介" align="center" key="intro" prop="intro"  :show-overflow-tooltip="true" />
              <el-table-column label="创建人" align="center" key="createName" prop="createName"  :show-overflow-tooltip="true" />
              <el-table-column label="更新时间" align="center" prop="updateTime"  width="160">
                <template #default="scope">
                  <span>{{scope.row.updateTime}}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
                <template #header>
                  <el-input v-model="wname" size="small" placeholder="请输入世界名称" @change="handFind(wtypes)"/>
                </template>
                <template #default="scope">
                  <el-tooltip content="详情" placement="top" >
                    <el-button
                        type="text"
                        icon="View"
                        @click="handleSee(scope.row)"
                    ></el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
            </div>
<!--            分页-->
            <div style="float:right; position:relative">
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
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, reactive, ref, toRefs} from 'vue'
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
const worldTypesMap=new Map([
     [6,"科学"],
   [1,"武侠"],
  [2,"仙侠"],
  [3,"魔幻"],
  [4,"奇幻"],
  [5,"其他"]
])

const worldTypes=reactive([{id:6,name:"科学"},{id:1,name:"武侠"},{id:2,name:"仙侠"},{id:3,name:"魔幻"},{id:4,name:"奇幻"},{id:5,name:"其他"}])
const wname=ref('');
const wtypes=ref(null);
const loading = ref(true);
const worldList = ref([]);
const total = ref(0);
const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    name: undefined,
    types: null,
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
  router.push("/world/edit?wid="+row.id);
}
// function handleDelete ( row){
//   const worldId = row.id ;
//   globalProperties.$modal.confirm('是否确认删除世界名称为"' + row.name + '"的数据？').then(function () {
//     return delWorld(worldId);
//   }).then(() => {
//     getList();
//     globalProperties.$modal.msgSuccess("删除成功");
//   }).catch(() => {});
// }
function handFind(types:number){
  if(!types || types== -1  ) {
    queryParams.value.types =null;
  }else{
    queryParams.value.types =types;
  }
  if(wname.value != null && wname.value != '' && wname.value != undefined) {
    queryParams.value.name=wname.value;
  }else{
    queryParams.value.name=null;
  }
  listWorld(globalProperties.addDateRange(queryParams.value, dateRange.value)).then(response => {
    loading.value = false;
    worldList.value = response.rows;
    total.value = response.total;
  });
}
function handleAdd(){
  router.push("/world/add");
}
//查看详细
function handleSee(row){
  router.push("/world/details?wid="+row.id);
}
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
