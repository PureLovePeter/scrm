export function setConfig(params, jsApiList) {
  return new Promise((resolve, reject) => {
    console.log(params, 'paramsparams')
    // eslint-disable-next-line no-undef
    wx.agentConfig({
      corpid: params.cropId, // 必填，企业微信的corpid，必须与当前登录的企业一致
      agentid: params.agentId, // 必填，企业微信的应用id （e.g. 1000247）
      timestamp: params.timestamp, // 必填，生成签名的时间戳
      nonceStr: params.nonceStr, // 必填，生成签名的随机串
      signature: params.signature, // 必填，签名，见附录-JS-SDK使用权限签名算法
      jsApiList: jsApiList,
      success: res => {
        resolve(res)
      },
      fail: function (res) {
        reject(res)
      }
    })
    // eslint-disable-next-line no-undef
    wx.ready(res => {
      resolve(res)
    })
    // eslint-disable-next-line no-undef
    wx.error(err => {
      console.error(err)
      reject(err)
    })
  })
}
// 获取当前外部联系人userid
export function getCurExternalContact() {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-undef
    wx.invoke('getCurExternalContact', {}, res => {
      if (res.err_msg === 'getCurExternalContact:ok') {
        resolve(res.userId)
      } else {
        reject(res.err_msg)
      }
    })
  })
}
// 发送消息
export function sendChatMessage(type, data) {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-undef
    wx.invoke('sendChatMessage', {
      msgtype: type,
      enterChat: true,
      [type]: data
    }, res => {
      res.err_msg === 'sendChatMessage:ok' ? resolve() : reject(res.err_msg)
    })
  })
}
// 进入添加客户界面
export function navigateToAddCustomer(type, data) {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-undef
    wx.invoke('navigateToAddCustomer', {
    }, res => {
      res.err_msg === 'sendChatMessage:ok' ? resolve() : reject(res.err_msg)
    })
  })
}
// 获取进入H5页面的入口环境
export function getContext() {
  return new Promise((resolve, reject) => {
    // 返回进入H5页面的入口类型，目前有normal、contact_profile、single_chat_tools、group_chat_tools、chat_attachment
    // eslint-disable-next-line no-undef
    wx.invoke('getContext', {}, res => {
      res.err_msg === 'getContext:ok' ? resolve(res) : reject(res.err_msg)
    })
  })
}
export function openDefaultBrowser(url) {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-undef
    wx.invoke('openDefaultBrowser', { url }, function (res) {
      if (res.err_msg !== 'openDefaultBrowser:ok') {
        reject(res.err_msg)
      } else {
        resolve()
      }
    })
  })
}
// 分享内容到客户朋友圈
export function shareToExternalMoments(content, type, data) {
  wx.invoke("shareToExternalMoments", {
    text: {
      content: content,    // 文本内容
    },
    attachments: [
      {
        msgtype: type,    // 消息类型，必填
        ...data
      },
    ]
  }, function (res) {
    if (res.err_msg == "shareToExternalMoments:ok") {
    }
  });
}

export function shareAppMessage(obj) {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-undef
    wx.invoke(
      'shareAppMessage', obj, function(res) {
        if (res.err_msg == 'shareAppMessage:ok') {
          resolve(res)
        } else {
          console.error('error: shareAppMessage: ', res);
          reject(res)
        }
      }
    )
  })
}
