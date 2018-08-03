import Vue from 'vue'
import Vuex from 'vuex'

/**
 * 模块store引入
 */
import permission from '@/store/permission'

import login from '@/views/Login/store'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    permission,
    login
  }
})

export default store
