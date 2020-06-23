const { request } = require('../../utils/api')
const { delay } = require('../../utils/util')
const app = getApp()
Page({
  data: {
    articles: [],
    scrollTop: 0
  },
  onLoad() {
    console.log(app.globalData)
    request('GET', '', '/article')
      .then(res => {
        this.setData({
          articles: res.data
        })
      })
      .catch(e => console.log(e))
  },
  onPageScroll(e) {
    let _this = this
    delay(() => {
      _this.setData({
        scrollTop: e.scrollTop
      })
    }, 300)
  },
  onShareAppMessage(opt) {
    if (!opt.target) { // 三点分享
      return
    }
    // 文章详情分享
    const { id, title, img } = opt.target.dataset
    return {
      title: title,
      path: `pages/article/article?id=${id}`,
      imageUrl: img || 'https://s2.ax1x.com/2019/08/05/eRwIrq.th.png'
    }
  },
  methods: {
    formatNum(val) {
      console.log(1, val)
      return typeof val === 'number' ? val : Number(val)
    }
  }
})