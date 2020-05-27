const { request } = require('../../utils/api')
Page({
  data: {
    createDate: '',
    tags: '',
    coverImgUrl: '',
    title: '',
    summary: '',
    comment: 0,
    shares: 0
  },
  onLoad({ id }) {
    request('POST', {}, `/article/${id || 11}`)
      .then(({ code, data }) => {
        this.setData({
          ...data
        })
      })
      .catch(e => {
        console.log(e)
      })
  },
  methods: {
    // 查询文章详情
    queryArticleDetails(id) {
      request('POST', {}, `/article/${id}`)
        .then(({ code, data }) => {
          console.log(code, data)
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
})