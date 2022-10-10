<template>
  <div :class="{ 'hidden': hidden }" class="pagination-container">
    <el-pagination
      :background="background"
      :page-size="20"
      v-model:current-page="currentPage"
      :layout="layout"
      :pager-count="pagerCount"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup>
import { scrollTo } from '@/utils/scroll-to'

const props = defineProps({
  total: {
    required: true,
    type: Number
  },
  page: {
    type: Number,
    default: 1
  },
  size: {
    type: Number,
    default: 20
  },
  // 移动端页码按钮的数量端默认值5
  pagerCount: {
    type: Number,
    default: document.body.clientWidth < 992 ? 5 : 7
  },
  layout: {
    type: String,
    default: 'total, prev, pager, next, jumper'
  },
  background: {
    type: Boolean,
    default: true
  },
  autoScroll: {
    type: Boolean,
    default: true
  },
  hidden: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits();
const currentPage = computed({
  get() {
    return props.page
  },
  set(val) {
    emit('update:page', val)
  }
})
const pageSize = computed({
  get() {
    return props.size
  },
  set(val){
    emit('update:size', val)
  }
})
function handleSizeChange(val) {
  if (currentPage.value * val > props.total) {
    currentPage.value = 1
  }
  emit('pagination', { page: currentPage.value, size: val })
  if (props.autoScroll) {
    scrollTo(0, 800)
  }
}
function handleCurrentChange(val) {
  emit('pagination', { page: val, size: pageSize.value })
  if (props.autoScroll) {
    scrollTo(0, 800)
  }
}

</script>

<style scoped>
.pagination-container {
  background: #fff;
  padding: 32px 16px;
}
.pagination-container.hidden {
  display: none;
}
</style>
