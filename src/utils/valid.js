export const validEmpty = (rule, value, callback) => {
  if (value.trim() === '') {
    callback(new Error('请输入内容'))
  } else {
    callback()
  }
}
export const validWebsite = (rule, value, callback) => {
  if (value === '' || value === undefined) {
    callback('链接不可以为空')
  } else {
    const reg = /(https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/
    if (!reg.test(value)) { callback('请输入正确的网址, 必须是https开头') } else {
      callback()
    }
  }
}
export const validRequiredWebsite = (rule, value, callback) => {
  if (value === '' || value === undefined) {
    callback(new Error('请输入网址'))
  } else {
    const reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/
    if (!reg.test(value)) { callback(new Error('请输入正确的网址')) } else {
      callback()
    }
  }
}

export const validMobile = (rule, value, callback) => {
  if (value === '' || value === undefined) {
    callback(new Error('请输入手机号码'))
  } else {
    const reg = /[0-9]{11}/
    if (!reg.test(value)) { callback(new Error('请输入正确的手机号码')) } else {
      callback()
    }
  }
}

export const validID = (rule, value, callback) => {
  if (value === '' || value === undefined) {
    callback(new Error('请输入身份证号码'))
  } else {
    const reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
    if (!reg.test(value)) { callback(new Error('身份证号码不正确')) } else {
      callback()
    }
  }
}

export const phoneValid = value => {
  const reg = /[0-9]{11}/
  if (!reg.test(value)) {
    return false
  } else {
    return true
  }
}

// 校验身份证号码
export function validateIDCard (value) {
  var format = /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/
  // 号码规则校验
  if (!format.test(value)) {
    return false
  }
  // 区位码校验
  // 出生年月日校验   前正则限制起始年份为1900;
  var year = value.substr(6, 4) // 身份证年
  var month = value.substr(10, 2) // 身份证月
  var date = value.substr(12, 2) // 身份证日
  var time = Date.parse(month + '-' + date + '-' + year) // 身份证日期时间戳date
  var now_time = Date.parse(new Date()) // 当前时间戳
  var dates = new Date(year, month, 0).getDate() // 身份证当月天数
  if (time > now_time || date > dates) {
    return false
  }
  // 校验码判断
  var c = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2] // 系数
  var b = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'] // 校验码对照表
  var id_array = value.split('')
  var sum = 0
  for (var k = 0; k < 17; k++) {
    sum += parseInt(id_array[k]) * parseInt(c[k])
  }
  return id_array[17].toUpperCase() === b[sum % 11].toUpperCase()
}

// 校验邮箱
export function validEmail (value) {
  const reg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/
  return reg.test(value)
}

// element  el-form 校验正则

export function volidForm (value, rule, callback) {
  // 手机号
  const regPhone = /^1\d{10}$/
  // 邮箱
  const regEmail = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/
  // QQ
  const regQq = /^[1-9][0-9]{4,9}$/gi
  // 邮政编码
  const regPost = /^[1-9][0-9]{5}$/
  // 网址
  const regWebsit = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/
  // 微信
  const regWx = /^[a-zA-Z][a-zA-Z\d_-]{5,19}$/
  // 传真
  const regFax = /^(\d{3,4}-)?\d{7,124}$/
  // 电话号码
  // const regTel = /^0\d{2,3}-?\d{7,8}$/
  // const regTel = /^[\d\-\(\)\ ]+$/
  const regTel = /^[\d\-\(\)\ )]+$/
  // 只能输入数字
  const regYear = /^[0-9]*$/
  let reg = ''
  let regText = ''
  let regIsure = ''
  if (rule.name == 'phone') {
    reg = regPhone
    regText = '请输入正确的手机号'
    regIsure = '手机号不能为空'
  }
  if (rule.name == 'year') {
    reg = regYear
    regText = '在职年限只能为数字'
  }
  if (rule.name == 'email') {
    reg = regEmail
    regText = '邮箱格式不正确'
  }
  if (rule.name == 'post') {
    reg = regPost
    regText = '邮政编码格式不正确（6位数字）'
  }
  if (rule.name == 'qq') {
    reg = regQq
    regText = 'QQ号格式不正确（6-11位有效数字）'
  }
  if (rule.name == 'websit') {
    reg = regWebsit
    regText = '网址格式不正确（请输入以http、https开头的链接地址）'
  }
  if (rule.name == 'wx') {
    reg = regWx
    regText = '以字母或下划线开头,6-20位数字,字母,下划线,减号或组合'
  }
  if (rule.name == 'fax') {
    reg = regFax
    regText = '传真格式不正确'
  }
  if (rule.name == 'tel') {
    reg = regTel
    regText = '电话号格式不正确'// '电话号格式不正确（只能输入数字、空格、()或-）'
  }
  // if (rule.required && !value) {
  //   return callback(new Error(regIsure))
  // } else {
  //   if (!value) {
  //     callback()
  //   }
  //   if (reg.test(value)) {
  //     callback()
  //   } else {
  //     return callback(new Error(regText))
  //   }
  // }

  if (rule.required && !value) {
    return false
  } else {
    if (!value) {
      return true
    }
    if (reg.test(value)) {
      return true
    } else {
      return false
    }
  }
}
