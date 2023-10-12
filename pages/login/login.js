// pages/login/login.js
import request from "../../utils/request";
import Notify from "@vant/weapp/notify/notify";
/**
 * 登录流程：
 * 1.收集表单项数据
 * 2.前端验证
 *  1）验证用户信息是否合法：账号、密码
 *  2）前端验证不通过，不发送请求，提示用户
 *  3）前端验证通过，发送数据
 * 3.后端验证
 *
 */
Page({
  /**
   * 页面的初始数据
   */
  data: {
    phone: "",
    password: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

  handleInput(event) {
    this.setData({
      [event.currentTarget.id]: event.detail.value,
    });
  },
  async login() {
    let { phone, password } = this.data;
    let phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/;
    // 前端验证
    //    手机号验证：
    if (!phone) {
      wx.showToast({
        title: "手机号不能为空",
        icon: "none",
        duration: 1000,
      });
      return;
    }
    if (!phoneReg.test(phone)) {
      wx.showToast({
        title: "手机号格式不正确",
        icon: "none",
        duration: 1000,
      });
      return;
    }
    if (!password) {
      wx.showToast({
        title: "密码不能为空",
        icon: "none",
        duration: 1000,
      });
      return;
    }
    let res = await request("/login/cellphone", {
      phone,
      password,
      isLogin: true,
    });
    if (res.code === 200) {
      Notify({ type: "success", message: "登录成功" });
      // 将用户信息存储至本地
      wx.setStorageSync("userInfo", JSON.stringify(res.profile));
      wx.reLaunch({
        url: "/pages/personal/personal",
      });
    } else {
      Notify({ type: "danger", message: res.msg });
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
