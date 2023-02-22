import {
	onShow
} from "@dcloudio/uni-app"
// import {
// 	useStore
// } from 'vuex';
import myStore from "../store/store.js"
// const store = useStore()

export default {
	computed: {
		total: () => myStore.getters['cart/total']
	},
	onShow() {
		this.setBadge()
	},
	methods: {
		setBadge() {
			// 为tabBar设置右上角的徽标
			if (this.total != 0) {
				uni.setTabBarBadge({
					index: 2, //tabBar的索引
					text: this.total + '' //文本，必须是字符串
				})
			} else {
				uni.removeTabBarBadge({
					index: 2
				})
			}
		}
	}
}
