import axios from 'axios'
import store from '../store'
// import { Message } from 'element-ui'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 60000 // 请求超时时间
})

/**
 * 拦截request，加上用户信息
 */

/**
 * 拦截response，处理全局异常
 */
service.interceptors.response.use(
  response => {
    const res = response.data
    if (parseInt(res.code) === 5) {
      setTimeout(async () => {
        store.dispatch('ClearLogout')
        location.reload()
      }, 1500)
      return {code: -666, data: null, message: '登录超时，请重新登录！'}
    }
    return response.data
  },
  error => {
    const errorData = {
      code: -2,
      message: error.message
    }
    return errorData
  }
)

/**
 *  @params url: 请求的url地址
 *          data: 请求参数
 *          json: 是否用json的形式
 * */
export default function post (url, data = {}, json) {
  try {
    const userInfo = {
      userId: store.getters.userInfo.userId || '',
      token: store.getters.userInfo.token || ''
    }
    if (store.getters.userInfo.token) {
      data = Object.assign({}, userInfo, data)
    }
    let contentType = json ? 'application/json' : 'application/x-www-form-urlencoded'
    let config = {
      url: url,
      method: 'post',
      headers: {'Content-Type': contentType},
      withCredentials: true
    }
    if (json) {
      config.data = data
    } else {
      config.params = data
    }
    return service(config)
  } catch (e) {
    return {code: -1, message: '网络异常'}
  }
}

/**
 *  长数据的请求
 *  @params url: 请求的url地址
 *          data: 请求参数
 * */
export function longPost (url, data = {}) {
  try {
    let config = {
      url: url,
      method: 'post',
      headers: {'Content-Type': 'multipart/form-data'},
      withCredentials: true,
      data: data
    }
    return service(config)
  } catch (e) {
    return {code: -1, message: '网络异常'}
  }
}
