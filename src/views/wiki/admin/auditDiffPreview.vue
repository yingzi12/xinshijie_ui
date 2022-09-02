<template>
  <div class="app-container" >
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
        <el-breadcrumb-item
        ><a href="/public">promotion management</a></el-breadcrumb-item
        >
        <el-breadcrumb-item>promotion list</el-breadcrumb-item>
        <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="border-style:solid;">
    <!--  世界名称-->
    <div >
        <h1>{{ element.title }}</h1>
      <span>更新时间:</span><el-tag>{{element.updateTime}}</el-tag>
        <span>分类:</span> <el-tag v-for="category in element.categoryList">
        {{category.label}}
      </el-tag>
    </div>
    <el-divider />
    <!--  基本信息 -->
    <div style="margin-bottom: 20px">
      <div v-html="element.intro"> </div>
    </div>
<!--    内容简介-->
    <div>
  </div>
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
    <el-divider />
      <!--功能-->
      <div class="center" style="height: 80px;">
        <el-button @click="handClean()">返回</el-button>
      </div>
    </div>
  </div>

  <el-dialog v-model="dialogTableVisible" title="差异对比">
    <el-row>
      <el-col :span="12">
        <div v-html="newContent"></div>
      </el-col>
      <el-col :span="12">
        <div v-html="oldContent"></div>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script  lang="ts" setup>
import {reactive, ref} from 'vue'
import {FormInstance} from "element-plus";
import {getDraftDetails ,updatePush,getDiff} from "@/api/admin/draftElement";
//接受参数
import { useRoute ,useRouter}  from "vue-router";  // 引用vue-router
const router = useRouter()
// 接收url里的参数
const route = useRoute();
//世界信息
const deid = ref(null);
const wid = ref(null);
deid.value = route.query.deid;
wid.value = route.query.wid;
console.log("元素deid="+deid.value);
console.log("世界id="+wid.value);

const dialogTableVisible = ref(false)

const element=ref({})
/** 查询世界详细 */
function getDraft(wid:number,deid:number) {
  getDraftDetails(wid,deid).then(response => {
    console.log("查询世界详细:"+JSON.stringify(response))
    element.value = response.data
  });
}
function submitPush(){
  updatePush(wid,deid).then(response => {
    console.log("发布成功")
    router.push("/element/content?wid="+ wid.value+"&deid=" +deid.value)
  });
}
function submitEdit(){
  router.push("/admin/draftEdit?wid="+ wid.value+"&deid=" +deid.value)
}

function handClean(){
  router.push("/admin/audit")
}
const newContent=ref('');
const oldContent=ref('');
function handDiff(newId:number,oldId:number) {
  getDiff(newId,oldId).then(response => {
    console.log("查询世界详细:"+JSON.stringify(response))
    dialogTableVisible.value=true
    newContent.value=getHtml(response.data.newContent)
    oldContent.value=getHtml(response.data.oldContent)
    console.log("newContent:"+JSON.stringify(newContent))
    console.log("oldContent:"+JSON.stringify(oldContent))

  });
}
interface DomainItem {
  key: number
  title: string
  value: string
}

getDraft(wid.value,deid.value);

const getHtml = function(desc){
  // var temp=document.createElement("div");
  // temp.innerHTML=desc;
  // var output=temp.innerText||temp.textContent;
  // temp=null;
  return desc;
}
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
.editNewInline div{
  width:auto;display:inline-block !important; display:inline;
  background-color: #990000;
}
.editOldInline div{
  width:auto;display:inline-block !important; display:inline;
  background-color: #009926;
}
</style>
