<template>
    <StoryHead :head-type="5" second-type="1" :sid="sid"></StoryHead>

  <!--        统计-->
        <div style="background-color:#b0c4de;margin: auto;padding: 10px">
          <el-row>
            <el-col  :span="20">
              <el-input v-model="queryParams.comment" placeholder="请输入查询内容" class="input-with-select" style="width: 250px"/>
              <el-button :icon="Search" circle @click="getList(1)"/>
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
            <el-table :data="commentList">
              <el-table-column label="序号"  width="50" >
                <template #default="scope">
                  {{scope.$index+1}}
                </template>
              </el-table-column>
              <el-table-column prop="createTime" label="创建时间" width="140"  :show-overflow-tooltip="true" />
              <el-table-column prop="createName" label="创建人" width="120" />
              <el-table-column prop="wname" label="世界"  :show-overflow-tooltip="true"/>
              <el-table-column prop="comment" label="内容"  :show-overflow-tooltip="true" />
              <el-table-column prop="reply" label="回复"   :show-overflow-tooltip="true"/>
              <el-table-column fixed="right" label="操作" width="100">
                <template #default>
<!--                  <el-button link type="primary" size="small" @click="dialogFormVisible = true">查看</el-button>-->
                  <el-button link type="primary" size="small">删除</el-button>
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
              @current-change="getList"/>
        </div>

      <!--      审核弹出框-->
      <el-dialog v-model="dialogFormVisible" title="评论详细">
        <el-row>
          <el-col :span="2">
            <div  class="center">
              <!--              头像-->
              <el-avatar :size="50" :src="comment.circleUrl" />
            </div>
          </el-col>
          <el-col :span="22">
            <div >
              <h3 style="font-weight:bold;">{{ comment.createName }}</h3>
            </div>
            <div v-html="comment.comment">
            </div>
            <div style="color:#A3A6AD">
              <span>{{ comment.createTime }}</span>
              <span><BootstrapIcon icon="chat-dots" size="1x" flip-v />20 </span>
              <span><BootstrapIcon icon="hand-thumbs-up" size="1x" flip-v />10</span>
              <span><BootstrapIcon icon="hand-thumbs-down" size="1x" flip-v />20</span>
            </div>
          </el-col>
        </el-row>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">删除</el-button>
      </span>
        </template>
      </el-dialog>
</template>

<script lang="ts" setup>
import {getCurrentInstance, reactive, ref, toRefs} from 'vue'
import {useRoute, useRouter} from "vue-router";
import { Search } from '@element-plus/icons-vue'
import { listCommentAdmin} from "@/api/admin/comment";
import StoryHead from "./storyHead.vue";
const {  appContext : { config: { globalProperties } }  } = getCurrentInstance();
// 接收url里的参数
const route = useRoute();
//console.log(route.query.sid,"参数");
const sid = ref(null);
const sname = ref('');
sname.value = <string>route.query.sname;
sid.value = route.query.sid;
//个人消息
const fits = ['世界', '粉丝', '关注']
const activeIndex = ref('1')

//表格内容
//表格内容
const comment=ref({})
const commentActive = ref('allComm')
const commentList = ref([])
const data = reactive({
  commentForm: {},
  queryParams: {
    pageNum: 1,

    comment:undefined,
    source:2,
    sid: sid.value,
  },
  rules: {
    comment: [{ required: true, message: "评论不能为空", trigger: "blur" }],
  }
});
const total = ref(0);

const { queryParams, commentForm, rules } = toRefs(data);
//分页信息
const dateRange = ref([]);
//评论信息
function getList(page: number) {
  window.scrollTo(0, 0); // 滚动到顶部
  queryParams.value.pageNum=page;

  listCommentAdmin(queryParams.value).then(response => {
    //console.log("查询评论列表:"+JSON.stringify(response))
    commentList.value = response.data
    total.value = response.total;
  });
}


//弹出框
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const form = reactive({
  name: '',
  region: ''
})
getList(queryParams.value.pageNum);

</script>

<style scoped>

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
