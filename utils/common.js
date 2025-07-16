export function compareTimestamp(timestamp) {

	const currentTime = new Date().getTime();
	let timeDiff = currentTime - timestamp;
	//假数据，主要为了差异化
	timeDiff = Math.abs(timeDiff - Math.round(Math.random() * 100) * 36000000)
	switch (true) {
		case timeDiff < 60000:
			return '1分钟内';
		case timeDiff < 3600000:
			return Math.floor(timeDiff / 60000) + '分钟';
		case timeDiff < 86400000:
			return Math.floor(timeDiff / 3600000) + '小时';
		case timeDiff < 2592000000:
			return Math.floor(timeDiff / 86400000) + '天';
		case timeDiff < 7776000000:
			return Math.floor(timeDiff / 2592000000) + '个月';
		default:
			return null;
	}
}


/**
 * 创建一个防抖函数，该函数在最后一次调用后延迟 delay 毫秒执行
 * @param {Function} func - 需要防抖的函数
 * @param {number} delay - 延迟时间（毫秒）
 * @param {boolean} [immediate=false] - 是否立即执行（首次调用时）
 * @returns {Function} - 防抖后的函数
 */

export function debounce(func, delay, immediate = false) {
	let timer = null;
	return function(...args) {
		const context = this;
		//如果有定时器，清除
		if (timer) {
			clearTimeout(timer)
		}
		//立即执行
		if (immediate && !timer) {
			//this 指向保持不变
			func.apply(context, args)
		}
		// 设置新的定时器
		timer = setTimeout(() => {
			timer = null;
			if (!immediate) {
				try {
					func.apply(context, args); // 确保函数执行时上下文和参数正确
				} catch (error) {
					console.error('防抖函数执行错误:', error);
				}
			}
		}, delay);
	};
}


export const goHome = ()=>{
	uni.showModal({
		title: "提示",
		content: "页面有误，将返回页面",
		showCancel: false,
		success(res) {
			if (res.confirm) {
				uni.reLaunch({
					url: "/pages/index/index"
				})
			}
		}
	})
}