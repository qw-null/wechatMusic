// 发送ajax请求
import config from "./config";
// 1.封装功能函数

export default (url, data = {}, method = "GET") => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.BaseURL + url,
      data,
      method,
      success: (res) => {
        console.log("success", res.data);

        resolve(res.data);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
};

// 2.封装功能组件
