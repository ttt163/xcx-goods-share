// component/share/component-share.js
import { url } from '../../utils/util.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgType: {
      type: String,
      value: 'manhanquanxi',
    },
    userName: {
      type: String,
      value: '王春花',
    },
    grades: {
      type: String,
      value: 'SSS',
    },
    percent: {
      type: String,
      value: '99.99',
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    foosImg: '',
    textImg: ''
  },
  ready: function () {
    this.setData({
      foosImg: `${url}/image/foods/${this.properties.imgType}.png`,
      textImg: `../../img/pf-font/${this.properties.imgType}.png`
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
