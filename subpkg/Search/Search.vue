<template>
	<!-- 搜索栏 -->
	<view class="search-box">
		<uni-search-bar @input="input" :radius="18" cancelButton="none" :focus="true"></uni-search-bar>
	</view>
	<!-- 搜索商品列表 -->
	<view class="suggest-list" v-if="searchResults.length != 0">
		<view class="suggest-item" v-for="(item,index) in searchResults" :key="index" @click="gotoDetails(item)">
			<text>{{item.goods_name}}</text>
			<uni-icons type="right" size="16"></uni-icons>
		</view>
	</view>
	<!-- 历史记录 -->
	<view class="history-list" v-else>
		<view class="history-title">
			<text>搜索历史</text>
			<uni-icons type="trash-filled" size="18" @click="removeHistory"></uni-icons>
		</view>
		<view class="history-item">
			<uni-tag :circle="true" :text="item" v-for="(item,index) in histories" @click="goTOGoodsList(item)" />
		</view>
	</view>
</template>

<script setup>
	import {
		computed,
		onBeforeMount,
		ref
	} from "vue";
	const timer = ref()
	// 输入框内容
	const kw = ref('')
	// 搜索结果列表
	const searchResults = ref([])
	// 搜索历史列表
	const historyList = ref([])
	// 反转搜索历史列表
	const histories = computed(() => {
		// 不使用原数组直接进行反转，因为reverse会改变原数组
		return [...historyList.value].reverse()
	})

	onBeforeMount(() => {
		historyList.value = JSON.parse(uni.getStorageSync('historyList') || '[]')
	})
	// 监听用户输入的内容
	const input = (e) => {
		// 输入框防抖
		clearTimeout(timer.value)
		timer.value = setTimeout(() => {
			kw.value = e.trim()
			getSearchResults()
		}, 500)
	}
	// 获取搜索列表
	const getSearchResults = async () => {
		if (kw.value.length == 0) {
			// 无输入内容则清空列表，并不发送请求
			searchResults.value = []
			return;
		}
		const {
			data: res
		} = await uni.$http.get('/api/public/v1/goods/qsearch', {
			query: kw.value
		})
		if (res.meta.status == 200) {
			searchResults.value = res.message
		}
		unshiftHistory()
	}
	// 对historyList数组去重并做持久化存储
	const unshiftHistory = () => {
		const set = new Set(historyList.value)
		set.delete(kw.value)
		set.add(kw.value)
		historyList.value = Array.from(set)
		uni.setStorageSync('historyList', JSON.stringify(historyList.value))
	}
	// 跳转到商品详情页
	const gotoDetails = (item) => {
		uni.navigateTo({
			url: '/subpkg/Goods-details/Goods-details?goods_id=' + item.goods_id
		})
	}
	// 清空搜索历史
	const removeHistory = () => {
		historyList.value = []
		uni.removeStorageSync('historyList')
	}
	// 点击历史记录跳转到商品列表
	const goTOGoodsList = (item) => {
		uni.navigateTo({
			url: '/subpkg/Goods-list/Goods-list?query=' + item
		})
	}
</script>

<style lang="less" scoped>
	.search-box {
		position: sticky;
		top: 0;
		z-index: 999;
	}

	:deep(.uni-searchbar) {
		display: flex;
		flex-direction: row;
		position: relative;
		padding: 16rpx;
		background-color: #d81e06;

		.uni-searchbar__box {
			height: 36px;
		}
	}

	.suggest-list {
		.suggest-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 40px;
			padding: 0 10px;
			border-bottom: 1px solid #efefef;

			text {
				white-space: nowrap;
				width: 90%;
				overflow: hidden;
				text-overflow: ellipsis;
				font-size: 12px;
			}
		}
	}

	.history-list {
		padding: 0 15px;

		.history-title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 50px;
			font-size: 14px;
		}

		.history-item {
			display: flex;

			uni-tag {
				margin-right: 8px;

				:deep(.uni-tag) {
					background-color: #ddd;
					color: #000;
					border: none;
				}
			}
		}
	}
</style>
