<template>
	<view class="layout pageBg">
		<view class=""></view>
		<view class="userInfo">
			<view class="avatar">
				<image src="/static/logo.png" mode=""></image>
			</view>
			<view class="ip">111.122.133.144</view>
			<view class="address">来自于</view>
		</view>

		<view class="section">
			<view class="container" v-for="item in section1">
				<user-list :listInfo="item">
					<template #contact v-if="item.isContact">
						<!-- #ifdef MP -->
						<button open-type="contact">联系客服</button>
						<!-- #endif -->
						<!-- #ifndef MP -->
						<button @click="clickContact">拨打电话</button>
						<!-- #endif -->
					</template>
				</user-list>
			</view>
		</view>
		<view class="section">
			<view class="container" v-for="item in section2">
				<user-list :listInfo="item"></user-list>
			</view>
		</view>
	</view>
</template>

<script setup>
import { reactive } from 'vue';
const section1 = reactive([
	{
		icon: 'download-filled',
		text: '我的下载',
		isShowNum: true
	},
	{
		icon: 'star-filled',
		text: '我的评分',
		isShowNum: true
	},
	{
		icon: 'chatboxes-filled',
		text: '联系客服',
		isShowNum: false,
		isContact: true
	}
]);

const section2 = reactive([
	{
		icon: 'notification-filled',
		text: '订阅更新',
		isShowNum: false
	},
	{
		icon: 'flag-filled',
		text: '常见问题',
		isShowNum: false
	}
]);
const clickContact = ()=>{
	uni.makePhoneCall({
		phoneNumber:'114'
	})
};

const getUserInfo = ()=>{
	
}

</script>

<style lang="scss" scoped>
.layout {
	.userInfo {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding: 50rpx 0;
		.avatar {
			width: 160rpx;
			height: 160rpx;
			border-radius: 50%;
			overflow: hidden;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.ip {
			font-size: 44rpx;
			color: #333;
			padding: 20rpx 0 5rpx;
		}
		.address {
			font-size: 28rpx;
			color: #aaa;
		}
	}
	.section {
		width: 690rpx;
		margin: 50rpx auto;
		border: 1px solid #eee;
		border-radius: 10rpx;
		box-shadow: 0 0 30rpx rgba(0, 0, 0, 0.05);
		.container {
			border-bottom: 1px solid #eee;
			&:last-child {
				border-bottom: 0;
				
			}
			
		}
	}
}
</style>
