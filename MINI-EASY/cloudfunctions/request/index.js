/**
 * request/index.js
 * @name：发送http请求
 * @description：该云函数利用node.js第三方包request-promise实现http请求
 * @author:李一帆
 * @finishTime ：2021.1.27
 */


const cloud = require('wx-server-sdk')
cloud.init()
var request = require('request-promise')
// 云函数入口函数
exports.main = async (event, context) => {
  return await request({
    url:event.url,
    method:event.method,
    body:event.data,
    header:{'content-type': 'application/json;charset=UTF-8'},
    json:true
  }).then((res)=>{
    res.params =event
    return res
  }).catch((err)=>{
    return err
  })
}