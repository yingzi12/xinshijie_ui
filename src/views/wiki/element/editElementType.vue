<template>
  <div>
    <el-button  text @click="disForm(true)">添加一级分类</el-button>
  </div>
  <div class="custom-tree-container">
    <el-tree
        :data="dataSource"
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        :render-content="renderContent"
    />
  </div>

  <!-- Form -->
  <el-dialog v-model="dialogFormVisible" :title="title">
    <el-form :model="form"
             ref="ruleFormRef">
      <el-form-item label="名称" :label-width="formLabelWidth">
        <el-input v-model="form.label" autocomplete="off" />
      </el-form-item>
      <el-input type="hidden" v-model="form.tier"></el-input>
      <el-input type="hidden" v-model="form.id"></el-input>
      <el-input type="hidden" v-model="form.pid"></el-input>
      <el-input type="hidden" v-model="form.code"></el-input>
      <el-input type="hidden" v-model="form.pcode"></el-input>
      <el-input type="hidden" v-model="form.wid"></el-input>
      <el-input type="hidden" v-model="form.isUpdate"></el-input>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="insertAfter(form.name,ruleFormRef)">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs} from 'vue'
import type Node from 'element-plus/es/components/tree/src/model/node'
import { addCategory,getTree,updateCategory,delCategory} from "@/api/wiki/category";
import {useRoute} from "vue-router";
import {FormInstance} from "element-plus";

const data = reactive({
  form: {},
  rules: {
    label: [{ required: true, message: "分类名称不能为空", trigger: "blur" }]
  },
});

const { form, rules } = toRefs(data);
const ruleFormRef = ref<FormInstance>()
const title = ref("");

// 接收url里的参数
const route = useRoute();
console.log(route.query.wid,"参数");
const wid = route.query.wid
console.log("世界id="+wid);

interface Tree {
  id: number
  code: number,
  label: string,
  pid: number,
  pcode: number,
  tier:number,
  wid:number,
  isUpdate:boolean,
  children?: Tree[]
}

const renderContent = (
    h,
    {
      node,
      data,
      store,
    }: {
      node: Node
      data: Tree
      store: Node['store']
    }
) => {
  return h(
      'span',
      {
        class: 'custom-tree-node',
      },
      h('span', null, node.label),
      h(
          'span',
          null,
          h(
              'a',
              {
                onClick: () => append(data),
              },
              '添加子类'
          ),
          h(
              'a',
              {
                style: 'margin-left: 8px',
                onClick: () => remove(node, data),
              },
              '删除分类'
          ),
          h(
              'b',
              {
                style: 'margin-left: 8px',
                onClick: () => updateName(data),
              },
              '修改名称'
          )
      )
  )
}
//分类数据
const dataSource = ref<Tree[]>([])
//打开弹出框
const dialogFormVisible = ref(false)
//添加字集
const append = ( data: Tree) => {
  title.value="添加子类"
  dialogFormVisible.value=true;
  var childlen=0
  if(data.children !=null && data.children != undefined){
    childlen=data.children.length
  }
  var cateCode=data.code*100+10+childlen
  const newChild = { id: 0,code:cateCode, label:'',  pcode:data.code,pid:data.id,tier:data.tier+1,wid:data.wid,children: [],isUpdate:false }
  if (!data.children) {
    data.children = []
  }

}
//修改名称
const updateName = ( data: Tree) => {
  title.value="修改分类名称"
  dialogFormVisible.value=true
  data.isUpdate=true
  form.value=data
}
//添加分类
const disForm=(dis:boolean)=>{
  title.value="添加分类"
  dialogFormVisible.value=dis
  var cateCode=dataSource.value.length+10;
  const newTree = { id: 0, code:cateCode,label: '', pid:0,pcode:0,tier:0,wid:wid,children: [],isUpdate:false }
  form.value=newTree
  console.log("from"+JSON.stringify(form.value))
}
//添加1级分类,并关闭弹出框
const insertAfter = (label:string,formEl: FormInstance | undefined) => {
  console.log(formEl)
  console.log("修改后"+JSON.stringify(form.value))
  submitForm(formEl)
  // var cateCode=dataSource.value.length+10;
  // const newTree = { id: id++, code:cateCode,label: '', pid:0,tier:0,wid:wid,children: [],isUpdate:false }
  // dataSource.value.push(newTree)
  dialogFormVisible.value=false
}

const remove = (node: Node, data: Tree) => {
  const parent = node.parent
  const children: Tree[] = parent.data.children || parent.data
  const index = children.findIndex((d) => d.id === data.id)
  children.splice(index, 1)
  dataSource.value = [...dataSource.value]
}
/** 提交按钮 */
function submitForm(formEl: FormInstance | undefined) {   //
      if (form.value.isUpdate){
        updateCategory(form.value).then(response => {
          console.log("修改成功:"+JSON.stringify(response.data))
          getList();
        })
      }else{
        addCategory(form.value).then(response => {
          console.log("添加成功"+JSON.stringify(response.data))
          getList();
        })
      }
}

/** 查询世界列表 */
function getList() {
  getTree(wid).then(response => {
    dataSource.value = response.data
  });
}
getList();
</script>

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

</style>
