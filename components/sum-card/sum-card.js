// 文章简介组件
const { formatTags, formatTime } = require('../../utils/util.js')
Component({
  data: {
    // tags: 'Fontend--#108ee9,Nodejs--purple,Vue--seagreen'
    createTime: new Date().toLocaleString()
  },
  properties: {
    articleId: Number,
    createDate: String,
    tags: String,
    coverImgUrl: String,
    title: String,
    summary: String,
    author: String
  },
  lifetimes: {
    attached() {
      this.setData({
        createTime: formatTime(this.properties.createDate)
      })
    }
  },
  onShareAppMessage(opt) {
    return {
      title: this.data.title,
      path: `pages/article/article?id=${this.data.articleId}`
    }
  },
  methods: {
    formatTags,
    go2details() {
      const { articleId } = this.properties
      wx.navigateTo({
        url: `../../pages/article/article?id=${articleId}`
      })
    }
  }
})