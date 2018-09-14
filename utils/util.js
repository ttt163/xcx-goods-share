const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// let url = 'https://dev-mydinner.8864.com'
let url = 'https://mydinner.8864.com'
let imgPath = `${url}/image`

// 食物类型
const foodsType = {
  'huncai': '荤菜',
  'sucai': '素菜',
  'tangzhou': '汤粥',
  'zhushi': '主食',
  'yinpin': '饮品',
  'xiaochi': '小吃'
}

// 菜名
const foodsNames = {
  'huncai': [
    {
      'name': '糖醋排骨',
      'add': false,
      'select': false
    },
    {
      'name': '红烧肉',
      'add': false,
      'select': false
    },
    {
      'name': '水煮鱼',
      'add': false,
      'select': false
    },
    {
      'name': '红焖大虾',
      'add': false,
      'select': false
    },
    {
      'name': '粉蒸肉',
      'add': false,
      'select': false
    },
    {
      'name': '盐水鸭',
      'add': false,
      'select': false
    },
    {
      'name': '炸猪排',
      'add': false,
      'select': false
    },
    {
      'name': '可乐鸡翅',
      'add': false,
      'select': false
    },
    {
      'name': '剁椒鱼头',
      'add': false,
      'select': false
    }
  ],
  'sucai': [
    {
      'name': '大丰收',
      'add': false,
      'select': false
    },
    {
      'name': '松仁玉米',
      'add': false,
      'select': false
    },
    {
      'name': '地三鲜',
      'add': false,
      'select': false
    },
    {
      'name': '清炒时蔬',
      'add': false,
      'select': false
    },
    {
      'name': '家常豆腐',
      'add': false,
      'select': false
    },
    {
      'name': '凉拌三丝',
      'add': false,
      'select': false
    },
    {
      'name': '皮蛋豆腐',
      'add': false,
      'select': false
    },
    {
      'name': '凉拌黄瓜',
      'add': false,
      'select': false
    },
    {
      'name': '老醋花生',
      'add': false,
      'select': false
    }
  ],
  'tangzhou': [
    {
      'name': '紫菜蛋花汤',
      'add': false,
      'select': false
    },
    {
      'name': '番茄鸡蛋汤',
      'add': false,
      'select': false
    },
    {
      'name': '菌菇汤',
      'add': false,
      'select': false
    },
    {
      'name': '八宝粥',
      'add': false,
      'select': false
    },
    {
      'name': '棒渣粥',
      'add': false,
      'select': false
    },
    {
      'name': '小米粥',
      'add': false,
      'select': false
    },
    {
      'name': '大米粥',
      'add': false,
      'select': false
    },
    {
      'name': '酒酿圆子',
      'add': false,
      'select': false
    }
  ],
  'zhushi': [
    {
      'name': '八宝饭',
      'add': false,
      'select': false
    },
    {
      'name': '米饭',
      'add': false,
      'select': false
    },
    {
      'name': '馒头',
      'add': false,
      'select': false
    },
    {
      'name': '花卷',
      'add': false,
      'select': false
    },
    {
      'name': '饺子',
      'add': false,
      'select': false
    },
    {
      'name': '汤面',
      'add': false,
      'select': false
    },
    {
      'name': '馄饨',
      'add': false,
      'select': false
    },
    {
      'name': '汤圆',
      'add': false,
      'select': false
    },
    {
      'name': '葱油饼',
      'add': false,
      'select': false
    }
  ],
  'yinpin': [
    {
      'name': '白酒',
      'add': false,
      'select': false
    },
    {
      'name': '啤酒',
      'add': false,
      'select': false
    },
    {
      'name': '葡萄酒',
      'add': false,
      'select': false
    },
    {
      'name': '黄酒',
      'add': false,
      'select': false
    },
    {
      'name': '奶酒',
      'add': false,
      'select': false
    },
    {
      'name': '米酒',
      'add': false,
      'select': false
    },
    {
      'name': '可乐',
      'add': false,
      'select': false
    },
    {
      'name': '杏仁露',
      'add': false,
      'select': false
    },
    {
      'name': '椰汁',
      'add': false,
      'select': false
    },
    {
      'name': '冰红茶',
      'add': false,
      'select': false
    }
  ],
  'xiaochi': [
    {
      'name': '年糕',
      'add': false,
      'select': false
    },
    {
      'name': '炸排叉',
      'add': false,
      'select': false
    },
    {
      'name': '春卷',
      'add': false,
      'select': false
    },
    {
      'name': '麻团',
      'add': false,
      'select': false
    },
    {
      'name': '糍粑',
      'add': false,
      'select': false
    },
    {
      'name': '水果拼盘',
      'add': false,
      'select': false
    },
    {
      'name': '蛋糕',
      'add': false,
      'select': false
    },
    {
      'name': '蛋挞',
      'add': false,
      'select': false
    }
  ],
}
// const foodsNames = {
//   'huncai': [
//     '糖醋排骨', '红烧肉', '水煮鱼', '红焖大虾', '粉蒸肉', '盐水鸭', '炸猪排', '可乐鸡翅', '剁椒鱼头'
//   ],
//   'sucai': [
//     '大丰收', '松仁玉米', '地三鲜', '清炒时蔬', '家常豆腐', '凉拌三丝', '皮蛋豆腐', '凉拌黄瓜', '老醋花生'
//   ],
//   'tangzhou': [
//     '紫菜蛋花汤', '番茄鸡蛋汤', '菌菇汤', '八宝粥', '棒渣粥', '小米粥', '大米粥', '酒酿圆子'
//   ],
//   'zhushi': [
//     '八宝饭', '米饭', '馒头', '花卷', '饺子', '汤面', '馄饨', '汤圆', '葱油饼'
//   ],
//   'yinpin': [
//     '白酒', '啤酒', '葡萄酒', '黄酒', '奶酒', '米酒', '可乐', '杏仁露', '椰汁', '冰红茶'
//   ],
//   'xiaochi': [
//     '年糕', '炸排叉', '春卷', '麻团', '糍粑', '水果拼盘', '蛋糕', '蛋挞'
//   ]
// }

// 招牌菜标签
const labelText = [
  '下饭担当', '家的味道', '666', '量大管饱', '再来一碗', '辣的飞起', '美容养颜', '不可多得', '秀色可餐', '入口即化',
  '汤汁浓郁', '营养均衡', '香甜软糯', '清脆爽口', '老给力了', '强烈推荐', '压轴硬菜', '软嫩鲜香', '极致刀工', '火力全开',
  '疯狂打call', '香飘十里', '香而不腻', '香脆可口', '鲜美多汁', '口齿留香', '色味俱佳', '瞬间爆炸', '王的奥义', '岂不美哉', '仰望星空',
  'yoooooo', '豪华午餐', '加碗米饭', '猴赛雷', '就是这个味', '妈妈的味道', '外酥内软', '老少皆宜', '营养丰富', '鲜美开胃', '甜香清淡', '烹调考究'
]

// 分数等级
const gradeType = {
  '0': 'B',
  '1': 'B+',
  '2': 'A',
  '3': 'A+',
  '4': 'S',
  '5': 'SS',
  '6': 'SSS'
}

// 成就对应图片名
const levelImg = {
  'huncai': 'wuroubuhuan',
  'sucai': 'sushizhuyi',
  'tangzhou': 'tangyuzhouzhige',
  'zhushi': 'yibenmanzu',
  'yinpin': 'yinzhonghaojie',
  'xiaochi': 'qingshidaren',
  's': 'meiweijiayao',
  'ss': 'shanzhenhaiwei',
  'sss': 'manhanquanxi'
}

// 数量获取对应分值
const getGradeByNum = (_type, _num) => {
  let grade = 0
  let level = ''
  if (_type === 'huncai' || _type === 'sucai') {
    //0~10个
    if (_num < 4) {
      grade = _num
    } else if (_num < 6) {
      grade = 4
    } else if (_num < 9) {
      grade = 5
    } else if (_num > 8) {
      grade = 6
    }
  } else if (_type === 'tangzhou' || _type === 'zhushi' || _type === 'xiaochi') {
    // 0~7个
    if (_num < 1) {
      grade = 0
    } else if (_num < 4) {
      grade = _num + 1
    } else if (_num < 6) {
      grade = 5
    } else if (_num > 5) {
      grade = 6
    }
  } else if (_type === 'yinpin') {
    // 0~8个
    if (_num < 1) {
      grade = 0
    } else if (_num < 4) {
      grade = _num + 1
    } else if (_num < 6) {
      grade = 5
    } else if (_num > 5) {
      grade = 6
    }
  }
  level = gradeType[grade]
  return {
    grade: grade,
    level: level
  }
}

// 获取select=ture的数据
const getChoseGreens = (obj) => {
  let arr = []
  let choseObj = null
  let gradeTotal = 0
  let maxGrade = 0
  let gradeObj = { type: '', 'grade': 0 }
  for (let [key, item] of Object.entries(obj)) {
    let keyItem = []
    for (let i = 0; i < item.length; i++) {
      if (item[i].select) {
        arr.push(item[i].name)
        keyItem.push(item[i].name)
      }
    }
    choseObj = { ...choseObj, [key]: keyItem }
    let thisGrades = getGradeByNum(key, keyItem.length).grade
    gradeTotal = gradeTotal + thisGrades
    if (thisGrades > maxGrade) {
      maxGrade = thisGrades
      gradeObj = { ...gradeObj, type: key, 'grade': thisGrades }
    }
  }
  let avgGrade = Number(gradeTotal / Object.keys(foodsType).length).toFixed(5)
  let levelType = ''
  if (avgGrade >= 4) {
    if (avgGrade < 5) {
      levelType = levelImg['s']
    } else if (avgGrade < 6) {
      levelType = levelImg['ss']
    } else {
      levelType = levelImg['sss']
    }

  } else {
    levelType = levelImg[gradeObj.type]
  }
  return {
    choseArr: arr, choseObj: choseObj, levelType: levelType, avgGrade: avgGrade
  }
}

// 首页标题
const titleArr = [
  '唯有美食不可辜负',
  '与美食相濡以沫',
  '唯有美食最相思',
  '美食就像爱情一般无法拒绝',
  '乡愁，就是梦见妈妈做的饭',
  '有吃有喝，就是幸福',
  '我像想念美食那样想念你',
  '人人都是美食家',
  '吃是一件简单而风雅的事',
  '每个吃货心中都有一碗红烧肉',
  '美味即是正义',
  '每逢佳节胖三斤',
  '那些食物是最美的情书',
  '不负美食不负心',
  '在美食中遇到爱',
  '家常美味，也是人生百味',
  '谁不眷恋一茶一饭的温暖',
  '美食从来不说谎',
  '既然生活，就要有滋有味',
  '和美食谈一场恋爱',
  '理直气壮地和食物相处',
  '美食让我们鼓起勇气',
  '致世上最美的滋味'
]


// 标签选中颜色
const labelColor = [
  '#ff3e32',
  '#ff9500',
  '#ff2d55',
  '#ff6d2d'
]

//生成从minNum到maxNum的随机数
const randomNum = (minNum, maxNum) => {
  if (!maxNum) {
    // 0~minNum-1之间的随机数
    return Math.floor(Math.random() * minNum);
  } else if (!minNum) {
    // 0~9之间的随机数
    return Math.floor(Math.random() * 10);
  } else {
    // minNum~maxNum之间的随机数
    return Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
  }
}

// 滑动切换页面
class changePage {
  constructor(props) {
    this.time = 0;
    this.touchDot = 0;//触摸时的原点
    this.interval = "";
    this.flag_hd = true;
  }
  touchStart(e) {
    // clearInterval(this.interval); // 清除setInterval
    // this.time = 0;
    this.clearData()
    this.touchDot = e.touches[0].pageX; // 获取触摸时的原点
    // 使用js计时器记录时间    
    this.interval = setInterval(function () {
      this.time++;
    }, 100);
  }
  // 触摸结束事件
  touchEnd(e, url, isValidatedObj) {
    let touchMove = e.changedTouches[0].pageX;
    // 向左滑动   
    if (touchMove - this.touchDot <= -40 && this.time < 10 && this.flag_hd == true) {
      this.flag_hd = false;
      //执行切换页面的方法
      // wx.navigateBack()
      if (!url) {
        return
      }
      // console.log(isValidatedObj);
      let isValidated = isValidatedObj.isValidated
      if (!isValidated) {
        wx.showToast({
          title: isValidatedObj.msg,
          icon: 'none',
          duration: 2000
        })
        return
      }
      wx.navigateTo({
        url: url
      })
    }
    // 向右滑动   
    if (touchMove - this.touchDot >= 40 && this.time < 10 && this.flag_hd == true) {
      this.flag_hd = false;
      //执行切换页面的方法
      // console.log("向右滑动");
      wx.navigateBack()
      // wx.navigateTo({
      //   url: url
      // })
    }
  }
  clearData() {
    clearInterval(this.interval); // 清除setInterval
    this.time = 0;
    this.flag_hd = true;
    this.touchDot = 0;
  }
}

module.exports = {
  url: url,
  imgPath: imgPath,
  getChoseGreens: getChoseGreens,
  randomNum: randomNum,
  titleArr: titleArr,
  labelText: labelText,
  foodsNames: foodsNames,
  changePage: changePage,
  formatTime: formatTime,
  foodsType: foodsType,
  gradeType: gradeType,
  levelImg: levelImg
}
