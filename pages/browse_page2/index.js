// pages/browse_page2/index.js
import { url } from '../../utils/util.js'
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: '',
    cd: []
  },
  onLoad: function (options) {
    let browseData = app.globalData.browseData
    let dishesArr = browseData.lk_dishes.split(',')
    if (dishesArr.length > 10) {
      dishesArr = dishesArr.slice(0, 10)
    }
    this.setData({
      imgUrl: url+browseData.lk_pic,
      cd: dishesArr
    })
  }
})