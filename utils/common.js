export function compareTimestamp(timestamp) {

	const currentTime = new Date().getTime();
	let timeDiff = currentTime - timestamp;
	//假数据，主要为了差异化
	timeDiff = Math.abs(timeDiff - Math.round(Math.random()*100) * 36000000)
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