import {
	request
} from "@/utils/request.js"

export function apiGetBanner(){
	return request({
		url:"/homeBanner"
	})
}

export function apiGetDayRandom(){
	return request({url:"/randomWall"})
}

export function apiGetClassify(data={}){
	return request({
		url:"/classify",
		data
	})
}
export function apiGetClassList(data={}){
	return request({
		url:"/wallList",
		data
	})
}

export function apiGetHistoryList(data={}){
	return request({
		url:"/userWallList",
		data
	})
}