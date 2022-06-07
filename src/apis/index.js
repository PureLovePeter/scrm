
import request from './base/service'

//公共的请求---写在本文件
export function getUserPermission (params) {
  return request({
    url: '/permission/getUserPermission',
    method: 'get',
    params
  })
}
