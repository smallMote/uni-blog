const { request } = require('../../utils/api')
Page({
  data: {
    articles: []
  },
  async onLoad() {
    const result = await request('GET', '', '/article')
      .catch(e => console.log(e))
    this.setData({
      articles: result.data
    })
  }
})