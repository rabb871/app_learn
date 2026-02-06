export default {
  // 为当前模块开启命名空间
  namespaced: true,

  state: () => {
    try {
      const cartStr = uni.getStorageSync('cart')
      return {
        cart: cartStr ? JSON.parse(cartStr) : []
      }
    } catch (e) {
      console.error('购物车数据解析失败:', e)
      return {
        cart: []
      }
    }
  },

  mutations: {
    addToCart(state, goods) {
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)

      if (!findResult) {
        state.cart.push(goods)
      } else {
        findResult.goods_count++
      }
	  
	  this.commit('m_cart/saveToStorage')
    },
	
	// 将购物车中的数据持久化存储到本地
	saveToStorage(state) {
	   uni.setStorageSync('cart', JSON.stringify(state.cart))
	}

  },

  // 模块的 getters 属性
  getters: {
     total(state) {
        let c = 0
        state.cart.forEach(goods => c += goods.goods_count)
        return c
     }
  }

}

