//index.js
//获取应用实例
const app = getApp()

// 引入SDK核心类
// var QQMapWX = require('../../libs/qqmap/qqmap-wx-jssdk.js')
var qqmapsdk
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    height: '',
    latitude: '',
    longitude: '',
    current: {
      latitude: app.globalData.latitude,
      longitude: app.globalData.longitude
    }
  },

  onLoad: function () {
    // 实例化API核心类
    // qqmapsdk = new QQMapWX({
    //   key: app.globalData.qqmapKey
    // });
  },

  onReady: function () {
    // 使用 wx.createMapContext 获取 map 上下文
    // this.mapCtx = wx.createMapContext('myMap')
  },

  onShow: function () {
    wx.redirectTo({ url: '../../pages/txMap/txMap'})
    return
    var _this = this;
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          height: res.windowHeight,
          latitude: app.globalData.latitude,
          longitude: app.globalData.longitude,
        })
      }
    })
    // 调用接口
    this.data.markers = []
    this.data.markers.push({ // 获取返回结果，放到mks数组中
      title: '杨凌智麦鲜啤',
      id: 1,
      latitude: app.globalData.latitude,
      longitude: app.globalData.longitude,
      iconPath: "https://static.imzhiliao.com/Marker.png", //图标路径
      width: 20,
      height: 20,
      callout: {
        display: 'ALWAYS',
        content: '杨凌智麦鲜啤',
        color:'#0083ff',
        borderRadius: 5,
        padding: 5
      }
      // label: {
      //   content: '杨凌智麦鲜啤',
      //   color: '#f00'
      // }
    })
    this.setData({
      markers: this.data.markers
    })
    this.driving()
  },
  // 重置地图
  refreshMap() {
    this.mapCtx.moveToLocation()
  },
  //事件回调函数
  driving: function () {
    var _this = this;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        console.log(latitude, longitude)
        _this.setData({
          current: {
            latitude: latitude,
            longitude: longitude
          }
        })
        //网络请求设置
        var opt = {
          //WebService请求地址，from为起点坐标，to为终点坐标，开发key为必填
          url: 'https://apis.map.qq.com/ws/direction/v1/driving/?from=' + _this.data.current.latitude + ',' + _this.data.current.longitude + '&to=' + app.globalData.latitude + ',' + app.globalData.longitude + '&key=' + app.globalData.qqmapKey,
          method: 'GET',
          dataType: 'json',
          //请求成功回调
          success: function (res) {
            var ret = res.data
            if (ret.status != 0) return; //服务异常处理
            var coors = ret.result.routes[0].polyline, pl = [];
            //坐标解压（返回的点串坐标，通过前向差分进行压缩）
            var kr = 1000000;
            for (var i = 2; i < coors.length; i++) {
              coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
            }
            //将解压后的坐标放入点串数组pl中
            for (var i = 0; i < coors.length; i += 2) {
              pl.push({ latitude: coors[i], longitude: coors[i + 1] })
            }
            _this.mapCtx.includePoints({
              points: pl
            })
            //设置polyline属性，将路线显示出来
            _this.setData({
              polyline: [{
                points: pl,
                color: '#FF0000DD',
                width: 2
              }]
            })
          }
        };
        wx.request(opt);
      }
    })
    
  }
})
