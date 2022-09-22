<template>
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
      <el-button text > <router-link :to="{path:'/admin/storyInfo', query: {wid:wid,wname:wname}}">简介</router-link></el-button>
      <el-button text type="primary">  <router-link :to="{path:'/admin/storyAuthor', query: {wid:wid,wname:wname}}">作者列表</router-link></el-button>
      <el-button text>  <router-link :to="{path:'/admin/storyReel', query: {wid:wid,wname:wname}}">章节目录</router-link></el-button>
      <el-button text>  <router-link :to="{path:'/admin/storyAudit', query: {wid:wid,wname:wname}}">章节审核</router-link></el-button>
      <el-button text>  <router-link :to="{path:'/admin/storyComment', query: {wid:wid,wname:wname}}">评论管理</router-link></el-button>
      <el-button text>  <router-link :to="{path:'/admin/storyDiscuss', query: {wid:wid,wname:wname}}">讨论管理</router-link></el-button>
    </el-space>
  </div>
        <!--        统计-->
        <div style="background-color:#b0c4de;margin: auto;padding: 10px">
          <el-row>
            <el-col :span="20">
<!--              <el-tree-select v-model="queryParams.types" :data="dataStree" check-strictly :render-after-expand="false" clearable />-->
<!--              <el-input v-model="queryParams.title" placeholder="请输入元素名" class="input-with-select" style="width: 250px"/>-->
<!--              <el-button :icon="Search" circle @click="getList"/>-->
            </el-col>
            <el-col :span="4" style="text-align: right;">
              <div style="text-align: right; font-size: 12px" class="toolbar">
                <el-button text @click="handleAddDialog">创建分卷</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
        <!--        表格-->
        <div>
          <el-scrollbar>
            <el-table v-loading="loading" :data="elementList" >
              <el-table-column label="序号" width="50">
                <template #default="scope">
                  {{ scope.$index + 1 + (queryParams.pageNum - 1) * 10 }}
                </template>
              </el-table-column>
              <el-table-column label="元素" align="center" key="title" prop="title" :show-overflow-tooltip="true"/>
              <el-table-column label="状态" align="center"  >
                <template #default="scope">
                  <span>{{elementStatusMap.get(scope.row.status)}}</span>
                </template>
              </el-table-column>
              <el-table-column label="类型" align="center" :show-overflow-tooltip="true">
                <template #default="scope">
                  <el-tag v-for='idLabel in scope.row.idLabels.split(",")'>
                    {{idLabel.split("$$")[1]}}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column label="简介" align="center" key="intro" prop="intro" :show-overflow-tooltip="true"/>
              <el-table-column label="创建人" align="center" key="createName" prop="createName"
                               :show-overflow-tooltip="true"/>
              <el-table-column label="更新时间" align="center" prop="updateTime" width="160" :show-overflow-tooltip="true" />
              <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
                <template #default="scope">
                  <el-tooltip content="修改名称" placement="top">
                    <el-button
                        type="text"
                        icon="Edit"
                        @click="handleUpdate(scope.row)"
                    ></el-button>
                  </el-tooltip>
                  <el-tooltip content="删除分卷" placement="top">
                    <el-button
                        type="text"
                        icon="Delete"
                        @click="handleDelete(scope.row)"
                    ></el-button>
                  </el-tooltip>
                  <el-tooltip content="章节管理" placement="top">
                    <el-button
                        type="text"
                        icon="Delete"
                        @click="handleDelete(scope.row)"
                    ></el-button>
                  </el-tooltip>
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
              @pagination="getList"/>
        </div>

  <el-dialog
      v-model="dialogVisible"
      title="元素模板"
      width="30%"
      :before-close="handleClose"
  >
    <el-select v-model="temType" placeholder="Select">
      <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled"
      />
    </el-select>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleElementAdd">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { getCurrentInstance, reactive, ref, toRefs} from 'vue'
import {  listElement,delElement } from "@/api/admin/element";
import { getTree,countCategory} from "@/api/wiki/category";
import {useRoute, useRouter} from "vue-router";
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'
const fits = ['世界', '粉丝', '关注']
const activeIndex = ref('1')
const elementStatusMap = new Map([
  [1, "正常"],
  [2, "锁定"],
  [4, "删除"]
]);

// 弹出框
const  dialogVisible=ref(false);
const temType = ref(1)
const options = [
  {
    value: 1,
    label: '通用',
  },
  {
    value: 2,
    label:'角色/人物' ,
  },
  {
    value: 3,
    label:'组织/势力',
    disabled: true,
  },
  {
    value: 4,
    label: '动物/植物',
    disabled: true,
  },
  {
    value:5 ,
    label: '种族',
    disabled: true,
  },
]
// 接收url里的参数
const route = useRoute();
const router = useRouter()
const wid = ref(null);
wid.value = route.query.wid;
const wname = ref('');
wname.value = <string>route.query.wname;
//console.log("世界id="+wid.value);
const {  appContext : { config: { globalProperties } }  } = getCurrentInstance();
const {  proxy  } = getCurrentInstance();
class Story {
  id: number
  name: string
  types: string
  intro: string
  createTime:string
}
//分类选项
const dataStree = ref([])
const loading = ref(true);
const elementList = ref([]);
const total = ref(0);
const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    title: undefined,
    types: '',
    wid:wid.value
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
  router.push("/admin/elementEdit?eid="+row.id+"&wid=" + wid.value+"&temType=" + row.softtype);
}
//添加新元素,需要登录权限
function handleAddDialog(){
  dialogVisible.value=true
}
function handleElementAdd ()  {
  countCategory(wid.value).then(response => {
    var count = response.data
    if (count==0) {
      ElMessage.error("请先创建分类")
    }else {
      router.push("/admin/elementAdd?wid=" + wid.value + "&temType=" + temType.value);
      // router.push("/admin/elementAdd?wid=" + wid.value);
    }
  })
}
function handleDelete ( row){
  globalProperties.$modal.confirm('是否确认删除世界名称为"' + row.title + '"的数据？').then(function () {
    return delElement(row.wid,row.id);
  }).then(() => {
    getList();
    globalProperties.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

function handleSee(row){
  router.push("/element/details?wid="+row.wid+"&eid="+row.id+"&eid="+row.softtype);
}
/** 选择条数  */
function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.userId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
};
/** 查询元素列表 */
function getList() {
  if(queryParams.value.types != undefined && queryParams.value.types != '' ){
    queryParams.value.types=queryParams.value.types.split("$$")[0]
  }
  listElement(globalProperties.addDateRange(queryParams.value, dateRange.value)).then(response => {
    loading.value = false;
    elementList.value = response.rows;
    total.value = response.total;
  });
}
/** 查询分类列表 */
function getCategoryTree() {
  getTree(wid.value).then(response => {
    dataStree.value = response.data
  });
}
getCategoryTree();
getList();


const value = ref()

import {Search} from '@element-plus/icons-vue'
import {ElMessage} from "element-plus";

const input3 = ref('')
const dialogFormVisible = ref(false)

function newElement(wid: number) {
  //console.log('submit!')
  router.push("/element/add?id=" + wid);
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
