//appInit.js 用于项目创建时的一些初始化操作

/**
 * @name：小程序云开发初始化
 * @description：对小程序的云环境进行初始化
 * @author:李一帆
 * @finishTime ：2021.12.5
 * @param:envs evn列表
 */
export function cloudInit(envs=[]){
  //判断是否可以使用云环境
  if(!wx.cloud){
    console.error('MINI-EASY:请使用2.2.3或以上版本的基础库以使用云能力')
  }else{//可以使用，初始化云开发
    wx.cloud.init({
      env:envs,
      traceUser:true
    })
  }
}

/**
 * @name：启动日志初始化
 * @description：启动日志初始化
 * @author:李一帆
 * @finishTime ：2021.12.5
 */
export function runLogsInit(){
  const logs = wx.getStorageSync('logs') || []
  logs.unshift(Date.now())
  wx.setStorageSync('logs', logs)
  console.log('MINI-EASY:startLogs has been open')
}

/**
 * @name：获取用户个人信息
 * @description： 同步获取用户信息
 * @author:李一帆
 * @finishTime ：2021.12.5
 * @returns userInfo/null
 */
export function getUserInfo(){
  return new Promise((resolve,reject)=>{
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              resolve(res)
            },fail:(error)=>{
              console.error('MINI-EASY:用户id获取失败',error)
              reject()
            }
          })
        }else{
          console.log('MINI-EASY:USER HAS NOT BEEN AUTHORIZED')
          resolve(false)
        }
      }
    })
    
  })
}

/**
 * @name：用户登录并获取openId等
 * @description：用户登录并获取openId等，该接口最大缺陷是必须获取小程序appId和密钥
 * @author:李一帆
 * @finishTime ：2021.12.5
 * @param {*} appId 小程序id
 * @param {*} secret 小程序密钥
 * @returns openId等/null
 */
export function userLoginAndGetInfo(appId,secret){
  return new Promise((done,fail)=>{
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        let promise = new Promise((resolve,reject)=>{
          wx.request({
            //获取openid的url，请求微信服务器
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + secret + '&js_code=' + res.code + '&grant_type=authorization_code',
            //该接口地址未必可用，如不可以将该地址添加到小程序合法地址
            data:{},
            header: {
              'content-type': 'application/json'
            },
            success:res=>{
              resolve(res)
            },
            fail:(error)=>{
              console.log('MINI-EASY:获取openId失败',error)
              reject()
            }
          })
        })
        done(promise)
      }
    })
  })  
  
}