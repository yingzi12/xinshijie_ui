<template>
  <div>
    <el-menu
        default-active="3"
        :router="true"
        mode="horizontal"
        style="margin:0px;pardding:0px"
    >
      <el-menu-item index="1" route="/admin/draftChapter"><span style="font-size: 20px;font-weight:bold;">待发布</span></el-menu-item>
      <el-menu-item index="2" route="/admin/draftChapterAudit"><span style="font-size: 20px;font-weight:bold;">待审核</span></el-menu-item>
      <el-menu-item index="3" route="/admin/draftChapterLog"><span style="font-size: 20px;font-weight:bold;">所有</span></el-menu-item>
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
<!--        <div style="text-align: right; font-size: 12px" class="toolbar">-->
<!--          <el-button text @click="handleSeeLog">历史记录</el-button>-->
<!--        </div>-->
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
        <el-table-column label="故事" align="center" key="sname" prop="sname" :show-overflow-tooltip="true"/>
        <el-table-column label="分卷" align="center" key="pname" prop="pname" :show-overflow-tooltip="true"/>
        <el-table-column label="状态" align="center"  >
          <template #default="scope">
            <span>{{draftElementStatusMap.get(scope.row.status)}}</span>
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
        <el-table-column prop="auditContent" label="审核理由" :show-overflow-tooltip="true"/>
        <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="详情" placement="top">
              <el-button
                  type="text"
                  icon="View"
                  @click="handleSee(scope.row)"
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
</template>

<script lang="ts" setup>
import {  reactive, ref, toRefs} from 'vue'
import {  listDraftChapter } from "@/api/admin/draftChapter";
import {useRoute, useRouter} from "vue-router";
import {  Search } from '@element-plus/icons-vue'
import { draftElementStatusMap } from "@/utils/constant";

const fits = ['世界', '粉丝', '关注']
const activeIndex = ref('1')

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
    status:undefined,
  },
  rules: {
    // userName: [{ required: true, message: "用户名称不能为空", trigger: "blur" }, { min: 2, max: 20, message: "用户名称长度必须介于 2 和 20 之间", trigger: "blur" }],
  }
});
const { queryParams, form, rules } = toRefs(data);
const dateRange = ref([]);


const search = ref('')

function handleSee(row){
  router.push("/admin/draftChapterView?sid="+row.sid+"&dscid="+row.id);
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
getList(queryParams.value.pageNum);

</script>

<style scoped>


.center {
  display: flex;
  justify-content: center;
  align-items: center;
}


</style>
