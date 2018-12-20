// pages/txMap/txMap.js
let plugin = requirePlugin("myPlugin")
let app = getApp()
let routeInfo = {
  startLat: 39.90469,    //起点纬度 选填
  startLng: 116.40717,    //起点经度 选填
  startName: "我的位置",   // 起点名称 选填
  endLat: app.globalData.latitude,    // 终点纬度必传
  endLng: app.globalData.latitude,  //终点经度 必传
  endName: "杨凌智麦鲜啤",  //终点名称 必传
  mode: 'car'  //算路方式 选填
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    routeInfo: routeInfo
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let routeInfoMin = routeInfo
    let self = this
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        console.log(latitude, longitude)
        routeInfoMin.startLat = latitude
        routeInfoMin.startLng = longitude
        routeInfoMin.endLat = app.globalData.latitude
        routeInfoMin.endLng = app.globalData.longitude
        self.setData({
          routeInfo: routeInfoMin
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})