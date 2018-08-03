import { getToken, setToken, removeToken } from '@/utils/auth'
import fetch from '@/utils/fetch'
import {Message} from 'element-ui'

const LoginStore = {
  state: {
    userInfo: getToken() ? JSON.parse(getToken()) : {}
  },
  mutations: {
    SET_USERINFO: (state, data) => {
      state.userInfo = Object.assign({}, state.userInfo, data)
    }
  },
  actions: {
    // 保存登录信息
    SetTokenInfo ({commit}, data) {
      let userTokenInfo = {
        userId: data.userId,
        token: data.token
      }
      setToken(JSON.stringify(userTokenInfo))
      commit('SET_USERINFO', userTokenInfo)
    },
    // 获取用户信息
    async GetInfo ({ commit, state }) {
      let userInfo = {
        username: '系统管理员'
      }
      commit('SET_USERINFO', userInfo)
      return userInfo
    },
    // 前端 登出
    async FedLogOut ({ commit }) {
      let res = await fetch('logout.do', {})
      if (parseInt(res.code) === 1) {
        commit('SET_USERINFO', {})
        removeToken()
      } else {
        Message.error(res.message)
      }
      return res
    },
    // 清楚数据的登录
    ClearLogout ({commit}) {
      commit('SET_USERINFO', {})
      removeToken()
    }
  },
  getters: {
    userInfo: state => state.userInfo
  }
}

export default LoginStore
