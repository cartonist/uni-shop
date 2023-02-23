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
import store from './store/store.js'
export function createApp() {
	const app = createSSRApp(App)
	app.use(store)
	// 挂载到uni顶级对象上
	uni.$http = $http
	return {
		app
	}
}
// 封装弹窗方法
uni.$showMsg = (title = '数据请求失败', duration = 1500) => {
	uni.showToast({
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
	// 判断请求是否是有权限的API接口
	if (option.url.indexOf('/my/') != -1) {
		// 为请求头添加身份认证字段
		options.header = {
			Authorization: store.state.user.token
		}
	}
}
$http.afterRequest = function(option) {
	uni.hideLoading()
	if (option.data.meta.status != 200) {
		uni.$showMsg()
	}
}
// #endif
