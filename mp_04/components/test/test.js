// components/test/test.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    // 第一种方法：简化的方式
    // max: Number
    // 第二种方法：完整的定义方式
    max: {
      type: Number,
      value: 10,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    count: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    addCount(){
      this.setData({
        count:this.data.count + 1
      })

      this._showCount()
    },
    _showCount(){
      wx.showToast({
        title:'count是' + this.data.count,
        icon:'none'
      })
    }
  }
})