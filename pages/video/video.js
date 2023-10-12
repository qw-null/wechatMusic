// pages/video/video.js
import request from "../../utils/request";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    videoGroupList: [],
    navId: 0, //记录当前点击标签的id
    videoList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取导航数据
    this.getGroupList();
  },

  // 获取导航数据
  async getGroupList() {
    let res = await request("/video/group/list");
    this.setData({
      videoGroupList: res.data.slice(0, 14),
      navId: res.data[0].id,
    });
    this.getVideoList(this.data.navId);
  },
  changeNav(event) {
    let id = event.currentTarget.id;
    this.setData({
      navId: id,
      videoList: [],
    });
    // 显示正在加载
    wx.showLoading({
      title: "正在加载",
    });
    // 动态获取当前导航对应的视频
    this.getVideoList(this.data.navId);
  },
  async getVideoUrl(vid) {
    let res = await request("/video/url", { id: vid });
    return res.urls[0].url;
  },
  async getVideoList(data) {
    let res = await request("/video/group", { id: data });
    // 关闭正在加载提示框
    wx.hideLoading();
    let index = 0;
    const promises = res.datas.map(async (item) => {
      item.id = index++;
      item.vURL = await this.getVideoUrl(item.data.vid).then((res) => {
        if (res) return res;
      });
      return item;
    });

    const videoList = await Promise.all(promises);

    this.setData({
      videoList,
    });
  },
});
