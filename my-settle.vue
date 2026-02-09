<template>
  <view class="my-settle-container">
    <label class="radio" @click="changeAllState">
      <radio color="#C00000" :checked="isFullCheck" /><text>全选</text>
    </label>

    <view class="amount-box">
      合计:<text class="amount">￥{{checkedGoodsAmount}}</text>
    </view>

    <view class="btn-settle" @click="settlement">结算({{checkedCount}})</view>
  </view>

</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters('m_cart', ['checkedCount', 'total', 'checkedGoodsAmount']),
	...mapGetters('m_user', ['addstr']),
	...mapState('m_user', ['token']),
    isFullCheck() {
		return this.total === this.checkedCount
    }
  },
  methods: {
    ...mapMutations('m_cart', ['updateAllGoodsState']),

    changeAllState() {
      this.updateAllGoodsState(!this.isFullCheck)
    },
	// 点击了结算按钮
	settlement() {
	  if (!this.checkedCount) return uni.$showMsg('请选择要结算的商品！')

	  if (!this.addstr) return uni.$showMsg('请选择收货地址！')

	  if (!this.token) return uni.$showMsg('请先登录！')
	}

  }
}
</script>

<style lang="scss">
.my-settle-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 5px;
  font-size: 14px;

  .radio {
    display: flex;
    align-items: center;
  }

  .amount {
    color: #c00000;
  }

  .btn-settle {
    height: 50px;
    min-width: 100px;
    background-color: #c00000;
    color: white;
    line-height: 50px;
    text-align: center;
    padding: 0 10px;
  }
}

</style>
