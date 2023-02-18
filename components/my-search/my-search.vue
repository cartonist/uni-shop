<template>
	<view class="my-search-container" :style="{'background-color': props.bgc}">
		<view class="my-search-box" :style="{'border-radius': props.b_rds + 'px'}" @click="searchBoxHandler">
			<uni-icons type="search" size="18"></uni-icons>
			<text>搜索</text>
		</view>
	</view>
</template>

<script setup>
	import bus from '../../common/bus.js'
	// 为组件封装自定义属性
	const props = defineProps({
		bgc: {
			type: String,
			default: '#d81e06',
		},
		b_rds: {
			type: Number,
			default: 18
		}
	})
	// 点击跳转事件，但是不在组件中跳转，传递给父组件去执行
	const searchBoxHandler = () => {
		bus.emit('jump')
	}
</script>

<style lang="less">
	.my-search-container {
		height: 50px;
		// background-color: #d81e06;
		padding: 0 15px;
		display: flex;
		align-items: center;

		.my-search-box {

			height: 36px;
			width: 100%;
			background-color: #fff;
			// border-radius: 18px;
			display: flex;
			justify-content: center;
			align-items: center;

			text {
				padding-left: 5px;
			}
		}
	}
</style>
