<template>
    <StoryHead :head-type="3" second-type="1" :sid="sid"></StoryHead>
  <!--        统计-->
        <div style="background-color:#b0c4de;margin: auto;padding: 10px">
          <el-row>
            <el-col :span="20">
              <el-input v-model="queryParams.title" placeholder="请输入章节名" class="input-with-select" style="width: 250px"/>
              <el-button :icon="Search" circle @click="getList(1)"/>
            </el-col>
            <el-col :span="4" style="text-align: right;">
              <div style="text-align: right; font-size: 12px" class="toolbar">
                <el-button text @click="handleAddDialog">创建分卷/目录</el-button>
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
              <el-table-column label="元素" align="center" key="title" prop="title" :show-overflow-tooltip="true"/>
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
                  <el-tooltip content="修改名称" placement="top">
                    <el-button
                        type="text"
                        icon="Edit"
                        @click="handleUpdateDialog(scope.row)"
                    ></el-button>
                  </el-tooltip>
                  <el-tooltip content="章节管理" placement="top">
                    <el-button
                        type="text"
                        icon="Menu"
                        @click="handleSeeChapter(scope.row)"
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

  <el-dialog
      v-model="dialogVisible"
      title="创建分卷/目录"
      width="30%"
      :before-close="handleClose"
  >
    <el-form
             ref="ruleFormRef"
             :model="form"
             :rules="rules"
             label-width="120px">
      <el-form-item label="分卷/目录名" prop="title">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleReelAdd(ruleFormRef)">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

  <el-dialog
      v-model="dialogUpdateNameVisible"
      title="修改名字"
      width="30%"
      :before-close="handleClose"
  >
    <el-form
        ref="ruleFormRef"
        :model="form"
        :rules="rules"
        label-width="120px">
      <el-form-item label="分卷/目录名" prop="title">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item>
        <el-button @click="dialogUpdateNameVisible = false">取消</el-button>
        <el-button type="primary" @click="handleUpdateName(ruleFormRef)">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
import {  reactive, ref, toRefs} from 'vue'
import {  listChapter,delChapter,addChapter,updateChapterName } from "@/api/admin/chapter";
import {useRoute, useRouter} from "vue-router";
import {Search} from '@element-plus/icons-vue'
import {ElMessage, ElMessageBox, FormInstance} from "element-plus";
import StoryHead from "./storyHead.vue";

const chapterStatusMap = new Map([
  [1, "正常"],
  [2, "锁定"],
  [4, "删除"]
]);

// 弹出框
const  dialogVisible=ref(false);
const  dialogUpdateNameVisible=ref(false);

const temType = ref(1)
// 接收url里的参数
const route = useRoute();
const router = useRouter()
const sid = ref(null);
sid.value = route.query.sid;
const sname = ref('');
sname.value = <string>route.query.sname;
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
    pid:0,
    level:0
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
function handleAddDialog(){
  form.value.title=''
  form.value.id=''
  dialogVisible.value=true
}

function handleUpdateDialog(row){
  form.value.title=row.title
  form.value.id=row.id
  // console.log("title:"+form.value.title)
  dialogUpdateNameVisible.value=true
}

const handleReelAdd = async (formEl: FormInstance | undefined) => {
  dialogVisible.value=false
  if (!formEl) return
  form.value.sid=sid.value
  await formEl.validate((valid, fields) => {
    if (valid) {
      addChapter(form.value).then(response => {
        // console.log("添加成功:"+JSON.stringify(response))
        form.value.title=''
        form.value.id=-1
        getList(queryParams.value.pageNum);

      })
    } else {
      //console.log('error submit!', fields)
    }
  })
}

const handleUpdateName = async (formEl: FormInstance | undefined) => {
  dialogUpdateNameVisible.value=false
  form.value.sid=sid.value
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      updateChapterName(form.value).then(response => {
        console.log("修改成功:"+JSON.stringify(response))
        form.value.title=''
        getList(queryParams.value.pageNum);

      })
    } else {
      //console.log('error submit!', fields)
    }
  })
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
  router.push("/admin/storyChapter?sid="+row.sid+"&sname="+sname.value+"&scid="+row.id+"&scname="+row.title);
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
