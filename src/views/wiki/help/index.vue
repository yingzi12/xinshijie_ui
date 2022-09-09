<template>
    <h3 class="text-large font-600 mr-3"> 帮助中心 </h3>
    <div class="mt-4 text-sm font-bold">
      系统正在完善中，敬请期待
    </div>
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
