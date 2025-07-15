<template>
	<view class="preview">
		<swiper circular :interval="1500" :duration="1000">
			<swiper-item v-for="item in 5">
				<image src="/common/images/preview1.jpg" mode="aspectFill" @click="maskChange"></image>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item"></view>
			</swiper-item>
		</swiper>

		<!-- 遮罩层 -->
		<view class="mask" v-show="maskState">
			<view class="goBack">
				<uni-icons type="back"></uni-icons>
			</view>
			<view class="count">3/9</view>
			<view class="time">
				<uni-dateformat :date="new Date()" format="hh:mm"></uni-dateformat>
			</view>
			<view class="date">
				<uni-dateformat :date="new Date()" format="MM月dd日" />
			</view>
			<view class="footer">
				<view class="box" @click="openInfoView">
					<uni-icons type="info" size="28"></uni-icons>
					<view class="text">信息</view>
				</view>
				<view class="box" @click="openRateView">
					<uni-icons type="star" size="28"></uni-icons>
					<view class="text">评分</view>
				</view>
				<view class="box">
					<uni-icons type="download" size="25"></uni-icons>
					<view class="text">下载</view>
				</view>
			</view>
		</view>

		<!-- 信息弹窗 -->
		<uni-popup ref="infoPopup" type="bottom">
			<view class="infoPopup">
				<view class="popHeader">
					<!-- 占位符，用于布局分配 -->
					<view></view>
					<view class="title">壁纸信息</view>
					<view class="close" @click="closeInfoView">
						<uni-icons type="closeempty" size="18" color="#999"></uni-icons>
					</view>
				</view>
				<scroll-view scroll-y>
					<view class="content">
						<view class="row">
							<view class="label">壁纸ID：</view>
							<text class="value">12345648855</text>
						</view>
						<view class="row">
							<view class="label">发布者：</view>
							<text class="value">xxx</text>
						</view>
						<view class="row">
							<view class="label">评分：</view>
							<view class="value rateBox">
								<uni-rate value="5" readonly touchable size="16" />
								<text class="score">5分</text>
							</view>
						</view>
						<view class="row">
							<view class="label">摘要：</view>
							<text class="value">xxx</text>
						</view>
						<view class="row">
							<view class="label">标签：</view>
							<view class="value tabs">
								<view class="tab" v-for="tab in 4">baji</view>
							</view>
						</view>
						<view class="copyright">声明：本图片来用户投稿，非商业使用，用于免费学习交流，如侵犯了您的权益，您可以拷贝壁纸ID举报至平台，管理将删除侵权壁纸，维护您的权益。
						</view>
					</view>
				</scroll-view>
			</view>
		</uni-popup>
	<!-- 评分弹窗 -->
	<uni-popup ref="ratePopup" type="center" :is-mask-click="false">
		<view class="ratePopup">
			<view class="popHeader">
				<view></view>
				<view class="title">
					{{isScore?'评分过了～':'壁纸评分'}}
				</view>
				<view class="close" @click="closeRateView">
					<uni-icons type="closeempty" size="18" color="#999"></uni-icons>
				</view>
			</view>
			
		<view class="content">
			<uni-rate v-model="userScore" allowHalf :disabled="isRate" disabled-color="#FFCA3E"/>
			<text class="text">
				{{userScore}}分
			</text>
		</view>
		<view class="footer">
			<button type="default" :disabled="!userScore" size="mini" @click="submitScore">
				确认评分
			</button>
		</view>
		</view>
	</uni-popup>
	</view>
</template>

<script setup>
import { reactive, ref } from 'vue';

const maskState = ref(true);
const infoPopup = ref(null);
const ratePopup = ref(null);
const userScore = ref(0);

//点击info弹窗
const openInfoView = () => {
	
	infoPopup.value.open();
};
const closeInfoView = ()=>{
	infoPopup.value.close()
}

//点击评分弹窗
const openRateView = ()=>{
	ratePopup.value.open()
}
const closeRateView = ()=>{
	ratePopup.value.close()
}


const maskChange = () => {
	maskState.value = !maskState.value;
};

const submitScore = ()=>{
	console.log(userScore.value)
}
</script>

<style lang="scss" scoped>
.preview {
	width: 100%;
	height: 100vh;
	position: relative;
	swiper {
		width: 100%;
		height: 100%;
		swiper-item {
			image {
				width: 100%;
				height: 100%;
			}
		}
	}
	.mask {
		& > view {
			position: absolute;
			color: #fff;
			margin: auto;
			left: 0;
			right: 0;
			width: fit-content;
		}
		.goBack {
			width: 38px;
			height: 38px;
			background: rgba(0, 0, 0, 0.5);
			left: 30rpx;
			margin-left: 0;
			border-radius: 100px;
			top: 0;
			backdrop-filter: blur(10rpx);
			border: 1rpx solid rgba(255, 255, 255, 0.3);
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.count {
			top: 10vh;
			background-color: rgba(0, 0, 0, 0.3);
			font-size: 28rpx;
			border-radius: 40rpx;
			padding: 8rpx 28rpx;
			backdrop-filter: blur(10rpx);
		}
		.time {
			font-size: 140rpx;
			top: calc(10vh + 80rpx);
			font-size: 100;
			line-height: 1em;
			text-shadow: 0 4rpx rgba(0, 0, 0, 0.3);
		}
		.date {
			font-size: 34rpx;
			top: calc(10vh + 230rpx);
			text-shadow: 0 2rpx rgba(0, 0, 0, 0.3);
		}
		.footer {
			background-color: rgba(255, 255, 255, 0.8);
			bottom: 10vh;
			width: 65vw;
			height: 120rpx;
			border-radius: 120rpx;
			color: #000;
			display: flex;
			justify-content: space-around;
			align-items: center;
			backdrop-filter: blur(20rpx);
			box-shadow: 0 2rpx 0 rgba(0, 0, 0, 0.1);
			.box {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				padding: 2rpx 12rpx;
				.text {
					font-size: 26rpx;
					color: $text-font-color-2;
				}
			}
		}
	}

	.popHeader {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 40rpx;
		.title {
			color: $text-font-color-2;
			font-size: 26rpx;
		}

		.close {
			padding: 6rpx;
		}
	}

	.infoPopup {
		background-color: #fff;
		padding: 30rpx;
		border-radius: 30rpx 30rpx 0 0;
		overflow: hidden;
		scroll-view {
			max-height: 60vh;
			.content {
				.row {
					display: flex;
					padding: 16rpx 0;
					font-size: 32rpx;
					line-height: 1.7rem;
					.label {
						color: $text-font-color-3;
						width: 140rpx;
						text-align: right;
						font-size: 30rpx;
					}
					.value {
						flex: 1;
						width: 0;
					}
					.rateBox{
						display: flex;
						align-items: center;
						.score{
							font-size: 26rpx;
							color: $text-font-color-2;
							padding-left: 10rpx;
						}
					}
					.tabs {
						display: flex;
						flex-wrap: wrap;
						.tab {
							border: 1px solid $brand-theme-color;
							color: $brand-theme-color;
							font-size: 22rpx;
							padding: 10rpx 30rpx;
							line-height: 1em;
							border-radius: 40rpx;
							margin: 0 10rpx 10rpx 0;
						}
					}
					}
				.copyright{
					font-size: 28rpx;
					padding: 20rpx;
					background-color: #F6F6F6;
					color:#666;
					border-radius: 10rpx;
					margin: 20rpx 0;
					line-height: 1.6em;
				}
				
			}
		}
	}

	.ratePopup{
		background-color: #fff;
		padding: 30rpx;
		width: 70vw;
		border-radius: 30rpx;
		.content{
			padding: 30rpx 0;
			display: flex;
			justify-content: center;
			align-items: center;
			.text{
				color: #FFCA3E;
				padding-left: 10rpx;
				width: 80rpx;
				line-height: 1em;
				text-align: right;
				font-size: 28rpx;
			}
		}
		.footer{
			padding:10rpx 0;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
}
</style>
