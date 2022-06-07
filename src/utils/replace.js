// 正则匹配标签

// 先匹配'用户昵称' %NICKNAME%
// const nickName=/<span class="editDiv_hintText"\/?.+?span>/g
const nickName = /<span contenteditable="false"\/?.+?span>/g
// var classTag=/[\s]+style=("?)(.[^<>"]*)\1/ig
var styleTag = /<div.*?style[ \t]*=[ \t]*"display: inline;".*?>.*?/gim // 这个只能匹配单标签
var styleTag2 = /<div.*?style[ \t]*=[ \t]*\\"display: inline;\\".*?>.*?/gim // 这个只能匹配单标签

const divReg = /(<div style="display: inline.*?>)[\s\S]*?(<\/div>)/g // 用于匹配特殊的div

const delTag = /<(?!br|div|\/div|p|\/p|span|\/span).*?>/gi // 去除br span p div 之外的标签
const divTag = /<div><br><\/div>/g // 匹配所有div 替换\n
const brdivdivTag = /<br><\/div><div>/g // 匹配所有div 替换\n
const brDivTag = /<br><\/div>/g // 匹配所有div 替换\n
// var AllTag = /<\/?[^>]*>|(\n|\t|\r)/g //匹配所有div 替换\n
const brTag = /<(br)[^>]*>/gi // 用于匹配br
const Tag = /<div[^>]*>/gi // 用于匹配<div>
const Tag2 = /<\/div[^>]*>/gi // 用于匹配</div>
const pTag = /<p[^>]*>/gi // 用于匹配<p>
const pTag2 = /<\/p[^>]*>/gi // 用于匹配</p>
// const divR = /\r<\/div><div>\r/gi // 用于匹配回车
const divR = /<div>\r<\/div>/gi // 用于匹配回车
const N = /\n$/g // 用于匹配最后一个\n

// const ATag = /<div[^>]{0,}>/g // 用于匹配多个<div>
// const BTag2 = /<\/div[^>]{0,}>/gi // 用于匹配多个</div>

// data为对象
// 例子
// data = {
//   str: '',//需要匹配的内容，这个是必传
//   rep:'' //可以自己定义正则的方式 这些是选择性传
// }
export function replaceText(data) {
  if (typeof data.str !== 'string') { // 不是字符串
    return data.str
  }
  var result = data.str
  result = result.replace(divR, '') // 先解决复制的回车和换行
  // result = result.replace(ATag, '')
  // result = result.replace(BTag2, '')
  result = result.replace(delTag, '')// 先经过全局匹配，把不确定的标签全部过滤掉
  result = result.replace(styleTag, '')
  result = result.replace(styleTag2, '')
  result = result.replace(divTag, '\n')
  result = result.replace(brdivdivTag, '\n')
  result = result.replace(brDivTag, '\n')
  result = result.replace(brTag, '\n') // br替换\n

  result = result.replace(Tag, '\n')
  result = result.replace(Tag2, '')
  result = result.replace(pTag, '\n')
  result = result.replace(pTag2, '')
  result = result.replace(N, '')

  return result
}
