<template>
	<view class="login-container">
		<uni-icons type="contact-filled" size="100" color="#afafaf"></uni-icons>
		
		<button type="primary" class="btn-login" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button>
		
		<view class="tips-text">登录后尽享更多权益</view>
	</view>
</template>

<script>
	import {mapMutations, mapState} from 'vuex'
	export default {
		name:"my-login",
		data() {
			return {
				
			};
		},
		computed: {
			...mapState('m_user', ['redirectInfo']),
		},
		methods: {
			...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'updateRedirectInfo']),
			//用户授权之后，获取用户信息
			getUserInfo(e) {
				if(e.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了登录授权！')
				
				this.updateUserInfo(e.detail.userInfo)
				
				this.getToken(e.detail)
			},
			async getToken(info) {
			  let res;
			  try {
			    res = await uni.login();
			    if (res.errMsg !== 'login:ok') {
			      uni.$showMsg('登录失败！');
			      return;
			    }
			  } catch (err) {
			    uni.$showMsg('登录失败！');
			    return;
			  }
			  const query = {
			    code: res.code,
			    encryptedData: info.encryptedData,
			    iv: info.iv,
			    rawData: info.rawData,
			    signature: info.signature
			  };
			
			  try {
			    const { data: loginResult } = await uni.$http.post('/api/auth/wxlogin/app1', query, { header: { 'Content-Type': 'application/json' } });
			    console.log(loginResult);
			    if (loginResult.meta.status !== 200) {
			      return uni.$showMsg('登录失败！');
			    }
			    this.updateToken(loginResult.message.token);
			    this.navigateBack();
			  } catch (httpErr) {
			    uni.$showMsg('网络异常，登录失败！');
			    console.error('登录接口请求失败：', httpErr);
			  }
			},
			navigateBack() {
				if(this.redirectInfo && this.redirectInfo.openType === 'switchTab') {
					uni.switchTab({
						url: this.redirectInfo.from,
						
						complete: () => {
							this.updateRedirectInfo(null)
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
.login-container {
	height: 750rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: #f8f8f8;
	position: relative;
	overflow: hidden;
	
	&::after {
		content: '';
		display: block;
		width: 100%;
		height: 40px;
		background-color: white;
		position: absolute;
		bottom: 0;
		left: 0;
		border-radius: 100%;
		transform: translateY(50%);
	}
	
	.btn-login {
		width: 90%;
		border-radius: 100px;
		margin: 15px 0;
		background-color: #c00000;
	}
	
	.tips-text {
		font-size: 12px;
		color: gray;
	}
}
</style>