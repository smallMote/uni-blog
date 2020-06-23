module.exports = {
  openScanCode() {
    wx.scanCode({
      success(res) {
        console.log(res)
      },
      fail(err) {
        // 啥也不做 程序本身会给出错误提示
        console.log(err)
      }
    })
  }
}