<template>
  <!--        标题-->
  <div>
    <el-menu
        :default-active="1"
        mode="horizontal"
        style="margin:0px;pardding:0px"
    >
      <el-menu-item index="1">{{sname}} -{{scname}}-章节目录</el-menu-item>
    </el-menu>
  </div>
  <!--        表格-->
  <div>
    <h1>所属分卷 --  {{scname}}</h1>
    <el-form
        ref="ruleFormRef"
        :model="form"
        :rules="rules"
        label-width="120px">
      <el-form-item label="章节名称" prop="title">
        <el-input v-model="form.title" />
      </el-form-item>
      <div>
        <h3>章节内容</h3>
        <ckeditor    :editorDisabled="true"  :editor="editor" v-model="form.content" :config="editorConfig"></ckeditor>
      </div>
      <div>
        <el-button @click="handleReturn">返回</el-button>
        <el-button type="primary" @click="handleReelAdd(ruleFormRef)">确定</el-button>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import {getCurrentInstance, inject, reactive, ref, toRefs} from 'vue'
import { getChapter } from "@/api/admin/chapter";
import { addDraftChapter } from "@/api/admin/draftChapter";
import  Editor  from 'ckeditor5-custom-build/build/ckeditor';
const editor = Editor
const baseUrl = inject("$baseUrl")
const uploadImgUrl = ref(baseUrl + "/common/uploadImage"); // 上传的图片服务器地址
const editorConfig ={
  language:"zh-cn",
  simpleUpload: {
    // The URL the images are uploaded to.
    uploadUrl: uploadImgUrl.value,
  },
}
import {useRoute, useRouter} from "vue-router";
import {ElMessage, FormInstance} from "element-plus";

// 接收url里的参数
const route = useRoute();
const router = useRouter()
const sid = ref(null);
sid.value = route.query.sid;
const scid = ref(null);
scid.value = route.query.scid;
const scname = ref('');
scname.value = <string>route.query.scname;
const sname = ref('');
sname.value = <string>route.query.sname;
//console.log("世界id="+wid.value);
const {  appContext : { config: { globalProperties } }  } = getCurrentInstance();
const {  proxy  } = getCurrentInstance();
class Story {
  id: number
  name: string
  types: string
  intro: string
  createTime:string
}

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    title: undefined,
    sid:sid.value,
    pid:scid.value,
    level:1
  },
  rules: {
    title: [{ required: true, message: "章节名称不能为空", trigger: "blur" }, { min: 2, max: 20, message: "章节名称长度必须介于 2 和 20 之间", trigger: "blur" }],
  }
});
const ruleFormRef = ref<FormInstance>()
const { queryParams, form, rules } = toRefs(data);

const handleReelAdd = async (formEl: FormInstance | undefined) => {
  if (!formEl) return

  if (scid.value == undefined || scid.value == null || scid.value == '') {
    ElMessage.error("非法操作")
    return
  }
  form.value.sid=sid.value
  form.value.pid=scid.value
  form.value.isNew=2
  await formEl.validate((valid, fields) => {
    if (valid) {
      addDraftChapter(form.value).then(response => {
        console.log("添加成功:"+JSON.stringify(response))
        router.push("/admin/storyChapter?sid="+sid.value+"&sname="+sname.value+"&scid="+scid.value+"&scname="+scname.value);

      })
    } else {
      //console.log('error submit!', fields)
    }
  })
}
function handleInfo(){
  getChapter(sid.value,scid.value).then(response => {
    form.value=response.data
  });
}
function handleReturn(){
  router.back()
}
handleInfo()
</script>

<style scoped>

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
