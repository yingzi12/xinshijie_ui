<template>
  <div>
    <el-menu
        :default-active="1"
        mode="horizontal"
        style="margin:0px;pardding:0px"
    >
      <el-menu-item index="1"><span style="font-size: 20px;font-weight:bold;">创建故事</span></el-menu-item>
    </el-menu>
  </div>
    <div>
      <el-form
          ref="ruleFormRef"
          :model="form"
          :rules="rules"
          label-width="120px"
          class="demo-ruleForm"
          status-icon
      >
        <el-form-item label="照 片" prop="image">
          <component :is="temPage" ref="tem" ></component>
        </el-form-item>
        <el-form-item label="名 称" prop="name">
          <el-input v-model="form.name" placeholder="请输入故事名称" maxlength="30"   />
        </el-form-item>
        <el-form-item label="所属世界编号" prop="wid">
          <el-input v-model="form.wid" placeholder="请输入世界编号" maxlength="30"  @change="handleWorldInfo" />
        </el-form-item>
        <el-form-item label="所属世界名称" prop="wname">
          <el-input v-model="form.wname" placeholder="请输入世界编号" maxlength="30"  disabled  />
          <div>{{intro}}</div>
        </el-form-item>
        <el-form-item label="分 类" prop="types">
          <el-select v-model="form.types" placeholder="请选择世界类型">
            <el-option
                v-for="item in storyTypes"
                :key="item.id"
                :label="item.name"
                :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="来 源" prop="checkList">
          <el-checkbox-group v-model="form.checkList" @change="handleSurce">
            <el-checkbox label="原创" v-if="ischeck==0 || ischeck==1" />
            <el-checkbox label="游戏"  v-if="ischeck==0 || ischeck==2"/>
            <el-checkbox label="小说" v-if="ischeck==0 || ischeck==2" />
            <el-checkbox label="电影"  v-if="ischeck==0 || ischeck==2"  />
            <el-checkbox label="动漫"  v-if="ischeck==0 || ischeck==2"  />
            <el-checkbox label="电视剧"  v-if="ischeck==0 || ischeck==2"  />
            <el-checkbox label="其他"  v-if="ischeck==0 || ischeck==2"  />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="简 介" prop="intro">
          <el-input v-model="form.intro" type="textarea" placeholder="请输入故事简介"/>
        </el-form-item>
        <el-form-item label="描 述" prop="description">
          <el-input v-model="form.description" type="textarea" rows="10"  placeholder="请输入故事描述"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">新建</el-button>
          <el-button @click="reset()">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script lang="ts" setup>
import {getCurrentInstance, markRaw, reactive, ref, toRefs} from 'vue'
import {  addStory } from "@/api/admin/story";
import {   getWorld } from "@/api/wiki/world";
import {useRoute, useRouter} from "vue-router";
import {ElMessage, FormInstance} from "element-plus";
import index from "../image/add.vue";
const  temPage=markRaw(index)
const tem=ref()

const router = useRouter()
// 接收url里的参数
const route = useRoute();
//console.log(route.query.wid,"参数");
const wid = ref(null);
const wname = ref('');
wname.value = <string>route.query.wname;
wid.value = route.query.wid;

const {  appContext : { config: { globalProperties } }  } = getCurrentInstance();
const {  proxy  } = getCurrentInstance();
class Story {
  id: number
  name: string
  types: string
  intro: string
  createTime:string
}
const storyStatus = new Map([
  [0, "正常"],
  [1, "待发布"],
  [2, "锁定"],
  [3, "删除"]
]);
const storyTypesMap=new Map([
  [6,"科学"],
  [1,"武侠"],
  [2,"仙侠"],
  [3,"魔幻"],
  [4,"奇幻"],
  [5,"其他"]
])
const storyTypes=reactive([{id:6,name:"科学"},{id:1,name:"武侠"},{id:2,name:"仙侠"},{id:3,name:"魔幻"},{id:4,name:"奇幻"},{id:5,name:"其他"}])

const ruleFormRef = ref<FormInstance>()

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    name: '',
    types: undefined,
  },
  rules: {
    name: [{ required: true, message: "故事名称不能为空", trigger: "blur" }, { min: 1, max: 100, message: "故事名称长度必须介于 1 和 100 之间", trigger: "blur" }],
    wid: [{ required: true, message: "世界编号不能为空", trigger: "blur" }],
    wname: [{ required: true, message: "世界名称不能为空", trigger: "blur" }],
    types: [{ required: true, message: "必须选择分类", trigger: "blur" }],
    checkList: [{ required: true, message: "必须选择分类", trigger: "blur" }],
    intro: [{ required: true, message: "故事简介不能为空", trigger: "blur" }, { min: 10, max: 300, message: "故事简介长度必须介于 10 和 300 之间", trigger: "blur" }],
    description: [{ required: true, message: "故事描述不能为空", trigger: "blur" }, { min: 10, max:1000, message: "故事描述长度必须介于 2 和 1000 之间", trigger: "blur" }],

  }
});
const { queryParams, form, rules } = toRefs(data);

if(!isNaN(wid.value)){
  form.value.wid = wid.value
  getWorld(form.value.wid).then(response => {
    form.value.wid= response.data.id;
    form.value.wname= response.data.name;
    intro.value=response.data.intro
  });
}
const  intro=ref('')
function handleWorldInfo(){
  var n = Number(form.value.wid);
  if (isNaN(n))
  {
    ElMessage.error("请输入正确的编号");
    form.value.wid=''
    return
  }
  getWorld(form.value.wid).then(response => {
    form.value.wid= response.data.id;
    form.value.wname= response.data.name;
    intro.value=response.data.intro
  });
  form.value.wid=''
  form.value.wname=''
}

const ischeck=ref(0)
function handleSurce(){
  if(form.value.checkList.length==0){
    ischeck.value=0;
  }else {
    if (form.value.checkList.indexOf("原创") != -1) {
      ischeck.value = 1;
    } else {
      ischeck.value = 2;
    }
  }
}


const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      //console.log('submit!')
      form.value.source=form.value.checkList.map(String).join(';')
      form.value.imgUrl=tem.value.imageUrlPath
      addStory(form.value).then(response => {
        console.log("添加成功:"+    JSON.stringify(response))
        router.push("/admin/storyInfo?sid="+response.data.id+"&sname"+response.data.name);
      })
    } else {
      //console.log('error submit!', fields)
    }
  })
}
</script>

<style scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
