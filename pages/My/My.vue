<template>
	<view>
		My
	</view>
</template>

<script setup>
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

</style>
