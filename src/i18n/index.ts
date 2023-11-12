import { createI18n } from 'vue-i18n'
import zh from './zh'
import en from './en'


/* 这里必须是messages名称 */
const messages = {
    'zh-US' : zh,
    'en-US' : en
}

const i18n = createI18n({
    legacy: false,         // 使用 Composition API 模式，则需要将其设置为false
    globalInjection: true, //全局生效$t
    locale: 'zh-US',          // 默认使用的语言
    messages,  // 使用数据源
})

export { i18n }