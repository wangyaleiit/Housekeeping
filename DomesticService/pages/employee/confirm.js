// pages/employee/confirm.js
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
    wx.request({
      url: app.globalData.host + '/employee/info/' + options.id,
      method: 'GET',
      success: res => {

        this.setData(res.data.result)
      }
    })
  },

  confirm: function () {
    wx.request({
      url: app.globalData.host + '/employee/update/',
      method: 'PUT',
      data:{ id: this.data.id},
      success: res=>  {
        console.log(res)
        wx.showToast({
          title: '发布成功',
          icon:'success',
          duration: 1000
        })
      }
    })
  }
})