import axios from 'axios'
import store from '../store'
import Qs from 'qs'
// import { Message } from 'element-ui'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 60000 // 请求超时时间
})

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
 *          isFormData: 是否用formData的形式
 * */
export default function post (url, data = {}, isFormData = false) {
  try {
    const userInfo = {
      userId: store.getters.userInfo.userId || '',
      token: store.getters.userInfo.token || ''
    }
    if (store.getters.userInfo.token) {
      data = Object.assign({}, userInfo, data)
    }
    let contentType = isFormData ? 'multipart/form-data' : 'application/x-www-form-urlencoded'
    let config = {
      url: url,
      method: 'post',
      headers: {'Content-Type': contentType},
      withCredentials: true
    }
    if (isFormData) {
      let form = new FormData()
      form.method = 'post'
      form.enctype = 'multipart/form-data'
      for (let key in data) {
        form.append(key, data[key])
      }
      config.data = form
    } else {
      config.data = Qs.stringify(data)
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
