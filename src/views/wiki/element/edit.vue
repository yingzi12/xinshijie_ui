<template>
  <div class="app-container">
    <!--  世界名称-->
    <div style="background-color: #E5EAF3">
        <h2  class="center2">名称</h2>
    </div>
    <!--  分类管理 -->
    <div>
      <div style="background-color: #E5EAF3">
        <BootstrapIcon icon="card-list" size="1x" flip-v /><span>分类管理</span>
      </div>
      <div style="height: 55px">
        <div>
          分类: <el-tree-select
            ref="treeRef"
            v-model="value"
            :data="dataStree"
            multiple
            collapse-tags
            :render-after-expand="false"
            @change="show"
            show-checkbox />
        </div>
        <div>
          已选择: <el-tag
            v-for="tag in dynamicTags"
            :key="tag"
            class="mx-1"
            :disable-transitions="false">
          {{ tag }}
        </el-tag>

        </div>
      </div>
    </div>
    <!--  基本信息 -->
    <div>
      <div style="background-color: #E5EAF3">
        <BootstrapIcon icon="card-checklist" size="1x" flip-v /><span>基本信息</span>
      </div>
      <div>
        <el-form :model="formBasic" label-width="120px">
          <el-form-item label="名称">
            <el-input v-model="formBasic.name" />
          </el-form-item>
          <el-form-item label="Activity form">
            <el-input v-model="formBasic.desc" type="textarea" />
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 元素内容 -->
    <div>
      <div style="background-color: #E5EAF3">
        <el-row >
          <el-col :span="21">
            <div class="biaoti">
              <BootstrapIcon icon="pencil-square" size="1x" flip-v /><span>元素内容</span>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="center">
              <el-button type="info" @click="addDomain" round>添加内容小节</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
      <div v-for="(domain, index) in dynamicValidateForm.domains"
            :key="domain.key"
            :label="'Domain' + index"
            :prop="'domains.' + index + '.value'"
            :rules="{
        required: true,
        message: 'domain can not be null',
        trigger: 'blur',
      }"
      >
        <el-form :inline="true" :model="dynamicValidateForm" class="demo-form-inline">
        <div style="background-color: #cccccc">
          <el-row >
            <el-col :span="19">
              <div class="biaoti">
                <BootstrapIcon icon="pencil-square" size="1x" flip-v />
                <span v-if="domain.isEdit == 0">小标题</span>
                <el-input  style="width:100px" v-if="domain.isEdit == 1"  size="small" v-model="domain.title" placeholder="小标题" />
              </div>
            </el-col>
            <el-col :span="5">
              <div class="center">
                <el-button v-if="domain.status == 0" @click="submitForm(formRef)"><BootstrapIcon icon="save" size="1x" flip-v />保存</el-button>
                <el-button v-if="domain.status == 0" @click.prevent="removeDomain(domain)"><BootstrapIcon icon="trash" size="1x" flip-v />删除</el-button>
                <el-button v-if="domain.status == 1" ><BootstrapIcon icon="lock" size="1x" flip-v />锁定</el-button>
                <el-button v-if="domain.status == 2" ><BootstrapIcon icon="pencil-square" size="1x" flip-v />编辑</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
        <div>
              <ckeditor :editor="editor" v-model="domain.value" :config="editorConfig"></ckeditor>
        </div>
        </el-form>

      </div>
    </div>
    <!--功能-->
    <div>
      <el-button>预览</el-button>
    </div>
  </div>
</template>

<script  lang="ts" setup>
import { reactive, ref } from 'vue'
import {ElTree, FormInstance} from "element-plus";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {  getElementDetails } from "@/api/wiki/element";
import {  updatePush } from "@/api/admin/element";
import { getTree} from "@/api/wiki/category";

//接受参数
import { useRoute ,useRouter}  from "vue-router";  // 引用vue-router
const router = useRouter()
// 接收url里的参数
const route = useRoute();
//世界信息
const eid = ref(null);
const wid = ref(null);
eid.value = route.query.eid;
wid.value = route.query.wid;
console.log("元素id="+eid.value);
console.log("世界id="+wid.value);

const editorConfig = {}
const editor = ClassicEditor
//基本信息
const formBasic = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})


//章节模块
const formRef = ref<FormInstance>()
const dynamicValidateForm = reactive<{
  domains: DomainItem[]
  email: string
}>({
  domains: [
    {
      key: 1,
      value: '666',
      title: "小标题1",
      status: 2,
      isEdit: 0
    },{
      key: 2,
      value: '777',
      title: "小标题2",
      status: 2,
      isEdit: 0
    },{
      key: 3,
      value: '888',
      title: "小标题3",
      status: 1,
      isEdit: 0
    },{
      key: 4,
      value: '999',
      title: "小标题4",
      status: 0,
      isEdit: 1
    },
  ],
  email: '',
})

interface DomainItem {
  key: number
  value: string
  title: string
  status: number
  isEdit: number
}

const removeDomain = (item: DomainItem) => {
  const index = dynamicValidateForm.domains.indexOf(item)
  if (index !== -1) {
    dynamicValidateForm.domains.splice(index, 1)
  }
}

const addDomain = () => {
  dynamicValidateForm.domains.push({
    key: Date.now(),
    status:0,
    title: '',
    value: '',
    isEdit: 1,
  })
}

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const dataStree = ref([])
//分类标签
const dynamicTags = ref([])
//分类选择
const treeRef = ref<InstanceType<typeof ElTree>>()
//基础信息
const element = ref<InstanceType<Element>>({})
//原始的选中的value
const sleValue=ref({})
/** 查询世界列表 */
function getList() {
  getTree(wid.value).then(response => {
    dataStree.value = response.data
  });
}

function  show(val){
//let that = this ,将this保存在that中，再在函数中使用that均可
  dynamicTags.value=value.value
  console.log("选中的对象value1"+value.value)
  console.log("选中的对象label"+JSON.stringify(treeRef.value))

  sleValue.value=new Array();
  dynamicTags.value=new Array();
  for(let i=0;i<=value.value.length-1;i++){
    dynamicTags.value[i]=value.value[i].split('$$')[1]
    sleValue.value[i]=value.value[i].split('$$')[0]
  }
  element.value.categoryList=sleValue;
  console.log("选中的对象value2"+value.value)
  console.log("选中的对象sleValue2"+sleValue.value)
  console.log("选中的对象element:"+JSON.stringify(element.value))
}
getList()
</script>

<style scoped>
.center2 {
  top: 50%;
  width: 100%;
  text-align: center;
  font-size: 18px;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
