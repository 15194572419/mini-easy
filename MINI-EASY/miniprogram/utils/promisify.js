//promisify.js：该文件主要用于小程序api的Promise化。
//以及在传统开发下和云开发下对http/https请求的封装

/**
 * @name：小程序api的Promise化
 * @description：由于许多api函数均为异步操作，在此将其进行封装使其可以同步使用
 * @author:李一帆
 * @finishTime ：2021.12.5
 * @param {*} wxApi Api
 * @param {*} context 上下文
 * @param {*} originParam Api原始数据
 * @param {*} extra 额外数据
 * @returns:Promise实例 
 */
export function promisify(wxApi,context='wx',originParam={},extra={}){
  //判断api是否为函数，若不是则它为上下文中的函数
  const method = wxApi instanceof Function ? wxApi :context[wxApi]
  
  //返回调用了API的Promise实例
  //拼接对象，异步函数调用成功时，success解决返回。
  //注意不能提前拼接，否则无法识别resolve
  return new Promise((resolve,reject)=>{
    method(Object.assign(originParam,{
         success:(res)=>{    
           resolve(res)
         },
         fail:(res)=>{
           console.error('MINI-EASY:API PROMIS化错误',res)
         }
       },extra))
  })
}



/**
 * @name：根据基地址和接口地址获取API路径
 * @description：根据基地址和接口地址获取API路径
 * @author:李一帆
 * @finishTime ：2021.12.5
 * @param {*} basePath 
 * @param {*} interfacePath 
 */
export function getApiPath(basePath,interfacePath){
  let url = basePath
  //若当前基地址为空，则从项目的全局变量basePath中取值
  if(url==null){
    const app = getApp()
    //若取值不为空和空字符串，将其赋值给url
    if(app.globalData.basePath!=null&&app.globalData.basePath!=''){
      url=app.globalData.basePath
    }
  }
  //基地址和接口地址拼接返回
  url=url+'/'+interfacePath;
  return url
}

/**
 * @name：请求接口
 * @description：云环境下使用云函数和request-promise第三方包
 * @author:李一帆
 * @finishTime ：2021.1.27
 * @param {*} basePath 项目基地址
 * @param {*} interfacePath 接口地址
 * @param {*} method  方法 get/post
 * @param {*} data    参数
 */
export function wxRequest(basePath,interfacePath,method='GET',data={}){
  //let tempHeader={'content-type': 'application/json'}
  //if(method=='GET') tempHeader={'content-type': 'application/json'}
  //else tempHeader={"Content-Type": "application/x-www-form-urlencoded"}
  let param ={
    name:'request',
    data:{
      url:getApiPath(basePath,interfacePath),
      method:method,
      data:data
    }
  }
  return promisify(wx.cloud.callFunction,wx,param)
}

/**
 * @name：GET请求
 * @description：封装wx.request方法为GET请求
 * @author:李一帆
 * @finishTime ：2021.12.5
 * @param {*} basePath 
 * @param {*} interfacePath 
 */
export function wxGet(basePath,interfacePath){

  var params = {
    
    url: getApiPath(basePath,interfacePath),
    method:'GET',
    header:{
      'content-type':'application/x-www-form-urlencoded'
    }
  }
  return promisify(wx.request,wx,params)
}

/**
 * @name：POST请求
 * @description：封装wx.request方法为POST请求
 * @author:李一帆
 * @finishTime ：2021.12.5
 * @param {*} basePath 
 * @param {*} interfacePath 
 */
export function wxPost(basePath,interfacePath,data){

  var params = {
    url: getApiPath(basePath,interfacePath),
    method:'POST',
    data:data,
    header:{
      'content-type':'application/x-www-form-urlencoded'
    }
  }
  return promisify(wx.request,wx,params)
}


/**
 * @name：小程序api的Asycnfy化
 * @description：使用es6的asycn简化promise的操作
 * @author:李一帆
 * @finishTime ：2021.1.26
 * @param {*} wxApi Api
 * @param {*} context 上下文
 * @param {*} originParam Api原始数据
 * @param {*} extra 额外数据
 * @returns:res 调用结果 
 */
export function asycnfy(wxApi,context='wx',originParam={},extra={}){
  //判断api是否为函数，若不是则它为上下文中的函数
  const method = wxApi instanceof Function ? wxApi :context[wxApi]

  async (event, context) => {
    const res = method(Object.assign(originParam,extra))
    console.log(res)
    return res
  }
}
