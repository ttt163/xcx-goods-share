// pages/create_page3/index.js
import { foodsType, foodsNames, imgPath } from '../../utils/util.js'
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    'imgPath': imgPath,
    'isValidated': false,
    'msg': '请选择我的大餐菜品！',
    navData: foodsType,
    currAddFoodsName: '',
    _foodsNames: null,
    currFoorType: 'huncai',
    currfoodsNames: foodsNames['huncai'],
  },
  // 选择分类
  choseFoodsType: function (event) {
    let datas = event.currentTarget.dataset
    this.setData({ 'currFoorType': datas.type, 'currfoodsNames': this.data._foodsNames[datas.type] })
  },
  // 表单输入事件
  addFoodsName: function (e) {
    this.setData({ 'currAddFoodsName': e.detail.value })
  },
  // 删除食物
  delFood: function (event) {
    let datas = event.currentTarget.dataset
    let index = datas.index
    let _thisTypeFoods = this.data._foodsNames[this.data.currFoorType] //当前分类下的菜名

    _thisTypeFoods = [
      ..._thisTypeFoods.slice(0, index),
      ..._thisTypeFoods.slice(index + 1)
    ]
    let edfoodsNames = {
      ...this.data._foodsNames,
      [this.data.currFoorType]: _thisTypeFoods
    }
    this.setData({
      '_foodsNames': edfoodsNames,
      'currfoodsNames': _thisTypeFoods
    })
    // 判断是否有选中的菜品
    let flag = this.isChosed(edfoodsNames)
    if (!flag) {
      this.setData({
        'isValidated': false
      })
    }
    app.globalData.page3Foods = edfoodsNames
  },
  // 添加食物
  addFood: function (event) {
    let foodsName = this.data.currAddFoodsName //添加菜品名称
    let _thisTypeFoods = this.data._foodsNames[this.data.currFoorType] //当前分类下的菜名
    // 判断新增菜品是否已经存在当前分类下
    let eIndex = _thisTypeFoods.findIndex(function (item, index, arr) {
      return item.name == foodsName;
    })
    if (eIndex != -1) {
      // alert('您添加的菜名已存在！');
      wx.showToast({
        title: '您添加的菜名已存在！',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    // 不存在，添加到列表中
    _thisTypeFoods = [
      ..._thisTypeFoods,
      {
        'name': foodsName,
        'add': true,
        'select': true
      }
    ]
    let edfoodsNames = {
      ...this.data._foodsNames,
      [this.data.currFoorType]: _thisTypeFoods
    }
    this.setData({
      'isValidated': true,
      '_foodsNames': edfoodsNames,
      'currfoodsNames': _thisTypeFoods,
      'currAddFoodsName': ''
    })
    app.globalData.page3Foods = edfoodsNames
  },
  // 选中食物
  choseFood: function (event) {
    let datas = event.currentTarget.dataset
    let index = datas.index
    let item = datas.item
    let _thisTypeFoods = this.data._foodsNames[this.data.currFoorType]
    if (!item.select) {
      // 未选择
      item = {
        ...item,
        select: true
      }
      this.setData({
        'isValidated': true
      })

    } else {
      // 已选择，取消
      item = {
        ...item,
        select: false
      }
    }
    _thisTypeFoods = [
      ..._thisTypeFoods.slice(0, index),
      item,
      ..._thisTypeFoods.slice(index + 1)
    ]
    let edfoodsNames = {
      ...this.data._foodsNames,
      [this.data.currFoorType]: _thisTypeFoods
    }
    if (!item.select) {
      // 判断是否有选中的菜品
      let flag = this.isChosed(edfoodsNames)
      if (!flag) {
        this.setData({
          'isValidated': false
        })
      }
    }
    this.setData({
      '_foodsNames': edfoodsNames,
      'currfoodsNames': _thisTypeFoods
    })
    app.globalData.page3Foods = edfoodsNames
  },
  isChosed: function (obj) {
    let falg = false;
    for (let [key, item] of Object.entries(obj)){
      if (falg) {
        break
      }
      for (let i = 0; i < item.length; i++) {
        if (item[i].select) {
          falg = true
          break
        }
      }
    }
    return falg
  },
  onLoad: function () {
    if (!app.globalData.page3Foods) {
      this.setData({ _foodsNames: foodsNames})
    } else {
      this.setData({ _foodsNames: app.globalData.page3Foods, currfoodsNames: app.globalData.page3Foods[this.data.currFoorType], })
      let flag = this.isChosed(app.globalData.page3Foods)
      if (flag) {
        this.setData({
          'isValidated': true
        })
      }
    }
  }
})