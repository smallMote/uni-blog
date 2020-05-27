const { request } = require('../../utils/api')
Page({
  data: {
    articles: []
  },
  onLoad() {
    request('GET', '', '/article')
      .then(res => {
        this.setData({
          articles: res.data
        })
      })
      .catch(e => console.log(e))
  }
})