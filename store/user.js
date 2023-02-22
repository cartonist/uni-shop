export default {
	namespaced: true,
	state: {
		address: JSON.parse(uni.getStorageSync('address') || '{}')
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
