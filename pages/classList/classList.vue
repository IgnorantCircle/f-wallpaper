<template>
	<view class="classList">
		<view class="loadingLayout" v-if="!classList.length && !noData">
			<uni-load-more status="loading"></uni-load-more>
		</view>
		<view class="content">
			<navigator :url="'/pages/preview/preview?id=' + item._id" v-for="item in classList" class="item" :key="item._id">
				<image :src="item.smallPicurl" mode="aspectFill"></image>
			</navigator>
		</view>
		<view class="loadingLayout" v-if="classList.length || noData">
			<uni-load-more :status="noData ? 'noMore' : 'loading'"></uni-load-more>
		</view>
		<view class="safe-area-inset-bottom"></view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { apiGetClassList, apiGetHistoryList } from '@/api/apis.js';
import { onLoad, onUnload, onReachBottom, onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app';
import { debounce, goHome } from '@/utils/common.js';
//分类列表数据
const classList = ref([]);
const noData = ref(false);
//定义data参数
const queryParams = {
	pageNum: 1,
	pageSize: 12
};
let pageName;
const getClassList = async () => {
	let res;
	if (queryParams.classid) {
		res = await apiGetClassList(queryParams);
	}else if (queryParams.type) {
		res = await apiGetHistoryList(queryParams);
	}
	classList.value = [...classList.value, ...res.data];

	//判断还是有没有数据,因为一次12条，如果最后一次少于12条，说明后面
	if (queryParams.pageSize > res.data.length) {
		noData.value = true;
	}
	//缓存数据
	uni.setStorageSync('storageClassList', classList.value);
};
onLoad((e) => {
	const { id = null, name = null, type = null } = e;	
	//如果没有带id和type，就返回首页
	if (!id&&!type) {
		noData.value = true;
		goHome();
	} else {
		if (type) queryParams.type=type;
		queryParams.classid = id;
		pageName = name;
		//修改导航标题
		uni.setNavigationBarTitle({
			title: name
		});
		//获取分类列表
		getClassList();
	}
});

onReachBottom(() => {
	if (noData.value) return;

	debounceGetClassList();
});

const debounceGetClassList = debounce(() => {
	queryParams.pageNum++;
	getClassList();
}, 1000);

//分享给好友
onShareAppMessage((e) => {
	return {
		title: '每日壁纸-' + pageName,
		path: '/pages/classList/classList?id=' + queryParams.classid + '&name=' + pageName
	};
});
//分享朋友圈
onShareTimeline(() => {
	return {
		title: '每日壁纸-' + pageName,
		query: 'id=' + queryParams.classid + '&name=' + pageName
	};
});
onUnload(() => {
	uni.removeStorageSync('storageClassList');
});
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
