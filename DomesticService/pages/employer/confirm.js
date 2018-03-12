// pages/employer/confirm.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: app.globalData.host + '/employer/info/' + options.id,
      method: 'GET',
      success: res => {
        console.log('res.data.result' + res.data.result)
        this.setData(res.data.result)
      }
    })
  },

  confirm: function () {
    var that = this
    console.log("that.data.typeMoney" + that.data.typeMoney)
    wx.request({
      url: app.globalData.host + '/pay/createOrder/' + this.data.id,
      method: 'POST',
      data: {
        //totalFee: that.data.typeMoney,
        body: '家政服务',
        openid: wx.getStorageSync('userInfo').openId
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        that.pay(res.data.payInfo)
      }
    })
  },
  pay: function (param) {
    var that = this
    wx.requestPayment({
      timeStamp: param.timeStamp,
      nonceStr: param.nonceStr,
      package: param.packageValue,
      signType: param.signType,
      paySign: param.paySign,
      success: function (res) {
        wx.showToast({
          title: '支付成功',
          icon: 'success',
          duration: 2000
        });
        that.sendMsg(param.packageValue)
      },
      fail: function (res) {
        wx.showToast({
          title: '支付失败',
          icon: 'success',
          duration: 2000
        });
      },
      complete: function () {
        console.log("pay complete")
      }
    })
  },
  sendMsg: function (prepayId){
    var that = this
    wx.request({
      url: app.globalData.host + '/pay/sendMsg/' + prepayId + '/' + app.globalData.gloabalFomIds,
      data: that.data,
      method: 'POST',
      success: res => {
        console.log(res)
        app.globalData.gloabalFomIds = []
        wx.navigateTo({
          url: '../center/task/task',
        })
      }
    })
  }
})