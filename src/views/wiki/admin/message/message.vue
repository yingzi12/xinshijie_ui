<template>
        <div>
          <el-menu
              :default-active="activeIndex"
              mode="horizontal"
              @select="handleSelect"
              style="margin:0px;pardding:0px"
          >
            <el-menu-item index="1"><span style="font-size: 20px;font-weight:bold;">我的评论</span></el-menu-item>
          </el-menu>
        </div>
        <!--        多选-->
        <div style="padding: 10px">
          <el-space wrap>
            <el-button text > <router-link :to="{path:'/admin/worldInfo', query: {wid:wid,wname:wname}}">简介</router-link></el-button>
            <el-button text>  <router-link :to="{path:'/admin/worldManage', query: {wid:wid,wname:wname}}">造物主</router-link></el-button>
            <el-button text>  <router-link :to="{path:'/admin/worldElement', query: {wid:wid,wname:wname}}">元素</router-link></el-button>
            <el-button text>  <router-link :to="{path:'/admin/worldCategory', query: {wid:wid,wname:wname}}">分类</router-link></el-button>
            <el-button text  type="primary">  <router-link :to="{path:'/admin/worldAudit', query: {wid:wid,wname:wname}}">元素审核</router-link></el-button>
            <el-button text>  <router-link :to="{path:'/admin/worldRedident', query: {wid:wid,wname:wname}}">居民管理</router-link></el-button>
            <el-button text>  <router-link :to="{path:'/admin/worldComment', query: {wid:wid,wname:wname}}">评论管理</router-link></el-button>
            <el-button text>  <router-link :to="{path:'/admin/worldDiscuss', query: {wid:wid,wname:wname}}">讨论管理</router-link></el-button>
          </el-space>
        </div>
        <!--        统计-->
        <div style="background-color:#b0c4de;margin: auto;padding: 10px">
          <el-row>
            <el-col  :span="20">
              <el-select v-model="value" placeholder="类型" clearable>
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                />
              </el-select>
              <el-select placeholder="处理状态" clearable>
                <el-option label="已处理" value="已处理"/>
                <el-option label="讨论中" value="讨论中"/>
              </el-select>
              <el-input v-model="input3" placeholder="Please input" class="input-with-select" style="width: 250px"/>
              <el-button :icon="Search" circle />
            </el-col >
            <el-col :span="4"  style="text-align: right;">
              <div style="text-align: right; font-size: 12px" class="toolbar">
              </div>
            </el-col>
          </el-row>
        </div>
        <!--        表格-->
        <div>
          <el-scrollbar>
            <el-table :data="tableData">
              <el-table-column label="序号" width="80">
                <template #default="scope">
                  {{scope.$index+1}}
                </template>
              </el-table-column>
              <el-table-column prop="wname" label="世界" width="140" :show-overflow-tooltip="true"/>
              <el-table-column prop="etitle" label="元素" width="120" :show-overflow-tooltip="true" />
              <el-table-column prop="title" label="讨论主题"   :show-overflow-tooltip="true"/>
              <el-table-column prop="types" label="讨论类型" :show-overflow-tooltip="true" />
              <el-table-column prop="content" label="讨论内容"  :show-overflow-tooltip="true" />
              <el-table-column prop="createTime" label="创建时间"  :show-overflow-tooltip="true" />
              <el-table-column prop="status" label="状态" />
<!--              <el-table-column prop="audit" label="审核结果" :show-overflow-tooltip="true"/>-->
              <el-table-column fixed="right" label="Operations" width="220">
                <template #default>
                  <el-button link type="primary" size="small" @click="handleClick">查看</el-button>
                  <el-button link type="primary" size="small" @click="dialogFormVisible = true">关闭</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-scrollbar>
        </div>
        <!--        分页-->
  <div style="float:right; position:relative; ">
    <el-pagination

        :total="total"
        layout="total, prev, pager, next"
        v-model:page="queryParams.pageNum"
        :page-size=20
        @current-change="getList"
    />
  </div>

<!--      审核弹出框-->
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue'
import {useRoute, useRouter} from "vue-router";
import { Menu as IconMenu,CirclePlus, Message, Setting } from '@element-plus/icons-vue'
import { Search } from '@element-plus/icons-vue'

// 接收url里的参数
const route = useRoute();
//console.log(route.query.wid,"参数");

const wid = ref(route.query.wid);
//个人消息
const fits = ['世界', '粉丝', '关注']
const activeIndex = ref('1')

//表格内容
const item = {
  wname: '战国崛起',
  etitle: '世界',
  title: 'No. 189, Grove St, Los Angeles',
  ename:'世界数',
  createName: 'Tom',
  createTime: '2016-05-02',
  types:"内容修改",
  status:"进行中",
  content:'内容讨论,内容讨论内容讨论内容讨论内容讨论内容讨论内容讨论,内容讨论',
  audit:"允许，说的很不错，可以进行"
}
const tableData = ref(Array.from({ length: 20 }).fill(item))

//多选框
const value = ref('')
const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
    disabled: true,
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]
//搜索框
const input3 = ref('')

//弹出框
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const form = reactive({
  name: '',
  region: ''
})
</script>

<style scoped>

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}


</style>
