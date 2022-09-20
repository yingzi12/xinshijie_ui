<template>
    <h1 class="text-large font-600 mr-3"> 帮助中心 </h1>
    <div class="mt-4 text-sm font-bold">
      系统正在完善中，敬请期待
    </div>
  <div class="demo-collapse">
    <el-collapse accordion>
      <el-collapse-item name="1">
        <template #title>
          网站目的<el-icon class="header-icon">
          <info-filled />
        </el-icon>
        </template>
        <div>
           对于喜欢游戏，电源，动漫等，故事背景，世界观感兴趣，或者是想自己写小说的人，做游戏的人，提供一个自由自在创造属于自己的世界的功能
        </div>
      </el-collapse-item>
      <el-collapse-item title="网站功能" name="2">
        <div>
           1。与大家一起创建一个世界
           2.与大家一起完善一个世界
           3.创造属于你的世界与属于你的故事
        </div>
      </el-collapse-item>
      <el-collapse-item title="网站需求" name="3">
        <div>
            欢迎大家一起加入，如有想法还请主动联系或者留言
        </div>
      </el-collapse-item>
      <el-collapse-item title="已有世界" name="3">
        <div>
          <el-space wrap>
              <el-tag text> 原神 </el-tag>
            <el-tag text> 魔兽世界 </el-tag>
            <el-tag text> 光遇 </el-tag>
            <el-tag text> 星际争霸 </el-tag>
            <el-tag text> 崩坏三 </el-tag>
          </el-space>
        </div>
      </el-collapse-item>
      <el-collapse-item title="开发计划" name="4">
        <el-timeline>
          <el-timeline-item timestamp="2022/9/30" placement="top">
            <el-card>
              <h4>完成元素多模板</h4>
              <h4>评论限制功能</h4>
              <p>计划完成时间 2022/9/30 </p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2022/10/30" placement="top">
            <el-card>
              <h4>完成手机web端开发</h4>
              <h4>完成手机积分，经验，贡献功能</h4>
              <p>计划完成时间 2022/10/30</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2022/11/30" placement="top">
            <el-card>
              <h4>添加完原神内容</h4>
              <p>计划完成时间 2022/11/30</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2022/12/30" placement="top">
            <el-card>
              <h4>故事功能</h4>
              <p>计划完成时间 2022/12/30</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2022/12/30" placement="top">
            <el-card>
              <h4>待计划</h4>
              <p>页面优化</p>
              <p>安全功能</p>
              <p>管理员申请功能</p>
              <p>作者申请功能</p>
              <p>按章节编辑功能</p>
              <p>自动审核功能，发布功能</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-collapse-item>
    </el-collapse>
  </div>
    <div class="mt-4 text-sm font-bold">
      意见/建议提交请点击 <el-button text @click="hadleFeedback">提交意见/建议</el-button>
    </div>
</template>

<script lang="ts" setup>
import { useRouter} from "vue-router";
import { InfoFilled } from '@element-plus/icons-vue'

const router = useRouter()
function hadleFeedback(){
  router.push("/wiki/feedback");
}
</script>

<style scoped>

</style>
