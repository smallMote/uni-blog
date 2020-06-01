// let plugin = requirePlugin('routePlan');

module.exports = {
  // 获取位置
  getLocal() {
    const _this = this
    wx.getLocation({
      type: 'wgs84',
      sHighAccuracy: true,
      success(res) {
        const { latitude, longitude } = res
        _this.setData({
          scale: 18,
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
      bwClassName: !this.data.bwClassName
    })
  },
  // 在地图上手动标点
  addPoint({ detail }) {
    if (!this.data.pointMode) return
    const _this = this
    // 对话框确定标点
    wx.showModal({
      title: '确定标点？',
      duration: 800,
      success({ confirm, cancel }) {
        if (confirm) {
          // 添加标点
          const markers = _this.data.markers
          let tapCount = _this.data.tapCount
          markers.unshift({
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
  },
  // 路线导航
  navigate2point() {
    const _this = this
    const key = 'G4SBZ-23WRD-ZI246-HGIQX-E2XZF-I3BBZ';  //使用在腾讯位置服务申请的key
    const referer = 'blog-map';   //调用插件的app的名称
    const markers = this.data.markers
    if (markers.length <= 1) {
      wx.showToast({
        title: '点击P标注终点',
        icon: 'none',
        image: '../asstes/local-active.png',
        duration: 800
      })
      return
    }
    this.setData({
      traffic: !this.data.traffic
    })
    let startPoint = {
      'name': markers[1].name || '起点',
      'latitude': markers[1].latitude,
      'longitude': markers[1].longitude
    }
    let endPoint = {
      'name': markers[0].name || '终点',
      'latitude': markers[0].latitude,
      'longitude': markers[0].longitude
    }
    let params = `key=${key}&referer=${referer}&startPoint=${JSON.stringify(startPoint)}&endPoint=${JSON.stringify(endPoint)}`
    wx.navigateTo({
      url: 'plugin://routePlan/index?' + params,
      navigation: 1,
      success(res) {
        _this.setData({
          scale: 18,
          traffic: false
        })
      },
      fail(err) {
        console.log('跳转失败', err)
        _this.setData({
          scale: 18,
          traffic: false
        })
      }
    });
  },
  // poi图标响应
  poiTap(e) {
    this.addPoint(e)
  },
  // 重新定位
  reLocal() {
    const mapCtx = wx.createMapContext('map')
    const { longitude, latitude } = this.data
    mapCtx.moveToLocation({
      longitude,
      latitude,
      success() {
        console.log('成功回到自己位置')
      }
    })
  },
  // 卫星图切换
  toggleSatellite() {
    this.setData({
      satellite: !this.data.satellite,
      scale: 16
    })
  }
}