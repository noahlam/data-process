// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Element from 'element-ui'
import App from './App'
import router from './router'
import './styles/theme.scss'

Vue.use(Element)

new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
