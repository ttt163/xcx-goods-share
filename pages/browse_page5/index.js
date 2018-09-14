// pages/browse_page5/index.js
import { url, gradeType } from '../../utils/util.js'
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgType: '',
    userName: '',
    grades: '',
    percent: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let browseData = app.globalData.browseData
    this.setData({
      userName: browseData.lk_user_name,
      imgType: browseData.lk_type,
      grades: gradeType[Math.floor(browseData.lk_grade)],
      percent: browseData.lk_cent
    })
  }
})