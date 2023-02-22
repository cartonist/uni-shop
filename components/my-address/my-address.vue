<template>
	<view class="address-container">
		<view class="address-choose-box" v-if="JSON.stringify(address) == '{}'">
			<button type="primary" size="mini" @click="chooseAddr">请选择收货地址+</button>
		</view>
		<view class="address-info-box" v-else @click="chooseAddr">
			<view class="address-row1">
				<view class="username">
					收货人：{{address.userName}}
				</view>
				<view class="phone">
					<text>电话：{{address.telNumber}}</text>
					<uni-icons type="right" class="icons-right"></uni-icons>
				</view>
			</view>
			<view class="address-row2">
				<view class="address-title">
					收货地址：
				</view>
				<view class="address-content">
					{{addrInfo}}
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		computed,
		ref
	} from "vue";
	import {
		useStore
	} from "vuex";
	const store = useStore()

	// 收货地址
	const address = computed(() => store.state.user.address)

	// 详细地址
	const addrInfo = computed(() => store.getters['user/addInfo'])

	// 调用小程序提供的chooseAddress方法，即可使用选择收获地址的功能（需要提前配置）
	const chooseAddr = async () => {
		const res = await uni.chooseAddress().catch(err => err)

		// 成功选择地址后修改vuex中的值
		if (res.errMsg == "chooseAddress:ok") store.commit('user/updateAddress', res)

	}
</script>

<style lang="less" scoped>
	.address-container {
		border-bottom: 4px solid;
		border-image: linear-gradient(to right, #d81e06, #578aef) 1;
		box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
	}

	.address-choose-box {
		height: 90px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.address-info-box {
		height: 90px;
		padding: 0 5px;
		display: flex;
		flex-direction: column;
		justify-content: center;

		.address-row1 {
			display: flex;
			justify-content: space-between;

			.phone {
				display: flex;
				align-items: center;

				.icons-right {
					margin-left: 5px;
				}
			}
		}

		.address-row2 {
			display: flex;
			margin-top: 10px;

			.address-title {
				white-space: nowrap;
				// width: 160rpx;
				display: flex;
				// justify-content: center;
				align-items: center;
			}

			.address-content {
				flex: 1
			}
		}
	}
</style>
