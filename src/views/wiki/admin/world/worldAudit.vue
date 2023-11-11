<template>
    <AdminHead :head-type="5" :wid="wid" :wname="wname"></AdminHead>

        <!--        统计-->
        <div style="background-color:#b0c4de;margin: auto;padding: 10px">
          <el-row>
            <el-col  :span="20">
              <el-tree-select v-model="queryParams.typesName" :data="dataStree" check-strictly :render-after-expand="false" clearable />
              <el-input v-model="queryParams.title" placeholder="请输入元素名称" class="input-with-select" style="width: 250px"/>
              <el-button :icon="Search" circle @click="getList(1)"/>
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
            <el-table :data="draftList">
              <el-table-column label="序号"  width="50">
                <template #default="scope">
                  {{scope.$index+1}}
                </template>
              </el-table-column>
              <el-table-column prop="title" label="元素" width="140" :show-overflow-tooltip="true" />
              <el-table-column label="状态" align="center"  >
                <template #default="scope">
                  <span>{{draftElementStatusMap.get(scope.row.status)}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="createTime" label="修改时间" :show-overflow-tooltip="true" />
              <el-table-column prop="causeNumber" label="修改原因" :show-overflow-tooltip="true"/>
              <el-table-column prop="causeContent" label="修改说明" :show-overflow-tooltip="true" />
              <el-table-column prop="createName" label="修改人" :show-overflow-tooltip="true"/>
              <el-table-column fixed="right" label="操作" width="220">
                <template #default="scope">
                  <el-button link type="primary" size="small" @click="handleSee(scope.row)">详细</el-button>
                  <el-button link type="primary" size="small" @click="handleDiff(scope.row)">差异</el-button>
                  <el-button link type="primary" size="small" @click="handleOpen(scope.row)">审核</el-button>
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
import { draftElementStatusMap } from "@/utils/constant";
import { reactive, ref, toRefs} from 'vue'
import {useRoute, useRouter} from "vue-router";
import { listAudit,auditDraft } from "@/api/admin/draftElement";
import { getTree} from "@/api/wiki/category";
const router = useRouter()

// 接收url里的参数
const route = useRoute();
//console.log(route.query.wid,"参数");


const wname = ref(route.query.wname);
const wid = ref(route.query.wid);


const activeIndex = ref('1')
//弹出框
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

//搜索框
import { Search } from '@element-plus/icons-vue'
import {ElMessage, FormInstance} from "element-plus";
const input3 = ref('')



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
    auditStatus:0,
    title: undefined,
    types: '',
    typesName: '',
    wid:wid.value,
  },
  rules: {
    auditStatus: [{ required: true, message: "类别不能为空", trigger: "blur" }],
    auditContent: [{ required: true, message: "说明不能为空", trigger: "blur" }, { min: 10, max: 200, message: "说明长度必须介于 10 和 200 之间", trigger: "blur" }],

  }
});
const { queryParams, form, rules } = toRefs(data);

/** 查询世界列表 */
function getList(page: number) {
  window.scrollTo(0, 0); // 滚动到顶部
  queryParams.value.pageNum=page;

  if(queryParams.value.types != undefined && queryParams.value.types != '' ){
    queryParams.value.types=queryParams.value.typesName.split("$$")[0]
  }
  listAudit(queryParams.value).then(response => {
    loading.value = false;
    draftList.value = response.data;
    total.value = response.total;
  });
}
/** 查询分类列表 */
function getCategoryTree() {
  getTree(wid.value).then(response => {
    dataStree.value = response.data
  });
}
function handleAudit(row){
  dialogFormVisible.value=true;
}
function handleSee(row){
  router.push("/admin/worldAuditPreview?wid="+wid.value+"&wname="+wname.value+"&deid="+row.id+"&temType="+row.softtype);
}
function handleDiff(row){
  router.push("/admin/worldDiffPreview?wid="+row.wid+"&deid="+row.id+"&wname="+wname.value+"&temType="+row.softtype);
}

function handleAuditLog(){
  router.push("/admin/worldAuditLog?wid="+wid.value+"&wname="+wname.value);
}
const ruleFormRef = ref<FormInstance>()
function handleOpen(row){
  dialogFormVisible.value=true
  form.value.deid=row.id
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
      auditDraft(form.value).then(response => {
        dialogFormVisible.value=false
        ElMessage.success("处理成功")
        getList(queryParams.value.pageNum);

      })
    } else {
      //console.log('error submit!', fields)
    }
  })
}
getCategoryTree();
getList(queryParams.value.pageNum);

</script>

<style scoped>

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}


</style>
