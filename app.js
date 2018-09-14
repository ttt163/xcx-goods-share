//app.js
App({
  // onLaunch: function () {
  //   // 登录
  //   let self = this
  //   wx.login({
  //     success: res => {
  //       // 发送 res.code 到后台换取 openId, sessionKey, unionId
  //       console.log(res)
  //       // 获取用户信息
  //       wx.getSetting({
  //         success: res => {
  //           if (res.authSetting['scope.userInfo']) {
  //             // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
  //             console.log('获取信息成功')
  //             wx.getUserInfo({
  //               success: res => {
  //                 // console.log(res)
  //                 // 可以将 res 发送给后台解码出 unionId
  //                 self.globalData.userInfo = res.userInfo

  //                 // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //                 // 所以此处加入 callback 以防止这种情况
  //                 if (self.userInfoReadyCallback) {
  //                   self.userInfoReadyCallback(res)
  //                 }
  //               }
  //             })
  //           } else {
  //             console.log('获取信息失败')
  //             wx.authorize({
  //               scope: 'scope.userInfo',
  //               success() {
  //                 console.log('允许授权')
                 
  //               },
  //               fail: function (res) {
  //                 console.log('拒绝授权')
  //                 wx.showModal({
  //                   title: '警告',
  //                   content: '小程序需要允许获取用户信息，确定将继续设置，取消将退出',
  //                   success: function (res) {
  //                     if (res.confirm) {
  //                       console.log('确定')
  //                       wx.openSetting({
  //                         success: function (res) {
  //                           console.log(res)
  //                           if (!res.authSetting["scope.userInfo"]) {
  //                             //这里是授权成功之后 填写你重新获取数据的js
  //                             //参考:

  //                           }
  //                         }
  //                       })
  //                     } else if (res.cancel) {
  //                       console.log('取消')
  //                       wx.navigateBack()
  //                     }
  //                   }
  //                 })
  //               }
  //             })
  //           }
  //         }
  //       })
  //     }
  //   })
  // },
  setAppDatas: function (obj) {
    // console.log(obj)
    let appData = this.globalData
    // console.log(appData)
    this.setData({...appData, ...obj})
  },
  clearData: function() {
    let clearData = {
      browseData: null, // 查看信息
      userKey: '', //记录唯一标识
      bigTitle: '', // 首页大标题
      page2Img: null, // page2上传图片
      page3Foods: null, //page3选择的菜品
      page4Ifo: {
        img: null, //page4上传的图片
        labels: [] //选择的标签
      },
      page5Ifo: {
        percent: '',
        level: '',
        grade: '',
      }
    }
    // console.log(this.globalData)
    this.globalData = {
      ...this.globalData,
      ...clearData
    }
  },
  globalData: {
    browseData: null, // 查看信息
    userKey: '', //记录唯一标识
    userInfo: null,
    bigTitle: '', // 首页大标题
    page2Img: null, // page2上传图片
    page3Foods: null, //page3选择的菜品
    page4Ifo: {
      img: null, //page4上传的图片
      labels: [] //选择的标签
    },
    page5Ifo: {
      percent: '',
      level: '',
      grade: '',
    }
  }
})