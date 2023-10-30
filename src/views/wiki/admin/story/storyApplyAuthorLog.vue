<template>
  <!--        标题-->
    <AdminHead :head-type="10" :sid="sid" :sname="sname" second-type="2"></AdminHead>

  <!--        统计-->
    <div style="background-color:#b0c4de;margin: auto;padding: 10px">
        <el-row>
            <el-col  :span="4">
                合计({{total}})
            </el-col >
            <el-col :span="20"  style="text-align: right;">
                              <div style="text-align: right; font-size: 12px" class="toolbar">
                                <el-button  type="primary" size="small"  @click="handleReturn"  >返回</el-button>
                              </div>
            </el-col>
        </el-row>
    </div>
    <div>
        <el-scrollbar>
            <el-table  :data="applyAuthorList">
                <el-table-column label="序号" width="80" >
                    <template #default="scope">
                        {{scope.$index+1+(queryParams.pageNum-1)*20}}
                    </template>
                </el-table-column>
                <el-table-column label="用户名" align="center" key="applyName" prop="userName" :show-overflow-tooltip="true" />
                <el-table-column label="申请时间" align="center" key="applyTime" prop="createName"  :show-overflow-tooltip="true" />
                <el-table-column label="申请说明" align="center" prop="applyExplain"   :show-overflow-tooltip="true" />
                <el-table-column label="审核人" align="center" key="auditName" prop="userName" :show-overflow-tooltip="true" />
                <el-table-column label="审核时间" align="center" key="auditTime" prop="createName"  :show-overflow-tooltip="true" />
                <el-table-column label="审核说明" align="center" prop="auditExplain"   :show-overflow-tooltip="true" />
                <el-table-column label="状态" align="center" prop="status"   >
                    <template #default="scope">
                        <span>{{applyStatusMap.get(scope.row.status)}}</span>
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
import AdminHead from './storyHead'
import {  reactive, ref, toRefs} from 'vue'
import {useRoute, useRouter} from "vue-router";
import { pageApplyAuthor  } from "@/api/admin/applyAuthor";
import {applyStatusMap } from "@/utils/constant";


const router = useRouter()
// 接收url里的参数
const route = useRoute();

const wid = ref(route.query.wid);
const sid = ref(route.query.sid);
const wname = ref(route.query.wname);




const loading = ref(true);
const applyAuthorList = ref([]);
const total = ref(0);

const data = reactive({
    queryParams: {
        pageNum: 1,
        name: undefined,
        types: undefined,
        wid: wid.value,
        sid:sid.value,

    }
});
const { queryParams } = toRefs(data);
const dateRange = ref([]);

function handleReturn(){
    router.back()
}
/** 查询管理员列表 */
function getList(page: number) {
    window.scrollTo(0, 0); // 滚动到顶部
    queryParams.value.pageNum=page;
    pageApplyAuthor(queryParams.value).then(response => {
        applyAuthorList.value = response.data
        total.value = response.total;
    });
}

getList(queryParams.value.pageNum);

</script>

<style scoped>

</style>
