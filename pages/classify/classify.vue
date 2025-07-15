<template>
	<view class="layout pageBg">
		<custom-nav-bar title="分类"></custom-nav-bar>
		<view class="classify">
			<theme-item v-for="item in 15"></theme-item>
		</view>
	</view>
</template>

<script setup></script>

<style lang="scss" scoped>
.classify {
	padding: 30rpx;
	display: grid;
	gap: 15rpx;
	grid-template-columns: repeat(3, 1fr);
}
</style>
