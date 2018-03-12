var app = getApp()
Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },
  funEmployer:function(e){
    let formId = e.detail.formId
    formId = '32131313131313'
    app.dealFormIds(formId)
    wx.navigateTo({
      url: '../employer/release',
    })
  },
  funEmployee:function(e){
    let formId = e.detail.formId
    formId = 'sdfsdfsdfsdfsdfsd'
    app.dealFormIds(formId)
    wx.navigateTo({
      url: '../employee/release',
    })
  },
  knowledge:function(){
    wx.showToast({
      title: '敬请期待',
      image: '/images/error.png',
      duration: 2000
    })
  }
})