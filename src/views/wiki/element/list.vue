<template>
  <div class="app-container">
    <div>
      <el-row >
        <el-col :span="21">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/world/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/world/list">世界树</a></el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/world/details', query: {wid:wid} }">{{world.name}}</el-breadcrumb-item>
            <el-breadcrumb-item>元素列表</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
        <el-col :span="3">
          <el-button @click="handleAddDialog"> 添加新元素</el-button>
        </el-col>
      </el-row>
    </div>
    <div>
      <div class="common-layout">
        <el-container>
          <el-main>
            <el-tag>分类:</el-tag><el-tree-select
                v-model="categoryValue"
                :data="dataStree"
                check-strictly
                :render-after-expand="false"
                @change="handFind"
                filterable
                show-checkbox
          />
            <el-table :data="elementList" style="width: 100%">
              <el-table-column label="序号" width="50px">
                <template #default="scope">
                  {{ scope.$index + 1 + (queryParams.pageNum - 1) * 10 }}
                </template>
              </el-table-column>
              <el-table-column label="名称" align="center" key="title" prop="title">
                <template #default="scope">
                  <router-link :to="{path:'/element/details', query: {eid:scope.row.id,wid:scope.row.wid,temType:scope.row.softtype}}">{{ scope.row.title }}</router-link>
                </template>
              </el-table-column>
              <el-table-column label="类型" align="center" :show-overflow-tooltip="true">
                <template #default="scope">
                  <el-tag v-for='idLabel in scope.row.idLabels.split(",")'>
                     {{idLabel.split("$$")[1]}}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column label="简介" align="center" key="intro" prop="intro" :show-overflow-tooltip="true"/>
              <el-table-column label="创建人" align="center" key="createName" prop="createName"
                               :show-overflow-tooltip="true"/>
              <el-table-column label="更新时间" align="center" prop="updateTime" width="160">
                <template #default="scope">
                  <span>{{ scope.row.updateTime }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" >
                <template #header>
                  <el-input v-model="title" size="small" placeholder="请输入元素名称" @change="handFind"/>
                </template>
                <template #default="scope">
                  <el-button size="small" @click="handleSee( scope.row.id,scope.row.wid,scope.row.softtype)">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
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
      </div>
    </div>
  </div>

  <el-dialog
      v-model="dialogVisible"
      title="元素模板"
      width="30%"
      :before-close="handleClose"
  >
    <el-select v-model="temType" placeholder="Select">
      <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled"
      />
    </el-select>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleAdd">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>


<script lang="ts" setup>
import { getCurrentInstance, reactive, ref, toRefs} from 'vue'
import { listElement } from "@/api/wiki/element";
import { getTree} from "@/api/wiki/category";
import { getWorld} from "@/api/wiki/world";
import { useRoute, useRouter} from "vue-router";
const fits = ['世界', '粉丝', '关注']
const activeIndex = ref('1')
const {  appContext : { config: { globalProperties } }  } = getCurrentInstance();

// 接收url里的参数
const route = useRoute();
const router = useRouter()
const wid = ref(null);
wid.value = route.query.wid;

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    title: undefined,
    types: undefined,
    wid:wid.value
  }
});

// 弹出框
const  dialogVisible=ref(false);
const temType = ref(1)
const options = [
  {
    value: 1,
    label: '通用',
  },
  {
    value: 2,
    label:'角色/人物' ,
  },
  {
    value: 3,
    label:'组织/势力',
    disabled: true,
  },
  {
    value: 4,
    label: '动物/植物',
    disabled: true,
  },
  {
    value:5 ,
    label: '种族',
    disabled: true,
  },
]

const { queryParams, form } = toRefs(data);

const elementList = ref([]);
const dataStree = ref([])
const total = ref(0);
const dateRange = ref([]);
//搜索的分类
const categoryValue= ref();
//搜索的元素名称
const title= ref();

/**查看元素详细*/
function handleSee(id:number,wid:number,softtype:number){
  router.push("/element/details?eid="+id+"&wid="+wid+"&temType="+softtype);
}
//添加新元素,需要登录权限
function handleAddDialog(){
  dialogVisible.value=true
  // router.push("/admin/elementAdd?wid="+wid.value);
}
//添加新元素,需要登录权限
function handleAdd(){
  router.push("/admin/elementAddGeneral?wid=" + wid.value + "&temType=" + temType.value);
}
function handFind(){
  queryParams.value.wid=wid.value;
  queryParams.value.title=title.value;
  //console.log("分类查询:"+JSON.stringify(categoryValue.value))
  if(categoryValue.value != null && categoryValue.value != '' && categoryValue.value != undefined){
    queryParams.value.types=categoryValue.value.split("$$")[0];
  }else{
    queryParams.value.types=null
  }
  listElement(globalProperties.addDateRange(queryParams.value, dateRange.value)).then(response => {
    // loading.value = false;
    elementList.value = response.rows;
    total.value = response.total;
  });
}
const world=ref('')
/** 查询世界详细 */
function handWorld() {
  getWorld(wid.value).then(response => {
    //console.log("查询世界详细:"+JSON.stringify(response))
    world.value = response.data
  });
}
/** 查询元素列表 */
function getList() {
  queryParams.value.wid=wid.value;
  listElement(globalProperties.addDateRange(queryParams.value, dateRange.value)).then(response => {
    elementList.value = response.rows;
    total.value = response.total;
  });
}
/** 查询分类列表 */
function getCategoryTree() {
  getTree(wid.value).then(response => {
    dataStree.value = response.data
  });
}
getCategoryTree();
getList();
handWorld();
</script>

<style scoped>

</style>
