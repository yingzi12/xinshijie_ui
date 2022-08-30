<template>
  <el-container class="layout-container-demo">
    <!--    侧边栏-->
    <el-aside width="250px" style="margin: 10px">
      <div>
        <!--        个人信息-->
        <div class="center" style="margin-bottom: 10px;text-align: center;">
          <el-card :body-style="{ padding: '0px' }">
            <!--  头像-->
            <el-avatar :size="50" :src="circleUrl"/>
            <div>
              <h3 style="margin:10px;margin-bottom: 10px;font-size:14px;">Yumnumkl</h3>
              <p style="margin: 0px;padding: 0px;font-size:10px;">id:111111</p>
              <div class="bottom">
                <p style="margin: 0px;padding: 0px;font-size:10px;line-height:120%;">这是一个签名,表达自己的想法用的,没什么实际的意义</p>
                <div class="demo-count">
                  <div class="block">
                    <span class="demonstration">4</span>
                    <span class="demonstration">世界</span>
                  </div>
                  <div class="block">
                    <span class="demonstration">4440000</span>
                    <span class="demonstration">粉丝</span>
                  </div>
                  <div class="block">
                    <span class="demonstration">433</span>
                    <span class="demonstration">关注</span>
                  </div>
                </div>
                <el-button text class="button">用户中心</el-button>
              </div>
            </div>
          </el-card>
        </div>
        <!--        功栏栏-->
        <div style="margin-top: 10px">
          <el-scrollbar>
            <el-menu   :router="true"   :collapse="isCollapse"
                       default-active="2">
              <el-menu-item index="/admin/index">
                <el-icon><icon-menu /></el-icon>
                <template #title>我的关注</template>
              </el-menu-item>
              <el-menu-item index="/admin/world">
                <el-icon><icon-menu /></el-icon>
                <template #title>世界管理</template>
              </el-menu-item>
              <el-menu-item index="/admin/draft">
                <el-icon><icon-menu /></el-icon>
                <template #title>元素草稿</template>
              </el-menu-item>
              <el-menu-item index="/admin/disscuss">
                <el-icon><icon-menu /></el-icon>
                <template #title>我的评论</template>
              </el-menu-item>
              <el-menu-item index="/admin/message">
                <el-icon><icon-menu /></el-icon>
                <template #title>我的信息</template>
              </el-menu-item>
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
            <el-menu-item index="1">草稿管理</el-menu-item>
          </el-menu>
        </div>
        <!--        统计-->
        <div style="background-color:#b0c4de;margin: auto;padding: 10px">
          <el-row>
            <el-col :span="20">
<!--              <el-tree-select v-model="value" :data="dataStree" check-strictly :render-after-expand="false"/>-->
              <el-input v-model="input3" placeholder="Please input" class="input-with-select" style="width: 250px"/>
              <el-button :icon="Search" circle/>
            </el-col>
            <el-col :span="4" style="text-align: right;">
              <div style="text-align: right; font-size: 12px" class="toolbar">
                <el-button text @click="handleSeeLog">历史记录</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
        <!--        表格-->
        <div>
          <el-scrollbar>
            <el-table v-loading="loading" :data="elementList" >
              <el-table-column label="序号" width="50px">
                <template #default="scope">
                  {{ scope.$index + 1 + (queryParams.pageNum - 1) * 10 }}
                </template>
              </el-table-column>
              <el-table-column label="名称" align="center" key="title" prop="title"/>
              <el-table-column label="世界" align="center" key="wanme" prop="wanme"/>
              <el-table-column label="类型" align="center" key="typeName" prop="typeName" :show-overflow-tooltip="true"/>
              <el-table-column label="简介" align="center" key="intro" prop="intro" :show-overflow-tooltip="true"/>
              <el-table-column label="创建人" align="center" key="createName" prop="createName"
                               :show-overflow-tooltip="true"/>
              <el-table-column label="更新时间" align="center" prop="updateTime" width="160">
                <template #default="scope">
                  <span>{{ scope.row.updateTime }}</span>
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
        <div style="float:right; ">
          <pagination
              v-show="total > 0"
              :total="total"
              v-model:page="queryParams.pageNum"
              v-model:limit="queryParams.pageSize"
              @pagination="getList"/>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { getCurrentInstance, reactive, ref, toRefs} from 'vue'
import {  listDraft,delDraft } from "@/api/admin/draftElement";
// import { getTree} from "@/api/wiki/category";
import {useRoute, useRouter} from "vue-router";
import { Menu as IconMenu, Search,Message, Setting } from '@element-plus/icons-vue'
const fits = ['世界', '粉丝', '关注']
const activeIndex = ref('1')

// 接收url里的参数
const route = useRoute();
const router = useRouter()
// const wid = ref(null);
// wid.value = route.query.wid;
// console.log("世界id="+wid.value);
const {  appContext : { config: { globalProperties } }  } = getCurrentInstance();
const {  proxy  } = getCurrentInstance();
class World {
  id: number
  name: string
  types: string
  intro: string
  createTime:string
}
//分类选项
// const dataStree = ref([])
const loading = ref(true);
const elementList = ref([]);
const total = ref(0);
const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    name: undefined,
    types: undefined,
    // wid:wid.value
  },
  rules: {
    // userName: [{ required: true, message: "用户名称不能为空", trigger: "blur" }, { min: 2, max: 20, message: "用户名称长度必须介于 2 和 20 之间", trigger: "blur" }],
  }
});
const { queryParams, form, rules } = toRefs(data);
const dateRange = ref([]);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const search = ref('')
function handleUpdate (row)  {
  router.push("/world/edit?id="+row.id);
}
function handleDelete ( row){
  globalProperties.$modal.confirm('是否确认删除世界名称为"' + row.title + '"的数据？').then(function () {
    return delDraft(row.id);
  }).then(() => {
    getList();
    globalProperties.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

function handleSee(row){
  router.push("/admin/draftPreview?wid="+row.wid+"&deid="+row.id);
}
/**根据分类查询世界*/
function findType(typeId:number) {
  // queryParams.value.wid=wid.value;
  listDraft(globalProperties.addDateRange(queryParams.value, dateRange.value)).then(response => {
    loading.value = false;
    elementList.value = response.rows;
    total.value = response.total;
  });
}
/** 查询元素列表 */
function getList() {
  listDraft(globalProperties.addDateRange(queryParams.value, dateRange.value)).then(response => {
    loading.value = false;
    elementList.value = response.rows;
    total.value = response.total;
  });
}
/** 查询分类列表 */
// function getCategoryTree() {
//   getTree(wid.value).then(response => {
//     dataStree.value = response.data
//   });
// }
// getCategoryTree();
getList();


const value = ref()

const input3 = ref('')
const dialogFormVisible = ref(false)

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
