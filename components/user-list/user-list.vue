<template>
	<navigator url="" class="list">
		<view class="row">
			<view class="left">
				<uni-icons :type="listInfo.icon" size="20"></uni-icons>
				<view class="text">{{ listInfo.text }}</view>
			</view>
			<view class="right">
				<view class="text" v-if="listInfo.isShowNum">0</view>
				<uni-icons type="right" size="15" color="#aaa"></uni-icons>
			</view>
			<view class="contactBtn">
				<slot name="contact" />
			</view>
		</view>
	</navigator>
</template>

<script setup>
import { reactive } from 'vue';

defineProps({
	listInfo: {
		type: Object,
		default() {
			return {
				icon: 'more-filled',
				text: '敬请期待',
				isShowNum: false
			};
		}
	}
});
const userinfo = reactive({})


</script>

<style lang="scss" scoped>
.list {
	.row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 30rpx;
		height: 100rpx;
		position: relative;
		background-color: #fff;
		.left {
			display: flex;
			align-items: center;
			:deep() {
				.uni-icons {
					color: $brand-theme-color !important;
				}
			}
			.text {
				padding-left: 20rpx;
				color: #666;
			}
		}
		.right {
			display: flex;
			align-items: center;
			.text {
				font-size: 28rpx;
				color: #aaa;
			}
		}
		.contactBtn {
			position: absolute;
			top: 0;
			left: 0;
			height: 100rpx;
			width: 100%;
			opacity: 0;
		}
	}
}
</style>
