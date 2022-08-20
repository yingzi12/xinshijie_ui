<template>
  <div class="">
    <button @click="getGoodsList">获取商品列表</button>
  </div>
</template>

<script  lang="ts"  setup>
import { reactive, provide } from "vue";
import { goodslist } from "@/api/mock/goods";

const state = reactive({
  loginMsg: {}
});

const getGoodsList = () => {
  goodslist(1).then(res => {
    state.loginMsg = res;
  });
};
</script>

<style scoped lang='scss'>
</style>
