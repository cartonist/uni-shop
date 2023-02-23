export default {
	namespaced: true,
	state: {
		// state中的赋值只有在文件加载的时候回执行一次
		address: JSON.parse(uni.getStorageSync('address') || '{}'),
		token: uni.getStorageSync('token') || '',
		// 用户的基本信息
		userInfo: JSON.parse(uni.getStorageSync('userInfo') || '{}'),
		// 重定向的Object对象{ openType, from}
		redirectInfo: null
	},
	mutations: {
		// 修改地址
		updateAddress(state, data) {
			state.address = data
			this.commit('user/saveToStorage')

		},
		// 持久化存储
		saveToStorage(state) {
			uni.setStorageSync('address', JSON.stringify(state.address))
		},
		// 更新用户信息
		updateUserInfo(state, userInfo) {
			state.userInfo = userInfo
			this.commit('user/saveUserInfoStorage')
		},
		updateToken(state, token) {
			state.token = token
			this.commit('user/saveTokenStorage')
		},
		updateRedirectInfo(state, data) {
			state.redirectInfo = data
			console.log(state.redirectInfo)
		},
		// 本地持久化存储userInfo
		saveUserInfoStorage(state) {
			uni.setStorageSync('userInfo', JSON.stringify(state.userInfo))
		},
		// 本地持久化储存token
		saveTokenStorage(state) {
			uni.setStorageSync('token', state.token)
		}

	},
	getters: {
		addInfo(state) {
			if (state.address.provinceName == '') return ''
			else {
				return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.
				detailInfo
			}
		}
	}
}
