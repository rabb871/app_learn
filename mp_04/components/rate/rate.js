// components/rate/rate.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    value: {
      type: Number,
      value: 0
    },
    max: {
      type: Number,
      value: 5
    },
    readonly: {
      type: Boolean,
      value: false
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
    onStarTap(e) {
      if (this.properties.readonly) return;
      const index = e.currentTarget.dataset.index;
      this.triggerEvent("change", { value: index + 1 });
    }
  }
})