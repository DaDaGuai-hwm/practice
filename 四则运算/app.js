// app.js
App({
  onLaunch() {
   wx.cloud.init({
     env:"cloud1-6gnldtlo3b5ffb0e",
   })
  },
  globalData: {
    answerList:[],
    questionList:[],
    degree_of_difficulty:"",
    hour:"",
    second:"",
    minute:""
  }
})
