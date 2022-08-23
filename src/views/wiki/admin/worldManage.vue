<template>
  <el-container class="layout-container-demo" >
    <!--    侧边栏-->
    <el-aside width="250px" style="margin: 10px">
      <div>
        <!--        个人信息-->
        <div class="center" style="margin-bottom: 10px;text-align: center;">
          <el-card :body-style="{ padding: '0px' }">
            <!--  头像-->
            <el-avatar :size="50" :src="circleUrl" />
            <div>
              <h3 style="margin:10px;margin-bottom: 10px;font-size:14px;">Yumnumkl</h3>
              <p style="margin: 0px;padding: 0px;font-size:10px;">id:111111</p>
              <div class="bottom" >
                <p style="margin: 0px;padding: 0px;font-size:10px;line-height:120%;">这是一个签名,表达自己的想法用的,没什么实际的意义</p>
                <div class="demo-count">
                  <div  class="block">
                    <span class="demonstration">4</span>
                    <span class="demonstration">世界</span>
                  </div>
                  <div  class="block">
                    <span class="demonstration">4440000</span>
                    <span class="demonstration">粉丝</span>
                  </div>
                  <div  class="block">
                    <span class="demonstration">433</span>
                    <span class="demonstration">关注</span>
                  </div>
                </div>
                <el-button text class="button">用户中心</el-button>
              </div>
            </div>
          </el-card>
        </div>
        <!--        分类-->
        <div style="margin-top: 10px">
          <el-scrollbar>
            <el-menu :default-openeds="['1', '3']">
              <el-sub-menu index="1">
                <template #title>
                  <el-icon><message /></el-icon>我的关注
                </template>
              </el-sub-menu>
              <el-sub-menu index="2">
                <template #title>
                  <el-icon><icon-menu /></el-icon>世界管理
                </template>
              </el-sub-menu>
              <el-sub-menu index="3">
                <template #title>
                  <el-icon><setting /></el-icon>元素草稿
                </template>
              </el-sub-menu>
              <el-sub-menu index="4">
                <template #title>
                  <el-icon><setting /></el-icon>我的评论
                </template>
              </el-sub-menu>
              <el-sub-menu index="5">
                <template #title>
                  <el-icon><setting /></el-icon>我的信息
                </template>
              </el-sub-menu>
            </el-menu>
          </el-scrollbar>
        </div>
      </div>
    </el-aside>
    <!--    表格-->
    <el-container style="margin: 10px">
      <!--       内容区-->
      <el-main>
        <div>
          <el-menu
              :default-active="activeIndex"
              mode="horizontal"
              @select="handleSelect"
              style="margin:0px;pardding:0px"
          >
            <el-menu-item index="1">帝国崛起</el-menu-item>
          </el-menu>
        </div>
        <!--        多选-->
        <div style="padding: 10px">
          <el-space wrap>
              <el-button text> 简介 </el-button>
              <el-button text type="primary"> 造物主列表 </el-button>
              <el-button text> 元素列表 </el-button>
              <el-button text> 元素分类 </el-button>
              <el-button text> 元素审核 </el-button>
              <el-button text> 居民管理 </el-button>
              <el-button text> 评论管理 </el-button>
              <el-button text> 讨论管理 </el-button>
          </el-space>
        </div>
        <!--        统计-->
        <div style="background-color:#b0c4de;margin: auto;padding: 10px">
          <el-row>
            <el-col  :span="4">
              合计({{total}})
            </el-col >
            <el-col :span="20"  style="text-align: right;">
              <div style="text-align: right; font-size: 12px" class="toolbar">
                <el-button type="primary" size="small" :icon="CirclePlus" @click="handleAdd"  >新增</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
        <div>
          <el-scrollbar>
            <el-table v-loading="loading" :data="worldList">
              <el-table-column label="序号" width="50px" >
                <template #default="scope">
                  {{scope.$index+1+(queryParams.pageNum-1)*10}}
                </template>
              </el-table-column>
              <el-table-column label="姓名" align="center" key="userName" prop="userName"  />
              <el-table-column label="等级" align="center" key="ranks" prop="ranks" :show-overflow-tooltip="true" />
              <el-table-column label="简介" align="center" key="intro" prop="intro"  :show-overflow-tooltip="true" />
              <el-table-column label="创建人" align="center" key="createName" prop="createName"  :show-overflow-tooltip="true" />
              <el-table-column label="更新时间" align="center" prop="updateTime"  width="160">
                <template #default="scope">
                  <span>{{scope.row.updateTime}}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
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
      </el-main>
    </el-container>

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
  </el-container>
</template>

<script lang="ts" setup>
import { getCurrentInstance, reactive, ref, toRefs} from 'vue'
import { getWorldManage ,delManage,addManage } from "@/api/admin/manage";
import {useRoute, useRouter} from "vue-router";
import { Menu as IconMenu,CirclePlus, Message, Setting } from '@element-plus/icons-vue'
const fits = ['世界', '粉丝', '关注']
const activeIndex = ref('1')


const router = useRouter()
// 接收url里的参数
const route = useRoute();
const wid = ref(null);
 wid.value = route.query.id;
console.log("世界id="+wid.value);

const {  appContext : { config: { globalProperties } }  } = getCurrentInstance();
const {  proxy  } = getCurrentInstance();
class World {
  id: number
  name: string
  types: string
  intro: string
  createTime:string
}
const open = ref(false);
const loading = ref(true);
const worldList = ref([]);
const total = ref(0);

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    name: undefined,
    types: undefined,
    wid: wid.value,
  },
  rules: {
    userId: [{ required: true, message: "用户id不能为空", trigger: "blur" }, { min: 1, max: 20, message: "用户名称长度必须介于 2 和 20 之间", trigger: "blur" }],
    userName: [{ required: true, message: "用户名称不能为空", trigger: "blur" }, { min: 2, max: 20, message: "用户名称长度必须介于 2 和 20 之间", trigger: "blur" }],
  }
});
const worldTypes=reactive([{id:0,name:"科学"},{id:1,name:"武侠"},{id:2,name:"仙侠"},{id:3,name:"魔幻"},{id:4,name:"奇幻"},{id:5,name:"其他"}])
const { queryParams, form, rules } = toRefs(data);
const dateRange = ref([]);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const search = ref('')
function handleDelete ( row){
  const id = row.id ;
  globalProperties.$modal.confirm('是否确认取消管理员名称为"' + row.userName + '"的权限？').then(function () {
    return delManage(id,row.wid);
  }).then(() => {
    getList();
    globalProperties.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

/** 新增按钮操作 */
function handleAdd() {
  console.log("handleAdd 世界id:"+wid.value)
  form.value.wid=wid.value;
     open.value=true;
};
/** 提交按钮 */
function submitForm() {
  proxy.$refs["manageRef"].validate(valid => {
    if (valid) {
        addManage(form.value).then(response => {
          globalProperties.$modal.msgSuccess("添加成功");
          open.value = false;
          getList();
        });
    }
  });
};
/** 取消按钮 */
function cancel() {
  open.value = false;
  reset();
};
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
  globalProperties.resetForm("userRef");
};
/** 查询管理员列表 */
function getList() {
  console.log("getList 世界id:"+wid.value)
  getWorldManage(wid.value).then(response => {
    loading.value = false;
    worldList.value = response.rows;
    total.value = response.total;
  });
}
getList();
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
