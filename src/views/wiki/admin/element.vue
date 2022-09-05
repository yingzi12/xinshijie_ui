<template>
  <el-container class="layout-container-demo" >
    <!--    侧边栏-->
    <!--    表格-->
    <el-container style="margin: 10px">
      <!--       内容区-->
      <el-main>
        <div>
          <el-menu
              :default-active="activeIndex"
              mode="horizontal"
              @select="handleSelect"
              style="margin:0px;pardding:0px"
          >
            <el-menu-item index="1"><span style="font-size: 20px;font-weight:bold;">元素草稿</span></el-menu-item>
            <!--            <el-menu-item index="2">关注的故事</el-menu-item>-->
          </el-menu>
        </div>
        <!--        多选-->
        <div style="padding: 10px">
          <el-space wrap>
            <div v-for="i in 9" :key="i">
              <el-button text> Text{{i}} </el-button>
            </div>
          </el-space>
        </div>
        <!--        统计-->
        <div style="background-color:#b0c4de;margin: auto;padding: 10px">
          <el-row>
            <el-col  :span="4">
              合计(65)
            </el-col >
            <el-col :span="20"  style="text-align: right;">
              <div style="text-align: right; font-size: 12px" class="toolbar">
                <el-button>历史</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
        <!--        表格-->
        <div>
          <el-scrollbar>
            <el-table :data="tableData" >
              <el-table-column label="序号"  width="50">
                <template #default="scope">
                  {{scope.$index+1}}
                </template>
              </el-table-column>
              <el-table-column prop="wname" label="世界名称"  />
              <el-table-column prop="title" label="名称"  />
              <el-table-column prop="typesName" label="分类" :show-overflow-tooltip="true"/>
              <el-table-column prop="intro" label="简介" :show-overflow-tooltip="true" width="120"/>
              <el-table-column prop="createTime" label="创建时间" :show-overflow-tooltip="true" />
<!--              <el-table-column prop="createName" label="创建人" />-->
              <el-table-column prop="status" label="状态" />
              <el-table-column prop="updateType" label="修改原因" />
              <el-table-column prop="updateContent" label="修改说明" />
              <el-table-column fixed="right" label="Operations" width="220">
                <template #default>
                  <el-button link type="primary" size="small" @click="handleClick">查看</el-button>
                  <el-button link type="primary" size="small">取消</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-scrollbar>
        </div>
        <!--        分页-->
        <div style="float:right; position:relative; ">
          <pagination
              v-show="total > 0"
              :total="total"
              v-model:page="queryParams.pageNum"
              v-model:limit="queryParams.pageSize"
              @pagination="getList"
          />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'
import {useRouter} from "vue-router";
const router = useRouter()
const fits = ['世界', '粉丝', '关注']
const activeIndex = ref('1')

const item = {
  id:1,
  wname: '中国崛起',
  title: '世界树',
  typesName: '植物,神器,创世记',
  createName: 'Tom',
  status: '待审核',
  createTime: '2016-05-02',
  updateType: '内容删除',
  updateContent: '这个内容有一点多余',
  intro: 'No. 189, Grove St, Los Angeles，No. 189, Grove St, Los Angeles，No. 189, Grove St, Los Angeles',
}
const tableData = ref(Array.from({ length: 20 }).fill(item))

//查看修改记录
function handleClick(){
  router.push("/admin/draftPreview");
}
</script>

<style scoped>
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.demo-count .block {
  padding: 0px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  display: inline-block;
  width: 33%;
  box-sizing: border-box;
  vertical-align: top;
}
.demo-count .block:last-child {
  border-right: none;
}
.demo-count .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 9px;
  margin-bottom: 0px;
}
</style>
