<template>
  <div class="app-container" >
    <div>
      <el-menu
          :default-active="1"
          mode="horizontal"
          style="margin:0px;pardding:0px"
      >
        <el-menu-item index="1" style="margin:0px;pardding:0px"><span style="font-size: 20px;font-weight:bold;">元素详细</span></el-menu-item>
      </el-menu>
    </div>
    <div >
      <!--  世界名称-->
      <div >
        <span style="margin-bottom: 5px;font-size: 25px">{{ element.title }}</span><el-tag size="small">{{draftdraftElementStatusMap.get(element.status)}}</el-tag>
        <div class="lessen"><span>分类:</span> <el-tag size="small" v-for="category in element.categoryList">
          {{category.label}}
        </el-tag></div>
        <div class="lessen"><span>更新时间:</span><el-tag size="small">{{element.updateTime}}</el-tag></div>
      </div>
      <el-divider />
      <!--  基本信息 -->
      <div style="margin-bottom: 20px;margin-left: 25px">
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
             :rules="{  required: true,  message: 'domain can not be null', trigger: 'blur',}"
             style="margin-bottom: 20px"
        >
          <div     class="smallTitle">
            <el-row >
              <el-col :span="19">
                <div class="biaoti">
                  <h3><el-icon><Tickets /></el-icon><span>{{domain.title  }}</span></h3>
                </div>
              </el-col>
              <el-col :span="5">
              </el-col>
            </el-row>
          </div>
          <div   style="margin-left: 25px">
            <div v-html="domain.contentZip"> </div>
          </div>
        </div>
      </div>
      <el-divider />
      <!--功能-->
      <div class="center" style="height: 80px;">
        <el-button v-if="element.status == 0 " @click="submitPush()">发布</el-button>
        <el-button  @click="handDiff()">查看差异</el-button>
        <el-button v-if="element.status == 0 " @click="submitEdit()">继续编辑</el-button>
        <el-button @click="handClean()">退出</el-button>
      </div>
    </div>

  </div>
</template>

<script  lang="ts" setup>
import { reactive, ref } from 'vue'
import {  getDraftDetails ,issue} from "@/api/admin/draftElement";
import { draftdraftElementStatusMap } from "@/utils/constant";
//接受参数
import { useRoute ,useRouter}  from "vue-router";  // 引用vue-router
const router = useRouter()
// 接收url里的参数
const route = useRoute();
//世界信息


const deid = ref(route.query.deid);
const wid = ref(route.query.wid);


const element=ref({})
/** 查询世界详细 */
function getDraft(wid:number,deid:number) {
  getDraftDetails(wid,deid,0).then(response => {
    element.value = response.data
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
getDraft(wid.value,deid.value);


</script>

<style scoped>
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
</style>
