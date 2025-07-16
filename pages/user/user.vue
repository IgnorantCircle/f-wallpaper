<template>
	<view class="layout pageBg" v-if="userinfo" >
		<view :style="{ height: getNavBarHeight() + 'px' }" />
		<view class="userInfo">
			<view class="avatar">
				<image src="/static/logo.png" mode=""></image>
			</view>
			<view class="ip">{{ userinfo.IP }}</view>
			<view class="address">{{ userinfo.address.city || userinfo.address.province || userinfo.address.country }}</view>
		</view>

		<view class="section">
			<view class="container" v-for="item in section1" :key="item._id">
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
			<view class="container" v-for="item in section2" :key="item.text">
				<user-list :listInfo="item"></user-list>
			</view>
		</view>
	</view>
</template>

<script setup>
import { computed, reactive, ref } from 'vue';
import { getNavBarHeight } from '@/utils/system.js';
import { apiUserInfo } from '@/api/apis.js';

const userinfo = ref(null);
const section1 = computed(() => {
	return [
		{
			icon: 'download-filled',
			text: "我的下载",
			isShowNum: true,
			count: userinfo.value.downloadSize,
			navUrl: '/pages/classList/classList?name=我的下载&type=download'
		},
		{
			icon: 'star-filled',
			text: '我的评分',
			isShowNum: true,
			count:userinfo.value.scoreSize,
			navUrl: "/pages/classList/classList?name=我的评分&type=score" 
		},
		{
			icon: 'chatboxes-filled',
			text: '联系客服',
			isShowNum: false,
			isContact: true
		}
	]
});


const section2 = ref([
	{
		icon: 'notification-filled',
		text: '订阅更新',
		isShowNum: false,
		navUrl:'/pages/notice/notice'
	},
	{
		icon: 'flag-filled',
		text: '常见问题',
		navUrl:'/pages/notice/notice'
	}
]);
const clickContact = () => {
	uni.makePhoneCall({
		phoneNumber: '114'
	});
};

const getUserInfo = () => {
	apiUserInfo().then((res) => {
		userinfo.value = res.data;
	});
};
getUserInfo();
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
