<template>
  <div class="app-container">
    <!--  世界名称-->
    <div style="background-color:#8c939d;height: 30px">
        <h2  class="center2">名称</h2>
    </div>
    <!--  分类管理 -->
    <div >
      <div style="background-color: #E5EAF3;height: 25px">
        <BootstrapIcon icon="card-list" size="1x" flip-v /><span>分类管理</span>
      </div>
      <div style="height: 55px">
        <div>
        分类: <el-tree-select
            ref="treeRef"
            v-model="categoryList"
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
        <el-form :model="element" label-width="120px">
          <el-form-item label="名称">
            <el-input v-model="element.title" />
          </el-form-item>
          <el-form-item label="简介">
            <el-input v-model="element.intro" type="textarea" />
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
     <el-form            ref="ruleFormRef"
                         :inline="true" :model="dynamicValidateForm" class="demo-form-inline">
      <div style="background-color: #cccccc">
          <el-row >
            <el-col :span="19">
              <div class="biaoti">
                <BootstrapIcon icon="pencil-square" size="1x" flip-v />
                 <span v-if="domain.isEdit = 0">小标题</span>
                <el-input  style="width:100px" v-if="domain.isEdit = 1"  size="small" v-model="domain.title" placeholder="小标题" />
              </div>
            </el-col>
            <el-col :span="5">
              <div class="center">
<!--                <el-button v-if="domain.status == 0" @click="submitForm(ruleFormRef,domain)"><BootstrapIcon icon="save" size="1x" flip-v />保存</el-button>-->
                <el-button v-if="domain.status == 0" @click.prevent="removeDomain(domain)"><BootstrapIcon icon="trash" size="1x" flip-v />删除</el-button>
                <el-button v-if="domain.status == 1" ><BootstrapIcon icon="lock" size="1x" flip-v />锁定</el-button>
                <el-button v-if="domain.status == 2" ><BootstrapIcon icon="pencil-square" size="1x" flip-v />编辑</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
        <div>
          <ckeditor :editor="editor" v-model="domain.content" :config="editorConfig"></ckeditor>
        </div>
        </el-form>
      </div>
    </div>
    <!--功能-->
    <div class="center" style="height: 80px;">
      <el-button @click="submit()">保存并预览</el-button>
    </div>
  </div>
</template>

<script  lang="ts" setup>
import {getCurrentInstance, reactive, ref} from 'vue'
import {ElTree, FormInstance, ElInput, ElMessage} from "element-plus";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { getTree} from "@/api/wiki/category";
import { addElement} from "@/api/wiki/element";
import {useRoute, useRouter} from "vue-router";

// 接收url里的参数
const route = useRoute();
const router = useRouter()

console.log(route.query.wid,"参数");
const wid = route.query.wid
console.log("世界id="+wid);
const editorConfig = {}
const editor = ClassicEditor
const {  appContext : { config: { globalProperties } }  } = getCurrentInstance();
const {  proxy  } = getCurrentInstance();
// 分类模板
const categoryList = ref()

const dataStree = ref([])
//分类标签
const dynamicTags = ref([])
//分类选择
const treeRef = ref<InstanceType<typeof ElTree>>()
//基础信息
const element = ref<InstanceType<Element>>({})
element.value.wid=wid;
//原始的选中的value
const sleValue=ref({})
//章节模块
const ruleFormRef = ref<FormInstance>()
const dynamicValidateForm = reactive<{
  domains: Content[]
  email: string
}>({
  domains: [
    {
      key: 1,
      title:'标题',
      status: 0,
      isEdit: 0,
      content: '',
    },
  ],
  email: '',
})

interface Content {
  key: number
  title: string
  status: number,
  isEdit: number,
  content: string,
}
//基本信息
interface Element {
  wid:String,
  title:string,
  intro:String,
  softtype: number,
  categoryList:[],
  contentList:[]
}
interface Tree {
  id: number
  label: string
  children?: Tree[]
}

const removeDomain = (item: Content) => {
  const index = dynamicValidateForm.domains.indexOf(item)
  if (index !== -1) {
    dynamicValidateForm.domains.splice(index, 1)
  }
}

const addDomain = () => {
  dynamicValidateForm.domains.push({
    key: Date.now(),
    title: '小标题',
    status: 0,
    isEdit: 1,
    content: '',
  })
}
function submit(){
  var ok=true;
  element.value.contentList=dynamicValidateForm.domains;
  if(!element.value.title ){
    ok=false;
    ElMessage.error('名称不能为空!')
  }
  if(!element.value.intro ){
    ok=false;
    ElMessage.error('简介不能为空!')
  }
  if(!(element.value.title.length >1 && element.value.title.length < 100)){
    ok=false;
    ElMessage.error('名称长度不能超过100!')
  }
  console.log("简介长度:"+element.value.intro.length)
  console.log("简介长度:"+element.value.intro.length>10)
  console.log("简介长度:"+element.value.intro.length <300)

  if(!(element.value.intro.length>10 && element.value.intro.length <300)){
    ok=false;
    ElMessage.error('简介长度不能小于10超过100!')
  }
  if(ok) {
    addElement(element.value).then(response => {
      console.log("添加成功")
      router.push("/element/preview?wid="+ response.data.wid+"&eid=" + response.data.id)
    });
  }
}
//单个章节保存
// const submitForm = (formEl: FormInstance | undefined,item: Content) => {
//   console.log("参数:"+JSON.stringify(dynamicValidateForm.domains))
//   console.log("参数:"+JSON.stringify(item))
//   if (!formEl) return
//   formEl.validate((valid) => {
//     if (valid) {
//       console.log('submit!')
//     } else {
//       console.log('error submit!')
//       return false
//     }
//   })
// }
/** 查询世界列表 */
function getList() {
  getTree(wid).then(response => {
    dataStree.value = response.data
  });
}

function  show(val){
//let that = this ,将this保存在that中，再在函数中使用that均可
  dynamicTags.value=categoryList.value
  console.log("选中的对象value1"+categoryList.value)
  console.log("选中的对象label"+JSON.stringify(treeRef.value))

  sleValue.value=new Array();
  dynamicTags.value=new Array();
  for(let i=0;i<=categoryList.value.length-1;i++){
    dynamicTags.value[i]=categoryList.value[i].split('$$')[1]
    sleValue.value[i]=categoryList.value[i].split('$$')[0]
  }
  element.value.categoryList=sleValue;
  console.log("选中的对象value2"+categoryList.value)
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
