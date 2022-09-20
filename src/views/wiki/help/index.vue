<template>
    <h1 class="text-large font-600 mr-3"> 帮助中心 </h1>
    <div class="mt-4 text-sm font-bold">
      系统正在完善中，敬请期待
    </div>
  <h3>开发计划</h3>
  <el-timeline>
    <el-timeline-item timestamp="2022/9/30" placement="top">
      <el-card>
        <h4>完成元素多模板</h4>
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
      </el-card>
    </el-timeline-item>
  </el-timeline>
    <div class="mt-4 text-sm font-bold">
      意见/建议提交请点击 <el-button text @click="hadleFeedback">提交意见/建议</el-button>
    </div>
</template>

<script lang="ts" setup>
import { useRouter} from "vue-router";
const router = useRouter()
function hadleFeedback(){
  router.push("/wiki/feedback");
}
</script>

<style scoped>

</style>
