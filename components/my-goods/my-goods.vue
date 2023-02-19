<template>
	<view class="goods-item">
		<view class="goods-item-left">
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
			</view>
		</view>
	</view>
</template>

<script setup>
	const props = defineProps({
		item: {
			type: Object,
			default: {}
		}
	})
	// 默认图片
	const defaultPic =
		'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
</script>

<style lang="less" scoped>
	.goods-item {
		display: flex;
		padding: 10px 5px;
		border: 1px solid #efefef;
	}

	.goods-item-left {
		image {
			width: 100px;
			height: 100px;
			// 去除图片底部的空隙
			display: block;
		}
	}

	.goods-item-right {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin-left: 10px;

		.goods-name {
			font-size: 14px;
		}

		.goods-price {
			font-size: 16px;
			color: #d81e06;
		}
	}
</style>
