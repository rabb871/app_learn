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
	
	saveToStorage(state) {
	   const cartStr = JSON.stringify(state.cart)
	   console.log('保存到本地存储:', cartStr)
	   uni.setStorageSync('cart', cartStr)
	   console.log('验证保存结果:', uni.getStorageSync('cart'))
	},
	
	// 更新购物车中商品的勾选状态
	updateGoodsState(state, goods) {
	  const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
	
	  if (findResult) {
	    findResult.goods_state = goods.goods_state
	    this.commit('m_cart/saveToStorage')
	  }
	},
	// 更新购物车中商品的数量
	updateGoodsCount(state, goods) {
	  const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
	
	  if(findResult) {
	    findResult.goods_count = goods.goods_count
	    this.commit('m_cart/saveToStorage')
	  }
	},
	// 删除对应的商品信息
	removeGoodsById(state, goods_id) {
	  state.cart = state.cart.filter(x => x.goods_id !== goods_id)
	  this.commit('m_cart/saveToStorage')
	},
	// 更新所有商品的勾选状态
	updateAllGoodsState(state, newState) {
	  state.cart.forEach(x => x.goods_state = newState)
	  this.commit('m_cart/saveToStorage')
	}


  },

  // 模块的 getters 属性
  getters: {
     total(state) {
        let c = 0
        state.cart.forEach(goods => c += goods.goods_count)
        return c
		
		// return state.cart.reduce((total,item)=> {total += item.goods_count}, 0)
     },
	 // 勾选的商品的总数量
	 checkedCount(state) {
	   return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count, 0)
	 },
	 // 已勾选的商品的总价
	 checkedGoodsAmount(state) {
	   return state.cart.filter(x => x.goods_state)
	                    .reduce((total, item) => total += item.goods_count * item.goods_price, 0)
	                    .toFixed(2)
	 }


  }

}

