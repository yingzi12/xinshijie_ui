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
      <el-button text type="primary">  <router-link :to="{path:'/admin/storyAudit', query: {sid:sid,sname:sname}}">章节审核</router-link></el-button>
      <el-button text>  <router-link :to="{path:'/admin/storyComment', query: {sid:sid,sname:sname,source:2}}">评论管理</router-link></el-button>
      <el-button text>  <router-link :to="{path:'/admin/storyDiscuss', query: {sid:sid,sname:sname,source:2}}">讨论管理</router-link></el-button>
    </el-space>
  </div>
        <!--        统计-->
        <div style="background-color:#b0c4de;margin: auto;padding: 10px">
          <el-row>
            <el-col  :span="20">
              <el-tree-select v-model="queryParams.types" :data="dataStree" check-strictly :render-after-expand="false" clearable />
              <el-input v-model="queryParams.title" placeholder="请输入元素名称" class="input-with-select" style="width: 250px"/>
              <el-button :icon="Search" circle @click="getList"/>
            </el-col >
            <el-col :span="4"  style="text-align: right;">
              <div style="text-align: right; font-size: 12px" class="toolbar">
                <el-button text @click="handleAuditLog">查看历史记录</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
        <!--        表格-->
  <div>
    <el-scrollbar>
      <el-table v-loading="loading" :data="draftList" >
        <el-table-column label="序号" width="50">
          <template #default="scope">
            {{ scope.$index + 1 + (queryParams.pageNum - 1) * 10 }}
          </template>
        </el-table-column>
        <el-table-column label="名称" align="center" key="title" prop="title" :show-overflow-tooltip="true"/>
        <el-table-column label="故事" align="center" key="sname" prop="sname" :show-overflow-tooltip="true"/>
        <el-table-column label="分卷" align="center" key="pname" prop="pname" :show-overflow-tooltip="true"/>
        <el-table-column label="状态" align="center"  >
          <template #default="scope">
            <span>{{elementStatus.get(scope.row.status)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center" prop="updateTime" width="160" :show-overflow-tooltip="true">
          <template #default="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" align="center" prop="updateTime" width="160" :show-overflow-tooltip="true">
          <template #default="scope">
            <span>{{ scope.row.updateTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="详情" placement="top">
              <el-button
                  type="text"
                  icon="View"
                  @click="handleSee(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip content="审核" placement="top">
              <el-button
                  type="text"
                  icon="VideoPlay"
                  @click="handleAudit(scope.row)"
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
      <!--      审核弹出框-->
      <el-dialog v-model="dialogFormVisible" title="审核">
        <el-form :model="form"
                 :rules="rules"
                 ref="ruleFormRef"
        >
          <el-form-item label="审核" :label-width="formLabelWidth"  prop="auditStatus">
            <el-select v-model="form.auditStatus" placeholder="请选择审核结果" >
              <el-option label="不通过" value="0" />
              <el-option label="通过" value="1" />
            </el-select>
          </el-form-item>
          <el-form-item label="说明" :label-width="formLabelWidth" prop="auditContent">
            <el-input v-model="form.auditContent" autocomplete="off" />
          </el-form-item>
        </el-form>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="onSudmit(ruleFormRef)">确认</el-button>
      </span>
        </template>
      </el-dialog>
</template>

<script lang="ts" setup>
import {getCurrentInstance, reactive, ref, toRefs} from 'vue'
import {useRoute, useRouter} from "vue-router";
import { Menu as IconMenu,CirclePlus, Message, Setting } from '@element-plus/icons-vue'
import { listDraftChapterAdmin,audit } from "@/api/admin/draftChapter";
import { getTree} from "@/api/wiki/category";
const router = useRouter()

// 接收url里的参数
const route = useRoute();
//console.log(route.query.wid,"参数");
const sid = ref(null);
const sname = ref('');
sname.value = <string>route.query.sname;
sid.value = route.query.sid;

const elementStatus = new Map([
  [0, "草稿"],
  [1, "待审核"],
  [3, "审核不通过"],
  [2, "通过审核"],
  [4, "删除"],
  [5, "超时发布自动拒绝"],
  [6, "超时审核自动通过"],
]);
const activeIndex = ref('1')
//弹出框
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

//搜索框
import { Search } from '@element-plus/icons-vue'
import {ElMessage, FormInstance} from "element-plus";
const input3 = ref('')

const {  appContext : { config: { globalProperties } }  } = getCurrentInstance();
const {  proxy  } = getCurrentInstance();
//分页
const dateRange = ref([]);
//分类选项
const dataStree = ref([])
const loading = ref(true);
const draftList = ref([]);
const total = ref(0);
const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    auditStatus:0,
    title: undefined,
    status:1,
    sid:sid.value,
  },
  rules: {
    auditStatus: [{ required: true, message: "类别不能为空", trigger: "blur" }],
    auditContent: [{ required: true, message: "说明不能为空", trigger: "blur" }, { min: 10, max: 200, message: "说明长度必须介于 10 和 200 之间", trigger: "blur" }],

  }
});
const { queryParams, form, rules } = toRefs(data);

/** 查询世界列表 */
function getList() {
  listDraftChapterAdmin(globalProperties.addDateRange(queryParams.value, dateRange.value)).then(response => {
    loading.value = false;
    draftList.value = response.rows;
    total.value = response.total;
  });
}
/** 查询分类列表 */
function getCategoryTree() {
  getTree(sid.value).then(response => {
    dataStree.value = response.data
  });
}
function handleAudit(row){
  dialogFormVisible.value=true;
}
function handleSee(row){
  router.push("/admin/storyAuditPreview?sid="+sid.value+"&sname="+sname.value+"&dscid="+row.id+"&temType="+row.softtype);
}
function handleDiff(row){
  router.push("/admin/storyDiffPreview?sid="+row.sid+"&dscid="+row.id+"&sname="+sname.value+"&temType="+row.softtype);
}

function handleAuditLog(){
  router.push("/admin/storyAuditLog?sid="+sid.value+"&sname="+sname.value);
}
const ruleFormRef = ref<FormInstance>()
function handleOpen(row){
  dialogFormVisible.value=true
  form.value.scid=row.id
  form.value.sid=sid.value
  form.value.auditStatus=undefined
  form.value.auditNumber=0
  form.value.auditContent=''
}

const onSudmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      //console.log('submit!')
      audit(form.value).then(response => {
        dialogFormVisible.value=false
        ElMessage.success("处理成功")
        getList();
      })
    } else {
      //console.log('error submit!', fields)
    }
  })
}
getCategoryTree();
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
