import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('m_cart', ['total']),
  },
  watch: {
    total() {
    this.setBadge()
    },
  },
  onShow() {
    this.setBadge()
  },
  methods: {
    setBadge() {
      if (this.total === 0) {
        // 当数量为0时，移除徽标
        uni.removeTabBarBadge({
          index: 1
        })
      } else {
        // 当数量大于0时，显示徽标
        uni.setTabBarBadge({
          index: 1,
          text: this.total + ''
        })
      }
    }
  }

}
