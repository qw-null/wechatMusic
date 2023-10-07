// pages/index/index.js
import request from "../../utils/request";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [], //轮播图数据
    recommendList: [], //推荐歌单数据
    topListCategory: [], //排行榜分类
    topList: [], //排行榜详情
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    let bannerListData = await request("/banner", { type: 2 });
    let recommendListData = await request("/personalized", { limit: 15 });
    let topListCategoryData = await request("/toplist");
    this.setData({
      bannerList: bannerListData.banners,
      recommendList: recommendListData.result,
      topListCategory: topListCategoryData.list.slice(0, 5),
    });
    let topListArr = [];

    for (let i = 0; i < 5; i++) {
      let tempTopList = await request("/playlist/detail", {
        id: this.data.topListCategory[i].id,
      });
      topListArr.push({
        name: tempTopList.playlist.name,
        tracks: tempTopList.playlist.tracks.slice(0, 3),
      });
    }
    this.setData({
      topList: topListArr,
    });
    console.log("aaaaa", this.data.topList);
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
