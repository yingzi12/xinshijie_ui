<template>
  <!--        标题-->
    <div>
<!--        <el-menu-->
<!--                :default-active="1"-->
<!--                mode="horizontal"-->
<!--                style="margin:0px;pardding:0px"-->
<!--        >-->
<!--            <el-menu-item index="1">{{world.name}}</el-menu-item>-->
<!--        </el-menu>-->
        <h1 style="font-size: var(--el-font-size-large);margin:10px;pardding:10px">{{world.name}}</h1>
    </div>
  <!--        多选-->
    <div style="padding: 10px">
        <el-space wrap>
            <el-button text  :type="props.headType==1? 'primary':''"> <router-link :to="{path:'/admin/worldInfo', query: {headType:1,wid:world.id,wname:world.name}}">简介</router-link></el-button>
            <el-button text :type="props.headType==2? 'primary':''">  <router-link :to="{path:'/admin/worldManage', query: {headType:2,wid:world.id,wname:world.name}}">造物主</router-link></el-button>
            <el-button text :type="props.headType==3? 'primary':''">  <router-link :to="{path:'/admin/worldElement', query: {headType:3,wid:world.id,wname:world.name}}">元素</router-link></el-button>
            <el-button text :type="props.headType==4? 'primary':''">  <router-link :to="{path:'/admin/worldCategory', query: {headType:4,wid:world.id,wname:world.name}}">分类</router-link></el-button>
            <el-badge v-if="world.countAuditELement>0" :value="world.countAuditELement" class="item" >
            <el-button text  :type="props.headType==5? 'primary':''">  <router-link :to="{path:'/admin/worldAudit', query: {headType:5,wid:world.id,wname:world.name}}">元素审核</router-link></el-button>
            </el-badge>
            <el-button v-if="world.countAuditELement <= 0" text  :type="props.headType==5? 'primary':''">  <router-link :to="{path:'/admin/worldAudit', query: {headType:5,wid:world.id,wname:world.name}}">元素审核</router-link></el-button>

            <el-button text :type="props.headType==6? 'primary':''">  <router-link :to="{path:'/admin/worldStory', query: {headType:6,wid:world.id,wname:world.name}}">故事管理</router-link></el-button>
            <el-button text :type="props.headType==7? 'primary':''">  <router-link :to="{path:'/admin/worldRedident', query: {headType:7,wid:world.id,wname:world.name}}">居民管理</router-link></el-button>
            <el-button text :type="props.headType==8? 'primary':''">  <router-link :to="{path:'/admin/worldComment', query: {headType:8,wid:world.id,wname:world.name,source:1}}">评论管理</router-link></el-button>
            <el-badge v-if="world.countAuditDiscuss>0" :value="world.countAuditDiscuss" class="item" >
            <el-button text :type="props.headType==9? 'primary':''">  <router-link :to="{path:'/admin/worldDiscuss', query: {headType:9,wid:world.id,wname:world.name,source:1}}">讨论管理</router-link></el-button>
            </el-badge>
            <el-button v-if="world.countAuditDiscuss <= 0" text :type="props.headType==9? 'primary':''">  <router-link :to="{path:'/admin/worldDiscuss', query: {headType:9,wid:world.id,wname:world.name,source:1}}">讨论管理</router-link></el-button>

        </el-space>
    </div>
</template>

<script lang="ts" setup>
import {  getWorld } from "@/api/admin/world";
import {ref} from "vue";
const props = defineProps({
    wid: Number,
    headType: Number
})
const world=ref({})

/** 查询世界详细 */
function handleWorld(id:number) {
    getWorld(id).then(response => {
        //console.log("查询世界详细:"+JSON.stringify(response))
        world.value = response.data
    });

}
handleWorld(props.wid)
</script>

<style scoped>

</style>
