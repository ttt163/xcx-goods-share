// pages/browse_page4/index.js
import { url } from '../../utils/util.js'
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: '',
    labels: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let browseData = app.globalData.browseData
    this.setData({
      imgUrl: url + browseData.lk_specialty,
      labels: browseData.lk_label.split(',')
    })
  }
})