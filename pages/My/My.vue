<template>
	<view class="my-container">
		<my-login v-if="!token"></my-login>
		<my-userinfo v-else></my-userinfo>
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
	const token = computed(() => store.state.user.token)
</script>
<!-- 混入tabBar徽标的设置代码-->
<script>
	import badgeMix from '../../mixins/tabbar-badge.js'
	export default {
		// 将 badgeMix 混入到当前的页面中进行使用
		mixins: [badgeMix]
	}
</script>

<style lang="less" scoped>
	.my-container {
		height: 100vh;
	}
</style>
