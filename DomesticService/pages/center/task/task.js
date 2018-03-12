var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenmodalput: true,
    //可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框  
  },
  //点击按钮痰喘指定的hiddenmodalput弹出框  
  modalinput: function (event) {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput,
      key: event.target.dataset.key
    })
  },
  //取消按钮  
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认  
  confirm: function () {
    this.setData({
      hiddenmodalput: true
    })
    console.log(this.data.refundDesc)
    wx.request({
      url: app.globalData.host + '/pay/refund/' + this.data.key,
      method: 'POST',
      data: {
        refundDesc: this.data.refundDesc
      },
      success: function (res) {
        console.log("退款成功")
        console.log(res);
      }, fail: function (res) {
        console.log("退款失败")
        console.log(res);
      }
    })
  }, 

  refundDesc: function (e) {
    this.setData({
      refundDesc: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.request({
      url: app.globalData.host + '/employer/pubList/ovDIh0SgrSJPHJkUlWF0YC4Thq4c',
      method: 'GET',
      success: res => {
        this.setData({
          pubList: res.data.result
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})