import { createWebHistory, createRouter } from 'vue-router'
/* Layout */
import LayoutWiki from '@/layout/wiki'
import LayoutAdmin from '@/layout/admin'
import LayoutUser from '@/layout/user'

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
    component: LayoutWiki,
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
    path: '/restpasswort',
    component: () => import('@/views/restpasswort'),
    hidden: true
  },
  {
    path: '/wiki',
    component: LayoutWiki,
    hidden: true,
    children: [
      {
        path: 'feedback',
        component: () => import('@/views/wiki/feedback/index'),
        name: 'feedback',
        meta: { title: '个人中心', icon: 'wiki' }
      },
      {
        path: 'help',
        component: () => import('@/views/wiki/help/index'),
        name: 'help',
        meta: { title: '个人中心', icon: 'wiki' }
      }
    ]
  },
  {
    path: '/chapter',
    component: LayoutWiki,
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/wiki/chapter/index'),
        name: 'chapterindex',
        meta: { title: '个人中心', icon: 'wiki' }
      },
      {
        path: 'list',
        component: () => import('@/views/wiki/chapter/list'),
        name: 'chapterlist',
        meta: { title: '个人中心', icon: 'wiki' }
      }
    ]
  },
  {
    path: '/story',
    component: LayoutWiki,
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/wiki/story/index'),
        name: 'storyIndex',
        meta: { title: '个人中心', icon: 'wiki' }
      },
      {
        path: 'list',
        component: () => import('@/views/wiki/story/list'),
        name: 'storylist',
        meta: { title: '个人中心', icon: 'wiki' }
      }
    ]
  },
  {
    path: '/world',
    component: LayoutWiki,
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/wiki/world/index'),
        name: 'WorldIndex',
        meta: { title: '世界首页', icon: 'world' }
      }
      ,{
        path: 'details',
        component: () => import('@/views/wiki/world/details'),
        name: 'Details',
        meta: { title: '世界详细', icon: 'world' }
      },{
        path: 'comment',
        component: () => import('@/views/wiki/world/comment'),
        name: 'Comment',
        meta: { title: '评论', icon: 'world' }
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
      }
    ]
  },
  {
    path: '/element',
    component: LayoutWiki,
    hidden: true,
    children: [
      {
        path: 'list',
        component: () => import('@/views/wiki/element/list'),
        name: 'OrderElement',
        meta: { title: '元素列表', icon: 'element' }
      },{
        path: 'test',
        component: () => import('@/views/wiki/element/test'),
        name: 'test',
        meta: { title: '元素列表', icon: 'element' }
      },{
        path: 'details',
        component: () => import('@/views/wiki/element/index'),
        name: 'details',
        meta: { title: '元素详细', icon: 'element' }
      }
    ]
  },
  {
    path: '/admin',
    component: LayoutAdmin,
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/wiki/admin/fllow/index'),
        name: 'index',
        meta: { title: '关注', icon: 'wiki' }
      },
      {
        path: 'world',
        component: () => import('@/views/wiki/admin/world/world'),
        name: 'world',
        meta: { title: '世界', icon: 'wiki' }
      },
      {
        path: 'worldElement',
        component: () => import('@/views/wiki/admin/world/worldElement'),
        name: 'worldElement',
        meta: { title: '世界', icon: 'wiki' }
      },
      {
        path: 'worldInfo',
        component: () => import('@/views/wiki/admin/world/worldInfo'),
        name: 'worldInfo',
        meta: { title: '世界', icon: 'wiki' }
      },
      {
        path: 'worldEdit',
        component: () => import('@/views/wiki/admin/world/worldEdit'),
        name: 'WorldEdit',
        meta: { title: '世界', icon: 'wiki' }
      },
      {
        path: 'worldManage',
        component: () => import('@/views/wiki/admin/world/worldManage'),
        name: 'worldMessage',
        meta: { title: '世界', icon: 'wiki' }
      },
      {
        path: 'worldCategory',
        component: () => import('@/views/wiki/admin/world/worldCategory'),
        name: 'WorldCategory',
        meta: { title: '世界', icon: 'wiki' }
      },
      {
        path: 'worldAudit',
        component: () => import('@/views/wiki/admin/world/worldAudit'),
        name: 'worldAudit',
        meta: { title: '元素审核', icon: 'wiki' }
      },
      {
        path: 'worldAuditLog',
        component: () => import('@/views/wiki/admin/world/worldAuditLog'),
        name: 'worldAuditLog',
        meta: { title: '元素审核', icon: 'wiki' }
      },
      {
        path: 'worldAuditPreview',
        component: () => import('@/views/wiki/admin/world/worldAuditPreview'),
        name: 'worldAuditPreview',
        meta: { title: '元素审核', icon: 'wiki' }
      },
      {
        path: 'worldDiffPreview',
        component: () => import('@/views/wiki/admin/world/worldDiffPreview'),
        name: 'worldDiffPreview',
        meta: { title: '元素差异', icon: 'wiki' }
      },
      {
        path: 'worldRedident',
        component: () => import('@/views/wiki/admin/world/worldRedident'),
        name: 'worldRedident',
        meta: { title: '居民管理', icon: 'wiki' }
      },
      {
        path: 'worldComment',
        component: () => import('@/views/wiki/admin/world/worldComment'),
        name: 'worldComment',
        meta: { title: '评论管理', icon: 'wiki' }
      },
      {
        path: 'worldDiscuss',
        component: () => import('@/views/wiki/admin/world/worldDiscuss'),
        name: 'worldDiscuss',
        meta: { title: '讨论管理', icon: 'wiki' }
      },
      {
        path: 'worldStory',
        component: () => import('@/views/wiki/admin/world/worldStory'),
        name: 'worldStory',
        meta: { title: '故事管理', icon: 'wiki' }
      },
      {
        path: 'diff',
        component: () => import('@/views/wiki/admin/draftElement/diff'),
        name: 'diff',
        meta: { title: '内容比对', icon: 'wiki' }
      },
      {
        path: 'diffPreview',
        component: () => import('@/views/wiki/admin/draftElement/diffPreview'),
        name: 'auditElementPreview',
        meta: { title: '元素修改差异记录', icon: 'wiki' }
      },
      {
        path: 'comment',
        component: () => import('@/views/wiki/admin/comment/comment'),
        name: 'comment',
        meta: { title: '评论', icon: 'wiki' }
      },
      {
        path: 'discuss',
        component: () => import('@/views/wiki/admin/discuss/discuss'),
        name: 'mydiscuss',
        meta: { title: '讨论管理', icon: 'wiki' }
      },
      {
        path: 'audit',
        component: () => import('@/views/wiki/admin/draftElement/audit'),
        name: 'audit',
        meta: { title: '审核', icon: 'wiki' }
      },
      {
        path: 'auditLog',
        component: () => import('@/views/wiki/admin/draftElement/auditLog'),
        name: 'auditLog',
        meta: { title: '审核历史', icon: 'wiki' }
      },
      {
        path: 'draft',
        component: () => import('@/views/wiki/admin/draftElement/draft'),
        name: 'draft',
        meta: { title: '元素草稿', icon: 'wiki' }
      },
      {
        path: 'draftEdit',
        component: () => import('@/views/wiki/admin/draftElement/draftEdit'),
        name: 'draftEdit',
        meta: { title: '元素草稿', icon: 'wiki' }
      },
      {
        path: 'draftLog',
        component: () => import('@/views/wiki/admin/draftElement/draftLog'),
        name: 'draftLog',
        meta: { title: '元素草稿', icon: 'wiki' }
      },
      {
        path: 'draftPreview',
        component: () => import('@/views/wiki/admin/draftElement/draftPreview'),
        name: 'draftPreview',
        meta: { title: '元素修改差异', icon: 'wiki' }
      },
      {
        path: 'elementAdd',
        component: () => import('@/views/wiki/admin/element/elementAdd'),
        name: 'elementAdd',
        meta: { title: '管理员添加元素', icon: 'wiki' }
      },
      {
        path: 'elementEdit',
        component: () => import('@/views/wiki/admin/element/elementEdit'),
        name: 'elementEdit',
        meta: { title: '管理员修改元素', icon: 'wiki' }
      },
      {
        path: 'story',
        component: () => import('@/views/wiki/admin/story/story'),
        name: 'story',
        meta: { title: '管理员修改元素', icon: 'wiki' }
      },
      {
        path: 'storyInfo',
        component: () => import('@/views/wiki/admin/story/storyInfo'),
        name: 'storyInfo',
        meta: { title: '管理员修改元素', icon: 'wiki' }
      },
      {
        path: 'storyAdd',
        component: () => import('@/views/wiki/admin/story/storyAdd'),
        name: 'storyAdd',
        meta: { title: '添加新故事', icon: 'wiki' }
      },
      {
        path: 'storyEdit',
        component: () => import('@/views/wiki/admin/story/storyEdit'),
        name: 'storyEdit',
        meta: { title: '管理员修改元素', icon: 'wiki' }
      },
      {
        path: 'storyReel',
        component: () => import('@/views/wiki/admin/story/storyReel'),
        name: 'storyReel',
        meta: { title: '管理员修改元素', icon: 'wiki' }
      },
      {
        path: 'storyChapter',
        component: () => import('@/views/wiki/admin/story/storyChapter'),
        name: 'storyChapter',
        meta: { title: '管理员修改元素', icon: 'wiki' }
      },
      {
        path: 'storyChapterAdd',
        component: () => import('@/views/wiki/admin/story/storyChapterAdd'),
        name: 'storyChapterAdd',
        meta: { title: '管理员修改元素', icon: 'wiki' }
      },
      {
        path: 'storyChapterEdit',
        component: () => import('@/views/wiki/admin/story/storyChapterEdit'),
        name: 'storyChapterEdit',
        meta: { title: '管理员修改元素', icon: 'wiki' }
      },
      {
        path: 'storyChapterView',
        component: () => import('@/views/wiki/admin/story/storyChapterView'),
        name: 'storyChapterView',
        meta: { title: '管理员修改元素', icon: 'wiki' }
      },
      {
        path: 'storyAudit',
        component: () => import('@/views/wiki/admin/story/storyAudit'),
        name: 'storyAudit',
        meta: { title: '管理员修改元素', icon: 'wiki' }
      },
      {
        path: 'storyAuditLog',
        component: () => import('@/views/wiki/admin/story/storyAuditLog'),
        name: 'storyAuditLog',
        meta: { title: '管理员修改元素', icon: 'wiki' }
      },
      {
        path: 'storyAuthor',
        component: () => import('@/views/wiki/admin/story/storyAuthor'),
        name: 'storyAuthor',
        meta: { title: '管理员修改元素', icon: 'wiki' }
      },
      {
        path: 'storyComment',
        component: () => import('@/views/wiki/admin/story/storyComment'),
        name: 'storyComment',
        meta: { title: '管理员修改元素', icon: 'wiki' }
      },
      {
        path: 'storyDiscuss',
        component: () => import('@/views/wiki/admin/story/storyDiscuss'),
        name: 'storyDiscuss',
        meta: { title: '管理员修改元素', icon: 'wiki' }
      },
      {
        path: 'storyDiscussLog',
        component: () => import('@/views/wiki/admin/story/storyDiscussLog'),
        name: 'storyDiscussLog',
        meta: { title: '管理员修改元素', icon: 'wiki' }
      },
      {
        path: 'draftChapter',
        component: () => import('@/views/wiki/admin/draftChapter/draftChapter'),
        name: 'draftChapter',
        meta: { title: '元素草稿', icon: 'wiki' }
      },
      {
        path: 'draftChapterAudit',
        component: () => import('@/views/wiki/admin/draftChapter/draftChapterAudit'),
        name: 'draftChapterAudit',
        meta: { title: '管理员修改元素', icon: 'wiki' }
      },
      {
        path: 'draftChapterLog',
        component: () => import('@/views/wiki/admin/draftChapter/draftChapterLog'),
        name: 'draftChapterLog',
        meta: { title: '所有记录', icon: 'wiki' }
      },
      {
        path: 'draftChapterEdit',
        component: () => import('@/views/wiki/admin/draftChapter/draftChapterEdit'),
        name: 'draftChapterEdit',
        meta: { title: '所有记录', icon: 'wiki' }
      },
      {
        path: 'draftChapterView',
        component: () => import('@/views/wiki/admin/draftChapter/draftChapterView'),
        name: 'draftChapterView',
        meta: { title: '所有记录', icon: 'wiki' }
      }
    ]
  },
  {
    path: '/user',
    component: LayoutUser,
    hidden: true,
    children:[
      {
        path: 'index',
        component: () => import('@/views/wiki/user/index'),
        name: 'Users',
        meta: { title: '基础信息', icon: 'user' }
      },{
        path: 'email',
        component: () => import('@/views/wiki/user/checkemail'),
        meta: { title: '邮箱', icon: 'user' }
      }
      ,{
        path: 'edit',
        component: () => import('@/views/wiki/user/edit'),
        meta: { title: '修改', icon: 'user' }
      }
      ,{
        path: 'password',
        component: () => import('@/views/wiki/user/password'),
        meta: { title: '修改密码', icon: 'user' }
      }
      ]
  },
  {
    path: '/check',
    component: LayoutWiki,
    hidden: true,
    children:[
      {
        path: 'email',
        component: () => import('@/views/wiki/check/email'),
        name: 'email',
        meta: { title: '基础信息', icon: 'user' }
      },{
        path: 'password',
        component: () => import('@/views/wiki/check/password'),
        name: 'password',
        meta: { title: '修改密码', icon: 'user' }
      }
    ]
  },
  {
    path: '/job',
    component: LayoutWiki,
    hidden: true,
    children:[
      {
        path: 'index',
        component: () => import('@/views/monitor/job/index'),
        meta: { title: '基础信息', icon: 'user' }
      },{
        path: 'log',
        component: () => import('@/views/monitor/job/log'),
        meta: { title: '修改密码', icon: 'user' }
      }
    ]
  },
  {
    path: '/comment',
    component: LayoutWiki,
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/wiki/comment/index'),
        name: 'World',
        meta: {title: '个人中心', icon: '讨论'}
      }
    ]
  },
  {
    path: '/discuss',
    component: LayoutWiki,
    children: [
      {
        path: 'index',
        component: () => import('@/views/wiki/discuss/index'),
        name: 'discuss',
        meta: { title: '讨论主题详细', icon: 'world' }
      },{
        path: 'list',
        component: () => import('@/views/wiki/discuss/list'),
        name: 'discussList',
        meta: { title: '讨论主题列表', icon: 'world' }
      },{
        path: 'reply',
        component: () => import('@/views/wiki/discuss/reply'),
        name: 'discussReply',
        meta: { title: '讨论主题回复列表', icon: 'world' }
      }
    ]
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import('@/views/error/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error/401'),
    hidden: true
  },
  {
    path: '',
    component: LayoutWiki,
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
]

// 动态路由，基于用户权限动态去加载
export const dynamicRoutes = [
  {}
  //   path: '/system/user-auth',
  //   component: Layout,
  //   hidden: true,
  //   permissions: ['system:user:edit'],
  //   children: [
  //     {
  //       path: 'role/:userId(\\d+)',
  //       component: () => import('@/views/system/user/authRole'),
  //       name: 'AuthRole',
  //       meta: { title: '分配角色', activeMenu: '/system/user' }
  //     }
  //   ]
  // },
  // {
  //   path: '/system/role-auth',
  //   component: Layout,
  //   hidden: true,
  //   permissions: ['system:role:edit'],
  //   children: [
  //     {
  //       path: 'user/:roleId(\\d+)',
  //       component: () => import('@/views/system/role/authUser'),
  //       name: 'AuthUser',
  //       meta: { title: '分配用户', activeMenu: '/system/role' }
  //     }
  //   ]
  // },
  // {
  //   path: '/system/dict-data',
  //   component: Layout,
  //   hidden: true,
  //   permissions: ['system:dict:list'],
  //   children: [
  //     {
  //       path: 'index/:dictId(\\d+)',
  //       component: () => import('@/views/system/dict/data'),
  //       name: 'Data',
  //       meta: { title: '字典数据', activeMenu: '/system/dict' }
  //     }
  //   ]
  // },
  // {
  //   path: '/monitor/job-log',
  //   component: Layout,
  //   hidden: true,
  //   permissions: ['monitor:job:list'],
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/monitor/job/log'),
  //       name: 'JobLog',
  //       meta: { title: '调度日志', activeMenu: '/monitor/job' }
  //     }
  //   ]
  // },
  // {
  //   path: '/tool/gen-edit',
  //   component: Layout,
  //   hidden: true,
  //   permissions: ['tool:gen:edit'],
  //   children: [
  //     {
  //       path: 'index/:tableId(\\d+)',
  //       component: () => import('@/views/tool/gen/editTable'),
  //       name: 'GenEdit',
  //       meta: { title: '修改生成配置', activeMenu: '/tool/gen' }
  //     }
  //   ]
  // }
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
