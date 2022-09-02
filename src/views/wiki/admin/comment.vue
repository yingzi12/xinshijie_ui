<template>
  <el-container class="layout-container-demo" >
    <!--    侧边栏-->
    <!--    表格-->
    <el-container style="margin: 10px">
      <!--       内容区-->
      <el-main>
        <div>
          <el-menu default-active="1" mode="horizontal" style="margin:0px;pardding:0px">
            <el-menu-item index="1">我的评论</el-menu-item>
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
            <el-table :data="commentList" >
              <el-table-column label="序号" width="50" >
                <template #default="scope">
                  {{scope.$index+1}}
                </template>
              </el-table-column>
              <el-table-column prop="createTime" label="创建时间" width="120" :show-overflow-tooltip="true"/>
              <el-table-column prop="wname" label="世界" width="80"/>
              <el-table-column prop="comment" label="内容"  :show-overflow-tooltip="true"/>
              <el-table-column prop="reply" label="回复"  :show-overflow-tooltip="true" />
              <el-table-column fixed="right" label="操作" width="80">
                <template #default>
                  <!--                  <el-button link type="primary" size="small" @click="dialogFormVisible = true">查看</el-button>-->
                  <el-button link type="primary" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-scrollbar>
        </div>
        <!--        分页-->
        <div style="float:right; ">
          <pagination
              v-show="total > 0"
              :total="total"
              v-model:page="queryParams.pageNum"
              v-model:limit="queryParams.pageSize"
              @pagination="getList"/>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { useRoute, useRouter} from "vue-router";
import { Menu as IconMenu,CirclePlus, Message, Setting } from '@element-plus/icons-vue'
import { Search } from '@element-plus/icons-vue'
import { getCurrentInstance, reactive, ref, toRefs} from 'vue'
import { listComment} from "@/api/wiki/comment";
import {  getWorld } from "@/api/wiki/world";
import useUserStore from '@/store/modules/user'


//获取用户信息
const userStore = useUserStore()
const circleUrl=ref('')
const disabled=ref(true)

const username=ref('')

const {  appContext : { config: { globalProperties } }  } = getCurrentInstance();
// 接收url里的参数
const route = useRoute();
console.log(route.query.wid,"参数");
const wid = ref(null);
wid.value = route.query.wid;
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

const commentActive = ref('allComm')
const commentList = ref([])
const data = reactive({
  commentForm: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    wid: undefined,
    eid: undefined,
  },
  rules: {
    comment: [{ required: true, message: "评论不能为空", trigger: "blur" }],
  }
});
const total = ref(0);

const { queryParams, commentForm, rules } = toRefs(data);
//分页信息
const dateRange = ref([]);
//评论信息
function getList() {
  listComment(globalProperties.addDateRange(queryParams.value, dateRange.value)).then(response => {
    console.log("查询评论列表:"+JSON.stringify(response))
    commentList.value = response.rows
    total.value = response.total;
  });
}

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

getList();
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
