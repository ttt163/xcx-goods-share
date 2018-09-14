// pages/create_page2/index.js
import { changePage, url, imgPath } from '../../utils/util.js'
let cpage = null
const app = getApp()

Page({
  data: {
    'userKey': '',
    'imgPath': imgPath,
    'img': '',
    'isValidated': false,
    'msg': '请上传今日大餐！'
  },
  uploadImg: function () {
    let self = this
    let globalData = app.globalData
    let formData = {
      'lk_user_portrait': globalData.userInfo.avatarUrl, // 用户头像地址
      'lk_user_name': globalData.userInfo.nickName, // 用户昵称
    }
    // console.log(this.data.userKey)
    if (!this.data.userKey) {
      if (!app.globalData.userKey) {
        formData = formData
      } else {
        formData = {
          ...formData,
          'lk_key': app.globalData.userKey
        }
      }
    } else {
      formData = {
        ...formData,
        'lk_key': this.data.userKey
      }
    }
    // console.log(formData)
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths
        // self.setData({ 'img': tempFilePaths[0], 'isValidated': true })
        // globalData.page2Img = { 'files': res.tempFiles[0], 'path': tempFilePaths[0] }
        wx.uploadFile({
          url: url+'/add_food', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'lk_pic',
          formData: formData,
          success: function (_data) {
            // console.log(_data)
            let data = JSON.parse(_data.data)
            //do something
            if (data.code == 200) {
              self.setData({ 'img': tempFilePaths[0], 'isValidated': true, 'userKey': data.data})
              globalData.page2Img = { 'files': res.tempFiles[0], 'path': tempFilePaths[0] }
              globalData.userKey = data.data
            }
          },
          fail: function (error) {
            // console.log(error)
            // wx.showToast({
            //   title: JSON.stringify(res),
            //   icon: 'none',
            //   duration: 5000
            // })
          }
        })

      },
      fail: function (res) {
        // wx.showToast({
        //   title: '选择文件失败',
        //   icon: 'none',
        //   duration: 5000
        // })
      }
    })
  },
  onLoad: function () {
    if (!app.globalData.page2Img) {
      return
    }
    this.setData({ 'img': app.globalData.page2Img.path, 'isValidated': true })
  },
  onShow: function () {
    cpage = new changePage()
  },
  touchStart: function (e) {
    cpage.touchStart(e)
  },
  touchEnd: function (e) {
    cpage.touchEnd(e, '../create_page3/index')
  }
})