<template>
    <div class="app-container">
<!--        导航条-->
        <div>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/world/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item><a href="/world/list">世界树</a></el-breadcrumb-item>
                <el-breadcrumb-item  :to="{ path: '/world/details', query: {wid:wid} }">{{wname}}</el-breadcrumb-item>
                <el-breadcrumb-item v-if="source == 2" :to="{ path: '/story/detail', query: {wid:wid,sid:sid} }">{{sname}}</el-breadcrumb-item>
                <el-breadcrumb-item  :to="{ path: '/discuss/list', query: {wid:wid,sid:sid,source:source} }">讨论</el-breadcrumb-item>
                <el-breadcrumb-item>{{ discuss.title }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div style="margin-top: 20px">
            <!--    评论区-->
            <div>
                <el-row>
                    <el-col :span="2" class="center">
                        <el-row>
                            <el-col><el-avatar :size="50" :src="imgUrl+circleUrl" /></el-col>
                            <el-col><span class="demonstration">{{discuss.createName}}</span></el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="22">
                        <div><el-tag>#{{discuss.wname}}#</el-tag><el-tag v-if="source == 2">#{{discuss.sname}}#</el-tag></div>
                        <div>
                            <span style="font-weight:bold;font-size:15px;">{{ discuss.title }}</span>
                            <el-tag>{{ discussTypesMap.get(discuss.types) }}</el-tag>
                            <el-tag>{{ discussStatusMap.get(discuss.status)}}</el-tag>
                        </div>
                        <div>
                            <p>{{discuss.comment}}</p>
                        </div>
                        <div style="color:#A3A6AD">
                            <span>{{ discuss.createTime }}</span>
                            <span><BootstrapIcon icon="chat-dots" size="1x" flip-v />{{discuss.countReply}} </span>
                            <span><BootstrapIcon icon="hand-thumbs-up" size="1x" flip-v />{{discuss.countLike}} </span>
                            <span><BootstrapIcon icon="hand-thumbs-down" size="1x" flip-v />{{discuss.countDisagree}} </span>
                        </div>
                    </el-col>
                </el-row>
            </div>
<!--            回复评论-->
            <div v-if="discuss.status == 1 ">
                <el-form :model="form" label-width="120px">
                    <el-row>
                        <el-col :span="20" class="center">
                            <el-input
                                v-model="form.commit"
                                :rows="2"
                                type="textarea"
                                placeholder="Please input"
                            />
                        </el-col>
                        <el-col :span="4" class="center">
                            <el-button type="primary" @click="onAddSubmit()">发布评论</el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
<!--            管理员意见-->
            <div v-if="discuss.status == 2 ||discuss.status == 3 " style="background-color: #E6A23C">
                <el-card class="box-card">
                    <template #header>
                        <div class="card-header">
                            <span>管理员回复</span>
                        </div>
                    </template>
                    <div>
                        <p>{{discuss.reply}}</p>
                        <p>{{discuss.updateTime}}</p>
                    </div>
                </el-card>
            </div>
            <el-tabs v-model="commentActive"  >
                <el-tab-pane label="全部评论" name="allComm">
                    <div v-for="comment in commentList">
                        <el-row>
                            <el-col :span="2" class="center">
                                <el-avatar :size="50" :src="imgUrl+comment.circleUrl" />
                            </el-col>
                            <el-col :span="22">
                                <div >
                                    <h3 style="font-weight:bold;margin: 5px">{{ comment.createName }}</h3>
                                </div>
                                <div v-html="comment.reply">
                                </div>
                                <div style="color:#A3A6AD">
                                    <span>{{ comment.createTime }}</span>
                                    <span @click="handleHideReply(comment)"><BootstrapIcon  icon="chat-dots" size="1x" flip-v />{{comment.countReply}} </span>
                                    <span><BootstrapIcon icon="hand-thumbs-up" size="1x" flip-v />{{comment.countLike}} </span>
                                    <span><BootstrapIcon icon="hand-thumbs-down" size="1x" flip-v />{{comment.countDisagree}} </span>
                                </div>
                                <div v-if="comment.replyHide" style="margin-left: 20px;width: 40%;">
                                     <div>
                                        <el-avatar  size="small" :src="imgUrl+circleUrl" /><el-input v-model="comment.replyComment"   style="width:80%"  size="small" @keyup.enter="onReplySubmit(comment)"></el-input>
                                    </div>
                                    <div v-if="comment.replyList.length>0">
                                        <el-table  :show-header="false"  :data="comment.replyList"  size="small">
                                            <el-table-column  label="replyNickname" >
                                                <template #default="scopeReply">
                                                    <!--                          <div v-if="comment.reply.front" style="background-color: #6b778c">-->
                                                    <!--                            <el-tag>{{ scope.row.replyNickname }}</el-tag>:{{ scope.row.front }}-->
                                                    <!--                          </div>-->
                                                    <el-tag >{{ scopeReply.row.nickname }}</el-tag>@<el-tag>{{ scopeReply.row.replyNickname }}</el-tag>:<span >{{ scopeReply.row.reply }}</span>
                                                    <p style="margin: 0px">{{ scopeReply.row.createTime }}<BootstrapIcon @click="handleHideReply(scopeReply.row)" icon="chat-dots" size="1x" flip-v /></p>
                                                    <div v-if="scopeReply.row.replyHide" >
                                                        <el-avatar  size="small" :src="imgUrl+circleUrl" /><el-input v-model="scopeReply.row.replyComment"   style="width:80%"  size="small" @keyup.enter="onReplySubmit(comment)"></el-input>
                                                    </div>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                        <el-button class="mt-4"  @click="handleReplyDetail(comment)" size="small">更多</el-button>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                        <el-divider style="margin: 0px;padding: 0px"/>
                    </div>
                </el-tab-pane>
                <div style="float:right; position:relative; ">
                    <el-pagination
                        :total="total"
                        layout="total, prev, pager, next"
                        v-model:page="queryParams.pageNum"
                        :page-size=20
                        @current-change="getList"/>
                </div>
            </el-tabs>

        </div>
    </div>
</template>

<script setup lang="ts">
import { inject, reactive, ref, toRefs} from 'vue'
import { listDiscussComment } from "@/api/wiki/discussComment";
import { getDiscuss } from "@/api/wiki/discuss";
import { addDiscussComment,replyDiscussComment } from "@/api/admin/discussComment";
import { getWorld } from "@/api/wiki/world";
import { getStory } from "@/api/wiki/story";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import useUserStore from '@/store/modules/user'


// 接收url里的参数
const route = useRoute();
const router = useRouter()


const imgUrl = inject("$imgUrl")

//获取用户信息
const userStore = useUserStore()
const circleUrl=ref('')
const disabled=ref(true)

const username=ref('')
const source = ref(route.query.source);
const eid = ref(route.query.eid);
const did = ref(route.query.did);
const wid = ref(route.query.wid);
const sid = ref(route.query.sid);
const sname = ref(undefined);
const wname = ref(undefined);

//评论列表
const commentActive = ref('allComm')
const commentList = ref<Comment[]>([])
const loading = ref(true);

if(userStore.name==''){
    username.value="未登录"
    disabled.value=true;
}else{
    username.value=userStore.name;
    circleUrl.value=userStore.avatar;
    disabled.value=false;
}

const discussTypesMap = new Map([
    [1, "自由讨论"],
    [2, "建议"],
    [3, "内容错误"],
    [4, "内容缺失"],
    [5, "过多重复"],
    [6, "内容不相关"],
    [7, "其他"],

]);
const discussStatusMap = new Map([
    [1, "待处理"],
    [2, "已处理"],
    [3, "关闭"],
])

//讨论信息
const discuss=ref({})

/** 查询讨论详细 */
function handleDiscuss() {
    if(did.value == undefined){
        ElMessage.error("缺少必要参数")
        return;
    }
    getDiscuss(did.value).then(response => {
        discuss.value = response.data
    });
}
// 第一级回复评论
//分页信息
const dateRange = ref([]);
const total = ref(0);
const data = reactive({
    form: {
        commit:undefined,
        wid:wid.value,
        did:did.value,
        sid:sid.value,
        upid:undefined,
        source:source.value
    },
    queryParams: {
        pageNum: 1,

        auditStatus:0,
        name: undefined,
        types: undefined,
        pid:null,
        wid:wid.value,
        did:did.value,
        sid:sid.value,
        source:source.value,
        ranks:0,
        // wid:wid.value,
    },
    queryReplyParams: {
        pageNum: 1,
        pageSize: 3,
        auditStatus:0,
        name: undefined,
        types: undefined,
        pid:null,
        wid:wid.value,
        did:did.value,
        sid:sid.value,
        source:source.value,
        ranks:0,
        // wid:wid.value,
    },
    rules: {
        // userName: [{ required: true, message: "用户名称不能为空", trigger: "blur" }, { min: 2, max: 20, message: "用户名称长度必须介于 2 和 20 之间", trigger: "blur" }],
    }
});
const { queryParams,queryReplyParams, form, rules } = toRefs(data);
function onAddSubmit(){
    if(form.value.commit.length<10 || form.value.commit.length>500){
        ElMessage.error("回复内容需大于10小于500")
        return;
    }

    addDiscussComment(form.value).then(response => {
        // dissComment.value=''
        getList(1)
    })
}
function onReplySubmit(comment){
    if(form.value.commit.length<10 || form.value.commit.length>500){
        ElMessage.error("回复内容需大于10小于500")
        return;
    }
    form.value.upid=comment.id;
    form.value.commit=comment.replyComment;
    addDiscussComment(form.value).then(response => {
        // getList(1)
    })
}
/** 查询世界列表 */
function getList(page: number) {
    window.scrollTo(0, 0); // 滚动到顶部
    queryParams.value.pageNum=page;

    queryParams.value.ranks=0
    listDiscussComment(queryParams.value).then(response => {
        // loading.value = false;
        // commentList.value = response.data;
        total.value = response.total;
    });
}
function getReplyList(page: number) {
    window.scrollTo(0, 0); // 滚动到顶部
    queryReplyParams.value.pageNum=page;

    queryReplyParams.value.ranks=0
    listDiscussComment(queryReplyParams.value).then(response => {
        loading.value = false;
        commentList.value = response.data;
        total.value = response.total;
    });
}

const hideReply=false;
function handleHideReply(comment){
    if(comment.hideReply) {
        comment.hideReply = false;
    }else {
        comment.hideReply = true;
    }

}
//跳转回复详细
function handleReplyDetail(comment){
    const url="/discuss/reply?wid="+comment.wid+"&did="+comment.did+"&dcid="+comment.id+"&source="+comment.source;
    if(comment.source==2){
        router.push(url+"&sid="+comment.sid);
    }else{
        router.push(url);
    }
}

handleDiscuss()
getList(1)
</script>

<style scoped>

</style>
