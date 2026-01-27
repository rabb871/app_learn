// components/tab-bar/tab-bar.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    active: {
      type: String,
      value: 'home'
    },
    tabs: {
      type: Array,
      value: [
        { key: 'home', text: '首页' },
        { key: 'message', text: '消息' },
        { key: 'contact', text: '联系我们' }
      ]
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
    onTabClick(e) {
      const key = e.currentTarget.dataset.key;
      this.triggerEvent('tabChange', { tab: key });
    }
  }
})