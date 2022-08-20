import { createWebHistory, createRouter } from 'vue-router'
/* Layout */
import Layout from '@/layout/system'
import LayoutWiki from '@/layout/wiki'

/**
 * Note: 路由配置项
 *
 * hidden: true                     // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true                 // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                  // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                  // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                  // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect             // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'               // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * query: '{"id": 1, "name": "ry"}' // 访问路由的默认传递参数
 * roles: ['admin', 'common']       // 访问路由的角色权限
 * permissions: ['a:a:a', 'b:b:b']  // 访问路由的菜单权限
 * meta : {
    noCache: true                   // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    title: 'title'                  // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'                // 设置该路由的图标，对应路径src/assets/icons/svg
    breadcrumb: false               // 如果设置为false，则不会在breadcrumb面包屑中显示
    activeMenu: '/system/user'      // 当路由设置了该属性，则会高亮相对应的侧边栏。
  }
 */

// 公共路由
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register'),
    hidden: true
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import('@/views/error/404'),
    hidden: true
  },
  {
    path: '/wiki',
    component: LayoutWiki,
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/wiki/index'),
        name: 'wiki',
        meta: { title: '个人中心', icon: 'wiki' }
      }
    ]
  },
  {
    path: '/users',
    component: LayoutWiki,
    // component: () => import('@/views/wiki/world/index'),
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/wiki/user/details2'),
        name: 'World',
        meta: { title: '世界首页', icon: 'world' }
      }
      ]
  },
  {
    path: '/world',
    component: LayoutWiki,
    // component: () => import('@/views/wiki/world/index'),
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/wiki/world/index'),
        name: 'World',
        meta: { title: '世界首页', icon: 'world' }
      }
      ,{
        path: 'details',
        component: () => import('@/views/wiki/world/details'),
        name: 'Details',
        meta: { title: '世界详细', icon: 'world' }
      },{
        path: 'add',
        component: () => import('@/views/wiki/world/add'),
        name: 'AddWorld',
        meta: { title: '创造世界', icon: 'world' }
      },{
        path: 'list',
        component: () => import('@/views/wiki/world/list'),
        name: 'ListWorld',
        meta: { title: '世界列表', icon: 'world' }
      } ,{
        path: 'edit',
        component: () => import('@/views/wiki/world/edit'),
        name: 'Test',
        meta: { title: '个人中心', icon: 'world' }
      }
    ]
  },
  {
    path: '/element',
    component: LayoutWiki,
    hidden: true,
    children: [
      {
        path: 'add',
        component: () => import('@/views/wiki/element/add'),
        name: 'AddElement',
        meta: { title: '添加元素', icon: 'element' }
      },{
        path: 'edit',
        component: () => import('@/views/wiki/element/edit'),
        name: 'EditElement',
        meta: { title: '编辑元素', icon: 'element' }
      },{
        path: 'preview',
        component: () => import('@/views/wiki/element/preview'),
        name: 'PreviewElement',
        meta: { title: '预览元素', icon: 'element' }
      },{
        path: 'editElementType',
        component: () => import('@/views/wiki/element/editElementType'),
        name: 'EditElementType',
        meta: { title: '编辑元素分类', icon: 'element' }
      },{
        path: 'list',
        component: () => import('@/views/wiki/element/list'),
        name: 'OrderElement',
        meta: { title: '元素列表', icon: 'element' }
      }
    ]
  },
  {
    path: '/401',
    component: () => import('@/views/error/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: '/index',
        component: () => import('@/views/index'),
        name: 'Index',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'profile',
        component: () => import('@/views/system/user/profile/index'),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user' }
      }
    ]
  }
]

// 动态路由，基于用户权限动态去加载
export const dynamicRoutes = [
  {
    path: '/system/user-auth',
    component: Layout,
    hidden: true,
    permissions: ['system:user:edit'],
    children: [
      {
        path: 'role/:userId(\\d+)',
        component: () => import('@/views/system/user/authRole'),
        name: 'AuthRole',
        meta: { title: '分配角色', activeMenu: '/system/user' }
      }
    ]
  },
  {
    path: '/system/role-auth',
    component: Layout,
    hidden: true,
    permissions: ['system:role:edit'],
    children: [
      {
        path: 'user/:roleId(\\d+)',
        component: () => import('@/views/system/role/authUser'),
        name: 'AuthUser',
        meta: { title: '分配用户', activeMenu: '/system/role' }
      }
    ]
  },
  {
    path: '/system/dict-data',
    component: Layout,
    hidden: true,
    permissions: ['system:dict:list'],
    children: [
      {
        path: 'index/:dictId(\\d+)',
        component: () => import('@/views/system/dict/data'),
        name: 'Data',
        meta: { title: '字典数据', activeMenu: '/system/dict' }
      }
    ]
  },
  {
    path: '/monitor/job-log',
    component: Layout,
    hidden: true,
    permissions: ['monitor:job:list'],
    children: [
      {
        path: 'index',
        component: () => import('@/views/monitor/job/log'),
        name: 'JobLog',
        meta: { title: '调度日志', activeMenu: '/monitor/job' }
      }
    ]
  },
  {
    path: '/tool/gen-edit',
    component: Layout,
    hidden: true,
    permissions: ['tool:gen:edit'],
    children: [
      {
        path: 'index/:tableId(\\d+)',
        component: () => import('@/views/tool/gen/editTable'),
        name: 'GenEdit',
        meta: { title: '修改生成配置', activeMenu: '/tool/gen' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
});

export default router;
