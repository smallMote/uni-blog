Page({
  data: {
    accuracy: null,
    horizontalAccuracy: null,
    latitude: null,
    longitude: null,
    verticalAccuracy: null,
    markers: [],
    tapCount: 1,
    pointMode: false,
    bwClassName: false
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
  // 获取位置
  getLocal() {
    const _this = this
    wx.getLocation({
      type: 'wgs84',
      sHighAccuracy: true,
      success(res) {
        const { latitude, longitude } = res
        _this.setData({
          latitude,
          longitude,
          markers: [
            {
              id: 0,
              title: 'Home',
              iconPath: '../asstes/local-active.png',
              width: '50rpx',
              height: '50rpx',
              latitude,
              longitude,
              callout: {
                content: 'There is my hours!'
              }
            }
          ]
        })
      }
    })
  },
  // 定位授权
  authLocal() {
    wx.authorize({
      scope: 'scope.userLocation',
      success: (res) => {
        console.log(res)
      },
     })
  },
  // 精确选择
  chooseMap() {
    const _this = this
    wx.chooseLocation({
      success(res) {
        _this.setData({
          ...res,
          markers: [
            {
              id: 0,
              title: 'Home',
              ...res
            }
          ]
        })
      },
      fail(err) {
        console.log('获取位置信息失败', err)
      }
    })
  },
  // 标点模式切换
  pointAction() {
    this.setData({
      pointMode: !this.data.pointMode,
      bwClassName: true
    })
    const timer = setTimeout(() => {
      this.setData({
        bwClassName: false
      })
      clearTimeout(timer)
    }, 600)
  },
  // 在地图上手动标点
  addPoint({ detail }) {
    if (!this.data.pointMode) return
    const _this = this
    // 对话框确定标点
    wx.showModal({
      title: '确定标点？',
      success({ confirm, cancel }) {
        if (confirm) {
          // 添加标点
          const markers = _this.data.markers
          let tapCount = _this.data.tapCount
          markers.push({
            id: tapCount++,
            ...detail,
            iconPath: '../asstes/local-active.png',
            width: '50rpx',
            height: '50rpx'
          })
          _this.setData({
            tapCount,
            markers
          })
          console.log(_this.data.markers)
        }
        if (cancel) {
          // 啥也不做
        }
      }
    })
  },
  // 删除标点
  delPoint({ detail }) {
    if (!this.data.pointMode) return
    let markerId = detail.markerId
    const _this = this
    wx.showModal({
      title: '删除此标点？',
      success({ confirm, cancel }) {
        if (confirm) {
          let markers = _this.data.markers
          markers = markers.filter(item => item.id !== markerId)
          _this.setData({ markers })
        }
        if (cancel) {

        }
      }
    })
  }
})