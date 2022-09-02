<template>
  <el-container class="layout-container-demo" >
    <!--    侧边栏-->
    <!--    表格-->
    <el-container style="margin: 10px">
      <!--       内容区-->
      <el-main>
        <!--        标题-->
        <div>
          <el-menu
              :default-active="1"
              mode="horizontal"
              style="margin:0px;pardding:0px"
          >
            <el-menu-item index="1">{{wname}}</el-menu-item>
          </el-menu>
        </div>
        <!--        多选-->
        <div style="padding: 10px">
          <el-space wrap>
            <el-button text > <router-link :to="{path:'/admin/worldInfo', query: {wid:wid,wname:wname}}">简介</router-link></el-button>
            <el-button text>  <router-link :to="{path:'/admin/worldManage', query: {wid:wid,wname:wname}}">造物主列表</router-link></el-button>
            <el-button text>  <router-link :to="{path:'/admin/worldElement', query: {wid:wid,wname:wname}}">元素列表</router-link></el-button>
            <el-button text>  <router-link :to="{path:'/admin/worldCategory', query: {wid:wid,wname:wname}}">分类管理</router-link></el-button>
            <el-button text>  <router-link :to="{path:'/admin/worldAudit', query: {wid:wid,wname:wname}}">元素审核</router-link></el-button>
            <el-button text type="primary">  <router-link :to="{path:'/admin/worldRedident', query: {wid:wid,wname:wname}}">居民管理</router-link></el-button>
            <el-button text>  <router-link :to="{path:'/admin/worldComment', query: {wid:wid,wname:wname}}">评论管理</router-link></el-button>
            <el-button text>  <router-link :to="{path:'/admin/worldDiscuss', query: {wid:wid,wname:wname}}">讨论管理</router-link></el-button>
          </el-space>
        </div>
        <!--        统计-->
        <div style="background-color:#b0c4de;margin: auto;padding: 10px">
          <el-row>
            <el-col  :span="20">
              <el-tree-select v-model="value" :data="data" check-strictly :render-after-expand="false"/>
              <el-input v-model="input3" placeholder="Please input" class="input-with-select" style="width: 250px"/>
              <el-button :icon="Search" circle />
            </el-col >
            <el-col :span="4"  style="text-align: right;">
              <div style="text-align: right; font-size: 12px" class="toolbar">
                <el-dropdown>
                  <el-icon style="margin-right: 8px; margin-top: 1px"><setting/></el-icon>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item>View</el-dropdown-item>
                      <el-dropdown-item>Add</el-dropdown-item>
                      <el-dropdown-item>Delete</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
                <span>Tom</span>
              </div>
            </el-col>
          </el-row>
        </div>
        <!--        表格-->
        <div>
          <el-scrollbar>
            <el-table :data="tableData">
              <el-table-column label="序号" >
                <template #default="scope">
                  {{scope.$index+1}}
                </template>
              </el-table-column>
              <el-table-column prop="date" label="时间" width="140" />
              <el-table-column prop="name" label="姓名" width="120" />
              <el-table-column prop="address" label="简介" />
              <el-table-column prop="rank" label="等级" width="120" />
              <el-table-column prop="new" label="新增元素" width="120" />
              <el-table-column prop="edit" label="编辑元素" width="120" />
              <el-table-column prop="commnet" label="评论" width="120" />
              <el-table-column prop="disscuss" label="讨论" width="120" />
              <!--              <el-table-column fixed="right" label="Operations" width="220">-->
<!--                <template #default>-->
<!--                  <el-button link type="primary" size="small" @click="handleClick">Detail</el-button>-->
<!--                  <el-button link type="primary" size="small">Edit</el-button>-->
<!--                </template>-->
<!--              </el-table-column>-->
            </el-table>
          </el-scrollbar>
        </div>
        <!--        分页-->
        <div style="float:right; ">
          <el-pagination  layout="prev, pager, next" :total="50" />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {useRoute, useRouter} from "vue-router";
import { Menu as IconMenu,CirclePlus, Message, Setting } from '@element-plus/icons-vue'
// 接收url里的参数
const route = useRoute();
console.log(route.query.wid,"参数");
const wid = ref(null);
wid.value = route.query.wid;
const wname = ref('');
wname.value = <string>route.query.wname;
const fits = ['世界', '粉丝', '关注']
const activeIndex = ref('1')

const item = {
  date: '2016-05-02',
  name: 'Tom',
  rank: 11,
  new: 11,
  edit: 1221,
  comment: 12342341,
  disscuss: 123231,

  address: 'No. 189, Grove St, Los Angeles',
}
const tableData = ref(Array.from({ length: 20 }).fill(item))


const value = ref()

const data = [
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
