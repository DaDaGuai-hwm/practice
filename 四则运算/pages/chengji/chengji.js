
const app = getApp()
Page({
    data: {
        mark:0,
        answerList:[],
        questionList:[],
        hour:"",
        minute:"", 
        second:""
    },
    //页面一启动就对调用
    onLoad(){
        this.setData({
            questionList:app.globalData.questionList,
            answerList:app.globalData.answerList,
            hour:app.globalData.hour,
            minute:app.globalData.minute,
            second:app.globalData.second
        })
        console.log(this.data.answerList)
        //循环判断用户的答案与标准答案
        for(var i=0 ;i<this.data.answerList.length;i++){
            if(this.data.answerList[i]==this.data.questionList[i].a){
                this.setData({
                    mark:this.data.mark+5
                })
            }
        }
    },
    //点击再测一次就会返回首页面进行难度选择
    back(){
        //清空数据
        app.globalData.questionList=[],
        app.globalData.ans=[],
        app.globalData.h="",
        app.globalData.s="",
        app.globalData.m=""
        wx.navigateBack({
          delta: 2,  
        })
    },
})