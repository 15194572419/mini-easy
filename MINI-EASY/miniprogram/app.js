//app.js
const promisify = require('./utils/promisify')


App({
  globalData:{
    appId:'',
    openId:'',
    unionId:'',
    userInfo:{},
    signature:'', //签名
    promisifyUtil:promisify, //单例模式，自此可以使用一个promisify工具
    basePath:'http://39.105.77.105:8080'
  },
  onLaunch: function () {
    
    
    /*引入初始化js包*/
    const appInitor = require('./utils/appInit')
    
    /*开启缓存日志*/
    appInitor.runLogsInit()
    
      

   /*获取登录信息*/
  let appPromise = null
  /*使用云开发*/
  appInitor.cloudInit()//云环境初始化
  appPromise = promisify.promisify(wx.cloud.callFunction,wx,{name:'getOpenId',data:{}})
    
  /*不使用云开发,提供appId和appSecret
  appPromise = appInitor.userLoginAndGetInfo('wx2b1bcf66df3a55ea','e1292e4195fb1346c21c11b744ba9738')
  */
  appPromise.then((res)=>{
    this.globalData.appId=res.result.appid
    this.globalData.openId=res.result.openid
    this.globalData.unionId=res.result.unionid
  })
  }
})
