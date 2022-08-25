<template>
  <el-select v-model="value" class="m-2" placeholder="Select" size="large">
    <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
    />
  </el-select>
  <el-select v-model="value" class="m-2" placeholder="Select">
    <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
    />
  </el-select>
  <el-select v-model="value" class="m-2" placeholder="Select" size="small">
    <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
    />
  </el-select>
  <el-select v-model="typeValue"  placeholder="请选择世界类型">
    <el-option
        v-for="item in categoryList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
    />
  </el-select>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')
value.value='3'
const options = [
      {
        value: '1',
        label: 'Option1',
      },
      {
        value: '2',
        label: 'Option2',
      },
      {
        value: '3',
        label: 'Option3',
      },
      {
        value: '4',
        label: 'Option4',
      },
      {
        value: '5',
        label: 'Option5',
      },
    ]

const typeValue = ref('')
const categoryList = [
  {
    value: '0',
    label: 'Option0',
  },
  {
    value: '1',
    label: 'Option1',
  },
  {
    value: '2',
    label: 'Option2',
  }
]
typeValue.value='2'
</script>

<style scoped>

</style>
