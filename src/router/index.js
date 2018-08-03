import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/views/Layout/Layout'

import Login from '@/views/Login/LoginIndex'
import Home from '@/views/Home/HomeIndex'

// 报表类型
import ReportType from '@/views/Report/ReportType/ReportType'
// 报表列表
import ReportList from '@/views/Report/ReportList'
// 报表列表-报表填写
import ReportEdit from '@/views/Report/ReportEdit'
// 用户列表
import userList from '@/views/UserList/UserList'
import userSetting from '@/views/UserList/UserSetting'

// 文章列表
import articleList from '@/views/PlatformConfig/ArticleList'
import articleContent from '@/views/PlatformConfig/ArticleContent/ArticleContent'
import bannerSetting from '@/views/PlatformConfig/BannerSetting/BannerSetting'

import operationLog from '@/views/SystemSetting/OperationLog'

/* error page */
import Err404 from '@/views/404'

Vue.use(Router)

export const constantRouterMap = [
  {path: '/login', component: Login},
  {path: '/404', component: Err404},
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    name: 'Home',
    children: [{path: 'index', component: Home}]
  },
  {path: '*', component: Err404}
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/index',
  //   name: 'Home',
  //   children: [{path: 'index', component: Home},
  //     {path: '/reportForm/reportFormType', component: reportFormType},
  //     {path: '/reportForm/reportFormList', component: reportFormList},
  //     {path: '/reportForm/reportFormListWrite', component: reportFormListWrite},
  //     {path: '/userList/userSetting', component: userSetting},
  //     {path: '/platformConfig/articleList', component: articleList},
  //     {path: '/platformConfig/articleContent', component: articleContent},
  //     {path: '/platformConfig/bannerSetting', component: bannerSetting},
  //     {path: '/SystemSetting/operationLog', component: operationLog},
  //   ]
  // }
]
/**
 *  asyncRouterMap 用于做权限控制，以及对应菜单的生成
 *
 *  生成菜单的规则：（默认全部到第三级路由）
 *  1. noDropDown 为true 时， 表示不展开
 *  2. hidden 为 true 时， 表示不再菜单中显示
 *  3. 若是第三级不展开且归属于第二级，第二级必须传 childrenList
 *  4. 若是第三级不展开 但是归属于同第三级的， 第三级必须传 childrenList
 *  5. menuId 为对应的路由 ---> 以便做权限控制
 * */
export const asyncRouterMap = [
  {
    path: '/report',
    name: '报表',
    component: Layout,
    meta: {menuId: '/report'}, // 因为icon有默认值，所以设置一个不存在的标签隐藏
    children: [
      {
        path: 'reportType',
        name: '报表类型',
        component: ReportType,
        meta: {menuId: '/report/reportType'}
      },
      {
        path: 'reportList',
        name: '报表列表',
        component: ReportList,
        meta: {menuId: '/report/reportList', childrenList: ['/report/reportEdit']}
      },
      {
        path: 'reportEdit',
        name: '报表填写',
        component: ReportEdit,
        hidden: true,
        meta: {menuId: '/report/reportEdit'}
      }
    ]
  },
  {
    path: '/user',
    name: '用户列表',
    component: Layout,
    meta: {menuId: '/user', childrenList: ['/user/userList', '/user/userSetting']},
    redirect: '/user/userList',
    noDropDown: true,
    children: [
      {
        path: 'userList',
        name: '用户列表-列表',
        component: userList,
        meta: {menuId: '/user/userList'}
      },
      {
        path: 'userSetting',
        name: '用户列表-详情',
        component: userSetting,
        meta: {menuId: '/user/userSetting'}
      }
    ]
  },
  {
    path: '/platformConfig',
    name: '平台配置',
    component: Layout,
    meta: {menuId: '/platformConfig', icon: 'xxx'},
    children: [
      {
        path: 'articleList',
        name: '文章列表',
        component: articleList,
        meta: {menuId: '/platformConfig/articleList', childrenList: ['/platformConfig/articleContent']}
      },
      {
        path: 'articleContent',
        name: '文章内容',
        component: articleContent,
        hidden: true,
        meta: {menuId: '/platformConfig/articleContent'}
      },
      {
        path: 'bannerSetting',
        name: 'Banner',
        component: bannerSetting,
        meta: {menuId: '/platformConfig/bannerSetting'}
      }
    ]
  },
  {
    path: '/systemSetting',
    name: '系统设置',
    component: Layout,
    meta: {menuId: '/systemSetting'},
    children: [
      {
        path: 'operationLog',
        name: '操作日志',
        component: operationLog,
        meta: {menuId: '/systemSetting/operationLog'}
      }
    ]
  }
]

export default new Router({
  // mode: 'history',
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})
