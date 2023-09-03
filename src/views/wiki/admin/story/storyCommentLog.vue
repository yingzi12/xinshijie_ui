<template>
        <!--        标题-->
        <div>
          <el-menu
              :default-active="1"
              mode="horizontal"
              style="margin:0px;pardding:0px"
          >
            <el-menu-item index="1">{{sname}}</el-menu-item>
          </el-menu>
        </div>
        <!--        多选-->
  <div style="padding: 10px">
    <el-space wrap>
      <el-button text > <router-link :to="{path:'/admin/storyInfo', query: {sid:sid,sname:sname}}">简介</router-link></el-button>
      <el-button text>  <router-link :to="{path:'/admin/storyAuthor', query: {sid:sid,sname:sname}}">作者列表</router-link></el-button>
      <el-button text >  <router-link :to="{path:'/admin/storyReel', query: {sid:sid,sname:sname}}">分卷/章节目录</router-link></el-button>
      <el-button text>  <router-link :to="{path:'/admin/storyAudit', query: {sid:sid,sname:sname}}">章节审核</router-link></el-button>
      <el-button text type="primary">  <router-link :to="{path:'/admin/storyComment', query: {sid:sid,sname:sname,source:2}}">评论管理</router-link></el-button>
      <el-button text>  <router-link :to="{path:'/admin/storyDiscuss', query: {sid:sid,sname:sname,source:2}}">讨论管理</router-link></el-button>
    </el-space>
  </div>
        <!--        统计-->
        <div style="background-color:#b0c4de;margin: auto;padding: 10px">
          <el-row>
            <el-col  :span="20">
              <el-select v-model="value" placeholder="类型" clearable >
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                />
              </el-select>
              <el-select placeholder="处理状态" clearable >
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
              <el-table-column label="序号" width="80" >
                <template #default="scope">
                  {{scope.$index+1}}
                </template>
              </el-table-column>
              <el-table-column prop="date" label="创建时间" width="140"  :show-overflow-tooltip="true"/>
              <el-table-column prop="name" label="创建人" width="120" :show-overflow-tooltip="true" />
              <el-table-column prop="title" label="评论内容" :show-overflow-tooltip="true"/>
              <el-table-column prop="ename" label="元素名称"  :show-overflow-tooltip="true"/>
              <el-table-column prop="types" label="讨论类型" :show-overflow-tooltip="true" />
              <el-table-column fixed="right" label="操作" width="100">
                <template #default>
                  <el-button link type="primary" size="small" @click="dialogFormVisible = true">查看</el-button>
                  <el-button link type="primary" size="small">删除</el-button>
                </template>
              </el-table-column>
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
              @current-change="getList"/>
        </div>

      <!--      审核弹出框-->
      <el-dialog v-model="dialogFormVisible" title="评论详细">
        <el-row>
          <el-col :span="2">
            <div  class="center">
              <!--              头像-->
              <el-avatar :size="50" :src="comment.circleUrl" />
            </div>
          </el-col>
          <el-col :span="22">
            <div >
              <h3 style="font-weight:bold;">{{ comment.createName }}</h3>
            </div>
            <div v-html="comment.comment">
            </div>
            <div style="color:#A3A6AD">
              <span>{{ comment.createTime }}</span>
              <span><BootstrapIcon icon="chat-dots" size="1x" flip-v />20 </span>
              <span><BootstrapIcon icon="hand-thumbs-up" size="1x" flip-v />10</span>
              <span><BootstrapIcon icon="hand-thumbs-down" size="1x" flip-v />20</span>
            </div>
          </el-col>
        </el-row>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">删除</el-button>
      </span>
        </template>
      </el-dialog>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue'
import {useRoute, useRouter} from "vue-router";
import { Menu as IconMenu,CirclePlus, Message, Setting } from '@element-plus/icons-vue'
import { Search } from '@element-plus/icons-vue'

// 接收url里的参数
const route = useRoute();
//console.log(route.query.wid,"参数");
const sid = ref(null);
const sname = ref('');
sname.value = <string>route.query.sname;
sid.value = route.query.sid;
//弹出框内容
const comment = {
  circleUrl:'',
  date: '2020-05-02',
  createName: 'Tom',
  comment: 'No. 189, Grove St, Los Angeles',
  createTime:"2020-05-02 11:23:09",
}
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
