<template>
<!--  <div >-->
<!--    <h1>{{ element.title }}</h1>-->
<!--    <span>更新时间:</span><el-tag>{{element.updateTime}}</el-tag>-->
<!--    <span>分类:</span> <el-tag v-for="category in element.categoryList">-->
<!--    {{category.label}}-->
<!--  </el-tag>-->
<!--  </div>-->
<!--  <el-divider />-->
<!--  &lt;!&ndash;  基本信息 &ndash;&gt;-->
<!--  <div style="margin-bottom: 20px">-->
<!--    <div v-html="element.intro"> </div>-->
<!--  </div>-->
  <!-- 元素内容 -->
  <div>
    <div v-for="(draft, index) in element.contentList"
         :key="draft.key"
         :label="'Draft' + index"
         :prop="'draft.' + index + '.value'"
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
              <h3><BootstrapIcon icon="caret-down-fill" size="1x" flip-v /><span>{{draft.title  }}</span>
                <el-tag v-if="draft.status == 3"  type="warning">(已被修改)</el-tag>
                <el-button  v-if="draft.status == 3 && draft.isNew != 1" text  @click="handDiff(draft.id,draft.sourceEcid)">查看差异</el-button>
                <el-tag v-if="draft.isDelete == 1"  type="danger">(已被删除)</el-tag>
                <el-tag v-if="draft.isNew == 1"  type="success">(新增)</el-tag>
              </h3>
            </div>
          </el-col>
          <el-col :span="5">
          </el-col>
        </el-row>
      </div>
      <div>
        <div v-html="draft.content"> </div>
      </div>
    </div>
  </div>
  <el-dialog v-model="dialogTableVisible" title="差异对比">
    <div>{{ newTitle }}-->{{oldTitle}}</div>
        <div v-html="newContent"></div>
  </el-dialog>
</template>

<script  lang="ts" setup>
//接受参数
import {getDiff} from "@/api/admin/draftElement";
import {ref} from "vue";

const elementStatus = new Map([
  [0, "草稿"],
  [1, "待审核"],
  [3, "审核不通过"],
  [2, "通过审核"],
  [4, "删除"]
]);


//基本信息
interface WorldElement {
  id:String,
  wid:String,
  title:string,
  intro:String,
  softtype: number,
  updateTime:number,
  contentList:Content[]
}
interface Content {
  id: number
  title: string
  status: number,
  content: string,
}
const newTitle=ref('');
const oldTitle=ref('');
const newContent=ref('');
const oldContent=ref('');
const element = defineProps<WorldElement>()
const dialogTableVisible = ref(false)
function handDiff(newId:number,oldId:number) {
  getDiff(newId,oldId).then(response => {
    //console.log("查询世界详细:"+JSON.stringify(response))
    dialogTableVisible.value=true
    newContent.value=response.data.newContent
    oldContent.value=response.data.oldContent
    newTitle.value=response.data.newTitle
    oldTitle.value=response.data.oldTitle
    //console.log("newContent:"+JSON.stringify(newContent))
    //console.log("oldContent:"+JSON.stringify(oldContent))

  });
}
</script>

<style >
.center2 {
  top: 50%;
  width: 100%;
  text-align: center;
  font-size: 18px;
}
.center {
  top: 50%;
  width: 100%;
  text-align: center;
  font-size: 18px;
}
.lessen {
  color: #a6a6a6;
  font: 12px/20px PingFangSC-Regular,-apple-system,Simsun;
  height: 20px;
  overflow: hidden;
}
.smallTitle{
  background: inherit;
  background-color: rgba(249, 249, 249, 1);
  box-sizing: border-box;
  border-width: 1px;
  border-style: solid;
  border-color: rgba(233, 233, 233, 1);
  border-radius: 0px;
  -moz-box-shadow: none;
  -webkit-box-shadow: none;
  box-shadow: none;
}
.smallTitle h3{
  font-family: 'PingFangSC-Semibold', 'PingFang SC Semibold', 'PingFang SC', sans-serif;
  font-weight: 650;
  font-size: 18px;
}
.title{
  font-family: 'PingFangSC-Semibold', 'PingFang SC Semibold', 'PingFang SC', sans-serif;
  font-weight: 650;
  /* font-style: normal; */
  font-size: 24px;
  text-align: left;
}

.editNewInline {
  width:auto;display:inline-block !important; display:inline;
  background-color: #990000;
}
.editOldInline {
  width:auto;display:inline-block !important; display:inline;
  background-color: #009926;
}
</style>
