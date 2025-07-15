<template>
	<view class="layout pageBg">
		<!-- #ifndef MP-TOUTIAO -->
		<custom-nav-bar title="分类"></custom-nav-bar>
		<!-- #endif -->
		<view class="classify">
			<theme-item v-for="item in classifyList" :key="item._id" :listItem="item"></theme-item>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app';
import { apiGetClassify } from '@/api/apis.js';
const classifyList = ref([]);

const getClassify = async () => {
	let res = await apiGetClassify({
		pageSize: 15
	});
	classifyList.value = res.data;
};

//分享给好友
onShareAppMessage((e) => {
	return {
		title: '每日壁纸，精选分类',
		path: '/pages/classify/classify'
	};
});

//分享朋友圈
onShareTimeline(() => {
	return {
		title: '每日壁纸，精选分类'
	};
});
getClassify();
</script>

<style lang="scss" scoped>
.classify {
	padding: 30rpx;
	display: grid;
	gap: 15rpx;
	grid-template-columns: repeat(3, 1fr);
}
</style>
