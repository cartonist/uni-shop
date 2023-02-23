<template>
	<view class="userinfo-container">
		<view class="top-box">
			<image :src="userInfo.avatarUrl" mode="" class="avatar"></image>
			<text class="nickname">小程序用户</text>
			<!-- <input type="nickname" maxlength="16" minlength="1" placeholder="请输入昵称" /> -->
		</view>
		<!-- 面板区域 -->
		<view class="panel-list">
			<!-- 第一个面板 -->
			<view class="panel">
				<view class="panel-body">
					<view class="panel-item">
						<text>0</text>
						<text>收藏的店铺</text>
					</view>
					<view class="panel-item">
						<text>0</text>
						<text>收藏的商品</text>
					</view>
					<view class="panel-item">
						<text>0</text>
						<text>关注的商品</text>
					</view>
					<view class="panel-item">
						<text>0</text>
						<text>足迹</text>
					</view>

				</view>
			</view>
			<!-- 第二个面板 -->
			<view class="panel">
				<view class="panel-title">
					我的订单
				</view>
				<view class="panel-body">
					<view class="panel-item">
						<image src="/static/order-mana.png" mode="" class="icon"></image>
						<text>待支付</text>
					</view>
					<view class="panel-item">
						<image src="/static/truck.png" mode="" class="icon"></image>
						<text>待收货</text>
					</view>
					<view class="panel-item">
						<image src="/static/pay_collect.png" mode="" class="icon"></image>
						<text>退款/退货</text>
					</view>
					<view class="panel-item">
						<image src="/static/list.png" mode="" class="icon"></image>
						<text>全部订单</text>
					</view>
				</view>
			</view>
			<!-- 第三个面板 -->
			<view class="panel">
				<view class="panel-list-item">
					<text>收货地址</text>
					<uni-icons type="right" size="15"></uni-icons>
				</view>
				<view class="panel-list-item">
					<text>收货地址</text>
					<uni-icons type="right" size="15"></uni-icons>
				</view>
				<view class="panel-list-item" @click="logout">
					<text>退出登录</text>
					<uni-icons type="right" size="15"></uni-icons>
				</view>
			</view>
		</view>
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
	const userInfo = computed(() => store.state.user.userInfo)
	// 点击退出登录
	const logout = async () => {
		const res = await uni.showModal({
			title: '提示',
			content: '确认退出登录吗？'
		}).catch(err => err)
		if (res.confirm) {
			// 清空用户信息、地址信息和token
			store.commit('user/updateAddress', {})
			store.commit('user/updateUserInfo', {})
			store.commit('user/updateToken', '')
		}
	}
</script>

<style lang="less" scoped>
	.userinfo-container {
		height: 100%;
		background-color: #f4f4f4;

		.top-box {
			height: 400rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			background-color: #d81e06;

			.avatar {
				// 去除底部空隙
				display: block;
				width: 90px;
				height: 90px;
				border-radius: 45px;
				border: 2px solid white;
				box-shadow: 0 1px 5px black;
			}

			.nickname {
				color: #fff;
				font-size: 16px;
				font-weight: 700;
				margin-top: 10px;
			}
		}

		.panel-list {
			padding: 0 10px;
			position: relative;
			top: -10px;

			.panel {
				background-color: #fff;
				border-radius: 3px;
				margin-bottom: 8px;

				.panel-title {
					line-height: 45px;
					padding-left: 10px;
					border-bottom: 1px solid #f4f4f4;
				}

				.panel-body {
					display: flex;
					justify-content: space-around;

					.panel-item {
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						padding: 10px 0;
						font-size: 13px;

						.icon {
							width: 25px;
							height: 25px;
						}
					}
				}

				.panel-list-item {
					display: flex;
					justify-content: space-between;
					padding: 0 10px;
					line-height: 45px;
					font-size: 15px;
				}
			}
		}
	}
</style>
