// 发送ajax请求
import config from "./config";
// 1.封装功能函数

export default (url, data = {}, method = "GET") => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.BaseURL + url,
      data,
      method,
      // header: {
      //   cookie: wx
      //     .getStorageSync("cookies")
      //     .find((item) => item.indexOf("MUSIC_U")),
      // },
      success: (res) => {
        console.log("success", res.data);
        if (data.isLogin) {
          // 表明是登录请求
          wx.setStorage({
            key: "cookies",
            data: res.cookies,
          });
        }
        resolve(res.data);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
};

// 2.封装功能组件
