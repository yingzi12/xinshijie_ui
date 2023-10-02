<template>
  <!--        标题-->
    <AdminHead :head-type="10" :sid="sid" ></AdminHead>

  <!--        统计-->
    <div style="background-color:#b0c4de;margin: auto;padding: 10px">
        <el-row>
            <el-col  :span="4">
                合计({{total}})
            </el-col >
            <el-col :span="20"  style="text-align: right;">
                <div style="text-align: right; font-size: 12px" class="toolbar">
                    <el-button  type="primary" size="small"  @click="handLog"  >历史记录</el-button>
                </div>
            </el-col>
        </el-row>
    </div>
    <div>
        <el-scrollbar>
            <el-table v-loading="loading" :data="applyAuthorList">
                <el-table-column label="序号" width="80" >
                    <template #default="scope">
                        {{scope.$index+1+(queryParams.pageNum-1)*20}}
                    </template>
                </el-table-column>
                <el-table-column label="用户名" align="center" key="applyName" prop="userName" :show-overflow-tooltip="true" />
                <el-table-column label="申请时间" align="center" key="applyTime" prop="createName"  :show-overflow-tooltip="true" />
                <el-table-column label="申请说明" align="center" prop="applyExplain"   :show-overflow-tooltip="true" />
                <el-table-column label="状态" align="center" prop="status"   >
                    <template #default="scope">
                        <span>{{applyStatusMap.get(scope.row.status)}}</span>
                    </template>
                </el-table-column>
                <el-table-column   label="操作" align="center" width="150" class-name="small-padding fixed-width">
                    <template #default="scope">
                        <el-tooltip v-if="scope.row.status == 1" content="审核" placement="top" >
                            <el-button
                                    type="text"
                                    icon="Delete"
                                    @click="handleOpenDialog(scope.row)"
                            ></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>

        </el-scrollbar>
    </div>
  <!--    审核创造者-->
    <el-dialog title="审核作家" v-model="openAuditDialog" width="600px" append-to-body>
        <el-form :model="auditForm"
                 :rules="auditRules"
                 ref="auditFormRef"
                 label-width="80px">

<!--            <el-form-item label="用户ID" prop="applyId">-->
<!--                <span>{{auditForm.applyId}}</span>-->
<!--            </el-form-item>-->
            <el-form-item label="用户昵称" prop="applyName">
                <span>{{auditForm.applyName}}</span>
            </el-form-item>
            <el-form-item label="申请理由" prop="userName">
                <span>{{auditForm.applyExplain}}</span>
            </el-form-item>
            <el-form-item label="审核:" prop="status" >
                <el-radio-group v-model="auditForm.status">
                    <el-radio :label="2">通过</el-radio>
                    <el-radio :label="3">拒绝</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="审核说明"  prop="applyExplain">
                <el-input
                    v-model="auditForm.auditExplain"
                    :rows="3"
                    type="textarea"
                    placeholder="请输入审核说明.不能超过500字"
                />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(auditFormRef)">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
            </el-form-item>
        </el-form>
<!--        <template #footer>-->
<!--            <div class="dialog-footer">-->
<!--                <el-button type="primary" @click="submitForm">确 定</el-button>-->
<!--                <el-button @click="cancel">取 消</el-button>-->
<!--            </div>-->
<!--        </template>-->
    </el-dialog>
</template>

<script lang="ts" setup>
import AdminHead from './storyHead'
import { getCurrentInstance, reactive, ref, toRefs} from 'vue'
import {useRoute, useRouter} from "vue-router";
import { listApplyAuthor ,auditApplyAuthor } from "@/api/admin/applyAuthor";
import {applyStatusMap } from "@/utils/constant";
import {FormInstance} from "element-plus";


const fits = ['世界', '粉丝', '关注']
const activeIndex = ref('1')

const router = useRouter()
// 接收url里的参数
const route = useRoute();

const wid = ref();
wid.value =route.query.wid;
const sid = ref(null);
sid.value = route.query.sid;
const wname = ref('');
wname.value = <string>route.query.wname;
const sname = ref('');
sname.value = <string>route.query.sname;
const {  appContext : { config: { globalProperties } }  } = getCurrentInstance();
const {  proxy  } = getCurrentInstance();

const openAuditDialog = ref(false);
const loading = ref(true);
const applyAuthorList = ref([]);
const total = ref(0);

const data = reactive({
    auditForm: {
        wid:wid.value,
        wname:wname.value,
        sid:sid.value,
        sname:sname.value,
        auditExplain:'',
        applyExplain:'',
        id:undefined,
        status:2,
        applyId:undefined,
        applyName:''
    },
    queryParams: {
        pageNum: 1,
        name: undefined,
        types: undefined,
        wid: wid.value,
        sid:sid.value,
    },
    auditRules: {
        auditExplain: [{ required: true, message: "审核理由", trigger: "blur" }, { min: 5, max: 500, message: "审核理由长度必须介于 5 和 500 之间", trigger: "blur" }],
        status: [{ required: true, message: "审核必须选择", trigger: "blur" }],
    }
});
const { queryParams, auditForm, auditRules } = toRefs(data);
const auditFormRef = ref<FormInstance>()


function handleOpenDialog(row) {

    auditForm.value.auditExplain='';
    auditForm.value.id=row.id;
    auditForm.value.status=2;
    auditForm.value.applyId=row.applyId;
    auditForm.value.applyName=row.applyName;
    auditForm.value.applyExplain=row.applyExplain;

    openAuditDialog.value=true
};
function cancel(){
    openAuditDialog.value=false
}
/** 提交按钮 */
function submitForm(formEl: FormInstance | undefined) {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            auditApplyAuthor(auditForm.value).then(response => {
                globalProperties.$modal.msgSuccess("添加成功");
                open.value = false;
                getList(queryParams.value.pageNum);

            });
        } else {
            return false
        }
    })
};

/** 查询管理员列表 */
function getList(page: number) {
    window.scrollTo(0, 0); // 滚动到顶部
    queryParams.value.pageNum=page;
    listApplyAuthor(wid.value,sid.value).then(response => {
        loading.value = false;
        applyAuthorList.value = response.rows;
        total.value = response.total;
    });
}

function handLog(){
    router.push("/admin/storyApplyAuthorLog?wid="+wid.value+"&wname="+wname.value+"&sid="+sid.value+"&sname="+sname.value);
}
getList(queryParams.value.pageNum);

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
