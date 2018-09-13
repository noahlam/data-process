import Vue from 'vue'
import Router from 'vue-router'
// 报表列表-报表填写
import ReportEdit from '@/views/Report/ReportEdit'

Vue.use(Router)

export const route = [
  {
    path: '/',
    name: '报表填写',
    component: ReportEdit,
    hidden: true,
  }
]

export default new Router({
  routes: route
})
