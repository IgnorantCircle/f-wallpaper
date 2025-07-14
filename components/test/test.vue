<template>
	<view class="section">
		<navigator url="" class="list">
			<view class="row">
				<view class="left">
					<uni-icons :type="userSeciton.icon" size="20"></uni-icons>
					<view class="text">{{userSeciton.text}}</view>
				</view>
				<view class="right">
					<view class="text" v-if="userSeciton.isShowNum">0</view>
					<uni-icons type="right" size="15" color="#aaa"></uni-icons>
				</view>
			</view>
		</navigator>
	</view>
</template>

<script setup>
	defineProps({
		userSeciton:{
			type:Object,
			default(){
				return{
					icon:"more-filled",
					text:"敬请期待",
					ishowNumber:false
				}
			}
		}
	})
</script>

<style lang="scss" scoped>
.section {
	width: 690rpx;
	margin: 50rpx auto;
	border: 1px, solid #eee;
	border-radius: 10rpx;
	box-shadow: 0 0 30rpx rgba(0, 0, 0, 0.05);
	.list {
		.row {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 30rpx;
			height: 100rpx;
			border-bottom: 1px solid #eee;
			position: relative;
			background-color: #fff;
			&:last-child {
				border-bottom: 0;
			}
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
			button {
				position: absolute;
			}
		}
	}
}
</style>
