// import Vue from 'vue'
// import Vuex from 'vuex'
import{createStore} from 'vuex'
import moduleCart from '@/store/cart.js'

// Vue.use(Vuex)

const store = createStore({
  modules: {

    'm_cart': moduleCart,
  },
})

export default store



