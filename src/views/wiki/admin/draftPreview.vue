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
      <div v-for="(domain, index) in element.contentList"
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
          <div v-html="domain.content"> </div>
        </div>
      </div>
    </div>
    <el-divider />
      <!--功能-->
      <div class="center" style="height: 80px;">
        <el-button @click="submitPush()">发布</el-button>
        <el-button @click="handDiff()">查看差异</el-button>
        <el-button @click="submitEdit()">继续编辑</el-button>
        <el-button @click="handClean()">退出</el-button>
      </div>
    </div>

  </div>
</template>

<script  lang="ts" setup>
import { reactive, ref } from 'vue'
import {FormInstance} from "element-plus";
import {  getDraftDetails ,updatePush} from "@/api/admin/draftElement";
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
function handDiff(){
  router.push("/admin/diffPreview?wid="+ wid.value+"&deid=" +deid.value)
}
function handClean(){
  router.push("/admin/draft")
}
interface DomainItem {
  key: number
  title: string
  value: string
}

getDraft(wid.value,deid.value);
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
