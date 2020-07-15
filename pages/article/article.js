const { formatTime } = require('../../utils/util')
const { request } = require('../../utils/api')
Page({
  data: {
    id: '',
    createDate: '',
    tags: '',
    coverImgUrl: '',
    title: '',
    summary: '',
    comment: 0,
    shares: 0,
    pageviews: 0
  },
  onLoad({ id }) {
    // 开启分享至朋友圈
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
    this.setData({ id })
    request('POST', {}, `/article/${id || 11}`)
      .then(({ code, data }) => {
        this.setData({
          ...data,
          createDate: formatTime(data.createTime)
        })
      })
      .catch(e => {
        console.log(e)
      })
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  onShareAppMessage(opt) {
    return {
      title: this.data.title,
      path: `pages/article/article?id=${this.data.id}`
    }
  },
  clickLick(e) {
    const query = wx.createSelectorQuery().in(this)
    query.selectAll('.header').node((res) => {
      console.log(res)
    })
    query.exec()
  }
})