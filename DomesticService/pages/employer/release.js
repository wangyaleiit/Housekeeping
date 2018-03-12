var util = require('../../utils/util.js')
var pickerFile = require('../tools/js/picker_datetime.js');
var app = getApp()

Page({
  data: {
    countryCodes: ["+86", "+80", "+84", "+87"],
    countryCodeIndex: 0,
    index: 0,
    openId: wx.getStorageSync('userInfo').openId
  },
  onLoad: function (options) {
    var that = this
    this.datetimePicker = new pickerFile.pickerDatetime({
      page: this,
      animation: 'slide',
      duration: 100
    });
    wx.request({
      url: app.globalData.host + '/workType/query',
      method: 'GET',
      success: res => {
        this.setData({
          workTypeArray: res.data.result
        })
      }
    }),
    this.WxValidate = app.wxValidate(
      {
        address: {
          required: false,
          minlength: 0,
          maxlength: 255,
        },
        tel: {
          required: true,
          tel: true,
        }
      }
     , {
       tel: {
          required: '有效的手机号码',
        }
      }
    )
  },

  startTap: function () {
    this.datetimePicker.setPicker('startDate');
  },

  addressInput:function(e){
    this.setData({
      address: e.detail.value
    })
  },

  telInput: function (e) {
    this.setData({
      tel: e.detail.value
    })
  },

  // 选择工种
  bindPickerChange: function (e) {
    let workTypeMoney = this.data.workTypeArray[e.detail.value].workTypeMoney
    this.setData({
      workType: this.data.workTypeArray[e.detail.value].typeName,
      typeMoney: this.data.workTypeArray[e.detail.value].typeMoney
    })
  },
  // 点击所在地区弹出选择框
  selectDistrict: function () {
    var that = this
    wx.chooseLocation({
      type: 'gcj02',
      success: res => {
        this.setData({
          chooseAres: res.name,
          chooseAddress:res.address
        })
      }
    })
  },
  btnNextStup:function(e){
    let formId = e.detail.formId
    formId = '666666666666666666666'
    app.dealFormIds(formId)
    if (typeof (this.data.startDate) == 'undefined'){
      wx.showToast({
        title: '请填写服务日期',
        image: '/images/error.png',
        duration: 2000
      })
      return false;
    }
    if (typeof (this.data.workType) == 'undefined'){
      wx.showToast({
        title: '请填写服务方式',
        image: '/images/error.png',
        duration: 2000
      })
      return false;
    }
    if (typeof (this.data.chooseAres) == 'undefined'){
      wx.showToast({
        title: '请填写服务地点',
        image: '/images/error.png',
        duration: 2000
      })
      return false;
    }
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
      url: app.globalData.host + '/employer/release',
      data: this.data,
      method: 'POST',
      success: res => {
        wx.navigateTo({
          url: '../employer/confirm?id='+res.data.id
        })
      } 
    })
  }
})