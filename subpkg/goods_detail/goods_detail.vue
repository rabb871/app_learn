<template>
	<view>
		<view class="goods-detail-container">
			商品详情页
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goods_id: null
			};
		},
		onLoad(options) {
			// 获取商品 id
			if (options.goods_id) {
				this.goods_id = options.goods_id
			}
		}
	}
</script>

<style lang="scss">
	.goods-detail-container {
		padding: 20rpx;
	}
</style>