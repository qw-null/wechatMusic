// pages/personal/personal.js
import Dialog from "@vant/weapp/dialog/dialog";
import request from "../../utils/request";
let startY = 0; //手指起始坐标
let moveY = 0; //手指移动坐标
let moveDistance = 0; //移动距离
Page({
  /**
   * 页面的初始数据
   */
  data: {
    coverTransform: "translateY(0)",
    coverTransition: "",
    userInfo: {},
    recentPlayList: [], //用户播放记录
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let userInfo = wx.getStorageSync("userInfo");

    if (userInfo) {
      this.setData({
        userInfo: JSON.parse(userInfo),
      });
      // 获取用户播放记录
      this.getUserRecentPlay(this.data.userInfo.userId);
    } else {
      Dialog.alert({
        message: "当前用户未登录，请前往登录页面",
        theme: "round-button",
        confirmButtonText: "前往登录页面",
      }).then(() => {
        wx.reLaunch({ url: "/pages/login/login" });
      });
    }
    // console.log("userInfo数据", this.data.userInfo);
  },

  async getUserRecentPlay(data) {
    let res = await request("/user/record", { uid: data });
    let index = 0;
    if (res.code === 200) {
      let recentPlayList = res.allData.slice(0, 10).map((item) => {
        item.id = index++;
        return item;
      });
      this.setData({
        recentPlayList,
      });
      console.log("最近播放", this.data.recentPlayList);
    }
  },
  handleTouchStart(event) {
    this.setData({
      coverTransition: "",
    });
    console.log("event事件", event);

    startY = event.touches[0].clientY;

    console.log("start");
  },
  handleTouchMove(event) {
    moveY = event.touches[0].clientY;
    moveDistance = moveY - startY;
    console.log("move", moveDistance);
    if (moveDistance <= 0) {
      return;
    } else if (moveDistance > 80) {
      moveDistance = 80;
    }
    this.setData({
      coverTransform: `translateY(${moveDistance}rpx)`,
      coverTransition: "transform 1s linear",
    });
  },
  handleTouchEnd(event) {
    console.log("end");
    this.setData({
      coverTransform: "translateY(0)",
    });
  },
  toLogin() {
    Dialog.confirm({
      message: "是否退出当前登录？",
    })
      .then(() => {
        wx.clearStorageSync("userInfo");
        wx.reLaunch({ url: "/pages/login/login" });
      })
      .catch(() => {
        // on cancel
      });
  },
});
