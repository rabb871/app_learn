
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
// import store from './store/store.js'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
})

app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import store from '@/store/store.js'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  return {
    app
  }
}
// #endif


//导入网络请求包
import { $http } from '@escook/request-miniprogram'

uni.$http = $http

//请求的根路径
$http.baseUrl = 'https://api-hmugo-web.itheima.net'

$http.beforeRequest = function(option) {
	uni.showLoading({
		title: '数据加载中...'
	})
}

// 请求完成之后做一些事情
$http.afterRequest = function () {
  uni.hideLoading()
}

uni.$showMsg = function (title = '数据加载失败！',duration=1500){
  uni.showToast({
    title,
    duration,
    icon:'none',
  })
}