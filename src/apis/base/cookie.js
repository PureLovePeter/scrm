import Cookies from 'js-cookie'

const TokenKey = 'X-Token'
const OpenId = 'openId'

//获取openId
export function getOpenId () {
  return Cookies.get(OpenId)
}

//获取token
export function getToken () {
  return Cookies.get(TokenKey)
}

//设置本地token
export function setToken (token) {
  if (process.env.NODE_ENV === 'development') {
    return Cookies.set(TokenKey, token)
  }
  return Cookies.set(TokenKey, token, { domain: '.71360.com' })
}

//移除本地token
export function removeToken () {
  return Cookies.remove(TokenKey)
}

//设置cookie
export function setCookie (key, value) {
  return Cookies.set(key, value)
}

//获取cookie
export function getCookie (key) {
  return Cookies.get(key)
}
