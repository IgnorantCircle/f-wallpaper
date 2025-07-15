//网络提供的借口，自行替换
const BASE_URL = 'https://tea.qingnian8.com/api/bizhi';

export function request(config = {}) {
	let {
		url,
		data = {},
		method = "GET",
		header = {}
	} = config
	url = BASE_URL + url,
		header['access-key'] = "xxm123321@#"
	return new Promise((resolve, reject) => {
		uni.request({
			url,
			data,
			header,
			success(res) {
				if (res.data.errCode === 0) {
					resolve(res.data)
				} else if (res.data.errCode === 400) {
					uni.showModal({
						title: "错误提示",
						content: res.data.errMsg || "请求错误，请刷新后重试！",
						showCancel: false
					})
					reject(res.data)
				} else {
					uni.showToast({
						title: res.data.errMsg || "网络错误",
						icon: "none"
					});
				}
			},
			fail(err) {
				reject(err)
			}
		})
	})
}