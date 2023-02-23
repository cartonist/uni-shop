<template>
	<view class="settle-container">
		<!-- 全选框 -->
		<label class="radio">
			<radio :checked="isCheckAll" color="#d81e06" @click="changAllState" /><text>全选</text>
		</label>
		<!-- 总金额 -->
		<view class="amount-box">
			合计<text class="total-price">￥{{checkedAmount}}</text>
		</view>
		<!-- 结算按钮 -->
		<view class="btn-settle" @click="settlement">
			结算({{checkedCount}})
		</view>
	</view>
</template>

<script setup>
	import {
		useStore
	} from 'vuex';
	import {
		computed,
		ref
	} from "vue";
	const store = useStore()
	// 选中的数量
	const checkedCount = computed(() => store.getters['cart/checkedCount'])
	// 是否全选
	const isCheckAll = computed(() => store.getters['cart/isCheckAll'])
	// 总金额
	const checkedAmount = computed(() => store.getters['cart/checkedAmount'])
	// 改变全选状态
	const changAllState = () => {
		store.commit('cart/updateAllGoodsState', !isCheckAll.value)
	}
	// token
	const token = computed(() => store.state.user.token)
	// 收货地址
	const address = computed(() => store.state.user.address)
	// 登录倒计时
	const seconds = ref(0)
	// 点击结算
	const settlement = () => {
		if (!checkedCount.value) return uni.$showMsg('请先选择商品')
		if (JSON.stringify(address.value) == '{}') return uni.$showMsg('请先选择地址')
		if (!token.value) return delayNavigate()
	}
	// 显示倒计时的提示信息
	const showTip = (seconds) => {
		uni.showToast({
			icon: 'none',
			title: `请登录后在结算！${seconds}后跳转到登录页面`,
			mask: true,
			duartion: 1500
		})
	}
	// 延迟导航到my页面
	const delayNavigate = () => {
		seconds.value = 5
		showTip(seconds.value)
		let timer = setInterval(() => {
			seconds.value--;
			if (seconds.value <= 0) {
				clearInterval(timer)
				// 跳转至my页面
				uni.switchTab({
					url: '/pages/My/My',
					// 跳转成功后，记录本页面信息，以便重定向
					success: () => {
						store.commit('user/updateRedirectInfo', {
							// 跳转的方式
							openType: 'switchTab',
							// 从哪个页面跳转过去
							from: '/pages/Cart/Cart',
						})
					}
				})
				return
			}
			showTip(seconds.value)
		}, 1000)
	}
</script>

<style lang="less" scoped>
	.settle-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 999;
		width: 100%;
		height: 50px;
		padding-left: 5px;
		background-color: #fff;

		.radio {
			display: flex;
			align-items: center;
		}

		.amount-box {
			display: flex;
			align-items: center;

			.total-price {
				color: #d81e06;
				font-size: 18px;
			}
		}

		.btn-settle {
			height: 50px;
			background-color: #d81e06;
			min-width: 100px;
			text-align: center;
			line-height: 50px;
			color: #fff;
			font-size: 18px;

		}
	}
</style>
