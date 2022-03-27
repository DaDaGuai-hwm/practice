const app = getApp()
Page({
    data: {
        answer_first:"",//未保存的答案，可修改
        answer:"",//点击下一题后，保存答案，不可修改
        answerList:[],
        num:1,
        questionList:[],
        hour:0, 
        minute:0,
        second:0,
        DB:""//数据库
    },
    //onLoad函数页面一启动就会调用
    onLoad(){
        //启动时判定用户选择的难度
       if(app.globalData.degree_of_difficulty==1){
          this.setData({
            DB:wx.cloud.database().collection("easy")
          })  
       } 
        else if(app.globalData.degree_of_difficulty==2){
          this.setData({
            DB:wx.cloud.database().collection("middle")
          })  
        } 
        else{
          this.setData({
            DB:wx.cloud.database().collection("diff")
          })  
        } 
        //从题库随机抽取20个题目
       this.data.DB.aggregate().sample({
        size: 20
       }).end().then(res => {
        console.log(res.list)
        let data = res.list || [];
        this.setData({
          questionList:data
        });
        app.globalData.questionList=this.data.questionList
      })
      //设置计时器
      setInterval(() => {
        if(this.data.second>=0&&this.data.second<59){
          this.setData({
            second:this.data.second+1
          }) 
        }
        else if(this.data.second==59&&this.data.minute>=0&&this.data.minute<59){
          this.setData({
            second:0,
            minute:this.data.minute+1
          })
        }
        else if(this.data.s==59&&this.data.minute==59){
          this.setData({
            second:0,
            minute:0,
            hour:this.data.hour+1
          })
        } 
       }, 1000);  
    },

    
    //用户输入就会触发
    input(e){
      this.setData({
        answer_first:e.detail.value
      })
    },

    //点击下一题之后触发函数
    next(){
      this.setData({
        answer:this.data.answer_first.trim()//对于未保存的答案去掉首位多余的空格然后保存
      })
      if(this.data.answer==""){//判断用户是否输入，若输入为空，返回出去
        wx.showToast({
          title: '请输入答案',
          icon:'error',
        })
        return
      }
       this.setData({
        num:this.data.num+1
      })
      this.data.answerList.push(this.data.answer)
      console.log(this.data.answerList)
      this.setData({//重置答案
        answer:"",
        answer_first:""
      })
     },


    //点击提交按钮就会触发
    submit(){
      this.next()//前面的步骤和下一题函数一样，代码复用
      this.setData({
        num:1
      })  
      app.globalData.answerList=this.data.answerList
      clearInterval(this.data.time)
      app.globalData.hour=this.data.hour,
      app.globalData.minute=this.data.minute,
      app.globalData.second=this.data.second,
      wx.navigateTo({
        url: '../chengji/chengji',
      })
    },
})