const baseUrl = 'https://server.wlittleyang.com'
// const request = wx.request({

// })

function request(method, params, url) {
  return new Promise((resolve) => {
    wx.request({
      url: `${baseUrl}${url}`,
      method,
      data: method === 'POST' ? JSON.stringify(params) : params,
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        resolve(res.data)
      },
      fail(err) {
        throw err
      }
    })
  })
}

module.exports = {
  request
}