<template>
	<view class="my-login-container">
		<uni-icons type="contact" size="100" color="#AfAfAf"></uni-icons>
		<!-- <button type="primary" class="btn-login" @click="getUserInfo">一键登录</button> -->
		<button type="primary" class="btn-login" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">一键登录</button>
		<text class="login-tips">登录后尽享更多权益</text>
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
	// 重定向对象
	const redirectInfo = computed(() => store.state.user.redirectInfo)
	const onChooseAvatar = (e) => {
		store.commit('user/updateUserInfo', {
			avatarUrl: e.detail.avatarUrl
		})
		getToken({})
	}
	const getUserInfo = () => {
		// const res = await uni.getUserProfile({
		// 	desc: "仅用于展示",
		// })
		// console.log(res)
		uni.getUserProfile({
			desc: 'weixin',
			success: (res) => {
				console.log(res)
				store.commit('user/updateUserInfo', res.userInfo)
				getToken(res)
			},
			fail: () => {
				return uni.$showMsg('您取消了登录授权')
			}
		})
	}
	// 获取登录所需的code值
	const getToken = async (info) => {
		// 调用微信登录接口
		const res = await uni.login().catch(err => err)
		// 判断uni.login()的调用是否成功
		if (res.errMsg != 'login:ok') return uni.$showMsg('登录失败！')

		// //准备参数
		// const query = {
		// 	code: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo",
		// 	encryptedData: info.encryptedData,
		// 	iv: info.iv,
		// 	rawData: info.rawData,
		// 	signature: info.signature
		// }
		// //换取token
		// const data = await uni.$http.post('/api/public/v1/users/wxlogin', query)
		// // if (loginResult.meta.status !== 200) return uni.$showMsg('登录失败')
		// // uni.$showMsg('登录成功')

		// 上面获取token的方法调用失败 假设res.code是token
		// 更新token
		store.commit('user/updateToken',
			"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
			)
		// 判断是否需要跳转回之前的页面
		navigateBack()

	}
	const navigateBack = () => {
		if (redirectInfo.value && redirectInfo.value.openType == 'switchTab') {
			uni.switchTab({
				url: redirectInfo.value.from,
				complete: () => {
					// 清空重定向对象
					store.commit('user/updateRedirectInfo', null)
				}
			})
		}
	}
</script>

<style lang="less" scoped>
	.my-login-container {
		height: 750rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #f8f8f8;
		position: relative;
		overflow: hidden;

		&::after {
			content: '';
			display: block;
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 40px;
			background-color: red;
			transform: translateY(50%);
			border-radius: 100%;
			background-color: #fff;
		}

		.btn-login {
			width: 90%;
			margin: 15px 0;
			border-radius: 100px;
			background-color: #d81e06;
		}

		.login-tips {
			color: gray;
			font-size: 12px;
		}
	}
</style>
