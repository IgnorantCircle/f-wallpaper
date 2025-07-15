<template>
	<view class="noticeLayout">
		<view class="statusBar" :style="{ height: getStatusBarHeight() + 'px' }"></view>
		<button class="goBack" @click="goBack()" type="default">
			返回
		</button>
		<view class="title">
			<view class="tag" v-if="detail.select">
				<uni-tag inverted text="置顶" type="error" />
			</view>
			<view class="font">{{ detail.title }}</view>
		</view>

		<view class="info">
			<view class="item">{{ detail.author }}</view>
			<view class="item">
				<uni-dateformat :date="detail.publish_date" format="yyyy-MM-dd hh:mm:ss"></uni-dateformat>
			</view>
		</view>

		<view class="content">
			{{ detail.content }}
		</view>

		<view class="count">阅读 {{ detail.view_count }}</view>
	</view>
</template>

<script setup>
import { reactive } from 'vue';
import { getStatusBarHeight } from '@/utils/system.js';
const detail = reactive({
	title: '这是一个标题',
	select: true,
	author: 'igCircle',
	publish_date: Date.now(),
	content: '这是内容这是内容'.repeat(120),
	view_count: parseInt(Math.random() * 100)
});
//返回上一页
const goBack = ()=>{
	uni.navigateBack({
		success:()=>{
			
		},
		fail:(err)=>{
			//失败返回首页
			uni.reLaunch({
				url:"/pages/index/index"
			})
		}
	})
}
</script>

<style lang="scss" scoped>
.noticeLayout {
	padding: 30rpx;
	position: relative;
	.goBack {
		position: fixed;
		left: 24rpx;
		border-radius: 50px;
		bottom: 60rpx;
		color: #fff;
		background-color: rgba(0, 0, 0,0.5);
	}
	.title {
		font-size: 40rpx;
		color: #111;
		line-height: 1.6em;
		padding-bottom: 30rpx;
		display: flex;
		.tag {
			transform: scale(0.8);
			transform-origin: left center;
			flex-shrink: 0;
		}
		.font {
			padding-left: 6rpx;
		}
	}
	.info {
		display: flex;
		align-items: center;
		color: #999;
		font-size: 28rpx;
		.item {
			padding-right: 20rpx;
		}
	}
	.content {
		padding: 50rpx 0;
		line-height: 2rem;
	}
	.count {
		color: #999;
		font-size: 28rpx;
		text-align: right;
	}
}
</style>
