// import Vue from 'vue'
// import Vuex from 'vuex'
import{createStore} from 'vuex'
import moduleCart from '@/store/cart.js'
import moduleUser from './user.js'

// Vue.use(Vuex)

const store = createStore({
  modules: {

    'm_cart': moduleCart,
	'm_user': moduleUser,
  },
})

export default store



