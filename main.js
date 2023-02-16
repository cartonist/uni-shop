// #ifndef VUE3
// import Vue from 'vue'
// import App from './App'

// Vue.config.productionTip = false

// App.mpType = 'app'

// const app = new Vue({
// 	...App
// })
// app.$mount()
// #endif

// #ifdef VUE3

// 导入网络请求的包
import {
	$http
} from "@escook/request-miniprogram"
import {
	createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
	const app = createSSRApp(App)
	// 挂载到uni顶级对象上
	uni.$http = $http
	return {
		app
	}
}
// 封装弹窗方法
uni.$showMsg = (title = '数据请求失败', duration = 1500) => {
	uni.showLoading({
		title,
		duration,
		icon: 'none'
	})
}
$http.baseUrl = 'https://www.uinav.com'
// 配置请求拦截器和响应拦截器
$http.beforeRequest = function(option) {
	uni.showLoading({
		title: '加载中...'
	})
}
$http.afterRequest = function(option) {
	uni.hideLoading()
}
// #endif
