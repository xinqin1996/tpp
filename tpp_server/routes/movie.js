const express = require("express");
const router = express.Router();
const pool=require("../pool");

//查询  1：正在热映 0：即将上映
router.get("/v1/movie_is_show",(req,res)=>{
  var is_show=req.query.is_show;         
  var sql="SELECT * FROM tpp_movie WHERE is_show = ?";
  pool.query(sql,[is_show],(err,result)=>{
    if(err) throw err;
    res.send({code:1,msg:"查询成功",data:result});
  })
})

//查询轮播图图片
router.get("/v1/carousel",(req,res)=>{       
  var sql="SELECT * FROM tpp_carousel";
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    res.send({code:1,msg:"查询成功",data:result});
  })
})

//查询单个电影的详情页
router.get("/v1/movie_detail",(req,res)=>{
  var mid=req.query.mid;         
  var sql="SELECT * FROM tpp_movie WHERE mid = ?";
  pool.query(sql,[mid],(err,result)=>{
    if(err) throw err;
	if(result.length==0){
		res.send({code:0,msg:"查询失败",data:result});
	}else{
		res.send({code:1,msg:"查询成功",data:result});
	}
  })
})

module.exports=router;
