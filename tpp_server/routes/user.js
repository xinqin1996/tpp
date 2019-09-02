const express = require("express");
const router = express.Router();
const pool=require("../pool");
const bodyParser=require("body-parser")    //get 传参的组件导入

//获得电影票
router.get("/v1/get_ticket",(req,res)=>{
  var uid=req.session.uid;
  if(!uid){
    res.send({code:0,msg:"没有登录"})
  }else{
    var sql="SELECT * FROM tpp_user_ticket WHERE uid = ?";
    pool.query(sql,[uid],(err,result)=>{
      if(err) throw err;
      if(result.length>0){
        res.send({code:1,msg:"查询成功",data:result})
      }else{
        res.send({code:0,msg:"该用户没有购买电影票",data:result})
      }
    })
  }
})

//购买电影票
// var uid = req.session.uid;
router.post("/v1/ticket",bodyParser.json(),(req,res)=>{
// router.post("/v1/ticket",function(req,res){
  console.log(req.body);
  var obj=req.body;
  var uid = req.session.uid;
  console.log(req.session);
  // console.log(uid);
  if(!uid){
    res.send({code:0,msg:"未知的错误，用户未登录"})
  }else{
    //遍历obj.seat 把数据插入表格
      //1 拼接sql语句
      var sql="INSERT INTO tpp_user_ticket VALUES (NULL,?,?,?,?,?,?)";    
      for(var i=1;i<obj.seat.length;i++){
        sql+=",(NULL,?,?,?,?,?,?)"
      }
      //2 拼接插入的数据
      var arr=[];
      for(var i=0;i<obj.seat.length;i++){
        var arr1=[uid,obj.mname,obj.tdate,obj.d23,obj.cname,obj.seat[i]];
        arr=arr.concat(arr1);
      }
      // 3 执行pool.query
      pool.query(sql,arr,(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
          res.send({code:1,msg:"购买成功，加入数据表"})
        }else{
          res.send({code:0,msg:"购买时发生错误，error"})
        }
      })      
  }
})

//注册接口
router.get("/v1/reg",(req,res)=>{
  var uname=req.query.uname;
  var uphone=req.query.uphone;
  var upwd=req.query.upwd;
  var sql="INSERT INTO tpp_user(uname,uphone,upwd) VALUES(?,?,md5(?))";
  pool.query(sql,[uname,uphone,upwd],(err,result)=>{
    if(err) throw err;
    if(result.affectedRows>0){
      res.send({code:1,msg:"reg success"})
    }else{
      res.send({code:0,msg:"reg error"})
    }
  })
})

// 登录验证  通过手机和密码验证 
//通过uphone和upwd查询uil,将结果保存在req.session里面，
router.get("/v1/login",(req,res)=>{
  var uphone=req.query.uphone;
  var upwd=req.query.upwd;
  var sql="SELECT uid FROM tpp_user WHERE uphone=? AND upwd=md5(?)";
  pool.query(sql,[uphone,upwd],(err,result)=>{
    if(err) throw err;
    if(result.length==0){
      res.send({code:"-1",msg:"用户名或密码错误"});
    }else{
      //登录成功 1: 保存凭据在session中，2: 把成功的信息发送给脚手架
       //result=[{uid:1}]
      req.session.uid=result[0].uid;
      console.log(req.session);
      // console.log(req.session.uid)
      res.send({code:"1",msg:"登录成功",data:result[0].uid})
    }
  })
})

// 查看用户是否为在线状态
//创建成功时向服务器发起请求，查看是否存在req.session,
router.get("/v1/islogin",(req,res)=>{
  //获取uid，
  var uid = req.session.uid;
  console.log(req.session);
  //如果不存在，无事发生，
  if(!uid){
    res.send({code:-1,msg:"用户未登录"}); 
    return; 
  };
  var sql='SELECT uname FROM tpp_user WHERE uid = ?'
  pool.query(sql,[uid],(err,result)=>{
    if(err) throw err; 
    if(result.length==0){
      res.send({code:"-1",msg:"出现错误，没有找到uname"});
    }else{
      //登录成功 1: 保存凭据在session中，2: 把成功的信息发送给脚手架
       //result=[{uid:1}]
        //req.session.destroy();  退出登录
      res.send({code:"1",msg:"用户已经登录",data:result,data2:uid})
    }
  })
})

module.exports=router;
