import router from './router'
import { ElMessage } from 'element-plus'

import { getToken } from '@/utils/auth'
import { isRelogin } from '@/utils/request'
import useUserStore from '@/store/modules/user'

const whiteList = ['/login','/index', '/auth-redirect', '/restpasswort','/bind','/story','/chapter','/password','/check', '/wiki', '/register', '/world',  '/element',  '/manage', '/discuss'];

router.beforeEach((to, from, next) => {
  if (getToken()) {
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/user/index' })
      // NProgress.done()
    } else {
      if (useUserStore().roles.length === 0) {
        isRelogin.show = true
        // 判断当前用户是否已拉取完user_info信息
        useUserStore().getInfo().then(() => {
          isRelogin.show = false
          next({ ...to, replace: true })
        }).catch(err => {
          useUserStore().logOut().then(() => {
            ElMessage.error(err)
            next({ path: '/world/index' })
          })
        })
      } else {
        next()
      }
    }
  } else {
    var urlPath='/'+to.path.split('/')[1]
    // 没有token
    if (whiteList.indexOf(urlPath) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
    }
  }
})

router.afterEach(() => {
  // NProgress.done()
})
