import axios from 'axios'
import { getToken } from './cookie'
import { Toast } from 'vant'

const baseURL = process.env.VUE_APP_BASE_API

const service = axios.create({
  baseURL,
  timeout: 100000 * 50, // 请求超时时间
  withCredentials: true
})

window._axiosPromiseArr = []
// request拦截,在请求发起前
service.interceptors.request.use((config) => {
  if (process.env.NODE_ENV === 'development') {
    // setToken('eHSbzXdLUPoWVmQZkJELIq7Poe5T6WGG') // 这个不要提交
  }
  if (getToken() && !config.isView) {
    config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改1
  }
  // 将请求的接口添加到数组中
  config.cancelToken = new axios.CancelToken(cancel => {
    window._axiosPromiseArr.push(cancel)
  })
  return config
})

// respone拦截,获取请求数据后，搞事情1
service.interceptors.response.use(
  // 正常获取数据
  response => {
    const list = ['x-pkcs7-certificates', 'vnd.ms-excel', 'pem', 'zip', 'application/pdf']
    const flag = list.some(x => response.headers['content-type'] && response.headers['content-type'].indexOf(x) > -1)
    if (response.headers['content-type'] != null && flag) {
      return response
    }
    if (response.data && (response.data.code == 0 || response.data.code === 200)) {
      return response.data
    } else {
      Toast.clear()
      Toast({
        type: 'fail',
        className: 'z-9999',
        message: response.data.message || response.data.msg || response.msg
      })
    }
    return Promise.reject(response)
  },
  // 请求失败
  error => {
    // 请勿注释
    Toast.clear();
    return Promise.reject(error?.response?.data)
  }
)

export default service
