import { createApp } from 'vue'

import Cookies from 'js-cookie'

import ElementPlus from 'element-plus'
import locale from 'element-plus/lib/locale/lang/zh-cn' // 中文语言

import '@/assets/styles/index.scss' // global css
import  'element-plus/theme-chalk/index.css'

import App from './App'
import store from './store'
import router from './router'
import CKEditor from '@ckeditor/ckeditor5-vue';

// import { download } from '@/utils/request'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import 'virtual:svg-icons-register'
import './permission' // permission control
import "@/assets/styles/cheditor.styles.css"

// import { useDict } from '@/utils/dict'
import { parseTime, resetForm, addDateRange, handleTree, selectDictLabel, selectDictLabels } from '@/utils/ruoyi'

// 分页组件
import Pagination from '@/components/Pagination'

const app = createApp(App)

// 全局方法挂载
// app.config.globalProperties.download = download
app.config.globalProperties.parseTime = parseTime
app.config.globalProperties.resetForm = resetForm
app.config.globalProperties.handleTree = handleTree
app.config.globalProperties.addDateRange = addDateRange
app.config.globalProperties.selectDictLabel = selectDictLabel
app.config.globalProperties.selectDictLabels = selectDictLabels

app.config.globalProperties.$baseUrl= "http://localhost/dev-api"
// app.provide("$baseUrl","http://localhost/dev-api")
//阿里云路径
app.provide("$imgUrl","https://shadow-xinshijie.oss-cn-hongkong.aliyuncs.com")
//服务器理解
app.provide("$baseUrl","https://www.aiavr.com:8080")
// 全局组件挂载
app.component('Pagination', Pagination)

app.use(CKEditor )
app.use(router)
app.use(store)

// 使用element-plus 并且设置全局的大小
app.use(ElementPlus, {
  locale: locale,
  // 支持 large、default、small
  size: Cookies.get('size') || 'default'
})
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')
