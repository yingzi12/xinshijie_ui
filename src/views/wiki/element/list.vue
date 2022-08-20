<template>
  <div class="app-container">
    <div>
      <el-row >
        <el-col :span="21">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
            <el-breadcrumb-item
            ><a href="/public">promotion management</a></el-breadcrumb-item
            >
            <el-breadcrumb-item>promotion list</el-breadcrumb-item>
            <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
        <el-col :span="3">
          <el-button>添加新元素</el-button>
        </el-col>
      </el-row>
    </div>
    <div>
      <div class="common-layout">
        <el-container>
          <el-main>
            分类:<el-tree-select
                v-model="value"
                :data="data2"
                check-strictly
                :render-after-expand="false"
                filterable
            />
            <el-table :data="filterTableData" style="width: 100%">
              <el-table-column label="Date" prop="date" sortable />
              <el-table-column label="Name" prop="name" />
              <el-table-column align="right">
                <template #header>
                  <el-input v-model="name" size="small" placeholder="Type to search" />
                </template>
                <template #default="scope">
                  <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                  <el-button
                      size="small"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)"
                  >Delete</el-button
                  >
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

interface World {
  id: number
  name: string
  types: string
  desc: string
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

/** 查询世界列表 */
function getList() {
  listWorld(queryParams.value).then(response => {
    filterTableData.value = response.data
  });
}
getList();

const value = ref()

const data2 = [
  {
    value: '1',
    label: 'Level one 1',
    children: [
      {
        value: '1-1',
        label: 'Level two 1-1',
        children: [
          {
            value: '1-1-1',
            label: 'Level three 1-1-1',
          },
        ],
      },
    ],
  },
  {
    value: '2',
    label: 'Level one 2',
    children: [
      {
        value: '2-1',
        label: 'Level two 2-1',
        children: [
          {
            value: '2-1-1',
            label: 'Level three 2-1-1',
          },
        ],
      },
      {
        value: '2-2',
        label: 'Level two 2-2',
        children: [
          {
            value: '2-2-1',
            label: 'Level three 2-2-1',
          },
        ],
      },
    ],
  },
  {
    value: '3',
    label: 'Level one 3',
    children: [
      {
        value: '3-1',
        label: 'Level two 3-1',
        children: [
          {
            value: '3-1-1',
            label: 'Level three 3-1-1',
          },
        ],
      },
      {
        value: '3-2',
        label: 'Level two 3-2',
        children: [
          {
            value: '3-2-1',
            label: 'Level three 3-2-1',
          },
        ],
      },
    ],
  },
]
</script>

<style scoped>

</style>
