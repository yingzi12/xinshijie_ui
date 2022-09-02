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
            <el-button text>  <router-link :to="{path:'/admin/worldRedident', query: {wid:wid,wname:wname}}">居民管理</router-link></el-button>
            <el-button text>  <router-link :to="{path:'/admin/worldComment', query: {wid:wid,wname:wname}}">评论管理</router-link></el-button>
            <el-button text type="primary">  <router-link :to="{path:'/admin/worldDiscuss', query: {wid:wid,wname:wname}}">讨论管理</router-link></el-button>
          </el-space>
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
              <el-table-column prop="date" label="创建时间" width="140" />
              <el-table-column prop="name" label="创建人" width="120" />
              <el-table-column prop="title" label="讨论主题" />
              <el-table-column prop="ename" label="元素名称" />
              <el-table-column prop="types" label="讨论类型" />
              <el-table-column prop="content" label="讨论内容" />
              <el-table-column prop="status" label="状态" />
              <el-table-column prop="audit" label="审核说明" />
              <el-table-column fixed="right" label="Operations" width="220">
                <template #default>
                  <el-button link type="primary" size="small" @click="handleClick">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-scrollbar>
        </div>
        <!--        分页-->
        <div style="float:right; ">
          <el-pagination  layout="prev, pager, next" :total="50" />
        </div>
      </el-main>

      <!--      审核弹出框-->
      <el-dialog v-model="dialogFormVisible" title="审核">
        <el-form :model="form">
          <el-form-item label="Zones" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="Please select a zone">
              <el-option label="Zone No.1" value="shanghai" />
              <el-option label="Zone No.2" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="说明" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off" />
          </el-form-item>
        </el-form>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确认</el-button>
      </span>
        </template>
      </el-dialog>

    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue'
import {useRoute, useRouter} from "vue-router";
import { Menu as IconMenu,CirclePlus, Message, Setting } from '@element-plus/icons-vue'
import { Search } from '@element-plus/icons-vue'

// 接收url里的参数
const route = useRoute();
console.log(route.query.wid,"参数");
const wid = ref(null);
wid.value = route.query.wid;
const wname = ref('');
wname.value = <string>route.query.wname;
//个人消息
const fits = ['世界', '粉丝', '关注']
const activeIndex = ref('1')

//表格内容
const item = {
  date: '2016-05-02',
  name: 'Tom',
  title: 'No. 189, Grove St, Los Angeles',
  ename:'世界数',
  types:'内容讨论',
  status:"已处理",
  content:"这一个评论的内容，这个内容有问题，不和规定，需要修改",
  audit:"同意这个，已进行修改",
}
const tableData = ref(Array.from({ length: 20 }).fill(item))

//多选框
const value = ref('')
const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
    disabled: true,
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]
//搜索框
const input3 = ref('')

//弹出框
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const form = reactive({
  name: '',
  region: ''
})
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
