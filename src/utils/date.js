export function formatDate (date, fmt) {
  // 正则匹配/(y+)/ 字符串fmt--'yyyy-MM-dd hh:mm'，如果匹配到，就获取第一个匹配的文本，即yyyy,
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    // 将yyyy替换成年份，如1970
    // date.getFullYear()的类型是number,(date.getFullYear() + '') 加个空字符串将number转成字符串类型
    // substr() 方法可在字符串中抽取从 start 下标开始的指定数目的字符。
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}
