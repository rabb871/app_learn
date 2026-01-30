// pages/day_02/day_02.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:'hello world',
    imgSrc:'/images/猫猫.png',
    randomNum1:Math.random() * 10,
    count: 0
  },

  //定义按钮的事件处理函数
  btnTapHandler(e){
    console.log(e)
  },

  //+1按钮的点击事件处理函数
  CountChange(){
    this.setData({
      count: this.data.count + 1
    })
  },

  btnTap2(e){
    this.setData({
      count: this.data + e.target.dataset.info
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})