const recorderManager = wx.getRecorderManager()
const innerAudioContext = wx.createInnerAudioContext()
const APP_ID = "14620636";
const API_KEY = "AarjGgElm77xC3NL7X7VxHGX";
const SECRET_KEY = "2tQhRwjCQjoFI9ry2uCRetg0CDzfnB2P";
var tempFilePath;
var voice = "";
var statu;

//录音的属性配置
const options = {
  duration: 600000,//指定录音的时长，单位 ms
  sampleRate: 16000,//采样率
  numberOfChannels: 1,//录音通道数
  encodeBitRate: 96000,//编码码率
  format: 'mp3',//音频格式，有效值 aac/mp3
  frameSize: 50,//指定帧大小，单位 KB
}

Page({
  websocket: function() {
    wx.connectSocket({
      url: 'wss://example.qq.com',
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json'
      },
      protocols: ['protocol1'],
      method: 'GET'
    })
  },
  play: function () {
    console.log("播放声音文件");
    //播放声音文件  
    innerAudioContext.src = this.tempFilePath,
    innerAudioContext.seek(this.data.playRecord)
    innerAudioContext.play()
  },
  uploadImg: function () {
    wx.chooseImage({
      success(res) {
        // const tempFilePaths = res.tempFilePaths
        console.log(res.tempFilePaths[0]);
        wx.uploadFile({
          url: 'http://locahost:8080/image/uploadByUrl', // 仅为示例，非真实的接口地址
          filePath: res.tempFilePaths[0],
          name: 'path',
          success(res) {
            wx.showModal({
              title: 'successUpload',
              content: 'yes',
            })
            // do something
          }
        })
      }
    })
  },
  start: function () {
    statu = wx.showLoading({
      title: '倾听中……',
    })
    console.log("开始录音");
    //开始录音  
    recorderManager.start(options);
    recorderManager.onStart(() => {
      console.log('recorder start')
    });
  },

  stop: function () {
    wx.hideLoading(statu)
    recorderManager.stop();
    recorderManager.onStop((res) => {
      this.tempFilePath = res.tempFilePath;
      console.log('停止录音', res.tempFilePath)
      const { tempFilePath } = res
      voice = this.tempFilePath;
      //播放声音文件  
      // innerAudioContext.src = this.tempFilePath,
      // innerAudioContext.seek(this.data.playRecord)
      // innerAudioContext.play()
      
      // 识别语音
      // wx.request({
      //   url: url,
      //   data: {username: 'zw',
      //          password: 123456,
      //          url: '',
      //          format: 'wav',
      //          rate: 8000
      //         },
      //   header: '',
      //   method: 'post',
      //   success: (data)=>{
      //     console.log(data);
      //   }
      // })
      console.log('识别语音 url:' + this.data.url + "/weixin");
      this.setData({
        result: voice
      });
      // wx.uploadFile({
      //   // url: this.data.url + ":8080/weixin",
      //   url: "localhost:8080/weixin",
      //   filePath: voice,
      //   name: 'file',
      //   formData: { "username": 'zw', "password": 123456, format: 'wav', rate: 8000 },
      //   header: { 'content-type': 'multipart/form-data' },
      //   success: function (res) {
      //     console.log('识别语音 success:' + res);
      //     var lastOutput = "==>语音识别结果：\n" + stt + "\n\n==>语义处理结果：\n" + sentenceResult;
      //     this.setData({
      //       result: lastOutput,
      //     });
      //     wx.hideToast();
      //   },
      //   fail: function (res) {
      //     console.log('识别语音 fail:' + res);
      //     wx.showModal({
      //       title: '提示',
      //       content: "网络请求失败，请确保网络是否正常",
      //       showCancel: false,
      //       success: function (res) {
      //       }
      //     });
      //     wx.hideToast();
      //   }
      // });

    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    url: '172.16.171.19',
    result: '测试结果'
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
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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