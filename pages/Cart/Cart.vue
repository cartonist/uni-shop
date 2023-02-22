<template>
	<view class="cart-container" v-if="store.state.cart.cart.length != 0">
		<my-address></my-address>
		<view class="cart-title">
			<uni-icons type="shop" size="18"></uni-icons>
			<text>购物车</text>
		</view>

		<!-- 商品列表区 -->
		<!-- 最外层是滑动删除组件 -->
		<uni-swipe-action class="goods-list">
			<block v-for="(item, index) in store.state.cart.cart" :key="index">
				<uni-swipe-action-item :right-options="options" @click="deleteGoods(item)">
					<my-goods :item="item" :show-radio="true" :show-num-box="true"></my-goods>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
		<my-settle></my-settle>
	</view>
	<view class="empty" v-else>
		<image src="/static/bag-empty.png" mode=""></image>
		<text>空空如也</text>
	</view>
</template>

<script setup>
	import {
		useStore
	} from 'vuex';
	import {
		computed,
		onBeforeMount,
		ref,
		watch
	} from "vue";
	import bus from '../../common/bus.js'
	const store = useStore()
	const total = computed(() => store.getters['cart/total'])
	const options = ref([{
		text: '取消',
		style: {
			backgroundColor: '#d81e06'
		}
	}])

	onBeforeMount(() => {
		// 自定义复选框的状态改变事件 'radio-change',并监听
		bus.on('radio-change', (data) => {
			store.commit('cart/updateGoodsState', data)
		})
		// 监听步进器的数量变化事件
		bus.on('num-change', (val) => {
			store.commit('cart/updateGoodsCount', val)
		})
	})
	// 修改tabBar徽标
	const setBadge = () => {
		// 为tabBar设置右上角的徽标
		if (total.value != 0) {
			uni.setTabBarBadge({
				index: 2, //tabBar的索引
				text: total.value + '' //文本，必须是字符串
			})
		} else {
			uni.removeTabBarBadge({
				index: 2
			})
		}
	}
	// 删除商品
	const deleteGoods = (item) => {
		store.commit('cart/removeGoodsById', item.goods_id)
	}
	// 监听购物车中商品总数的变化，并动态修改tabBar徽标
	watch(total, () => {
		setBadge()
	})
</script>

<!-- 混入tabBar徽标的设置代码-->
<script>
	import badgeMix from '../../mixins/tabbar-badge.js'
	export default {
		// 将 badgeMix 混入到当前的页面中进行使用
		mixins: [badgeMix]
	}
</script>

<style lang="less" scoped>
	.cart-container {
		padding-bottom: 50px;
	}

	.cart-title {
		height: 40px;
		display: flex;
		align-items: center;
		margin-left: 5px;
		border-radius: 1px solid #efefef;

		text {
			font-size: 14px;
			padding-left: 10px;
		}
	}

	.empty {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 300rpx;

		image {
			width: 90px;
			height: 90px;
		}

		text {
			color: gray;
			padding-top: 10px;
		}
	}
</style>
