<template>
  <admin-head :username="userStore.name"/>
  <div style="">
  <section class="app-main" style="width: 100px;min-width: 1258px">
    <el-alert title="系统测试中" type="warning" effect="dark" />
    <admin-message></admin-message>
  </section>
  <admin-footer/>
  </div>
</template>

<script setup name="LayoutAdmin">
import AdminHead from './head'
import AdminFooter from './footer'
import AdminMessage from './message'
import useUserStore from '@/store/modules/user'
const userStore = useUserStore()

import { useWindowSize } from '@vueuse/core'
import {ElMessageBox} from "element-plus";

const { width, height } = useWindowSize();
const WIDTH = 992; // refer to Bootstrap's responsive design

const route = useRoute()

function logout() {
  ElMessageBox.confirm('确定注销并退出系统吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    userStore.logOut().then(() => {
      location.href = '/index';
    })
  }).catch(() => { });
}

const emits = defineEmits(['setLayout'])
function setLayout() {
  emits('setLayout');
}
</script>

<style scoped>
.app-main{ margin:0 auto; width:100%;max-width: 1258px;}

</style>
