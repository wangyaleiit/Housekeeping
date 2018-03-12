Page({
  data: {
    thumb: '',
    nickname: ''
  },
  onLoad() {
    let resUser = wx.getStorageSync('userInfo')
    this.setData({
      thumb: resUser.avatarUrl,
      nickname: resUser.nickName
    })
  }
})