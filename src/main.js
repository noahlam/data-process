// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Element from 'element-ui'
import './styles/theme.scss'
import App from './App'
import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import 'normalize.css/normalize.css'

import {getToken} from '@/utils/auth'
import fetch from './utils/fetch'
import moment from 'moment'

// 注册全局异步请求方法
Vue.prototype.$post = fetch
Vue.prototype.$moment = moment

Vue.config.productionTip = false
Vue.use(Element)

const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({path: '/'})
    } else {
      if (!store.getters.userInfo.username || store.getters.userInfo.username.length === 0) { // 判断当前用户是否已拉取完user_info信息
        await store.dispatch('GetInfo')
        // if (parseInt(res.code) === 1) {
        const roles = '系统管理员'
        const menuList = []
        await store.dispatch('GenerateRoutes', {roles, menuList})
        router.addRoutes(store.getters.addRouters)
        next({...to, replace: true})
        // } else {
        //   NProgress.done()
        // }
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})
router.afterEach(() => {
  NProgress.done()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {App},
  template: '<App/>'
})
