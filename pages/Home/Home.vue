<template>
	<view>
		<view class="search-box">
			<my-search></my-search>
		</view>
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<navigator class="swiper-item"
					:url="'../../subpkg/Goods-details/Goods-details?goods_id='+item.goods_id">
					<image :src="item.image_src" mode=""></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 分类导航 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(item,index) in navList" @click="navClickHandler(item)">
				<image :src="item.image_src" mode=""></image>
			</view>
		</view>
		<!-- 楼层 -->
		<view class="floor-list">
			<view class="floor-item" v-for="(item,index) in floorList" :key="index">
				<!-- 楼层的title -->
				<image :src="item.floor_title.image_src" mode="" class="floor-title"></image>
				<!-- 楼层的主体 -->
				<view class="floor-body">
					<!-- 楼层左侧 -->
					<navigator class="floor-body-left" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src"
							:style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
					</navigator>
					<!-- 楼层右侧 -->
					<view class="floor-body-right">
						<view class="floor-body-right">
							<navigator class="floor-right-item" v-for="(item2, i2) in item.product_list" :key="i2"
								v-show="i2 !== 0" :url="item2.url">
								<image :src="item2.image_src" :style="{width: item2.image_width+'rpx'}" mode="widthFix">
								</image>
							</navigator>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import bus from '../../common/bus.js'
	import {
		onBeforeMount,
		ref
	} from 'vue'
	// 分类导航数据
	const navList = ref([])
	// 轮播图数据
	const swiperList = ref([])
	// 楼层数据
	const floorList = ref([])
	// 获取轮播图数据
	const getSwiperList = async () => {
		const {
			data: res
		} = await uni.$http.get('/api/public/v1/home/swiperdata')
		if (res.meta.status == 200) {
			swiperList.value = res.message
		}

	}
	// 获取分类导航导航数据
	const getNavList = async () => {
		const {
			data: res
		} = await uni.$http.get('/api/public/v1/home/catitems')
		if (res.meta.status == 200) {
			navList.value = res.message
		}

	}
	// 点击分类导航实现跳转
	const navClickHandler = (item) => {
		if (item.name == '分类') {
			uni.switchTab({
				url: '/pages/Cate/Cate'
			})
		}
	}
	// 获取楼层数据
	const getFloorList = async () => {
		const {
			data: res
		} = await uni.$http.get('/api/public/v1/home/floordata')
		if (res.meta.status == 200) {
			// 处理楼层数据中的页面跳转地址
			res.message.forEach(item => {
				item.product_list.forEach(pro => {
					pro.url = '/subpkg/Goods-list/Goods-list?' + pro.navigator_url.split('?')[1]
				})
			})
			floorList.value = res.message
		}


		console.log(floorList.value)
	}
	onBeforeMount(() => {
		getSwiperList()
		getNavList()
		getFloorList()

		bus.on('jump', () => {
			uni.navigateTo({
				url: '/subpkg/Search/Search'
			})
		})
	})
</script>
<!-- 混入tabBar徽标的设置代码 -->
<script>
	import badgeMix from '../../mixins/tabbar-badge.js'
	export default {
		// 将 badgeMix 混入到当前的页面中进行使用
		mixins: [badgeMix]
	}
</script>

<style lang="less" scoped>
	swiper {
		height: 330rpx;

		.swiper-item,
		image {
			width: 100%;
			height: 100%;
		}
	}

	.nav-list {
		display: flex;
		justify-content: space-around;
		margin: 15rpx 0;

		image {
			width: 128rpx;
			height: 140rpx;
		}

	}

	.floor-list {
		padding-left: 10rpx;

		.floor-title {
			width: 100%;
			height: 60rpx;
		}

		.floor-body {
			display: flex;

		}

		.floor-body-right {
			display: flex;
			justify-content: space-around;
			flex-wrap: wrap;
		}

	}

	.search-box {
		// 吸顶效果
		position: sticky;
		top: 0;
		z-index: 999;
	}
</style>
