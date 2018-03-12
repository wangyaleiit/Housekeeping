var app = getApp()
Page({
  data: {
    countryCodes: ["+86", "+80", "+84", "+87"],
    countryCodeIndex: 0,
    index: 0,
    openId: wx.getStorageSync('userInfo').openId
  },

  telInput: function (e) {
    this.setData({
      tel: e.detail.value
    })
  },

  onLoad: function (options) {
    this.WxValidate = app.wxValidate(
      {
        iname: {
          required: true,
          minlength: 2,
          maxlength: 20,
        },
        icard: {
          required: true,
          idcard: true
        },
        imobile: {
          required: true,
          tel: true,
        }
      }
      , {
        iname: {
          required: '请填写姓名',
        },
        icard: {
          required: '有效的身份证件',
        },
         imobile: {
          required: '有效的手机号码',
        }
      }
    ),
    wx.request({
      url: app.globalData.host + '/user/getCert/' + wx.getStorageSync('userInfo').openId,
      method: 'GET',
      success: res => {
        console.log(res)
        this.setData({
          certification: res.data
        })
      }
    })
  },

  nameInput: function (e) {
    this.setData({
      realName: e.detail.value
    })
  },

  noInput: function (e) {
    this.setData({
      cardNo: e.detail.value
    })
  },

  telInput: function (e) {
    this.setData({
      phoneNum: e.detail.value
    })
  },

  certificate: function (e) {
    if (!this.WxValidate.checkForm(e)) {
      const error = this.WxValidate.errorList[0]
      wx.showToast({
        title: `${error.msg} `,
        image: '/images/error.png',
        duration: 2000
      })
      return false
    }
    wx.request({
      url: app.globalData.host + '/user/update',
      data: {
        openId: this.data.openId,
        realName: this.data.realName,
        cardNo: this.data.cardNo,
        phoneNum: this.data.phoneNum,
        certFlag:'1'
      },
      method: 'PUT',
      success: res => {
        wx.showModal({
          title: '提示',
          content: '请仔细核对信息，提交后将无法修改。审核时间为3个工作日，感谢您对本平台的支持。',
          success: res2=>{
            if (res2.confirm) {
              wx.reLaunch({
                url: '../myself/index'
              })
            }
          }
        })
      }
    })
  }
})