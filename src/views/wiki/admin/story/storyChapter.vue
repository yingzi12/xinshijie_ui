<template>
    <StoryHead :head-type="3" second-type="2" :sid="sid"  :sname="sname" :reel-name="reelName"></StoryHead>

  <!--        统计-->
        <div style="background-color:#b0c4de;margin: auto;padding: 10px">
          <el-row>
            <el-col :span="20">
              <el-input v-model="queryParams.title" placeholder="请输入章节名" class="input-with-select" style="width: 250px"/>
              <el-button :icon="Search" circle @click="getList(1)"/>
            </el-col>
            <el-col :span="4" style="text-align: right;">
              <div style="text-align: right; font-size: 12px" class="toolbar">
                  <a :href='"/admin/storyChapterAdd?sid="+sid+"&sname="+sname+"&scid="+scid+"&scname="+scname'>
                <el-text text >新增章节</el-text>
                  </a>
              </div>
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
              <el-table-column label="章节名称" align="center" key="title" prop="title" :show-overflow-tooltip="true">
                <template #default="scope">
                  <a :href='"/chapter/index?sid="+scope.row.sid+"&scid="+scope.row.id+"&sname="+scope.row.sname'>
                      <el-text>{{scope.row.title}}</el-text>
                  </a>
                </template>
              </el-table-column>
              <el-table-column label="状态" align="center"  >
                <template #default="scope">
                  <span>{{chapterStatusMap.get(scope.row.status)}}</span>
                </template>
              </el-table-column>
              <el-table-column label="创建人" align="center" key="createName" prop="createName"
                               :show-overflow-tooltip="true"/>
              <el-table-column label="创建时间" align="center" prop="createTime" width="160" :show-overflow-tooltip="true" />
              <el-table-column label="更新时间" align="center" prop="updateTime" width="160" :show-overflow-tooltip="true" />
              <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
                <template #default="scope">
                  <el-tooltip content="查看" placement="top">
                    <el-button
                        type="text"
                        icon="See"
                        @click="handleSeeChapter(scope.row)"
                    ></el-button>
                  </el-tooltip>
                  <el-tooltip content="修改" placement="top">
                    <el-button
                        type="text"
                        icon="Edit"
                        @click="handleUpdateChapter(scope.row)"
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
              @current-change="getList"/>
        </div>

</template>

<script lang="ts" setup>
import {  reactive, ref, toRefs} from 'vue'
import { listChapter,delChapter } from "@/api/admin/chapter";
import {useRoute, useRouter} from "vue-router";
import {Search} from '@element-plus/icons-vue'
import {ElMessage, ElMessageBox, FormInstance} from "element-plus";
import StoryHead from "./storyHead.vue";

const chapterStatusMap = new Map([
  [1, "正常"],
  [2, "锁定"],
  [4, "删除"]
]);

const temType = ref(1)
// 接收url里的参数
const route = useRoute();
const router = useRouter()
const sid = ref(route.query.sid);
const scid = ref(route.query.scid);
const reelName = ref(route.query.scname);
const sname = ref(route.query.sname);
const scname = ref(route.query.scname);
//console.log("世界id="+wid.value);


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
const chapterList = ref([]);
const total = ref(0);
const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,

    title: undefined,
    sid:sid.value,
    pid:scid.value,
    level:1
  },
  rules: {
    title: [{ required: true, message: "分类/目录名称不能为空", trigger: "blur" }, { min: 2, max: 20, message: "用户名称长度必须介于 2 和 20 之间", trigger: "blur" }],
  }
});
const ruleFormRef = ref<FormInstance>()
const { queryParams, form, rules } = toRefs(data);
const dateRange = ref([]);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const search = ref('')
//添加新元素,需要登录权限
function handleAdd(){
  router.push();
}

function handleDelete ( row){
  ElMessageBox.confirm('是否确认删除章节名称为"' + row.title + '"的数据？').then(function () {
    return delChapter(row.sid,row.id);
  }).then(() => {
    getList(queryParams.value.pageNum);

    ElMessage.success("删除成功");
  }).catch(() => {});
}

function handleSeeChapter(row){
  router.push("/chapter/index?sid="+row.sid+"&sname="+sname.value+"&scid="+row.id+"&scname="+scname.value);
}
function handleUpdateChapter(row){
  router.push("/admin/storyChapterEdit?sid="+row.sid+"&sname="+sname.value+"&scid="+row.id+"&scname="+scname.value);
}
/** 查询元素 */
function getList(page: number) {
  window.scrollTo(0, 0); // 滚动到顶部
  queryParams.value.pageNum=page;

  listChapter(queryParams.value).then(response => {
    loading.value = false;
    chapterList.value = response.data;
    total.value = response.total;
  });
}
getList(queryParams.value.pageNum);

</script>

<style scoped>
</style>
