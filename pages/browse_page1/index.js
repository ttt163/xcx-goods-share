// pages/browse_page1/index.js
import { url, imgPath } from '../../utils/util.js'
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    'userImg': '',
    'title': '',
    'userName': '',
    'imgPath': imgPath
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    if (!options.userKey) {
      return
    }
    let data = {
      lk_key: options.userKey
    }
    let self = this
    wx.request({
      url: url + '/see_food',
      data: data,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        // console.log(res.data)
        let globalData = app.globalData
        if (res.data.code === 200) {
          let resData = res.data.data
          globalData.browseData = resData
          self.setData({
            'title': resData.lk_title,
            'userName': resData.lk_user_name,
            'userImg': resData.lk_user_portrait,
          })
        }
      }
    })
  }
})