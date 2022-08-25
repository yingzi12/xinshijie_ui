<template>
  <div class="app-container">
    <!--  世界名称-->
    <div >
        <h1>{{ worldBasic.name }}</h1>
        分类: <el-tag v-for="type in worldBasic.types">
        {{type}}
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
                <BootstrapIcon icon="caret-down-fill" size="1x" flip-v /><span>{{domain.title  }}
                <el-tag v-if="domain.isUpdate == 1"  type="warning">(已被修改)</el-tag>
                <el-tag v-if="domain.isDelete == 1"  type="danger">(已被删除)</el-tag>
                <el-tag v-if="domain.isNew == 1"  type="success">(新增)</el-tag>
              </span>
              </div>
            </el-col>
            <el-col :span="5">
                <el-button v-if="domain.isUpdate == 1" @click="openDiff(domain.diff)">查看差异</el-button>
            </el-col>
          </el-row>
        </div>
        <div>
          {{domain.value  }}
        </div>
      </div>
    </div>
    <!--功能-->
    <el-divider />

    <div>
      <div>
        <el-input></el-input>
      </div>
      <div>
      <el-button>通过</el-button>
      <el-button>拒绝</el-button>
      </div>
    </div>
  </div>

  <!--内容比对框-->

  <el-dialog v-model="dialogDiffVisible" title="内容差异">
    <div id="myDiffElement" v-html="rawHtml"></div>
  </el-dialog>

</template>

<script  lang="ts" setup>
import { reactive, ref } from 'vue'
import {FormInstance} from "element-plus";
import * as Diff2Html from 'diff2html';
import 'diff2html/bundles/css/diff2html.min.css';
//基本信息
const worldBasic = reactive({
  name: '这是一个名称',
  basic:'这是对简介,简介,接你这是对简介,简介,接你这是对简介,简介,接你这是对简介,简介,接你这是对简介,简介,接你',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  types: ["历史","科幻","魔法"],
  resource: '',
  desc: '',
  updateConetext: '修改理由',
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
      cid: 1,
      diff: '',
      isUpdate: 0,
      isDelete: 0,
      isNew:0,
    },
    {
      key: 1,
      title:'小标题',
      value: '这里是内容模块,这里是内容模块,这里是内容模块',
      cid: 1,
      diff: `
--- n1.txt
+++ n2.txt
@@ -0,0 +0,0 @@
 asdfaf
 文件金拉夫亲
@@ -3,4 +3,6 @@
-额契若金兰 就落款日期李会计连接器
-全家人8剪力墙软件
-   贰仟家人去楼空人就
-就;确认;林俊杰j;j
+额契若金兰 就落款日期李会计连接器客户还客户了可
+全家人8剪力墙软件 req
+   贰仟家人空人就
+erw elj j ljwerj l
+ejrlqr lqkr
+ljkqewrq rljk qreq

 二级区离开两节课;就 讲日;
@@ -9,1 +11,1 @@
-确认缺
+确认afda缺

`,
      isUpdate: 1,
      isDelete: 0,
      isNew:0,
    },
    {
      key: 1,
      title:'小标题',
      value: '这里是内容模块,这里是内容模块,这里是内容模块',
      cid: 1,
      diff: '',
      isUpdate: 0,
      isDelete: 1,
      isNew:0,
    },
    {
      key: 1,
      title:'小标题',
      value: '这里是内容模块,这里是内容模块,这里是内容模块',
      cid: 1,
      diff: '',
      isUpdate: 0,
      isDelete: 0,
      isNew:1,
    },
  ]
})

interface DomainItem {
  key: number
  //内容id
  cid: number
  title: string
  value: string
  //被修改的内容
  diff:  String
  //是否已被修改
  isUpdate:number,
  //是否被删除
  isDelete:number,
  //是否是新增
  isNew:number,
}

// 内容比对
const dialogDiffVisible = ref(false)
const rawHtml=ref('');
const prettyHtml  = (diffString:string) => {
  return Diff2Html.html(diffString, {
    drawFileList: false,
    matching: 'lines',
    outputFormat: 'side-by-side',
  });
}
function openDiff(diff:String){
  rawHtml.value=prettyHtml(diff);
  dialogDiffVisible.value=true;
}
</script>

<style scoped>
.center2 {
  top: 50%;
  width: 100%;
  text-align: center;
  font-size: 18px;
}
</style>
