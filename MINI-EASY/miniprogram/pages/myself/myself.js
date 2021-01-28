//myself.js
const app = getApp()

Page({
  data: {
    headerBackground:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1711137366,2936132709&fm=26&gp=0.jpg',
    headerPicPath:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1489586537,893859316&fm=26&gp=0.jpg',
    nickName:'nickName'
  },
  onLoad: function() {
    this.setData({
      nickName:app.globalData.userInfo.nickName,
      headerPicPath:app.globalData.userInfo.avatarUrl
    })
  }

})
