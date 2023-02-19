<template>
	<view class="goods-list">
		<view v-for="(item,index) in goodsList" :key="index" @click="goToGoodsDetails(item)">
			<!-- 渲染商品项，传入商品数据 -->
			<my-goods :item="item"></my-goods>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from "vue";
	import {
		onLoad,
		onReachBottom,
		onPullDownRefresh
	} from "@dcloudio/uni-app"
	// 商品列表请求参数
	const queryObj = ref({
		cid: '',
		query: '',
		pagenum: 1,
		pagesize: 10
	})
	// 商品列表数据
	const goodsList = ref([])
	// 总数居条数
	const total = ref(0)
	// 节流阀
	const isLoading = ref(false)
	// onLoad需要导入
	onLoad((option) => {
		// 路由参数的转存
		queryObj.value.cid = option.cid || ''
		queryObj.value.query = option.query || ''

		getGoodsList()
	})
	// 上拉加载更多
	onReachBottom(() => {
		// 判断数据是否已经全部加载
		if (queryObj.value.pagenum * queryObj.value.pagesize >= total.value) return uni.$showMsg('数据加载完毕')
		// 判断当前是否正在发起请求，如果是，则放弃新请求
		if (isLoading.value) return

		queryObj.value.pagenum++
		getGoodsList()
	})
	// 下拉刷新
	onPullDownRefresh(() => {
		queryObj.value.pagenum = 1
		total.value = 0
		isLoading.value = false
		goodsList.value = []
		// 发起数据加载请求，并传入关闭背景的回调函数
		getGoodsList(() => {
			uni.stopPullDownRefresh()
		})
	})
	// 获取商品列表
	const getGoodsList = async (cb) => {
		// 打开节流阀
		isLoading.value = true
		const {
			data: res
		} = await uni.$http.get('/api/public/v1/goods/search', queryObj.value)
		// 关闭节流阀
		isLoading.value = false

		// 如果有回调则执行回调
		cb && cb()
		if (res.meta.status == 200) {
			goodsList.value = [...goodsList.value, ...res.message.goods]
			total.value = res.message.total

		}
	}
	// 跳转至商品详情页
	const goToGoodsDetails = (item) => {
		uni.navigateTo({
			url: '/subpkg/Goods-details/Goods-details?goods_id=' + item.goods_id
		})
	}
</script>

<style lang="less" scoped>
</style>
