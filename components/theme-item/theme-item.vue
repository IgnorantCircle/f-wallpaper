<template>
	<view class="themeItem">
		<navigator :url="'/pages/classList/classList?id='+listItem._id+'&name='+listItem.name"  class="box" v-if="!isMore">
			<image class="pic" :src="listItem.picurl"></image>
			<view class="mask">{{ listItem.name }}</view>
			<!-- 假数据，为了更好区分 -->
			<view class="tab" v-if="compareTimestamp(listItem.updateTime)">{{ compareTimestamp(listItem.updateTime) }}前更新</view>
		</navigator>

		<navigator url="/pages/classify/classify" class="box more" open-type="reLaunch" v-if="isMore">
			<image class="pic" src="/common/images/more.jpg"></image>
			<view class="mask">
				<uni-icons type="more-filled" size="34" color="#fff"></uni-icons>
				<view class="text">更多</view>
			</view>
		</navigator>
	</view>
</template>

<script setup>
import { compareTimestamp } from '@/utils/common.js';
defineProps({
	isMore: {
		type: Boolean,
		default: false
	},
	listItem: {
		type: Object,
		default() {
			return {
				name: '默认名称',
				picUrl: '../../common/images/classify1.jpg',
				updateTime: Date.now() - 1000 * 60 * 60 * 5
			};
		}
	}
});
</script>

<style lang="scss" scoped>
.themeItem {
	.box {
		height: 340rpx;
		border-radius: 10rpx;
		overflow: hidden;
		position: relative;
		.pic {
			width: 100%;
			height: 100%;
		}
		.mask {
			width: 100%;
			height: 70rpx;
			position: absolute;
			bottom: 0;
			left: 0;
			background-color: rgb(0, 0, 0, 0.2);
			color: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
			backdrop-filter: blur(20rpx);
			font-weight: 600;
			font-size: 30rpx;
		}
		.tab {
			position: absolute;
			top: 0;
			left: 0;
			color: #fff;
			background-color: rgb(250, 129, 90, 0.7);
			font-size: 22rpx;
			padding: 6rpx 14rpx;
			border-bottom-right-radius: 20rpx;
			transform: scale(0.8);
			transform-origin: left top;
		}
	}
	.box.more {
		.mask {
			width: 100%;
			height: 100%;
			flex-direction: column;
		}
		.text {
			font-size: 28rpx;
		}
	}
}
</style>
