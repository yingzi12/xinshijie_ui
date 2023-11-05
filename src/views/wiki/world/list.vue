<template>
  <div class="app-container">
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
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
                            <el-table-column label="序号" width="100px" >
                              <template #default="scope">
                                 {{scope.$index+1+(queryParams.pageNum-1)*20}}
                              </template>
                            </el-table-column>
              <el-table-column label="名称" align="center"   >
                <template #default="scope">
                  <router-link :to="{path:'/world/details', query: {wid:scope.row.id,wname:scope.row.name}}">
                     <span><el-tag v-if="scope.row.source=='原创'">原创</el-tag>{{scope.row.name}}</span>
                  </router-link>
                </template>
              </el-table-column>
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
            <el-pagination
                :total="total"
                layout="total, prev, pager, next"
                v-model:page="queryParams.pageNum"
                :page-size=20
                @current-change="getList"
            />
            </div>
          </el-main>
        </el-container>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs} from 'vue'
import { listWorld } from "@/api/wiki/world";
import { useRouter} from "vue-router";
import {worldTypesMap ,worldTypes} from "@/utils/constant";

const router = useRouter()


class World {
  id: number
  name: string
  types: string
  intro: string
  createTime:string
}


const wname=ref('');
const wtypes=ref(null);
const loading = ref(true);
const worldList = ref([]);
const total = ref(0);
const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,

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
  listWorld(queryParams.value).then(response => {
    loading.value = false;
    worldList.value = response.data;
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
function getList(page: number) {
  window.scrollTo(0, 0); // 滚动到顶部
  queryParams.value.pageNum=page;

  listWorld(queryParams.value).then(response => {
    loading.value = false;
    worldList.value = response.data;
    total.value = response.total;
  });
}
getList(queryParams.value.pageNum);

</script>

<style scoped>

</style>
