<template>
  <div>
    <el-menu
        default-active="1"
        :router="true"
        mode="horizontal"
        style="margin:0px;pardding:0px"
    >
      <el-menu-item index="1" route="/admin/draftChapter"><span style="font-size: 20px;font-weight:bold;">待发布</span></el-menu-item>
      <el-menu-item index="2" route="/admin/draftChapterAudit"><span style="font-size: 20px;font-weight:bold;">待审核</span></el-menu-item>
      <el-menu-item index="4" route="/admin/draftChapterLog"><span style="font-size: 20px;font-weight:bold;">所有</span></el-menu-item>
    </el-menu>
  </div>

  <!--        统计-->
        <div style="background-color:#b0c4de;margin: auto;padding: 10px">
          <el-row>
            <el-col :span="20">
              <el-input v-model="queryParams.title" placeholder="请输入元素名" class="input-with-select" style="width: 250px"/>
              <el-button :icon="Search" circle @click="getList(1)"/>
            </el-col>
            <el-col :span="4" style="text-align: right;">
<!--              <div style="text-align: right; font-size: 12px" class="toolbar">-->
<!--                <el-button text @click="handleSeeLog">历史记录</el-button>-->
<!--              </div>-->
            </el-col>
          </el-row>
        </div>
        <!--        表格-->
        <div>
          <el-scrollbar>
            <el-table v-loading="loading" :data="chapterList" >
              <el-table-column label="序号" width="80">
                <template #default="scope">
                  {{ scope.$index + 1 + (queryParams.pageNum - 1) * 20 }}
                </template>
              </el-table-column>
              <el-table-column label="名称" align="center" key="title" prop="title" :show-overflow-tooltip="true"/>
              <el-table-column label="编号" align="center" key="serialNumber" prop="serialNumber"  ></el-table-column>
                <el-table-column label="故事" align="center"  :show-overflow-tooltip="true">
                  <template #default="scope">
                  <a :href='"/admin/storyInfo?sid="+scope.row.sid+"&sname="+scope.row.sname'>
                      <el-text>{{scope.row.sname}}</el-text>
                  </a>
                  </template>

              </el-table-column>
              <el-table-column label="分卷" align="center" key="pname" prop="pname" :show-overflow-tooltip="true">
                  <template #default="scope">
                      <a :href='"/admin/storyChapter?sid="+scope.row.sid+"&sname="+scope.row.sname+"&pname="+scope.row.pname+"&pid="+scope.row.pid'>
                          <el-text>{{scope.row.pname}}</el-text>
                      </a>
                  </template>
              </el-table-column>
              <el-table-column label="状态" align="center"  >
                <template #default="scope">
                  <span>{{elementStatusMap.get(scope.row.status)}}</span>
                </template>
              </el-table-column>
              <el-table-column label="创建时间" align="center" prop="updateTime" width="160" :show-overflow-tooltip="true">
                <template #default="scope">
                  <span>{{ scope.row.createTime }}</span>
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
                  <el-tooltip content="修改" placement="top">
                    <el-button
                        type="text"
                        icon="Edit"
                        @click="handleUpdate(scope.row)"
                    ></el-button>
                  </el-tooltip>
<!--                    <el-tooltip content="修改章节编码" placement="top">-->
<!--                        <el-button-->
<!--                                type="text"-->
<!--                                icon="Edit"-->
<!--                                @click="handleOpdateDig(scope.row.id,scope.row.sid,scope.row.title,scope.row.serialNumber)"-->
<!--                        ></el-button>-->
<!--                    </el-tooltip>-->
                  <el-tooltip content="发布" placement="top">
                    <el-button
                        type="text"
                        icon="Position"
                        @click="handleIssue(scope.row)"
                    ></el-button>
                  </el-tooltip>
                  <el-tooltip content="删除" placement="top">
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
          <el-pagination

              :total="total"
              layout="total, prev, pager, next"
              v-model:page="queryParams.pageNum"
              :page-size=20
              @current-change="getList"
          />
        </div>
        <el-dialog v-model="openDiagonNumber" title="修改章节编号">
            <el-form :model="updateForm">
                <el-form-item label="名称" >
                    <el-text>{{updateForm.title}}</el-text>
                </el-form-item>
                <el-form-item label="编号" >
                    <el-input-number
                            v-model="updateForm.serialNumber"
                            :min="1"
                            controls-position="right"
                            size="large"
                    />
                </el-form-item>
            </el-form>
            <template #footer>
      <span class="dialog-footer">
        <el-button @click="openDiagonNumber = false">取消</el-button>
        <el-button type="primary" @click="handleUpdateNumber()">
          修改
        </el-button>
      </span>
            </template>
       </el-dialog>
</template>

<script lang="ts" setup>
import {  reactive, ref, toRefs} from 'vue'
import {  listDraftChapter,delDraftChapter,issue,updateSerialNumber } from "@/api/admin/draftChapter";
import {useRoute, useRouter} from "vue-router";
import {  Search } from '@element-plus/icons-vue'
import {ElMessage, ElMessageBox} from "element-plus";
import { elementStatusMap } from "@/utils/constant";


// 接收url里的参数
const route = useRoute();
const router = useRouter()


class World {
  id: number
  name: string
  types: string
  intro: string
  createTime:string
}
const loading = ref(true);
const chapterList = ref([]);
const total = ref(0);
const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    title: undefined,
    types: undefined,
    status:7,
  },
  rules: {
    // userName: [{ required: true, message: "用户名称不能为空", trigger: "blur" }, { min: 2, max: 20, message: "用户名称长度必须介于 2 和 20 之间", trigger: "blur" }],
  }
});
const { queryParams, form, rules } = toRefs(data);
const dateRange = ref([]);

const search = ref('')
const openDiagonNumber=ref(false);
function handleDelete ( row){
  ElMessageBox.confirm('是否确认删除章节名称为"' + row.title + '"的草稿数据？').then(function () {
    return delDraftChapter(row.sid,row.id);
  }).then(() => {
    getList(queryParams.value.pageNum);

    ElMessage.success("删除成功");
  }).catch(() => {});
}
function handleUpdate (row)  {
  router.push("/admin/draftChapterEdit?sid="+row.sid+"&dscid="+row.id);
}
function handleSee(row){
  router.push("/admin/draftChapterView?sid="+row.sid+"&dscid="+row.id);
}
function handleIssue(row){
  //console.log("发布："+JSON.stringify(row))
  issue(row.sid,row.id).then(response => {
      ElMessageBox.confirm(
          '继续停留在当前页面还是跳转到章节页?',
          '发布成功',
          {
              confirmButtonText: '停留在当前页面',
              cancelButtonText: '跳转到章节页',
              type: 'success',
          }
      )
          .then(() => {
              getList(queryParams.value.pageNum);
          })
          .catch(() => {
              router.push("/admin/storyChapter?sid="+row.sid+"&sname="+row.sname+"&scid="+row.pid+"&scname="+row.pname);
          })
  });
}
/** 查询元素 */
function getList(page: number) {
  window.scrollTo(0, 0); // 滚动到顶部
  queryParams.value.pageNum=page;

  listDraftChapter(queryParams.value).then(response => {
    loading.value = false;
    chapterList.value = response.data;
    total.value = response.total;
  });
}
const updateForm = reactive({
    id: undefined,
    sid: undefined,
    title: '',
    serialNumber: undefined,
})
function handleOpdateDig(id,sid,title,serialNumber){
    updateForm.id=id;
    updateForm.title=title;
    updateForm.sid=sid;
    updateForm.serialNumber=serialNumber;
    openDiagonNumber.value=true;

}
function handleUpdateNumber(){
    updateSerialNumber(updateForm).then(response => {
         ElMessage.success("修改成功");
         openDiagonNumber.value=false;
         getList(queryParams.value.pageNum);
    });

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
