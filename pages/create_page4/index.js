// pages/create_page4/index.js
import { labelText, labelColor, randomNum, url, getChoseGreens, imgPath } from '../../utils/util.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    'imgPath': imgPath,
    'img': '', // 图片url
    'imgFiles': null, // 图片文件
    _labelText: [], // 随机12个标签
    choseLabels: [], // 已选择的标签
    'isValidated': false,
    'msg': '请上传招牌菜并且选择标签！'
  },
  uploadImg: function () {
    // console.log('上传文件')
    let self = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        // console.log(res)
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: url + '/add_food', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'lk_specialty',
          formData: {
            'lk_key': app.globalData.userKey
          },
          success: function (_data) {
            let data = _data.data
            self.setData({ 'img': tempFilePaths[0], 'imgFiles': res.tempFiles[0] })
            app.globalData.page4Ifo = { ...app.globalData.page4Ifo, 'img': { 'files': res.tempFiles[0], 'path': tempFilePaths[0] } }
            if (!self.data.choseLabels.length) {
              self.setData({ 'isValidated': false})
            } else {
              self.setData({ 'isValidated': true })
            }
          }
        })
      }
    })
  },
  // 随机12个标签
  getLabels: function () {
    let data = []
    for (let i = 0; data.length < 12; i++) {
      let r = randomNum(labelText.length)
      let text = labelText[r]
      let index = data.indexOf(text)
      if (index === -1) {
        // 随机没被添加过的labels
        data.push(text)
      }
    }
    // console.log(data)
    return data
  },
  // 换一组
  changeLabels: function () {
    this.setData({
      _labelText: this.getLabels()
    })
  },
  // 选择标签
  choseLabelsFn: function (e) {
    let data = e.currentTarget.dataset
    let _choseLabels = this.data.choseLabels
    let i = _choseLabels.indexOf(data.item)
    if (i === -1) {
      // 未选择
      if (_choseLabels.length >= 4) {
        wx.showToast({
          title: '您已经选了4个标签！',
          icon: 'none',
          duration: 2000
        })
        return
      }
      _choseLabels.push(data.item)
    } else {
      // 已选择，取消
      _choseLabels = [
        ..._choseLabels.slice(0, i),
        ..._choseLabels.slice(i + 1)
      ]
    }
    this.setData({ 'choseLabels': _choseLabels })
    app.globalData.page4Ifo = { ...app.globalData.page4Ifo, 'labels': _choseLabels }
    if (!this.data.choseLabels.length || !this.data.img) {
      this.setData({ 'isValidated': false })
    } else {
      this.setData({ 'isValidated': true })
    }
  },

  // 删除已选择标签
  delLabels: function (e) {
    let data = e.currentTarget.dataset
    let _choseLabels = this.data.choseLabels
    let i = data.index
    _choseLabels = [
      ..._choseLabels.slice(0, i),
      ..._choseLabels.slice(i + 1)
    ]
    this.setData({ 'choseLabels': _choseLabels })
    app.globalData.page4Ifo = { ...app.globalData.page4Ifo, 'labels': _choseLabels }
    if (!this.data.choseLabels.length || !this.data.img) {
      this.setData({ 'isValidated': false })
    } else {
      this.setData({ 'isValidated': true })
    }
  },

  // 开始评定
  evaluate: function (e) {
    let globalData = app.globalData
    // console.log(globalData)
    let page3Foods = globalData.page3Foods
    let greensData = getChoseGreens(page3Foods)
    // console.log(greensData)
    app.globalData.page5Ifo = { ...app.globalData.page5Ifo, 'grade': greensData.avgGrade, 'level': greensData.levelType}
    let data = {
      'lk_key': globalData.userKey, // 
      'lk_title': globalData.bigTitle, // 文字标题
      'lk_dishes': greensData.choseArr.join(','), // 菜名
      'lk_grade': greensData.avgGrade, // 评级
      'lk_type': greensData.levelType, // 成就类型
      // 'lk_pic': globalData.page2Img.files,
      'lk_label': globalData.page4Ifo.labels.join(','), // 招牌菜标签
      // 'lk_specialty': page4Ifo.img.files // 招牌菜图片
    }
    // console.log(data)
    let self = this
    wx.request({
      url: url +'/up_food',
      data: data,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        // console.log(res.data)
        if (res.data.code === 200) {
          app.globalData.page5Ifo = { ...app.globalData.page5Ifo, 'percent': res.data.data }
          if (!self.data.isValidated) {
            wx.showToast({
              title: self.data.msg,
              icon: 'none',
              duration: 2000
            })
            return
          }
          // wx.navigateTo({ url: '../create_page5/index' })
          wx.reLaunch({ url: '../create_page5/index' })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let texts = this.getLabels()
    let choseLabels = []
    let apppage4Ifo = app.globalData.page4Ifo
    let r = randomNum(texts.length)
    let imgPath = ''
    let imgFile = null
    let isValidated = false
    if (!apppage4Ifo.labels.length) {
      choseLabels.push(texts[r])
    } else {
      choseLabels = apppage4Ifo.labels
    }
    if (!apppage4Ifo.img) {
      imgPath = ''
      imgFile = null
    } else {
      imgPath = apppage4Ifo.img.path
      imgFile = apppage4Ifo.img.files
    }
    
    if (!choseLabels.length || !imgPath) {
      isValidated = false
    } else {
      isValidated = true
    }
    // console.log({
    //   _labelText: texts,
    //   choseLabels: choseLabels,
    //   isValidated: isValidated,
    //   img: imgPath,
    //   imgFiles: imgFile
    // })
    this.setData({
      _labelText: texts,
      choseLabels: choseLabels,
      isValidated: isValidated,
      img: imgPath,
      imgFiles: imgFile
    })
  }
})