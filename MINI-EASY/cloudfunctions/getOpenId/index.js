/**
 * getOpenId/index.js
 * @name：获取小程序登录相关信息
 * @description：该云函数用于获取openId,appId,unionId。在项目初始化时调用，返回值存于app.js中的globalData中。注意异步性 
 * @author:李一帆
 * @finishTime ：2021.1.27
 */

const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}