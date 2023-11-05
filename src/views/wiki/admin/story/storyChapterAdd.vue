<template>
    <StoryHead :head-type="3" second-type="3" :sid="sid"  :sname="sname" :reel-name="reelName"></StoryHead>
    <div style="background-color:#b0c4de;margin: auto;padding: 10px">
        <el-row>
            <el-col :span="20">
                <h1>所属分卷 --  {{scname}}</h1>
            </el-col>
            <el-col :span="4" style="text-align: right;">
                <div style="text-align: right; font-size: 12px" class="toolbar">
                    <el-button text @click="goBack()">返回</el-button>
                </div>
            </el-col>
        </el-row>
    </div>
  <!--        表格-->
        <div style="margin: auto;padding: 10px">
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
              <ckeditor    :editorDisabled="true"  :editor="editor" v-model="form.contentZip" :config="editorConfig"></ckeditor>

            </div>
            <div>
              <el-button @click="handleReturn()">返回</el-button>
              <el-button type="primary" @click="handleReelAdd(ruleFormRef)">确定</el-button>
            </div>
          </el-form>
        </div>
</template>

<script lang="ts" setup>
import { inject, reactive, ref, toRefs} from 'vue'
import { addDraftChapter } from "@/api/admin/draftChapter";
import  Editor  from 'ckeditor5-custom-build-free-all/build/ckeditor';
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
import StoryHead from "./storyHead.vue";

// 接收url里的参数
const route = useRoute();
const router = useRouter()

const sid = ref(route.query.sid);
const scid = ref(null);
scid.value = route.query.scid;
const reelName = ref(route.query.scname);
const scname = ref(route.query.scname);
const sname = ref(route.query.sname);

//console.log("世界id="+wid.value);


class Story {
  id: number
  name: string
  types: number
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
    title: [{ required: true, message: "分类/目录名称不能为空", trigger: "blur" }, { min: 2, max: 20, message: "用户名称长度必须介于 2 和 20 之间", trigger: "blur" }],
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
  form.value.isNew=1
  await formEl.validate((valid, fields) => {
    if (valid) {
      addDraftChapter(form.value).then(response => {
        // console.log("添加成功:"+JSON.stringify(response))
          ElMessage.success("添加新章节成功！")
        router.push("/admin/draftChapter?sid="+sid.value+"&sname="+sname.value+"&scid="+scid.value+"&scname="+scname.value);

      })
    } else {
      //console.log('error submit!', fields)
    }
  })
}
function handleReturn(){
  router.back()
}
function goBack() {
    // 使用 router.go(-1) 返回上一页
    router.back()
}
</script>

<style scoped>


</style>
