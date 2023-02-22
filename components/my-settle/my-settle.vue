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
		<view class="btn-settle">
			结算({{checkedCount}})
		</view>
	</view>
</template>

<script setup>
	import {
		useStore
	} from 'vuex';
	import {
		computed
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
