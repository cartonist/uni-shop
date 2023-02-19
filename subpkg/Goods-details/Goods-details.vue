<template>
	<!-- 在页面数据还没请求来之前先不展示对应数据 -->
	<view v-if="goodsInfo.goods_name" class="goods-details-container">
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item, index) in goodsInfo.pics" :key="index">
				<image :src="item.pics_big" mode="" @click="previewImg(index)"></image>
			</swiper-item>
		</swiper>
		<view class="goods-message">
			<view class="goods-price">
				￥{{goodsInfo.goods_price.toFixed(2)}}
			</view>
			<view class="goods-details">
				<view class="goods-name">
					{{goodsInfo.goods_name}}
				</view>
				<view class="goods-fav">
					<uni-icons type="star" :size="18" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
		</view>
		<view class="express">
			快递：免运费
		</view>
		<rich-text :nodes="goodsInfo.goods_introduce"></rich-text>
		<!-- 使用uniapp的组件实现底部nav-bar -->
		<view class="nav-bar">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="goTOCart"
				@buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from "vue";
	import {
		onLoad
	} from "@dcloudio/uni-app"
	// 商品详情数据
	const goodsInfo = ref({})
	const options = ref([{
		icon: 'shop',
		text: '店铺',
		infoBackgroundColor: '#007aff',
		infoColor: "red"
	}, {
		icon: 'cart',
		text: '购物车',
		info: 2
	}])
	const buttonGroup = ref([{
			text: '加入购物车',
			backgroundColor: '#ff0000',
			color: '#fff'
		},
		{
			text: '立即购买',
			backgroundColor: '#ffa200',
			color: '#fff'
		}
	])
	onLoad((option) => {
		const goodsId = option.goods_id
		getGoodsInfo(goodsId)
	})
	// 获取商品详情数据
	const getGoodsInfo = async (goodsId) => {
		const {
			data: res
		} = await uni.$http.get('/api/public/v1/goods/detail', {
			goods_id: goodsId
		})
		if (res.meta.status == 200) {
			goodsInfo.value = res.message
			// goodsInfo.value.price = goodsInfo.value.goods_price.toFixed(2)
			// 使用字符串的replace方法将富文本中的<img 替换为 <img style="display: block"
			goodsInfo.value.goods_introduce = goodsInfo.value.goods_introduce.replace(/<img/g,
				'<img style="display: block;"').replace(/webp/g, 'jpg')
		}
	}
	// 轮播图预览
	const previewImg = (index) => {
		uni.previewImage({
			// 预览是默认显示图片的索引
			current: index,
			// 所有图片url地址的数组
			urls: goodsInfo.value.pics.map(x => x.pics_big)
		})
	}
	// 跳转到购物车页面
	const goTOCart = (e) => {
		if (e.content.text == '购物车') {
			uni.switchTab({
				url: '/pages/Cart/Cart'
			})
		}
	}
</script>

<style lang="less" scoped>
	.goods-details-container {
		padding-bottom: 50px
	}

	swiper {
		height: 750rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.goods-message {
		padding: 10px 0 10px 10px;
		background: #fff;

		.goods-price {
			font-size: 20px;
			margin-bottom: 10px;
			color: #d81e06;

		}

		.goods-details {
			display: flex;
			justify-content: space-between;

			.goods-name {
				font-size: 14px;
				margin-right: 15px;
			}

			.goods-fav {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 100px;
				font-size: 14px;
				border-left: 1px solid #efefef;
				color: gray;
			}

		}
	}

	.express {
		font-size: 12px;
		color: gray;
		padding-left: 10px;
		background: #fff;
	}

	.nav-bar {
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 999;
	}
</style>
