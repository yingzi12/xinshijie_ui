<template>

        <div>
          <el-menu
              default-active="2"
              :router="true"
              mode="horizontal"
              style="margin:0px;pardding:0px"
          >
            <el-menu-item index="1" route="/admin/draft"><span style="font-size: 20px;font-weight:bold;">待发布</span></el-menu-item>
            <el-menu-item index="2" route="/admin/audit"><span style="font-size: 20px;font-weight:bold;">待审核</span></el-menu-item>
            <el-menu-item index="3" route="/admin/auditLog"><span style="font-size: 20px;font-weight:bold;">已审核</span></el-menu-item>
            <el-menu-item index="4" route="/admin/draftLog"><span style="font-size: 20px;font-weight:bold;">所有</span></el-menu-item>
          </el-menu>
        </div>
        <!--        统计-->
        <div style="background-color:#b0c4de;margin: auto;padding: 10px">
          <el-row>
            <el-col  :span="20">
<!--              <el-tree-select v-model="value" :data="dataStree" check-strictly :render-after-expand="false"/>-->
              <el-input v-model="queryParams.title" placeholder="请输入元素名" class="input-with-select" style="width: 250px"/>
              <el-button :icon="Search" circle @click="getList(1)"/>
            </el-col >
            <el-col :span="4"  style="text-align: right;">
              <div style="text-align: right; font-size: 12px" class="toolbar">
<!--                <el-button text @click="handleLog">查看历史记录</el-button>-->
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
              <el-table-column label="类型" align="center" :show-overflow-tooltip="true">
                <template #default="scope">
                  <el-tag v-for='idLabel in scope.row.idLabels.split(",")'>
                    {{idLabel.split("$$")[1]}}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="wname" label="世界" width="140" />
              <el-table-column label="状态" align="center"  >
                <template #default="scope">
                  <span>{{draftElementStatusMap.get(scope.row.status)}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="createTime" label="修改时间" :show-overflow-tooltip="true" />
              <el-table-column prop="causeNumber" label="修改原因" :show-overflow-tooltip="true" />
              <el-table-column prop="causeContent" label="修改说明" :show-overflow-tooltip="true" />
              <el-table-column fixed="right" label="操作" width="220">
                <template #default="scope">
                  <el-button link type="primary" size="small" @click="handleSee(scope.row)">详细</el-button>
                  <el-button link type="primary" size="small" @click="handleDiff(scope.row)">差异</el-button>
                  <el-button link type="primary" size="small" @click="handleIssueClose(scope.row)">取消发布</el-button>
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
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs} from 'vue'
import {useRoute, useRouter} from "vue-router";
import { listDraft,issueClose } from "@/api/admin/draftElement";
const router = useRouter()

// 接收url里的参数
const route = useRoute();
// //console.log(route.query.wid,"参数");
//
// const wid = ref(route.query.wid);
const fits = ['世界', '粉丝', '关注']
const activeIndex = ref('1')
//弹出框
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
const draftElementStatus = new Map([
  [0, "草稿"],
  [1, "待审核"],
  [3, "审核不通过"],
  [2, "通过审核"],
  [4, "删除"],
  [5, "超时发布自动拒绝"],
  [6, "超时审核自动通过"],
]);
//搜索框
import { Search } from '@element-plus/icons-vue'
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
    types: undefined,
    // wid:wid.value,
  },
  rules: {
    // userName: [{ required: true, message: "用户名称不能为空", trigger: "blur" }, { min: 2, max: 20, message: "用户名称长度必须介于 2 和 20 之间", trigger: "blur" }],
  }
});
const { queryParams, form, rules } = toRefs(data);

function handleSelect(index:String,indexPath:String){
  if(index =='2'){
    router.push("/admin/auditLog");
  }
   //console.log(indexPath)
}

/** 查询世界列表 */
function getList(page: number) {
  window.scrollTo(0, 0); // 滚动到顶部
  queryParams.value.pageNum=page;

  listDraft(queryParams.value).then(response => {
    loading.value = false;
    draftList.value = response.data;
    total.value = response.total;
  });
}
function handleIssueClose(row){
  //console.log("取消发布："+JSON.stringify(row))
  issueClose(row.wid,row.id).then(response => {
    getList(queryParams.value.pageNum);

  });
}
function handleSee(row){
  router.push("/admin/draftPreview?wid="+row.wid+"&deid="+row.id);
}
function handleDiff(row){
  router.push("/admin/diffPreview?wid="+row.wid+"&deid="+row.id);
}
function handleLog(row){
  router.push("/admin/auditLog");
}
getList(queryParams.value.pageNum);

</script>

<style scoped>

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}


</style>
