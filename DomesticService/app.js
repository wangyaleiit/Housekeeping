import wxValidate from './utils/wxValidate'
App({
  onLaunch: function () {
    var that = this
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.login({
      success: loginRes => {
        wx.getSetting({
          success: setRes => {
            if (setRes.authSetting['scope.userInfo']) {
              that.userInfo(loginRes.code)
            } else {
              wx.authorize({
                scope: 'scope.userInfo',
                success() {
                  that.userInfo(loginRes.code)
                }
              })
            }
          }
        })
      }
    })
  },
  userInfo: function (code) {
    var that = this
    wx.getUserInfo({
      lang: "zh_CN",
      success: res => {
        wx.getUserInfo({
          lang: "zh_CN",
          success: function (userRes) {
            wx.request({
              url: that.globalData.host + "/user/userInfo",
              method: 'POST',
              data: {
                code: code,
                encryptedData: userRes.encryptedData,
                iv: userRes.iv
              },
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              success: retrunRes => {
                wx.setStorageSync("userInfo", retrunRes.data);
              }
            })
          }
        })
        if (this.userInfoReadyCallback) {
          this.userInfoReadyCallback(res)
        }
      }, fail: function () {
        wx.showModal({
          title: '警告',
          content: '您点击了拒绝授权,将无法正常使用APP,点击确定重新获取授权。',
          success: function (res) {
            wx.openSetting({
              success: (setRes) => {
                if (setRes.authSetting["scope.userInfo"]) {
                  wx.getUserInfo({
                    lang: "zh_CN",
                    success: function (userRes) {
                      wx.request({
                        url: that.globalData.host + "/user/userInfo",
                        method: 'POST',
                        data: {
                          code: code,
                          encryptedData: userRes.encryptedData,
                          iv: userRes.iv
                        },
                        header: {
                          "Content-Type": "application/x-www-form-urlencoded"
                        },
                        success: retrunRes => {
                          wx.setStorageSync("userInfo", retrunRes.data);
                        }
                      })
                    }
                  })
                }
              }
            })
          }
        })
      }
    })
  },
  wxValidate: (rules, messages) => new wxValidate(rules, messages),
  dealFormIds: function(formId){
    var that = this
    let formIds = that.globalData.gloabalFomIds
    if (!formIds) formIds = []
    // let data = {
    //   formId: formId,
    //   expire: parseInt(new Date().getTime() / 1000) + 604800 
    // }
    // formIds.push(data)
    formIds.push(formId)
    that.globalData.gloabalFomIds = formIds
  },
  globalData: {
    userInfo: null,
    gloabalFomIds:[],
    host: "https://wangyl.tunnel.qydev.com/miniApp",
  }
})