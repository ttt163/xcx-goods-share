// pages/create_page5/index.js
import { gradeType, imgPath } from '../../utils/util.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userKey: '',
    imgType:'',
    userName: '',
    grades: '',
    percent: ''
  },

  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      // console.log(res.target)
    }
    let globalData = app.globalData
    // console.log(Math.floor(this.data.percent))
    return {
      title: `我不是针对谁，我的大餐丰盛度超过了${Math.floor(this.data.percent)}%的网友，快来膜拜吧！`,
      path: `pages/browse_page1/index?userKey=${globalData.userKey}`,
      imageUrl: `${imgPath}/foods/${this.data.imgType}.png`,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  testShare: function () {
    let globalData = app.globalData
    wx.redirectTo({
      url: `../browse_page1/index?userKey=B206835524395879`
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let globalData= app.globalData
    // console.log(globalData)
    this.setData({
      userKey: globalData.userKey,
      userName: globalData.userInfo.nickName,
      imgType: globalData.page5Ifo.level,
      grades: gradeType[Math.floor(globalData.page5Ifo.grade)],
      percent: globalData.page5Ifo.percent
    })
  }
})