const mixin = require('./map.mixin')
Page({
  data: {
    scale: 10, // 缩放级别
    satellite: false, // 卫星图
    accuracy: null,
    traffic: false, // 实时交通
    horizontalAccuracy: null,
    latitude: null,
    longitude: null,
    verticalAccuracy: null,
    markers: [],
    tapCount: 1,
    pointMode: false,
    bwClassName: false,
    includePoints: [] // 包含的标点
  },
  onLoad() {
    // 开启分享至朋友圈
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },
  onShow(opt) {
    const _this = this
    wx.getSetting({
      success(setOpt) {
        if (setOpt.authSetting['scope.userLocation']) { // 已授权
          console.log('已定位授权')
          _this.getLocal()
        } else {
          _this.authLocal()
        }
      }
    })
  },
  ...mixin
})