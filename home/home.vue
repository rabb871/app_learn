<template>
  <view>
	<!-- 自定义的搜索组件 -->
	<view class="search-box">
	  <my-search @click="gotoSearch"></my-search>
	</view>
  
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <!-- 循环渲染item项 -->
		<swiper-item v-for="(item, i) in swiperList" :key="i">
			<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
			  <!-- 动态绑定图片的 src 属性 -->
			  <image :src="item.image_src"></image>
			</navigator>
		</swiper-item>
    </swiper>
	
	<view class="nav-list">
	  <view class="nav-item" v-for="(item, i) in navList" :key="i" @click="navClickHandler(item)">
		<image :src="item.image_src" class="nav-img"></image>
	  </view>
	</view>
	
	<view class="floor-list">
	      <view class="floor-item" v-for="(item,i) in floorList" :key="i">
	        <!-- 楼层标题 -->
	        <image :src="item.floor_title.image_src" class="floor-title"></image>
	        <!-- 楼层图片区域 -->
			<view class="floor-img-box" v-if="item.product_list && item.product_list.length > 0">
			  <!-- 左侧大图片的盒子 -->
			  <navigator class="left-img-box" :url="item.product_list[0].url || ''">
				<image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
			  </navigator>
			  <!-- 右侧 4 个小图片的盒子 -->
			  <view class="right-img-box">
				<navigator class="right-img-item" v-for="(item2, i2) in item.product_list.slice(1)" :key="i2" :url="item2.url || ''">
				  <image :src="item2.image_src" mode="widthFix" :style="{width: item2.image_width + 'rpx'}"></image>
				</navigator>
			  </view>
			</view>
	      </view>
	</view>


  </view>
</template>


<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	export default {
		mixins: [badgeMix],
		data() {
			return {
				//轮播图的数据列表
				swiperList: [],
				// 分类导航的数据列表
				navList: [],
				floorList: [],
			};
		},
		onLoad(){
			//调用方法，获取轮播图的数据
			this.getSwiperList()
			this.getNavList()
			this.getFloorList()

		},
		methods: {
			async getSwiperList(){
				const {data: res} = await uni.$http.get('/api/public/v1/home/swiperdata')
				console.log('完整响应数据：', res)
				//请求失败
				if(res.meta.status !==200) {
					return uni.$showMsg('数据请求失败！')
				}
				//请求成功
				console.log('轮播图数据：', res.message)
				this.swiperList = res.message
				console.log('赋值后的swiperList：', this.swiperList)
			},
			async getNavList() {
			  const { data: res } = await uni.$http.get('/api/public/v1/home/catitems')
			  if (res.meta.status !== 200) return uni.$showMsg()
			  this.navList = res.message
			},
			navClickHandler(item) {
			  // 判断点击的是哪个 nav
			  if (item.name === '分类') {
			    uni.switchTab({
			      url: '/pages/cate/cate'
			    })
			  }
			},
			async getFloorList() {
			  const { data: res } = await uni.$http.get('/api/public/v1/home/floordata')
			  if (res.meta.status !== 200) return uni.$showMsg()
			  // 处理楼层数据，为每个商品添加跳转链接
			  res.message.forEach(floor => {
			    floor.product_list.forEach(prod => {
			      // 处理跳转链接，确保格式正确
			      if (prod.navigator_url) {
			        const urlParts = prod.navigator_url.split('?')
			        if (urlParts.length > 1) {
			          prod.url = '/subpkg/goods_list/goods_list?' + urlParts[1]
			        } else {
			          // 如果没有参数，使用默认路径
			          prod.url = '/subpkg/goods_list/goods_list'
			        }
			      } else {
			        prod.url = '/subpkg/goods_list/goods_list'
			      }
			    })
			  })
			  this.floorList = res.message
			  console.log('楼层数据：', this.floorList)
			},
			// gotoGoodsList(item) {
			//   uni.navigateTo({
			//     url: '/subpkg/goods_list/goods_list?query=' + item.navigator_url
			//   })
			// },
			
			gotoSearch() {
			  uni.navigateTo({
			    url: '/subpkg/search/search'
			  })
			}

		}
	}
</script>

<style lang="scss">
  swiper{
	height: 330rpx;
	.swiper-item,image {
	  height:100% ;
	  width: 100%;
	}
  }
  
  .nav-list {
    display: flex;
    justify-content: space-around;
    margin: 15px 0;
  
    .nav-img {
      width: 128rpx;
      height: 140rpx;
    }
  }
  
  .floor-title {
      height: 60rpx;
      width: 100%;
      display: flex;
    }
    .right-img-box {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
    }
    .floor-img-box {
      display: flex;
      padding-left: 10rpx;
    }
	
	.search-box {
	  position: sticky;
	  top: 0;
	  z-index: 999;
	}

	

</style>
