<template>
	<view class="goods-item">
		<view class="goods-item-left">
			<radio :checked="item.goods_state" color="#C00000" class="radio" v-if="showRadio" @click="changeRadio">
			</radio>
			<!-- 商品图片 -->
			<image :src="item.goods_small_logo || defaultPic " mode=""></image>
		</view>
		<view class="goods-item-right">
			<!-- 商品名称 -->
			<view class="goods-name">
				{{item.goods_name}}
			</view>
			<view class="goods-info">
				<!-- 商品价格 -->
				<view class="goods-price">
					￥{{item.goods_price.toFixed(2)}}
				</view>
				<!-- 数组输入框 -->
				<uni-number-box :min="1" background="#eee" :value="item.goods_count" @change="changeNum"
					v-if="showNumBox"></uni-number-box>
			</view>
		</view>
	</view>
</template>

<script setup>
	import bus from '../../common/bus.js'
	const props = defineProps({
		item: {
			type: Object,
			default: {}
		},
		// 是否显示复选框
		showRadio: {
			type: Boolean,
			default: false
		},
		// 是否显示步进器
		showNumBox: {
			type: Boolean,
			default: false
		}
	})
	// 默认图片
	const defaultPic =
		'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
	// 点击复选框向父组件传递商品id和状态
	const changeRadio = () => {
		bus.emit('radio-change', {
			goods_id: props.item.goods_id,
			goods_state: !props.item.goods_state
		})
	}
	// 步进器值发生改变时，向父组件传递商品id和更新后的数值
	const changeNum = (val) => {
		bus.emit('num-change', {
			goods_id: props.item.goods_id,
			goods_num: +val //使val隐式转化为数字
		})
	}
</script>

<style lang="less" scoped>
	.goods-item {
		width: 750rpx;
		box-sizing: border-box;

		display: flex;
		padding: 10px 5px;
		border: 1px solid #efefef;
	}

	.goods-item-left {
		display: flex;
		align-items: center;
		justify-content: center;

		image {
			width: 100px;
			height: 100px;
			// 去除图片底部的空隙
			display: block;
		}
	}

	.goods-item-right {
		display: flex;
		flex: 1;
		flex-direction: column;
		justify-content: space-between;
		margin-left: 10px;

		.goods-name {
			font-size: 14px;
		}

		.goods-info {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.goods-price {
				font-size: 16px;
				color: #d81e06;
			}
		}
	}
</style>
