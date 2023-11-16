import { createApp } from 'vue'

import Cookies from 'js-cookie'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/es/locale/lang/zh-cn' // 中文语言
import originElementPlus from 'element-plus/theme-chalk/index.css'

import '@/assets/styles/index.scss' // global css
// 引入国际化
import { i18n } from './i18n/index'
import App from './App'
import store from './store'
import router from './router'
import directive from './directive' // directive
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons';
import CKEditor from '@ckeditor/ckeditor5-vue';

// 注册指令
import plugins from './plugins' // plugins
import { download } from '@/utils/request'

// svg图标
import 'virtual:svg-icons-register'
import SvgIcon from '@/components/SvgIcon'
import elementIcons from '@/components/SvgIcon/svgicon'
import './permission' // permission control
import "@/assets/styles/cheditor.styles.css"
import empty from "@/assets/images/empty.webp"

import { parseTime, resetForm, addDateRange, handleTree, selectDictLabel, selectDictLabels } from '@/utils/ruoyi'

// 自定义表格工具组件
// import RightToolbar from '@/components/RightToolbar'
// 文件上传组件
import FileUpload from "@/components/FileUpload"
// 图片上传组件
import ImageUpload from "@/components/ImageUpload"
// 图片预览组件
import ImagePreview from "@/components/ImagePreview"
// 自定义树选择组件
// import TreeSelect from '@/components/TreeSelect'

const app = createApp(App)

// 全局方法挂载
// app.config.globalProperties.useDict = useDict
app.config.globalProperties.download = download
app.config.globalProperties.parseTime = parseTime
app.config.globalProperties.resetForm = resetForm
app.config.globalProperties.handleTree = handleTree
app.config.globalProperties.addDateRange = addDateRange
// app.config.globalProperties.selectDictLabel = selectDictLabel
// app.config.globalProperties.selectDictLabels = selectDictLabels

app.config.globalProperties.$baseUrl= "http://localhost/dev-api"

/* globalProperties一个用于注册能够被应用内所有组件实例访问到的全局属性的对象。 */
app.config.globalProperties.$i18n = i18n;

app.directive('img-fallback', {
  mounted(el, binding) {
    el.onerror = () => {
      el.src = binding.value || empty;
    };
  }
});
// app.provide("$baseUrl","http://localhost/dev-api")
//阿里云路径
app.provide("$imgUrl","https://image.aiavrw.com")
//服务器理解
app.provide("$baseUrl","https://www.aiavr.com:8080")
// 全局组件挂载
// app.component('DictTag', DictTag)
// app.component('TreeSelect', TreeSelect)
app.component('FileUpload', FileUpload)
app.component('ImageUpload', ImageUpload)
app.component('ImagePreview', ImagePreview)
// app.component('RightToolbar', RightToolbar)
app.component('BootstrapIcon', BootstrapIcon);
app.use(CKEditor )
app.use(router)
app.use(store)
app.use(i18n)  // 挂载i18n

app.use(plugins)
app.use(elementIcons)
app.component('svg-icon', SvgIcon)

directive(app)

// 使用element-plus 并且设置全局的大小
app.use(ElementPlus, {
  locale: locale,
  // 支持 large、default、small
  size: Cookies.get('size') || 'default'
})

app.mount('#app')
