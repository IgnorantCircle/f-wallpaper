const SYSTEM_INFO= uni.getSystemInfoSync();

export const getStatusBarHeight = ()=>{
	return SYSTEM_INFO.statusBarHeight || 15
}

export const getTitleBarHeight = ()=>{
	if(uni.getMenuButtonBoundingClientRect){
		let {top=48,height=32} = uni.getMenuButtonBoundingClientRect();
		return height + (top - getStatusBarHeight())*2
	}else{
		return 40
	}
}

export const getNavBarHeight = ()=>getStatusBarHeight() + getTitleBarHeight()

export const getLeftIconLeft = ()=> {
	//抖音小程序左边图标适配
	// #ifdef MP-TOUTIAO
		let {leftIcon:{left,width}}  = tt.getCustomButtonBoundingClientRect();
		return left+ parseInt(width);
	// #endif
	
	// #ifndef MP-TOUTIAO
		return 0
	// #endif	
}