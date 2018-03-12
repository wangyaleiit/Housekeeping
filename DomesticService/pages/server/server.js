var sliderWidth = 100; // 需要设置slider的宽度，用于计算中间位置
var app = getApp();
Page({
  data: {
    tabs: ["找钟点工", "找雇主"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    wx.request({
      url: app.globalData.host + '/employer/queryList',
      method: 'GET',
      success: res => {
        console.log(res.data.result)
        this.setData({
          employerList: res.data.result
        })
      }
    })
  },
  tabClick: function (e) {
    if (0 == e.currentTarget.id){
      wx.request({
        url: app.globalData.host + '/employer/queryList',
        method: 'GET',
        success: res => {
          this.setData({
            employerList: res.data.result
          })
        }
      })
    } else {
      wx.request({
        url: app.globalData.host + '/employee/queryList',
        method: 'GET',
        success: res => {
          this.setData({
            employeeList: res.data.result
          })
        }
      })
    }
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  subscribe: function(){
    wx.showModal({
      title: '提示',
      content: '确认预约该订单吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
            wx.request({
              url: app.globalData.host + '/employer/subscribe/' + wx.getStorageSync('userInfo').openId,
              method: 'POST',
              success:res=>{
                if (res.data.code != "0"){
                  wx.showModal({
                    title: '提示',
                    showCancel:false,
                    content: res.data.msg
                  })
                } else {
                  console.log(res.data)
                }
              }
            })
          // wx.navigateTo({
          //   url: '../center/myOrder/order',
          // })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  gotoEmployer:function(){
    wx.navigateTo({
      url: '../employer/release',
    })
  },
  gotoEmployee: function () {
    wx.request({
      url: app.globalData.host + '/employer/subscribe/' + wx.getStorageSync('userInfo').openId,
      method: 'POST',
      success: res => {
        if (res.data.code != "0") {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: res.data.msg
          })
        } else {
          wx.navigateTo({
            url: '../employee/release',
          })
        }
      }
    })
  }
});



