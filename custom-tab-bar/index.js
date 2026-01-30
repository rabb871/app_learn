// custom-tab-bar/index.js
Component({
  options: {
    styleIsolation:'shared'
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    active:0,
    "list": [{
      "pagePath": "/pages/home/home",
      "text": "首页",
      "iconPath": "/images/tab_icons/home.png",
      "selectedIconPath": "/images/tab_icons/home_active.png"
    },
    {
      "pagePath": "/pages/list/list",
      "text": "信息",
      "iconPath": "/images/tab_icons/cate.png",
      "selectedIconPath": "/images/tab_icons/cate_active.png",
      info: 2
    },
    {
      "pagePath": "/pages/day_02/day_02",
      "text": "提示",
      "iconPath": "/images/tab_icons/my.png",
      "selectedIconPath": "/images/tab_icons/my_active.png"
    }
  ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(event) {
      // event.detail 的值为当前选中项的索引
      this.setData({ active: event.detail });
      wx.switchTab({
        url: this.data.list[event.detail].pagePath,
      })
    },
  }
})