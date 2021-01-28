//index.js
const app = getApp()

Page({
  data: {
    words:[],
    authorizeMark:false
  },
  onLoad: function() {
        /*获取用户信息*/
        let userPromise = require('../../utils/appInit').getUserInfo()
        userPromise.then((res)=>{
        if(res!=false){//用户已经授权
          app.globalData.userInfo=res.userInfo
          app.globalData.signature=res.signature
          this.setData({authorizeMark:true})
        }else{//用户未授权，跳转授权页面
          wx.showToast({
            title: '请您授权小程序',
            success:()=>{
              setTimeout(()=>{
                wx.redirectTo({
                  url: '../authorize/authorize',
                })
              },1500)
            }
          })
        }
        }) 
  },
  testApi:function(){
    let test = app.globalData.promisifyUtil.wxRequest(null,'word/getWords/60/0','GET')
    test.then((res)=>{
      this.setData({
        words:res.result.data
      })
      console.log(this.data.words)
    })
  }

})
