const app = getApp()
Page({
  //隐藏小程序自带按钮
  onShow(){
    wx.hideHomeButton()
  },
  //难度设置
  degree(){
    app.globalData.degree_of_difficulty=1
    this.tiaozhuan()
  },
  degree2(){
    app.globalData.degree_of_difficulty=2
    this.tiaozhuan()
  },
  degree3(){
    app.globalData.degree_of_difficulty=3
    this.tiaozhuan()
  },
  tiaozhuan(){
    wx.navigateTo({
      url: '../timu/timu',
    })
  }
})
