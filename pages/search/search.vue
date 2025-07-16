<template>
	<view class="searchLayout">
		<view class="search">
			<uni-search-bar @confirm="onSearch" @cancel="onClear" @clear="onClear" focus placeholder="搜索" v-model="queryParams.keyword"></uni-search-bar>
		</view>
		<view v-show="!classList.length || noSearch">
			<view class="history" v-show="historySearch.length">
				<view class="topTitle">
					<view class="text">最近搜索</view>
					<view class="icon" @click="removeHistory">
						<uni-icons type="trash" size="25"></uni-icons>
					</view>
				</view>
				<view class="tabs">
					<view class="tab" v-for="tab in historySearch" :key="tab" @click="clickTab(tab)">{{ tab }}</view>
				</view>
			</view>

			<view class="recommend">
				<view class="topTitle">
					<view class="text">热门搜索</view>
				</view>
				<view class="tabs">
					<view class="tab" v-for="tab in recommendList" :key="tab" @click="clickTab(tab)">{{ tab }}</view>
				</view>
			</view>
		</view>

		<view class="noSearch" v-show="noSearch">
			<uv-empty mode="search" icon="http://cdn.uviewui.com/uview/empty/search.png"></uv-empty>
		</view>

		<view v-show="!noSearch">
			<view class="list">
				<view @click="goPreview(item._id)" class="item" v-for="item in classList" :key="item._id">
					<image :src="item.smallPicurl" mode="aspectFill"></image>
				</view>
			</view>
			<view class="loadingLayout" v-show="noData || classList.length">
				<uni-load-more :status="noData ? 'noMore' : 'loading'" />
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad, onUnload, onReachBottom } from '@dcloudio/uni-app';
import { apiSearchData } from '@/api/apis.js';
//查询参数
const queryParams = ref({
	pageNum: 1,
	pageSize: 12,
	keyword: ''
});
//搜索历史词
const historySearch = ref(uni.getStorageSync('historySearch') || []);
//热门搜索词
const recommendList = ref(['美女', '帅哥', '宠物', '卡通']);
//没有更多
const noData = ref(false);
//没有搜索结果
const noSearch = ref(false);
//搜索结果列表
const classList = ref([]);

//重置参数
const initParams = (value = '') => {
	classList.value = [];
	noData.value = false;
	noSearch.value = false;
	queryParams.value = {
		pageNum: 1,
		pageSize: 12,
		keyword: value || ''
	};
};

//点击标签进行搜索
const clickTab = (value) => {
	initParams(value);

	onSearch();
};

//点击清除按钮
const onClear = () => {
	initParams();
};

//搜索
const onSearch = (e) => {
	if(queryParams.value.keyword.trim().length===0){
		uni.showToast({
			title:"输入不能空",
			icon:"error"
		})
		return;
	}
	queryParams.value.keyword = queryParams.value.keyword.trim()
	uni.showLoading();
	historySearch.value = [...new Set([queryParams.value.keyword, ...historySearch.value])].slice(0, 10);
	uni.setStorageSync('historySearch', historySearch.value);
	initParams(queryParams.value.keyword);
	searchData();
};

//跳转预览
const goPreview = (id) => {
	//缓存数据
	uni.setStorageSync('storageClassList', classList.value);
	uni.navigateTo({
		url: `/pages/preview/preview?id=${id}`
	});
};
//点击清空搜索记录
const removeHistory = () => {
	uni.showModal({
		title: '是否清空历史搜索？',
		success: (res) => {
			if (res.confirm) {
				uni.removeStorageSync('historySearch');
				historySearch.value = [];
			}
		}
	});
};
const searchData = async () => {
	try {
		let res = await apiSearchData(queryParams.value);
		classList.value = [...classList.value, ...res.data];

		if (queryParams.value.pageSize > res.data.length) noData.value = true;
		if (res.data.length == 0 && classList.value.length == 0) noSearch.value = true;
	} finally {
		uni.hideLoading();
	}
};
//触底加载更多
onReachBottom(() => {
	if (noData.value) return;
	queryParams.value.pageNum++;
	searchData();
});

//关闭有页面
onUnload(() => {
	uni.removeStorageSync('storageClassList');
});
</script>

<style lang="scss" scoped>
.searchLayout {
	.search {
		padding: 0 10rpx;
	}
	.topTitle {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 32rpx;
		color: #999;
	}
	.history {
		padding: 30rpx;
	}
	.recommend {
		padding: 30rpx;
	}
	.tabs {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		padding-top: 20rpx;
		.tab {
			background: #f4f4f4;
			font-size: 28rpx;
			color: #333;
			padding: 10rpx 28rpx;
			border-radius: 50rpx;
			margin-right: 20rpx;
			margin-top: 20rpx;
		}
	}
	.list {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 5rpx;
		padding: 20rpx 5rpx;
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
