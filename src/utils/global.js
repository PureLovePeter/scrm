import { getToken } from '@/apis/base/cookie'

class Global {
  constructor (name) {
    this.name = name
  }

  getImgUrl (id) {
    return `${process.env.VUE_APP_BASE_API}/tcloud-fs/fs/readImage?fileId=${id}&X-Token=${getToken()}`
  }

  downloadBlob (data, fileName) { // 下载导出
    const blob = new Blob([data])
    if (navigator.msSaveOrOpenBlob) {
      navigator.msSaveOrOpenBlob(blob, fileName)
    } else {
      const elink = document.createElement('a')
      elink.download = fileName
      elink.style.display = 'none'
      elink.href = URL.createObjectURL(blob)
      document.body.appendChild(elink)
      elink.click()
      URL.revokeObjectURL(elink.href) // 释放URL 对象
      document.body.removeChild(elink)
    }
  }

  parseTime (time = '', cFormat) {
    if (arguments.length === 0) {
      return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
      date = time
    } else {
      if (('' + time).length === 10) time = parseInt(time) * 1000
      if (typeof (time) === 'string') time = time.replace(/-/g, '/')
      date = new Date(time)
    }
    const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
    }
    const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
      let value = formatObj[key]
      // console.log(value,'value=>>');
      // if (key === 'a') return ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'][value - 1]
      if (key === 'a') return ['星期日','星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][value]
      if (result.length > 0 && value < 10) {
        value = '0' + value
      }
      return value || 0
    })
    return timeStr
  }

  // 格式化日期
  formattingDate (date) {
    var y = date.getFullYear()
    var m = date.getMonth() + 1
    m = m < 10 ? '0' + m : m
    var d = date.getDate()
    d = d < 10 ? ('0' + d) : d
    return y + '-' + m + '-' + d
  }

  formErrorScroll () { // 报错回到第一个错误的地方
    if (document.querySelector('.el-form-item__error')) {
      document
        .querySelector('.el-form-item__error')
        .parentNode.scrollIntoView({
          block: 'start',
          behavior: 'smooth'
        })
    }
  }

  transformEmptyObject (target) {
    // 对象为空时转为字符 --
    if (Array.isArray(target)) {
      target.forEach(object => {
        for (const key in object) {
          if (object[key] === '' || object[key] === null) {
            object[key] = '--'
          }
          if (Array.isArray(object[key]) || object[key].constructor === Object) {
            this.transformEmptyObject(object[key])
          }
        }
      })
    } else if (target.constructor === Object) {
      for (const key in target) {
        if (target[key] === '' || target[key] === null) {
          target[key] = '--'
        }
      }
    }
    return target
  }

  mergeRowsMethod ({ rowIndex, columnIndex }, mergeRows) {
    // 合并列的索引
    if (mergeRows.includes(rowIndex)) {
      if (columnIndex === 1) {
        return [1, 3]
      }
    }
  }

  saveAccountID (accountId) {
    localStorage.setItem('ACCOUNTID', accountId)
  }

  // 处理过长金额 转换 千万、亿
  deserveMoney (value) {
    if (value == '- -') return '- -'
    value = Number(value)
    const newValue = ['', '', '']
    let fr = 1000
    let num = 3
    let text1 = ''
    let fm = 1
    let bs = ''
    if (value < 0) {
      bs = '-'
      value = Math.abs(value)
    } else {
      bs = ''
    }
    while (value / fr >= 1) {
      fr *= 10
      num += 1
      // console.log('数字', value / fr, 'num:', num)
    }
    if (num <= 4) { // 千
      newValue[0] = parseInt(value / 1000) + ''
      newValue[1] = '千'
      // 不需要千显示  直接返回
      return bs + value
    } else if (num <= 8) { // 万
      text1 = parseInt(num - 4) / 3 > 1 ? '千万' : '万'
      fm = text1 === '万' ? 10000 : 10000000
      if (value % fm === 0) {
        newValue[0] = parseInt(value / fm) + ''
      } else {
        newValue[0] = parseFloat(value / fm).toFixed(2) + ''
      }
      newValue[1] = text1
      if (text1 === '万') {
        // 不需要万显示  直接返回
        return bs + value
      }
    } else if (num <= 16) { // 亿
      text1 = (num - 8) / 3 > 1 ? '千亿' : '亿'
      text1 = (num - 8) / 4 > 1 ? '万亿' : text1
      text1 = (num - 8) / 7 > 1 ? '千万亿' : text1
      fm = 1
      if (text1 === '亿') {
        fm = 100000000
      } else if (text1 === '千亿') {
        fm = 100000000000
      } else if (text1 === '万亿') {
        fm = 1000000000000
      } else if (text1 === '千万亿') {
        fm = 1000000000000000
      }
      if (value % fm === 0) {
        newValue[0] = parseInt(value / fm) + ''
      } else {
        newValue[0] = parseFloat(value / fm).toFixed(2) + ''
      }
      newValue[1] = text1
    }
    if (value < 1000) {
      newValue[0] = value + ''
      newValue[1] = ''
    }
    return bs + newValue.join('')
  }

  // 获取当前版本 直播是否可用
  getVersionApp (ver, compare) {
    const ua = navigator.userAgent
    let version = ''
    const versionApp = ua.match(/wxwork\/([\d.]+)/)
    if (versionApp) {
      version = versionApp[1]
    } else {
      return '不支持'
    }
    if (!version) return
    if (compare) {
      var version1pre = parseFloat(version)
      var version2pre = parseFloat(ver)
      var version1next = version.replace(version1pre + '.', '')
      var version2next = ver.replace(version2pre + '.', '')
      if (version1pre > version2pre) {
        return true
      } else if (version1pre < version2pre) {
        return false
      } else {
        if (version1next >= version2next) {
          return true
        } else {
          return false
        }
      }
    } else {
      return version
    }
  }

  // 获取url参数
  getUrlParam (name) {
    // 构造一个含有目标参数的正则表达式对象
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    // 匹配目标参数
    var r = window.location.search.substr(1).match(reg)
    // 返回参数
    if (r != null) {
      return unescape(r[2])
    } else {
      return null
    }
  }
  // 字符串超过特定长度隐藏显示...
  hideWordsItem (value, txtLength) {
    if (!value) return ''
    if (value.length >= txtLength) {
      return value.slice(0, txtLength) + '...'
    }
    return value
  }
  //数组根据属性值排序console.log(arr.sort(this.global.sortAttr('age')))
  sortAttr(property){
    return function(a,b){
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
    }
  }
  // 去掉 url中#
  replaceStr (data) {
  //  return data.replace(/#/g,'')
    if (data) {
    return data.split('#')[0]
    } else {
    return window.location.href.split('#')[0]
    }
  }
  // 动态修改页面标题
  editPageTitle(name){
    document.title = name
  }
  // 深拷贝
  deepClone(target, cache = new Map()) {
    if(cache.get(target)){
      return cache.get(target)
    }
    if(target instanceof Object){
      let dist ;
      if(target instanceof Array){
        // 拷贝数组
        dist = [];
      }else if(target instanceof Function){
        // 拷贝函数
        dist = function () {
          return target.call(this, ...arguments);
        };
      }else if(target instanceof RegExp){
        // 拷贝正则表达式
        dist = new RegExp(target.source,target.flags);
      }else if(target instanceof Date){
        dist = new Date(target);
      }else{
        // 拷贝普通对象
        dist = {};
      }
      // 将属性和拷贝后的值作为一个map
      cache.set(target, dist);
      for(let key in target){
        // 过滤掉原型身上的属性
        if (target.hasOwnProperty(key)) {
          dist[key] = this.deepClone(target[key], cache);
        }
      }
      return dist;
    }else{
      return target;
    }
  }
}
export default Global
