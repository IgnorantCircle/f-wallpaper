<template>
	<view class="layout">
		<view class="navbar">
			<view class="statusBar" :style="{ height: getStatusBarHeight() + 'px' }"></view>

			<view class="titleBar" :style="{ height: getTitleBarHeight() + 'px', marginLeft: getLeftIconLeft() + 'px' }">
				<view class="title">{{title}}</view>
				<navigator class="search" url="/pages/search/search">
					<uni-icons class="icon" type="search" color="#888" size="18"/>
					<text class="text">搜索</text>
				</navigator>
			</view>
		</view>
		<view class="fill" :style="{ height: getNavBarHeight() + 'px' }"></view>
	</view>
</template>

<script setup>
import { getStatusBarHeight, getTitleBarHeight, getNavBarHeight, getLeftIconLeft } from '@/utils/system.js';

defineProps({
	title: {
		type: String,
		default: '壁纸'
	}
});
</script>

<style lang="scss" scoped>
.layout {
	.navbar {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 10;
		background: linear-gradient(to bottom, transparent, #fff 400rpx), linear-gradient(to right, #beecd8 20%, #f4e2d8);
		.statusBar {
		}
		.titleBar {
			display: flex;
			align-items: center;
			padding: 0 30rpx;
			.title {
				font-size: 22px;
				font-weight: 700;
				color: $text-font-color-1;
			}
			.search {
				width: 220rpx;
				height: 50rpx;
				margin-left: 30rpx;
				border-radius: 60rpx;
				display: flex;
				align-items: center;
				background-color: rgba(255, 255, 255, 0.4);
				border-radius: 1px solid #fff;
				color: #999;
				.icon {
					margin-left: 5rpx;
				}
				.text {
					padding-left: 10rpx;
				}
			}
		}
	}
}
</style>
