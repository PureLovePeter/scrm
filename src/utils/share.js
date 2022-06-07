import {
  getJSSDKUrl
} from '@/apis/common/index'
import { envjudge } from '@/utils'

function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera

  if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i)) {
    return 'iOS'
  } else if (userAgent.match(/Android/i)) {
    return 'Android'
  } else {
    return 'unknown'
  }
}

// 锟角凤拷锟斤拷微锟斤拷锟斤拷锟斤拷
function is_in_wechat() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera
  if (userAgent.match(/micromessenger/i)) {
    return true
  } else {
    return false
  }
}

var defaultShareData = {
  tTitle: '',
  tLink: '',
  tImgUrl: '',
  tContent: '',
  fImgUrl: '',
  fLink: '',
  fContent: '',
  fTitle: ''
}

export function startShart(accountId) {
  const isComWx = envjudge()
  if (isComWx != 'wx-mobile' && isComWx != 'wx-mobile') { // 非微信的时候
    return
  }
  window.shareData = window.shareData || defaultShareData
  window.shareIMdata = window.shareIMdata || window.shareData

  var is_wechat = false
  var os = ''
  if (getMobileOperatingSystem() == 'Android') {
    if (is_in_wechat()) {
      is_wechat = true
    }
    os = 'Android'
  } else {
    if (is_in_wechat()) {
      is_wechat = true
    }
    os = 'ios'
  }
  console.log('startShart:os', os, 'is_wechat', is_wechat)
  if (is_wechat) {
    window.user_type = 1
    createWeixinShare(accountId)
  } else {
    window.user_type = 2
  }
  window.isWeChat = is_wechat
}

function createWeixinShare(accountId) {
  if (!accountId || accountId == undefined) {
    alert('缺少账户id')
    return
  }
  let url = document.location.href.split('#')[0]
  if (getMobileOperatingSystem() == 'iOS') { // 解决ios分享中路由守卫的问题；
    url = sessionStorage.getItem('originUrl') || document.location.href.split('#')[0]
    console.log(url, 'urlurlurlurlurlurl')
  }
  const data = {
    accountId: accountId,
    jsApiList: ['onMenuShareQZone'],
    mt: new Date(),
    url: url
  }
  getJSSDKUrl(data).then(res => {
    addWXConfig(res.data)
  },
  (error) => {

  })
}

function addWXConfig(wx_config) {
  wx.config({
    debug: false,
    appId: wx_config.appId,
    timestamp: wx_config.timestamp,
    nonceStr: wx_config.nonceStr,
    signature: wx_config.signature,
    openTagList: ['wx-open-launch-weapp', 'wx-open-subscribe'],
    jsApiList: [
      'checkJsApi',
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareWechat',
      'onMenuShareQQ',
      'onMenuShareWeibo',
      'hideMenuItems',
      'showMenuItems',
      'hideAllNonBaseMenuItem',
      'showAllNonBaseMenuItem',
      'translateVoice',
      'startRecord',
      'stopRecord',
      'onRecordEnd',
      'playVoice',
      'pauseVoice',
      'stopVoice',
      'uploadVoice',
      'downloadVoice',
      'chooseImage',
      'previewImage',
      'uploadImage',
      'downloadImage',
      'getNetworkType',
      'openLocation',
      'getLocation',
      'hideOptionMenu',
      'showOptionMenu',
      'closeWindow',
      'scanQRCode',
      'chooseWXPay',
      'openProductSpecificView',
      'addCard',
      'chooseCard',
      'openCard'
    ]
  })
  wx.ready(function () {
    var sd = {
      title: window.shareData.fTitle,
      link: window.shareData.fLink,
      imgUrl: window.shareData.fImgUrl,
      desc: window.shareData.fContent,
      success: function () {

      },
      cancel: function () { }
    }

    // 锟斤拷锟斤拷圈
    wx.onMenuShareTimeline(sd)

    // 锟斤拷锟斤拷
    wx.onMenuShareAppMessage({
      title: window.shareIMdata.fTitle || window.shareData.fTitle,
      link: window.shareIMdata.fLink || window.shareData.fLink,
      imgUrl: window.shareIMdata.fImgUrl || window.shareData.fImgUrl,
      desc: window.shareIMdata.fContent || window.shareData.fContent,
      success: function () {
        console.log(window.shareData.fLink, 'success')
      },
      cancel: function () {
        console.log(window.shareData.fLink, '分享fail')
      }
    })
    // 分享到微信
    wx.onMenuShareWechat({
      title: window.shareIMdata.fTitle || window.shareData.fTitle,
      link: window.shareIMdata.fLink || window.shareData.fLink,
      imgUrl: window.shareIMdata.fImgUrl || window.shareData.fImgUrl,
      desc: window.shareIMdata.fContent || window.shareData.fContent,
      success: function () {
        console.log(window.shareData.fLink, 'success')
      },
      cancel: function () {
        console.log(window.shareData.fLink, '分享fail')
      }
    })

    // 锟斤拷Q
    wx.onMenuShareQQ(sd)

    // 微锟斤拷
    wx.onMenuShareWeibo(sd)

    // 锟秸硷拷
    wx.onMenuShareQZone(sd)
  })
  // 隐藏复制功能
  wx.hideMenuItems({
    menuList: ['menuItem:copyUrl'] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
  })
}

export function updateWeixinEvents(obj) {
  if (!obj) {
    return
  }
  var sd = {
    title: obj.title || window.shareData.fTitle,
    link: obj.link || window.shareData.fLink,
    imgUrl: obj.img || window.shareData.fImgUrl,
    desc: obj.desc || window.shareData.fContent,
    success: function () {

    },
    cancel: function () { }
  }

  wx.onMenuShareTimeline(sd)

  // 锟斤拷锟斤拷
  wx.onMenuShareAppMessage({
    title: window.shareIMdata.fTitle || obj.title || window.shareData.fTitle,
    link: window.shareIMdata.fLink || obj.link || window.shareData.fLink,
    imgUrl: window.shareIMdata.fImgUrl || obj.img || window.shareData.fImgUrl,
    desc: window.shareIMdata.fContent || obj.desc || window.shareData.fContent,
    success: function () {

    },
    cancel: function () { }
  })
  wx.onMenuShareWechat({
    title: window.shareIMdata.fTitle || obj.title || window.shareData.fTitle,
    link: window.shareIMdata.fLink || obj.link || window.shareData.fLink,
    imgUrl: window.shareIMdata.fImgUrl || obj.img || window.shareData.fImgUrl,
    desc: window.shareIMdata.fContent || obj.desc || window.shareData.fContent,
    success: function () {

    },
    cancel: function () { }
  })
  // 锟斤拷Q
  wx.onMenuShareQQ(sd)

  // 微锟斤拷
  wx.onMenuShareWeibo(sd)

  // 锟秸硷拷
  wx.onMenuShareQZone(sd)
}
