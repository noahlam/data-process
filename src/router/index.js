import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/views/Layout/Layout'

import Login from '@/views/Login/LoginIndex'
import Home from '@/views/Home/HomeIndex'

// 模板审核
import TemplateList from '@/views/TemplateModule/TemplateList'

// 客户端配置
import InterfaceDocSetting from '@/views/ClientConfig/InterfaceDocSetting'

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
    path: '/templateModule',
    name: '模板审核',
    component: Layout,
    meta: {menuId: 'templateModule', icon: 'el-icon-tickets'},
    redirect: '/templateModule/templateList',
    noDropDown: true,
    children: [
      {
        path: 'templateList',
        name: '模板审核列表',
        component: TemplateList,
        meta: {menuId: '/templateModule/templateList'}
      }
    ]
  },
  {
    path: '/clientConfig',
    name: '客户端配置',
    component: Layout,
    meta: {menuId: 'clientConfig', icon: 'el-icon-mobile-phone'},
    redirect: '/clientConfig/interfaceDocSetting',
    children: [
      {
        path: 'interfaceDocSetting',
        name: '接口文档设置',
        component: InterfaceDocSetting,
        meta: {menuId: '/clientConfig/interfaceDocSetting'}
      }
    ]
  }
]

export default new Router({
  // mode: 'history',
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})
