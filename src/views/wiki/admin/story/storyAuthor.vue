<template>
    <StoryHead :head-type="2" :sid="sid" :sname="sname"></StoryHead>
  <!--        统计-->
        <div style="background-color:#b0c4de;margin: auto;padding: 10px">
          <el-row>
            <el-col  :span="4">
              合计({{total}})
            </el-col >
            <el-col :span="20"  style="text-align: right;">
              <div style="text-align: right; font-size: 12px" class="toolbar">
                <el-button v-if="types == 3" type="primary" size="small" :icon="CirclePlus" @click="handleAdd"  >新增</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
        <div>
          <el-scrollbar>
            <el-table v-loading="loading" :data="authorList">
              <el-table-column label="序号" width="80" >
                <template #default="scope">
                  {{scope.$index+1+(queryParams.pageNum-1)*20}}
                </template>
              </el-table-column>
              <el-table-column label="姓名" align="center" key="userName" prop="userName" :show-overflow-tooltip="true" />
              <el-table-column label="等级" align="center" key="ranks" prop="ranks" :show-overflow-tooltip="true" />
              <el-table-column label="签名" align="center" key="sign" prop="sign"  :show-overflow-tooltip="true" />
              <el-table-column label="创建人" align="center" key="createName" prop="createName"  :show-overflow-tooltip="true" />
              <el-table-column label="更新时间" align="center" prop="updateTime"  width="160" :show-overflow-tooltip="true" />
              <el-table-column   v-if="types == 3"  label="操作" align="center" width="150" class-name="small-padding fixed-width">
                <template #default="scope">
                  <el-tooltip content="取消" placement="top" >
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
<!--    添加管理员-->
    <el-dialog title="新增管理员" v-model="open" width="600px" append-to-body>
      <el-form :model="form" :rules="rules" ref="manageRef" label-width="80px">
        <el-input type="hidden" v-model="form.wid"></el-input>
        <el-form-item label="用户昵称" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户id" maxlength="30" />
        </el-form-item>
        <el-form-item label="用户昵称" prop="userName">
          <el-input v-model="form.userName" placeholder="请输入用户昵称" maxlength="30" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import {  reactive, ref, toRefs} from 'vue'
import {useRoute, useRouter} from "vue-router";
import { Menu as IconMenu,CirclePlus, Message, Setting } from '@element-plus/icons-vue'
import { listAuthor ,delAuthor,addAuthor,getAuthor } from "@/api/admin/author";
import StoryHead from "./storyHead.vue";
import {ElMessage, ElMessageBox} from "element-plus";

const fits = ['世界', '粉丝', '关注']
const activeIndex = ref('1')

const router = useRouter()
// 接收url里的参数
const route = useRoute();

const sid = ref();
 sid.value =route.query.sid;

const sname = ref(route.query.sname);
//console.log("世界id="+wid.value);

class Story {
  id: number
  name: string
  types: string
  intro: string
  createTime:string
}
const open = ref(false);
const loading = ref(true);
const authorList = ref([]);
const total = ref(0);

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,

    name: undefined,
    types: undefined,
    status:2,
    sid: sid.value,
  },
  rules: {
    userId: [{ required: true, message: "用户id不能为空", trigger: "blur" }, { min: 1, max: 20, message: "用户名称长度必须介于 2 和 20 之间", trigger: "blur" }],
    userName: [{ required: true, message: "用户名称不能为空", trigger: "blur" }, { min: 2, max: 20, message: "用户名称长度必须介于 2 和 20 之间", trigger: "blur" }],
  }
});
const { queryParams, form, rules } = toRefs(data);
const dateRange = ref([]);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const search = ref('')
function handleDelete ( row){
  const id = row.id ;
  ElMessageBox.confirm('是否确认取消管理员名称为"' + row.userName + '"的权限？').then(function () {
    return delAuthor(id,row.wid);
  }).then(() => {
    getList(queryParams.value.pageNum);

    ElMessage.success("删除成功");
  }).catch(() => {});
}

/** 新增按钮操作 */
function handleAdd() {
  //console.log("handleAdd 世界id:"+wid.value)
  form.value.sid=sid.value;
     open.value=true;
}
/** 提交按钮 */
function submitForm() {
  // proxy.$refs["manageRef"].validate(valid => {
  //   if (valid) {
        addAuthor(form.value).then(response => {
          ElMessage.success("添加成功");
          open.value = false;
          getList(queryParams.value.pageNum);

        });
    // }
  // });
}
/** 取消按钮 */
function cancel() {
  open.value = false;
  reset();
}
/** 重置操作表单 */
function reset() {
  form.value = {
    userId: undefined,
    deptId: undefined,
    userName: undefined,
    nickName: undefined,
    password: undefined,
    phonenumber: undefined,
    email: undefined,
    sex: undefined,
    status: "0",
    remark: undefined,
    postIds: [],
    roleIds: []
  };
}
/** 查询管理员列表 */
function getList(page: number) {
  window.scrollTo(0, 0); // 滚动到顶部
  queryParams.value.pageNum=page;

  //console.log("getList 世界id:"+wid.value)
  listAuthor(sid.value).then(response => {
    loading.value = false;
    authorList.value = response.data;
    total.value = response.data.length;
  });
}
const types=ref(0)
function handleAuthor() {
  //console.log("getManage 世界id:"+wid.value)
  getAuthor(sid.value).then(response => {
    types.value = response.data.types;
    //console.log("types 世界id:"+types.value)
  });
}
handleAuthor()
getList(queryParams.value.pageNum);

</script>

<style scoped>

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}


</style>
