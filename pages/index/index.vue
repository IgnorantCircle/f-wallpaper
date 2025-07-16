<template>
	<view class="homeLayout pageBg">
		<custom-nav-bar title="推荐" />
		<view class="banner">
			<swiper circular indicator-dots indicator-color="rgba(255,255,255,0.5)" indicator-active-color="#fff" autoplay>
				<swiper-item v-for="item in bannerList" :key="item._id">
					<image :src="item.picurl" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>

		<view class="notice" @click="goNotice()">
			<view class="left">
				<uni-icons type="sound-filled" size="20" color="#28b389"></uni-icons>
				<text class="mText">公告</text>
			</view>
			<view class="center">
				<swiper vertical autoplay interval="1500" duration="300" circular>
					<swiper-item v-for="(item, index) in 6" :key="index">这是第{{ index + 1 }}条公告</swiper-item>
				</swiper>
			</view>
			<view class="right">
				<uni-icons type="right" size="16" color="" />
			</view>
		</view>

		<view class="select">
			<common-title>
				<template #name>每日推荐</template>
				<template #custom>
					<view class="date">
						<uni-icons type="calendar"></uni-icons>
						<view class="text">
							<uni-dateformat :date="Date.now()" format="yy日"></uni-dateformat>
						</view>
					</view>
				</template>
			</common-title>
			<view class="content">
				<scroll-view scroll-x>
					<view class="box" v-for="item in randomList" :key="item._id">
						<image :src="item.smallPicurl" mode="aspectFill" @click="goPreview(item._id)"></image>
					</view>
				</scroll-view>
			</view>
		</view>
		<view class="theme">
			<common-title>
				<template #name>专题精选</template>
				<template #custom>
					<navigator url="/pages/classList/classList" open-type="reLaunch" class="more">More+</navigator>
				</template>
			</common-title>
			<view class="content">
				<theme-item v-for="item in classifyList" :key="item._id" :listItem="item" />
				<theme-item :isMore="true" />
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { apiGetBanner, apiGetDayRandom, apiGetClassify } from '@/api/apis.js';
import { onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app';
const bannerList = ref([]);
const randomList = ref([]);
const classifyList = ref([]);

const goPreview = (id) => {
	uni.setStorageSync("storageClassList",randomList.value);
	uni.navigateTo({
		url:"/pages/preview/preview?id="+id
	})	
};
const goNotice = (id) => {
	uni.navigateTo({
		url: '/pages/notice/detail?id=' + id
	});
};

//获取banner图
const getBanner = async () => {
	const res = await apiGetBanner();
	bannerList.value = res.data;
};
//每日随机
const getDayRandom = async () => {
	const res = await apiGetDayRandom();
	randomList.value = res.data;
};

const getClassify = async () => {
	const res = await apiGetClassify({
		select: true
	});
	classifyList.value = res.data;
};

//分享给好友
onShareAppMessage((e) => {
	return {
		title: '好看的手机壁纸',
		path: '/pages/classify/classify'
	};
});

//分享朋友圈
onShareTimeline(() => {
	return {
		title: '好看的手机壁纸'
	};
});
getBanner();
getDayRandom();
getClassify();
</script>

<style lang="scss" scoped>
.homeLayout {
	.banner {
		padding: 30rpx 0;
		width: 750rpx;

		swiper {
			width: 750rpx;
			height: 340rpx;

			&-item {
				width: 100%;
				height: 100%;
				padding: 0 30rpx;

				image {
					width: 100%;
					height: 100%;
					border-radius: 10rpx;
				}
			}
		}
	}

	.notice {
		width: 690rpx;
		height: 80rpx;
		line-height: 80rpx;
		background-color: #f9f9f9;
		margin: 0 auto;
		border-radius: 80rpx;
		display: flex;

		.left {
			width: 140rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			.text {
				font-weight: 600;
				font-size: 28rpx;
			}
		}

		.center {
			flex: 1;

			swiper {
				height: 100%;

				&-item {
					height: 100%;
					font-size: 30rpx;
					color: #666;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}
		}

		.right {
			width: 70rpx;
			justify-content: center;
			align-items: center;
		}
	}
	.select {
		padding-top: 50rpx;
		.date {
			color: $brand-theme-color;
			display: flex;
			align-items: center;
			:deep() {
				.uni-icons {
					color: $brand-theme-color !important;
				}
			}
		}
		.content {
			width: 720rpx;
			margin-left: 30rpx;
			margin-top: 30rpx;
			scroll-view {
				white-space: nowrap;
				.box {
					width: 200rpx;
					height: 430rpx;
					display: inline-block;
					margin-right: 15rpx;
					image {
						width: 100%;
						height: 100%;
						border-radius: 10rpx;
					}
					//保持间距一致
					&:last-child {
						margin-right: 30rpx;
					}
				}
			}
		}
	}

	.theme {
		padding: 50rpx 0;
		.more {
			font-size: 32rpx;
			color: #888;
		}
		.content {
			margin-top: 30rpx;
			padding: 0 30rpx;
			display: grid;
			gap: 15rpx;
			grid-template-columns: repeat(3, 1fr);
		}
	}
}
</style>
