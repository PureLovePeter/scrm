import request from '@/apis/base/service'

// 单工程的请求demo
export function demoAPI (data) {
  return request({
    url: '/demoAPI/demoAPI',
    method: 'GET',
    params: data
  })
}

