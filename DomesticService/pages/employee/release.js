var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openId: wx.getStorageSync('userInfo').openId,
    countryCodes: ["+86", "+80", "+84", "+87"],
    countryCodeIndex: 0,
    regionTextArray: [
      [
        {
          id: 0,
          name: '市中区'
        },
        {
          id: 1,
          name: '历下区'
        },
        {
          id: 2,
          name: '历城区'
        },
        {
          id: 3,
          name: '槐荫区'
        },
        {
          id: 4,
          name: '天桥区'
        },
        {
          id: 5,
          name: '高新区'
        },
        {
          id: 6,
          name: '长清区'
        },
        {
          id: 7,
          name: '章丘区'
        }
      ], [
        {
          id: 0,
          name: '市中区'
        },
        {
          id: 1,
          name: '历下区'
        },
        {
          id: 2,
          name: '历城区'
        },
        {
          id: 3,
          name: '槐荫区'
        },
        {
          id: 4,
          name: '天桥区'
        },
        {
          id: 5,
          name: '高新区'
        },
        {
          id: 6,
          name: '长清区'
        },
        {
          id: 7,
          name: '章丘区'
        }
      ],[
        {
          id: 0,
          name: '市中区'
        },
        {
          id: 1,
          name: '历下区'
        },
        {
          id: 2,
          name: '历城区'
        },
        {
          id: 3,
          name: '槐荫区'
        },
        {
          id: 4,
          name: '天桥区'
        },
        {
          id: 5,
          name: '高新区'
        },
        {
          id: 6,
          name: '长清区'
        },
        {
          id: 7,
          name: '章丘区'
        }
      ]
    ],
    regionId:'0,1,2',
    regionValue: [0,1,2],
    regionText: '市中区,历下区,历城区',
    startTime: '9:00',
    endTime: '12:00',
  },

  bindMultiPickerChange: function (e) {
    console.log(this.data.regionTextArray[0][e.detail.value[0]].name)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      regionId: e.detail.value[0] + "," + e.detail.value[1] + "," + e.detail.value[2],
      regionValue: e.detail.value,
      regionText: this.data.regionTextArray[0][e.detail.value[0]].name + "," + this.data.regionTextArray[1][e.detail.value[1]].name + "," + this.data.regionTextArray[2][e.detail.value[2]].name
    })
  },

  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      regionTextArray: this.data.regionTextArray,
      regionValue: this.data.regionValue
    };
    data.regionValue[e.detail.column] = e.detail.value;
    this.setData(data);
  },

  bindSTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      startTime: e.detail.value
    })
  },

  bindETimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endTime: e.detail.value
    })
  },

  btnNextStup: function (e) {
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
      url: app.globalData.host + '/employee/release',
      data: this.data,
      method: 'POST',
      success: res => {
        console.log(res)
        wx.navigateTo({
          url: '../employee/confirm?id=' + res.data.id
        })
      }
    })
  },

  telInput: function (e) {
    this.setData({
      tel: e.detail.value
    })
  },

  remarksInput:function(e){
    this.setData({
      remarks: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.WxValidate = app.wxValidate(
      {
        tel: {
          required: true,
          tel: true,
        },
        remarks:{
          required: false,
          maxlength:100
        }
      }
      , {
        tel: {
          required: '有效的手机号码'
        },
        remarks: {
          required: '备注超出长度'
        }
      }
    )
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