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
            <el-table :data="filterTableData" style="width: 100%">
              <el-table-column label="序号" width="50px" >
                <template #default="scope">
                   {{scope.$index+1}}
                </template>
              </el-table-column>
              <el-table-column label="名称" prop="name" />
              <el-table-column label="类型" prop="types" />
              <el-table-column label="简介" prop="intro" />
              <el-table-column label="创建人" prop="createName" />
              <el-table-column label="更新时间" prop="updateTime" sortable />
              <el-table-column align="right">
                <template #header>
                  <el-input v-model="name" size="small" placeholder="Type to search" />
                </template>
                <template #default="scope">
                  <el-button size="small" @click="handleSee(scope.row.id)" >查看</el-button>
                  <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                  <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination  background layout="prev, pager, next" :total="1000" />
          </el-main>
        </el-container>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed, reactive, ref, toRefs} from 'vue'
import {  listWorld } from "@/api/wiki/world";
import { useRouter} from "vue-router";
const router = useRouter()
interface World {
  id: number
  name: string
  types: string
  intro: string
}

const data = reactive({
  form: {},
  queryParams: {
    name: undefined,
  }
});

const { queryParams, form } = toRefs(data);

const filterTableData = ref([]);
const search = ref('')
const handleEdit = (index: number, row: World) => {
  console.log(index, row)
}
const handleDelete = (index: number, row: World) => {
  console.log(index, row)
}

const handleSee= (id: number) => {
  router.push("/world/details?id="+id);
}
/** 查询世界列表 */
function getList() {
  listWorld(queryParams.value).then(response => {
    filterTableData.value = response.rows
  });
}
getList();

const value = ref()
</script>

<style scoped>

</style>
