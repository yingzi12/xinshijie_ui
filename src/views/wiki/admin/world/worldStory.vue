<template>
  <!--        标题-->
    <AdminHead :head-type="6" :wid="wid" :wname="wname"></AdminHead>

  <!--        统计-->
  <div style="background-color:#b0c4de;margin: auto;padding: 10px">
    <el-row>
      <el-col :span="20">
        <el-select v-model="queryParams.types" clearable  placeholder="请选择">
          <el-option
              v-for="item in storyTypes"
              :key="item.id"
              :label="item.name"
              :value="item.id">
          </el-option>
        </el-select>
        <el-select v-model="queryParams.status" clearable placeholder="请选择">
          <el-option
              v-for="item in storyStatus"
              :key="item.id"
              :label="item.name"
              :value="item.id">
          </el-option>
        </el-select>
        <el-input v-model="queryParams.title" placeholder="请输入元素名" class="input-with-select" style="width: 250px"/>
        <el-button :icon="Search" circle @click="getList(1)"/>
      </el-col>
      <el-col :span="4" style="text-align: right;">
        <div style="text-align: right; font-size: 12px" class="toolbar">
          <el-button text @click="handleAdd">创建故事</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
  <!--        表格-->
  <div>
    <el-scrollbar>
      <el-table v-loading="loading" :data="storyList" >
        <el-table-column label="序号" width="80">
          <template #default="scope">
            {{ scope.$index + 1 + (queryParams.pageNum - 1) * 20 }}
          </template>
        </el-table-column>
        <el-table-column label="故事名" align="center" key="name" prop="name" :show-overflow-tooltip="true">
          <template #default="scope">
            <router-link  :to="{path:'/story/details', query: {sid:scope.row.id,sname:scope.row.name,wid:scope.row.wid,wname:scope.row.wname}}"><el-tag v-if="scope.row.source=='原创'">原创</el-tag>{{scope.row.name}}</router-link>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center"  >
          <template #default="scope">
            <span>{{storyStatusMap.get(scope.row.status)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="类型" align="center" :show-overflow-tooltip="true">
          <template #default="scope">
            <span>{{storyTypesMap.get(scope.row.types)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="简介" align="center" key="intro" prop="intro" :show-overflow-tooltip="true"/>
        <el-table-column label="创建人" align="center" key="createName" prop="createName"
                         :show-overflow-tooltip="true"/>
        <el-table-column label="更新时间" align="center" prop="updateTime" width="160" :show-overflow-tooltip="true" />
        <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="详情" placement="top">
              <el-button
                  type="text"
                  icon="View"
                  @click="handleSee(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip v-if="scope.row.status==2" content="审核" placement="top">
              <el-button
                  type="text"
                  @click="handleAudit(scope.row)"
              >审核</el-button>
            </el-tooltip>
<!--            <el-tooltip content="删除" placement="top">-->
<!--              <el-button-->
<!--                  type="text"-->
<!--                  icon="Delete"-->
<!--                  @click="handleDelete(scope.row)"-->
<!--              ></el-button>-->
<!--            </el-tooltip>-->
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
import AdminHead from './worldHead'

import {  reactive, ref, toRefs } from 'vue'
import { listStoryAdmin,audit } from "@/api/admin/story";
import { useRoute, useRouter } from "vue-router";
import {Search} from '@element-plus/icons-vue'
import {ElMessage, FormInstance} from "element-plus";
import {storyStatusMap,storyTypesMap,storyTypes ,storyStatus} from "@/utils/constant";

const fits = ['世界', '粉丝', '关注']
const activeIndex = ref('1')

const temType = ref(1)
// 接收url里的参数
const route = useRoute();
const router = useRouter()

const wid = ref(route.query.wid);
const wname = ref(route.query.wname);
//console.log("世界id="+wid.value);


class World {
  id: number
  name: string
  types: string
  intro: string
  createTime:string
}
//分类选项
const dataStree = ref([])
const loading = ref(true);
const storyList = ref([]);
const total = ref(0);


const dateRange = ref([]);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const search = ref('')

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    status:3,
    auditStatus:0,
    title: undefined,
    types: '',
    wid:wid.value,
  },
  rules: {
    auditStatus: [{ required: true, message: "类别不能为空", trigger: "blur" }],
    auditContent: [{ required: true, message: "说明不能为空", trigger: "blur" }, { min: 10, max: 200, message: "说明长度必须介于 10 和 200 之间", trigger: "blur" }],

  }
});
const { queryParams, form, rules } = toRefs(data);
const ruleFormRef = ref<FormInstance>()

const dialogFormVisible=ref(false)

function handleAudit(row){
  dialogFormVisible.value=true;
  form.value.sid=row.id;
  form.value.wid=wid.value
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
        getList(queryParams.value.pageNum);

      })
    } else {
      //console.log('error submit!', fields)
    }
  })
}

function handleAdd()  {
  router.push("/admin/storyAdd?wname="+wname.value+"&wid=" + wid.value);
}

function handleSee(row){
  router.push("/story/details?wid="+row.wid+"&sid="+row.id);
}

/** 查询元素 */
function getList(page: number) {
  window.scrollTo(0, 0); // 滚动到顶部
  queryParams.value.pageNum=page;

  listStoryAdmin(queryParams.value).then(response => {
    loading.value = false;
    storyList.value = response.data;
    total.value = response.total;
  });
}
getList(queryParams.value.pageNum);

const value = ref()
</script>

<style scoped>


.center {
  display: flex;
  justify-content: center;
  align-items: center;
}


</style>
