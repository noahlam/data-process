import Vue from 'vue'
import Vuex from 'vuex'

/**
 * 模块store引入
 */
import login from '@/views/Login/store'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    login
  }
})

export default store
