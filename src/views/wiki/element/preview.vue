<template>
  <div class="app-container">
    <!--  世界名称-->
    <div >
        <h1>{{ worldBasic.name }}</h1>
        分类: <el-tag v-for="category in worldBasic.categoryList">
        {{category.label}}
      </el-tag>
    </div>
    <el-divider />
    <!--  基本信息 -->
    <div>
        <p>{{worldBasic.basic}}</p>
    </div>
    <el-divider />
    <!-- 元素内容 -->
    <div>
      <div style="background-color: #E5EAF3">
        <el-row >
          <el-col :span="21">
            <div class="biaoti">
              <BootstrapIcon icon="file-richtext-fill" size="1x" flip-v /><span>元素内容</span>
            </div>
          </el-col>
          <el-col :span="3">
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
        <div style="background-color: #cccccc">
          <el-row >
            <el-col :span="19">
              <div class="biaoti">
                <BootstrapIcon icon="caret-down-fill" size="1x" flip-v /><span>{{domain.title  }}</span>
              </div>
            </el-col>
            <el-col :span="5">
            </el-col>
          </el-row>
        </div>
        <div>
          {{domain.value  }}
        </div>
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
import ContentIndex from "./home/Content";
import {FormInstance} from "element-plus";
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
      value: '这里是内容模块,这里是内容模块,这里是内容模块',
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
</style>
