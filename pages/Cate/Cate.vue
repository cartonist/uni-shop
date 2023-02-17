<template>
	<view>
		<!-- 滑动组件 -->
		<view class="cate-scroll">
			<!-- 左侧滑动区 -->
			<scroll-view class="cate-scroll-left" scroll-y="true" :style="{height: wh+'px'}">
				<block v-for="(item, i) in cateList" :key="i">
					<view :class="['left-scroll-item',active == i ? 'active' : '']" @click="changeTab(i)">
						{{item.cat_name}}
					</view>
				</block>
			</scroll-view>
			<scroll-view class="cate-scroll-right" scroll-y="true" :style="{height: wh+'px'}" :scroll-top="scrollTop">
				<view class="right-scroll-item" v-for="(item, i) in cateLevel2" :key="i">
					<view class="right-scroll-title">
						/{{item.cat_name}}/
					</view>
					<view class="right-scroll-content">
						<view class="right-scroll-content-item" v-for="(item2, i2) in item.children" :key="i2"
							@click="goToGoodsList(item2)">
							<image :src="item2.cat_icon.replace('api-ugo-dev','api-ugo-web')" mode=""></image>
							<text>{{item2.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
			<!-- 右侧滑动区 -->
		</view>
	</view>
</template>

<script setup>
	import {
		onBeforeMount,
		ref
	} from "vue";
	const wh = ref(0)
	// 分类列表
	const cateList = ref([])
	// 二级分类列表
	const cateLevel2 = ref([])
	// 左侧列表激活项
	const active = ref(0)
	// 滚动条的位置
	const scrollTop = ref(0)
	// 获取分类列表的数据
	const getCateList = async () => {
		const {
			data: res
		} = await uni.$http.get('/api/public/v1/categories')
		if (res.meta.status == 200) {
			// 为一级分类赋值
			cateList.value = res.message
			// 为二级分类赋值
			cateLevel2.value = res.message[0].children
		}
	}
	// 点击左侧列表项改变active的值
	const changeTab = (i) => {
		// 切换激活值
		active.value = i
		// 切换二级分类列表
		cateLevel2.value = cateList.value[i].children
		// 滚动条的位置刷新
		scrollTop.value = scrollTop.value ? 0 : 1
	}
	// 跳转至商品列表页面
	const goToGoodsList = (item) => {
		uni.navigateTo({
			url: '/subpkg/Goods-list/Goods-list?cid=' + item.cat_id
		})
	}
	onBeforeMount(() => {
		const sync = uni.getSystemInfoSync()
		wh.value = sync.windowHeight
		getCateList()
	})
</script>

<style lang="less">
	.cate-scroll {
		display: flex;

		.cate-scroll-left {
			width: 120px;

			.left-scroll-item {
				background-color: #F7F7F7;
				line-height: 60px;
				text-align: center;
				font-size: 14px;
			}

			.active {
				background-color: #fff;
				position: relative;

				&::before {
					content: '';
					display: block;
					position: absolute;
					width: 3px;
					height: 30px;
					background-color: red;
					top: 50%;
					left: 0;
					transform: translateY(-50%);
				}
			}

		}

		.cate-scroll-right {
			.right-scroll-item {
				.right-scroll-title {
					font-size: 14px;
					text-align: center;
					font-weight: 700;
					padding: 16px 0;
				}

				.right-scroll-content {
					display: flex;
					flex-wrap: wrap;

					.right-scroll-content-item {
						width: 33.33%;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						padding-bottom: 15px;

						image {
							width: 60px;
							height: 60px;
						}

						text {
							padding-top: 10px;
							font-size: 12px;
						}
					}
				}
			}
		}
	}
</style>
