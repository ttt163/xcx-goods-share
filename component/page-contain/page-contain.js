// component/page-contain/page-contain.js
import { changePage } from '../../utils/util.js'
let cpage = new changePage()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    nextUrl: {
      type: String,
      value: '',
    },
    isValidated: {
      type: Boolean,
      value: true,
    },
    msg: {
      type: String,
      value: '',
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    touchStart: function (e) {
      // console.log('滑动开始')
      cpage.touchStart(e)
    },
    touchEnd: function (e) {
      cpage.touchEnd(e, this.properties.nextUrl, { isValidated: this.properties.isValidated, msg: this.properties.msg})
    },
  }
})
