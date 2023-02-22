export default {
	// 为当前模块开启命名空间
	namespaced: true,
	state: {
		// 购物车的数组，用来存储购物车中每个商品的信息对象
		// 每个商品的信息对象，都包含如下 6 个属性：
		// { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
		cart: JSON.parse(uni.getStorageSync('cart') || '[]')
	},
	mutations: {
		// 加入购物车
		addToCart(state, goods) {
			// 判断购物车是否已存在该商品
			const goodsItem = state.cart.find(item => item.goods_id == goods.goods_id)
			if (goodsItem) {
				goodsItem.goods_count++
			} else {
				state.cart.push(goods)
			}
			// 每次修改cart中的数据都同时修改本地的存储
			this.commit('cart/saveToStorage')
		},
		// 将购物车中的数据持久化存储在本地
		saveToStorage(state) {
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		},
		// 修改商品的勾选状态
		updateGoodsState(state, goods) {
			const goodsItem = state.cart.find(item => item.goods_id == goods.goods_id)
			if (goodsItem) {
				goodsItem.goods_state = goods.goods_state
				// 每次修改cart中的数据都同时修改本地的存储
				this.commit('cart/saveToStorage')
			}
		},
		// 修改商品的数量
		updateGoodsCount(state, data) {
			const goodsItem = state.cart.find(item => item.goods_id == data.goods_id)
			if (goodsItem) {
				goodsItem.goods_count = data.goods_num
				this.commit('cart/saveToStorage')
			}
		},
		// 通过id删除商品
		removeGoodsById(state, id) {
			state.cart = state.cart.filter(item => item.goods_id != id)
			this.commit('cart/saveToStorage')
		},
		// 商品的全选和反选
		updateAllGoodsState(state, newState) {
			state.cart.forEach(item => item.goods_state = newState)
			this.commit('cart/saveToStorage')
		}
	},
	getters: {
		// 购物车中的总件数
		total(state) {
			return state.cart.reduce((total, item) => total += item.goods_count, 0)
		},
		// 勾选的总件数
		checkedCount(state) {
			// 先过滤勾选中的商品项，在累加求和
			return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count, 0)
		},
		// 勾选的商品的总金额
		checkedAmount(state) {
			return state.cart.filter(x => x.goods_state).reduce((total, item) => total += (item.goods_count * item
				.goods_price), 0).toFixed(
				2)
		},
		// 是否全选
		isCheckAll(state) {
			return state.cart.every((item) => {
				return item.goods_state
			})
		}
	}
}
