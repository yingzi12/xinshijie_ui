<template>
  <div class="app-container" >
    <div style="margin-top: 20px;margin-bottom: 20px">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
        <el-breadcrumb-item
        ><a href="/public">promotion management</a></el-breadcrumb-item
        >
        <el-breadcrumb-item>promotion list</el-breadcrumb-item>
        <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div >
    <!--  元素名称-->
    <div >
        <h1>{{ element.name }}</h1>
        <span>分类:</span> <el-tag v-for="category in worldBasic.categoryList">
        {{category.label}}
        </el-tag>
    </div>
    <el-divider />
    <!--  基本信息 -->
    <div style="margin-bottom: 20px">
      <div v-html="worldBasic.basic"> </div>
    </div>
<!--    内容简介-->
    <div>
    <div style="background-color: #cccccc;height:50px ;margin-bottom: 20px">
      <el-row >
        <el-col :span="19">
          <div class="biaoti">
            <h3><BootstrapIcon icon="caret-down-fill" size="1x" flip-v /><span>基础</span></h3>
          </div>
        </el-col>
        <el-col :span="5">
        </el-col>
      </el-row>
    </div>
    <div>
      <el-descriptions  :column="3" border style="margin-bottom: 20px">
        <el-descriptions-item
            label="Username"
            label-align="right"
            align="center"
            label-class-name="my-label"
            class-name="my-content"
            width="150px"
        >kooriookami</el-descriptions-item>
        <el-descriptions-item label="Telephone" label-align="right" align="center">18100000000</el-descriptions-item>
        <el-descriptions-item label="Place" label-align="right" align="center">Suzhou</el-descriptions-item>
        <el-descriptions-item label="Remarks" label-align="right" align="center">
          <el-tag size="small">School</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="Address" label-align="right" align="center">No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province</el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
    <!-- 元素内容 -->
    <div>
      <div v-for="(domain, index) in dynamicValidateForm.domains"
            :key="domain.key"
            :label="'Domain' + index"
            :prop="'domains.' + index + '.value'"
            :rules="{
        required: true,
        message: 'domain can not be null',
        trigger: 'blur',
      }"
           style="margin-bottom: 20px"
      >
        <div style="background-color: #cccccc;height:50px ;margin-bottom:10px">
          <el-row >
            <el-col :span="19">
              <div class="biaoti">
               <h3><BootstrapIcon icon="caret-down-fill" size="1x" flip-v /><span>{{domain.title  }}</span></h3>
              </div>
            </el-col>
            <el-col :span="5">
            </el-col>
          </el-row>
        </div>
        <div>
          <div v-html="domain.value"> </div>
        </div>
      </div>
    </div>
    <el-divider />
      <!--功能-->
      <div class="center" style="height: 80px;">
        <el-button @click="submit()">评论</el-button>
        <el-button @click="submit()">编辑</el-button>
      </div>
    </div>
  </div>
</template>

<script  lang="ts" setup>
import { reactive, ref } from 'vue'
import { FormInstance} from "element-plus";
import { useRoute} from "vue-router";
import { getElementDetails } from "@/api/wiki/element";

// 接收url里的参数
const route = useRoute();
console.log(route.query.eid,"参数");
const wid = ref(null);
const eid = ref(null);
wid.value = route.query.wid;
eid.value = route.query.eid;
const element=ref({})
/** 查询世界详细 */
function getElement() {
  getElementDetails(wid.value,eid.value).then(response => {
    console.log("查询世界详细:"+JSON.stringify(response))
    element.value = response.data
  });
}

//基本信息
const worldBasic = reactive({
  name: '这是一个名称',
  basic:'这是对简介,简介,接你这是对简介,简介,接你这是对简介,简介,接你这是对简介,简介,接你这是对简介,简介,接你',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  categoryList: [{id:1,label:"历史"},{id:2,label:"科幻"},{id:3,label:"魔法"}],
  resource: '',
  desc: '',
  createTime:"2022-01-01 11:11:23"
})


//章节模块
const formRef = ref<FormInstance>()
const dynamicValidateForm = reactive<{
  domains: DomainItem[]
}>({
  domains: [
    {
      key: 1,
      title:'小标题',
      value: '这里是内容模块,这里是内容模块,这里是内容模块\n这里是内容模块,这里是内容模块,这里是内容模块这里是内容模块,这里是内容模块,这里是内容模块这里是内容模块,这里是内容模块,这里是内容模块这里是内容模块,这里是内容模块,这里是内容模块这里是内容模块,这里是内容模块,这里是内容模块这里是内容模块,这里是内容模块,这里是内容模块这里是内容模块,这里是内容模块,这里是内容模块\n',
    },
    {
      key: 1,
      title:'小标题',
      value: '这里是内容模块,这里是内容模块,这里是内容模块',
    },
    {
      key: 1,
      title:'小标题',
      value: '这里是内容模块,这里是内容模块,这里是内容模块',
    },
  ]
})

interface DomainItem {
  key: number
  title: string
  value: string
}

// 分类模板
const value = ref()
</script>

<style scoped>
.center2 {
  top: 50%;
  width: 100%;
  text-align: center;
  font-size: 18px;
}
.my-label {
  background: var(--el-color-success-light-9);
}
.my-content {
  background: var(--el-color-danger-light-9);
}
.center {
  top: 50%;
  width: 100%;
  text-align: center;
  font-size: 18px;
}
</style>
