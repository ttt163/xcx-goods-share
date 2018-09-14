//index.js
import { randomNum, titleArr, imgPath } from '../../utils/util.js'
//获取应用实例
const app = getApp()
Page({
  data: {
    'title': [],
    'imgPath': imgPath,
    'msg': '请允许获取用户信息',
    'isValidated': false
  },
  onLoad: function () {
    if (!app.globalData.userInfo) {
      // 用户登录，授权，获取用户信息
      let self = this
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          // 获取用户信息
          wx.getSetting({
            success: res => {
              if (!res.authSetting['scope.userInfo']) {
                // 没有授权，开始授权
                wx.authorize({
                  scope: 'scope.userInfo',
                  success() {
                    // 允许授权，获取用户信息
                    self.getUserInfos()
                  },
                  fail: function (res) {
                    // 拒绝授权，弹窗提示
                    wx.showModal({
                      title: '警告',
                      content: '小程序需要允许获取用户信息，确定将继续设置，取消将退出',
                      success: function (res) {
                        if (res.confirm) {
                          // 确定开启用户信息设置
                          wx.openSetting({
                            success: function (res) {
                              console.log(res)
                              if (!res.authSetting["scope.userInfo"]) {
                                //没有开启授权
                                // 退出
                                self.setData({'isValidated': false})
                                wx.navigateBack()
                              } else {
                                //开启授权, 获取用户信息
                                self.getUserInfos()
                              }
                            }
                          })
                        } else if (res.cancel) {
                          self.setData({ 'isValidated': false })
                          wx.navigateBack()
                        }
                      }
                    })
                  }
                })
              } else {
                // 已经授权
                self.getUserInfos()
              }
            }
          })
        }
      })

    } else {
      this.setData({
        userInfo: app.globalData.userInfo,
        isValidated: true
      })
    }
  },
  getUserInfos: function () {
    let self = this
    wx.getUserInfo({
      success: res => {
        // 可以将 res 发送给后台解码出 unionId
        app.globalData.userInfo = res.userInfo
        self.setData({ 'isValidated': true})
      }
    })
  },
  onShow: function () {
    app.clearData()
    let title = titleArr[randomNum(titleArr.length)]
    this.setData({
      'title': title
    })
    app.globalData.bigTitle = title
  }
})
