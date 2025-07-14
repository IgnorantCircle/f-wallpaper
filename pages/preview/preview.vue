<template>
	<view class="preview">
		<swiper circular :interval="1500" :duration="1000">
			<swiper-item v-for="item in 5">
				<image src="/common/images/preview1.jpg" mode="aspectFill"></image>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item"></view>
			</swiper-item>
		</swiper>
	</view>
	<view class="mask">
		<view class="goBack">
			<uni-icons type="back" ></uni-icons>
			<view class="count">3/9</view>
			<view class="date">
				14/07
			</view>
			<view class="footer">
				<view class="box">
					<uni-icons type="info"></uni-icons>
					<view class="text">信息</view>
				</view>
				<view class="box">
					<uni-icons type="star"></uni-icons>
					<view class="text">评分</view>
				</view>
				<view class="box">
					<uni-icons type="download"></uni-icons>
					<view class="text">下载</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script setup></script>

<style lang="scss" scoped>
.preview {
	width: 100%;
	height: 100vh;
	position: relative;
	swiper {
		width: 100%;
		height: 100%;
		swiper-item{
		image {
			width: 100%;
			height: 100%;
		}	
		}
		
	}
}
.mask{
	&>view{
		color:#fff
	}
	.goBack{
		width:38px;
		height: 38px;
		background-color: rgba(0,0,0,0.5);
	}
	.count{
		position: absolute;
		top: 10vh;
		left: 0;
		right: 0;
		margin: auto;
		width: fit-content;
		background-color: rgba(0,0,0,0.3);
		font-size: 28rpx;
		border-radius: 40rpx;
		padding: 8rpx 28rpx;
		backdrop-filter: blur(10rpx);
		
	}
	.time{
		
	}
	.date{
		
	}
	.footer{
		
	}
}
</style>
