// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData: {
      phone: '',
      password: '',
      confirmPwd: '',
      gender: 'female',
      birthday: '',
      hobbies: [''],
      avatar: '',
      agree: false
    }, 
    codeText: '获取验证码',
    codeDisabled: false,
  },
  handleInput(e) {
    const { key } = e.currentTarget.dataset
    const { value } = e.detail
    this.setData({
      [`formData.${key}`]: value
    })
  },

    // 获取验证码
    getCode() {
      const { phone } = this.data.formData
      if (!/^1[3-9]\d{9}$/.test(phone)) {
        wx.showToast({ title: '请输入正确的手机号', icon: 'none' })
        return
      }
      // 模拟倒计时
      this.setData({ codeDisabled: true, codeText: '60s后重新获取' })
      let count = 60
      const timer = setInterval(() => {
        count--
        this.setData({ codeText: `${count}s后重新获取` })
        if (count <= 0) {
          clearInterval(timer)
          this.setData({ codeDisabled: false, codeText: '获取验证码' })
        }
      }, 1000)
    },
  
    // 性别单选
    handleRadioChange(e) {
      this.setData({
        'formData.gender': e.detail.value
      })
    },

    // 日期选择
    handleDateChange(e) {
      this.setData({
        'formData.birthday': e.detail.value
      })
    },

    chooseImage() {
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          this.setData({
            'formData.avatar': res.tempFilePaths[0]
          })
        }
      })
    },

      // 协议勾选
  handleAgreeChange(e) {
    this.setData({
      'formData.agree': e.detail.value.length > 0
    })
  },

  // 打开协议
  openAgreement() {
    wx.showModal({
      title: '用户协议',
      content: '请仔细阅读用户协议和隐私政策...',
      showCancel: false
    })
  },

    // 表单校验核心方法
    validateForm() {
      const { formData } = this.data
      // 非空校验
      if (!formData.phone.trim()) {
        wx.showToast({ title: '请输入手机号', icon: 'none' })
        return false
      }
      if (!formData.password.trim()) {
        wx.showToast({ title: '请输入密码', icon: 'none' })
        return false
      }
      if (!formData.confirmPwd.trim()) {
        wx.showToast({ title: '请输入确认密码', icon: 'none' })
        return false
      }
      if (!formData.gender) {
        wx.showToast({ title: '请选择性别', icon: 'none' })
        return false
      }
      if (!formData.birthday) {
        wx.showToast({ title: '请选择出生日期', icon: 'none' })
        return false
      }
  
      // 格式校验
      // 手机号校验
      const phoneReg = /^1[3-9]\d{9}$/
      if (!phoneReg.test(formData.phone.trim())) {
        wx.showToast({ title: '请输入正确的手机号', icon: 'none' })
        return false
      }
      // 密码格式校验（示例：6-16位，包含字母+数字）
      const pwdReg = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,16}$/
      if (!pwdReg.test(formData.password.trim())) {
        wx.showToast({ 
          title: '密码需6-16位，包含字母和数字', 
          icon: 'none',
          duration: 2000
        })
        return false
      }
  
      // 一致性校验（确认密码与原密码）
      if (formData.password.trim() !== formData.confirmPwd.trim()) {
        wx.showToast({ title: '两次输入的密码不一致', icon: 'none' })
        return false
      }
  
      // 协议勾选校验
      if (!formData.agree) {
        wx.showToast({ title: '请阅读并同意用户协议和隐私政策', icon: 'none' })
        return false
      }
  
      // 所有校验通过
      return true
    },
  
    // 提交表单
    submitForm() {
      const isValid = this.validateForm()
      if (!isValid) return
      wx.showToast({ title: '注册成功', icon: 'success' })
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