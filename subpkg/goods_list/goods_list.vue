<template>
	<view>
		<view class="goods-list-container">
			商品列表页
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryObj: {}
			};
		},
		onLoad(options) {
			// 获取查询参数
			this.queryObj = options
			console.log('商品列表查询参数：', options)
		}
	}
</script>

<style lang="scss">
	.goods-list-container {
		padding: 20rpx;
	}
</style>