<template>
	<view class="classList">
		<view class="loadingLayout">
			<uni-load-more status="loading"></uni-load-more>
		</view>
		<view class="content">
			<navigator url="" v-for="item in 10" class="item">
				<image src="/common/images/preview2.jpg" mode="aspectFill"></image>
			</navigator>
		</view>
	</view>
</template>

<script setup>
	
</script>

<style lang="scss" scoped>
.classList {
	.content {
		display: grid;
		gap: 5rpx;
		padding: 5rpx;
		grid-template-columns: repeat(3, 1fr);
		.item {
			height: 440rpx;
			image {
				width: 100%;
				height: 100%;
				display: block;
			}
		}
	}
}
</style>
