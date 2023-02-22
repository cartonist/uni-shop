import {
	createStore
} from "vuex"
// 导入购物车的vuex模块
import cart from './cart.js'
import user from './user.js'
export default createStore({
	state: {

	},
	mutations: {

	},
	modules: {
		cart,
		user
	}
})
