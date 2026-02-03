<template>
	<view class="search-box">
	  <!-- uni-ui提供的搜索组件 -->
	  <uni-search-bar @input="input" :radius="100" cancelButton="none" :focus="true"></uni-search-bar>
	</view>
	
	<!-- 搜索建议列表 -->
	<view class="sugg-list" v-if="searchResults.length !== 0">
	  <view class="sugg-item" v-for="(item, i) in searchResults" :key="i" @click="gotoDetail(item.goods_id)">
	    <view class="goods-name">{{item.goods_name}}</view>
	    <uni-icons type="arrowright" size="16"></uni-icons>
	  </view>
	</view>
	
	<!-- 搜索历史 -->
	<view class="history-box" v-else>
	  <view class="history-title">
	    <text>搜索历史</text>
	    <uni-icons type="trash" size="17" @click="cleanHistory"></uni-icons>
	  </view>
	  <view class="history-list">
	    <uni-tag :text="item" v-for="(item, i) in historys" :key="i" @click="gotoGoodsList(item)"></uni-tag>
	  </view>
	</view>


</template>

<script>
	export default {
		data() {
			return {
				// 延时器的 timerId
				timer: null,
				// 搜索关键词
				kw: '',
				// 搜索结果列表
				searchResults: [],
				// 搜索关键词的历史记录
				historyList: ['a', 'app', 'apple']
			};
		},
		onLoad() {
		  this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
		},
		methods: {
		  input(e) {
		    // 清除 timer 对应的延时器
		    clearTimeout(this.timer)
		    // 重新启动一个延时器，并把 timerId 赋值给 this.timer
		    this.timer = setTimeout(() => {
		      // 获取输入值，e 可能是字符串或者是事件对象
		      const value = typeof e === 'string' ? e : (e.value || e.detail?.value || '')
		      // 去除输入值的前后空格
		      this.kw = value.trim()
		      console.log('搜索关键词：', this.kw)
		      // 根据关键词，查询搜索建议列表
		      this.getSearchList()
		    }, 500)
		  },
		  
		  // 根据搜索关键词，搜索商品建议列表
		  async getSearchList() {
		    // 判断关键词是否为空
		    if (this.kw === '') {
		      this.searchResults = []
		      return
		    }
		    // 发起请求，获取搜索建议列表
		    const { data: res } = await uni.$http.get('/api/public/v1/goods/qsearch', { query: this.kw })
		    if (res.meta.status !== 200) return uni.$showMsg()
		    this.searchResults = res.message
		    console.log('搜索结果：', this.searchResults)
		  },
		  gotoDetail(goods_id) {
		    uni.navigateTo({
		      url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods_id
		    })
		    // 保存搜索历史
		    this.saveSearchHistory()
		  },
		  // 保存搜索关键词的方法
		  saveSearchHistory() {
		    const set = new Set(this.historyList)
		    set.delete(this.kw)
		    set.add(this.kw)
		    this.historyList = Array.from(set)
		    
		    uni.setStorageSync('kw', JSON.stringify(this.historyList))
		  },
		  // 清空搜索历史记录
		  cleanHistory() {
		    this.historyList = []
		    uni.setStorageSync('kw', '[]')
		  },
		  // 点击跳转到商品列表页面
		  gotoGoodsList(kw) {
		    uni.navigateTo({
		      url: '/subpkg/goods_list/goods_list?query=' + kw
		    })
		  }
		},
		computed: {
		  historys() {
		    return [...this.historyList].reverse()
		  }
		}


	}
</script>

<style lang="scss">
.search-box {
  position: sticky;
  top: 0;
  z-index: 999;
}

.sugg-list {
  padding: 0 5px;

  .sugg-item {
    font-size: 12px;
    padding: 13px 0;
    border-bottom: 1px solid #efefef;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .goods-name {
      // 文字不允许换行（单行文本）
      white-space: nowrap;
      // 溢出部分隐藏
      overflow: hidden;
      // 文本溢出后，使用 ... 代替
      text-overflow: ellipsis;
      margin-right: 3px;
    }
  }
}

.history-box {
  padding: 0 5px;

  .history-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    font-size: 13px;
    border-bottom: 1px solid #efefef;
  }

  .history-list {
    display: flex;
    flex-wrap: wrap;

    .uni-tag {
      margin-top: 5px;
      margin-right: 5px;
    }
  }
}

</style>