<template>
	<view class="noticeLayout">
		<view class="statusBar" :style="{ height: getStatusBarHeight() + 'px' }"></view>

		<view class="title">敬请期待！</view>
	</view>
</template>
<script setup>
	import { getStatusBarHeight } from '@/utils/system.js';
	
</script>

<style lang="scss" scoped>
	.noticeLayout{
		padding: 30rpx;
		.title{
			font-size: 64rpx;
		}
	}
</style>
