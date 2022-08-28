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
      <div>
        show checkbox: <el-tree-select
            v-model="value"
            :data="data"
            multiple
            :render-after-expand="false"
            show-checkbox />
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
                <BootstrapIcon icon="pencil-square" size="1x" flip-v /><span>小标题</span>  <el-input  size="small" v-model="domain.title" placeholder="Please input" />
              </div>
            </el-col>
            <el-col :span="5">
              <div class="center">
                <el-button @click="submitForm(formRef)"><BootstrapIcon icon="save" size="1x" flip-v />保存</el-button>
                <el-button  @click.prevent="removeDomain(domain)"><BootstrapIcon icon="trash" size="1x" flip-v />删除</el-button>
                <!--            <BootstrapIcon icon="plus-circle" size="1x" flip-v />新增-->
                <!--            <BootstrapIcon icon="lock" size="1x" flip-v />锁定-->
              </div>
            </el-col>
          </el-row>
        </div>
        <div>
          <ckeditor  :editor="editor" v-model="domain.value"
                     :config="editorConfig"></ckeditor>
<!--          <editor-->
<!--              :init="{-->
<!--        plugins: 'lists link image table code help wordcount'-->
<!--      }"-->
<!--          />-->
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
import {inject, reactive, ref} from 'vue'
import {FormInstance} from "element-plus";
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import  Editor  from 'ckeditor5-custom-build/build/ckeditor';

const baseUrl = inject("$baseUrl")
const uploadImgUrl = ref(baseUrl + "/common/uploadEditFile"); // 上传的图片服务器地址
const editor = Editor;
// const editor = ClassicEditor
const editorConfig ={
  language:"zh-cn",
  simpleUpload: {
    // The URL the images are uploaded to.
    uploadUrl: uploadImgUrl.value,
  },
}
//
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
      title:'',
      value: '这是一个测试',
    },
  ],
  email: '',
})

interface DomainItem {
  key: number
  title: string
  value: string
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
    title: '小标题',
    value: '',
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

// 分类模板
const value = ref()
const valueStrictly = ref()

const data = [
  {
    value: '1',
    label: 'Level one 1',
    children: [
      {
        value: '1-1',
        label: 'Level two 1-1',
        children: [
          {
            value: '1-1-1',
            label: 'Level three 1-1-1',
          },
        ],
      },
    ],
  },
  {
    value: '2',
    label: 'Level one 2',
    children: [
      {
        value: '2-1',
        label: 'Level two 2-1',
        children: [
          {
            value: '2-1-1',
            label: 'Level three 2-1-1',
          },
        ],
      },
      {
        value: '2-2',
        label: 'Level two 2-2',
        children: [
          {
            value: '2-2-1',
            label: 'Level three 2-2-1',
          },
        ],
      },
    ],
  },
  {
    value: '3',
    label: 'Level one 3',
    children: [
      {
        value: '3-1',
        label: 'Level two 3-1',
        children: [
          {
            value: '3-1-1',
            label: 'Level three 3-1-1',
          },
        ],
      },
      {
        value: '3-2',
        label: 'Level two 3-2',
        children: [
          {
            value: '3-2-1',
            label: 'Level three 3-2-1',
          },
        ],
      },
    ],
  },
]

</script>

<style scoped>
.center2 {
  top: 50%;
  width: 100%;
  text-align: center;
  font-size: 18px;
}
</style>
